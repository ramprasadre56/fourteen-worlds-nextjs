'use client';

import { useEffect, useRef, useState, type ComponentType } from 'react';
import {
    Bold, Italic, Underline, Strikethrough, List, ListOrdered, Quote, Heading2, Heading3,
    AlignLeft, AlignCenter, AlignRight, Link2, RemoveFormatting, Plus, ImageIcon, Minus,
} from 'lucide-react';
import './forum.css';

type Props = {
    value: string;
    onChange: (html: string) => void;
    placeholder?: string;
    minHeight?: number;
    /** 'toolbar' = fixed toolbar in a bordered box; 'floating' = Medium-style bubble on text selection. */
    variant?: 'toolbar' | 'floating';
};

type Tool = { key: string; title: string; Icon: ComponentType<{ size?: number }>; cmd?: string; arg?: string };

const T = {
    bold: { key: 'bold', title: 'Bold', Icon: Bold, cmd: 'bold' },
    italic: { key: 'italic', title: 'Italic', Icon: Italic, cmd: 'italic' },
    underline: { key: 'underline', title: 'Underline', Icon: Underline, cmd: 'underline' },
    strike: { key: 'strike', title: 'Strikethrough', Icon: Strikethrough, cmd: 'strikeThrough' },
    h2: { key: 'h2', title: 'Large heading', Icon: Heading2, cmd: 'formatBlock', arg: 'h2' },
    h3: { key: 'h3', title: 'Small heading', Icon: Heading3, cmd: 'formatBlock', arg: 'h3' },
    quote: { key: 'quote', title: 'Quote', Icon: Quote, cmd: 'formatBlock', arg: 'blockquote' },
    ul: { key: 'ul', title: 'Bulleted list', Icon: List, cmd: 'insertUnorderedList' },
    ol: { key: 'ol', title: 'Numbered list', Icon: ListOrdered, cmd: 'insertOrderedList' },
    left: { key: 'left', title: 'Align left', Icon: AlignLeft, cmd: 'justifyLeft' },
    center: { key: 'center', title: 'Align center', Icon: AlignCenter, cmd: 'justifyCenter' },
    right: { key: 'right', title: 'Align right', Icon: AlignRight, cmd: 'justifyRight' },
    link: { key: 'link', title: 'Insert link', Icon: Link2 },
    clear: { key: 'clear', title: 'Clear formatting', Icon: RemoveFormatting },
} satisfies Record<string, Tool>;

const TOOLBAR: (Tool | null)[] = [T.bold, T.italic, T.underline, T.strike, null, T.h3, T.quote, T.ul, T.ol, null, T.left, T.center, T.right, null, T.link, T.clear];
const BUBBLE: (Tool | null)[] = [T.bold, T.italic, T.link, null, T.h2, T.h3, T.quote, T.ul];

export default function RichTextEditor({ value, onChange, placeholder = 'Write here…', minHeight = 260, variant = 'toolbar' }: Props) {
    const wrapRef = useRef<HTMLDivElement>(null);
    const editorRef = useRef<HTMLDivElement>(null);
    const savedRange = useRef<Range | null>(null);
    const [linkOpen, setLinkOpen] = useState(false);
    const [linkUrl, setLinkUrl] = useState('https://');
    const [bubble, setBubble] = useState<{ top: number; left: number } | null>(null);
    const [plusTop, setPlusTop] = useState<number | null>(null);
    const [insertMenu, setInsertMenu] = useState<'closed' | 'menu' | 'image'>('closed');
    const [imageUrl, setImageUrl] = useState('');
    const insertOpenRef = useRef(false);
    useEffect(() => { insertOpenRef.current = insertMenu !== 'closed'; }, [insertMenu]);
    const floating = variant === 'floating';
    const linkOpenRef = useRef(false);
    useEffect(() => { linkOpenRef.current = linkOpen; }, [linkOpen]);

    // Only push external value changes (e.g. restoring a draft, clearing after submit) into the DOM.
    useEffect(() => {
        const el = editorRef.current;
        if (el && el.innerHTML !== value) el.innerHTML = value;
    }, [value]);

    // Medium-style bubble: follow the text selection inside the editor.
    useEffect(() => {
        if (!floating) return;
        const onSelection = () => {
            const sel = window.getSelection();
            const editor = editorRef.current;
            const wrap = wrapRef.current;
            if (!sel || !sel.rangeCount || !editor || !wrap) return;
            const inEditor = editor.contains(sel.anchorNode);

            // "+" insert button beside an empty line (Medium style)
            if (!insertOpenRef.current) {
                if (inEditor && sel.isCollapsed) {
                    let block: Node | null = sel.anchorNode;
                    while (block && block.parentNode !== editor && block !== editor) block = block.parentNode;
                    if (!block || block === editor) {
                        setPlusTop(editor.textContent?.trim() || editor.querySelector('img,hr') ? null : editor.offsetTop);
                    } else {
                        const el = block as HTMLElement;
                        const empty = !(el.textContent ?? '').trim() && !(el.nodeType === 1 && el.querySelector?.('img,hr')) && el.nodeName !== 'HR' && el.nodeName !== 'IMG';
                        setPlusTop(empty && el.nodeType === 1 ? editor.offsetTop + el.offsetTop : null);
                    }
                } else if (!inEditor) {
                    setPlusTop(null);
                }
            }

            if (sel.isCollapsed || !inEditor) {
                if (!linkOpenRef.current) setBubble(null);
                return;
            }
            setPlusTop(null);
            const r = sel.getRangeAt(0).getBoundingClientRect();
            const w = wrap.getBoundingClientRect();
            setBubble({ top: r.top - w.top - 52, left: Math.max(150, Math.min(w.width - 150, r.left - w.left + r.width / 2)) });
        };
        document.addEventListener('selectionchange', onSelection);
        return () => document.removeEventListener('selectionchange', onSelection);
    }, [floating]);

    const emit = () => {
        const el = editorRef.current;
        if (!el) return;
        if (el.innerHTML === '<br>' || el.innerHTML === '<div><br></div>') el.innerHTML = '';
        onChange(el.innerHTML);
    };

    const saveSelection = () => {
        const sel = window.getSelection();
        if (sel && sel.rangeCount && editorRef.current?.contains(sel.anchorNode)) {
            savedRange.current = sel.getRangeAt(0).cloneRange();
        }
    };

    const restoreSelection = () => {
        const sel = window.getSelection();
        if (sel && savedRange.current) {
            sel.removeAllRanges();
            sel.addRange(savedRange.current);
        }
        return sel;
    };

    const runTool = (tool: Tool) => {
        if (tool.key === 'link') {
            saveSelection();
            setLinkUrl('https://');
            setLinkOpen((o) => !o);
            return;
        }
        editorRef.current?.focus();
        if (tool.key === 'clear') {
            document.execCommand('removeFormat');
            document.execCommand('formatBlock', false, 'div');
        } else if (tool.cmd === 'formatBlock' && tool.arg && document.queryCommandValue('formatBlock').toLowerCase() === tool.arg) {
            document.execCommand('formatBlock', false, 'div'); // toggle off
        } else if (tool.cmd) {
            document.execCommand(tool.cmd, false, tool.arg);
        }
        emit();
    };

    const applyLink = () => {
        const url = linkUrl.trim();
        setLinkOpen(false);
        setBubble(null);
        if (!/^(https?:\/\/|mailto:)\S+$/i.test(url)) return;
        editorRef.current?.focus();
        const sel = restoreSelection();
        if (sel && sel.isCollapsed) {
            document.execCommand('insertHTML', false, `<a href="${url.replace(/"/g, '&quot;')}">${url.replace(/</g, '&lt;')}</a>`);
        } else {
            document.execCommand('createLink', false, url);
        }
        emit();
    };

    const insertImage = () => {
        const url = imageUrl.trim();
        setInsertMenu('closed');
        setImageUrl('');
        if (!/^https:\/\/\S+$/i.test(url)) return;
        editorRef.current?.focus();
        restoreSelection();
        document.execCommand('insertHTML', false, `<img src="${url.replace(/"/g, '&quot;')}" alt=""><div><br></div>`);
        setPlusTop(null);
        emit();
    };

    const insertDivider = () => {
        setInsertMenu('closed');
        editorRef.current?.focus();
        restoreSelection();
        document.execCommand('insertHorizontalRule');
        document.execCommand('insertHTML', false, '<div><br></div>');
        setPlusTop(null);
        emit();
    };

    const toolButtons = (tools: (Tool | null)[], dark: boolean) =>
        tools.map((t, i) =>
            t === null ? (
                <span key={`sep-${i}`} className="mx-1 h-5 w-px" style={{ background: dark ? 'rgba(255,255,255,0.25)' : 'var(--color-border)' }} />
            ) : (
                <button
                    key={t.key}
                    type="button"
                    title={t.title}
                    aria-label={t.title}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => runTool(t)}
                    className={`p-1.5 rounded cursor-pointer ${dark ? 'hover:bg-white/15' : 'hover:bg-[rgba(212,168,83,0.2)]'}`}
                    style={{ color: dark ? '#fff' : 'var(--color-text-secondary)' }}
                >
                    <t.Icon size={16} />
                </button>
            ),
        );

    const linkForm = (dark: boolean) => (
        <div className="flex items-center gap-2 px-2 py-1.5">
            <input
                autoFocus
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') { e.preventDefault(); applyLink(); }
                    if (e.key === 'Escape') { setLinkOpen(false); setBubble(null); }
                }}
                className="flex-1 min-w-[200px] px-2 py-1 text-sm rounded outline-none"
                style={dark ? { background: 'rgba(255,255,255,0.12)', color: '#fff' } : { border: '1px solid var(--color-border)' }}
                placeholder="Paste or type a link…"
            />
            <button type="button" onClick={applyLink} className="px-3 py-1 text-sm rounded cursor-pointer text-white" style={{ background: 'var(--color-primary)' }}>
                Add
            </button>
            <button type="button" onClick={() => { setLinkOpen(false); setBubble(null); }} className="px-1 text-sm cursor-pointer" style={{ color: dark ? '#ddd' : 'var(--color-text-muted)' }}>
                ✕
            </button>
        </div>
    );

    const editable = (
        <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            role="textbox"
            aria-multiline="true"
            data-placeholder={placeholder}
            onInput={emit}
            onBlur={saveSelection}
            onPaste={(e) => {
                e.preventDefault();
                document.execCommand('insertText', false, e.clipboardData.getData('text/plain'));
                emit();
            }}
            className={`forum-content forum-editor outline-none ${floating ? 'forum-editor-plain py-2' : 'px-4 py-3 overflow-y-auto'}`}
            style={floating ? { minHeight } : { minHeight, maxHeight: 600 }}
        />
    );

    if (floating) {
        return (
            <div ref={wrapRef} className="relative">
                {plusTop !== null && (
                    <div className="absolute z-20 hidden sm:flex items-center gap-2" style={{ top: plusTop - 2, left: -52 }}>
                        <button
                            type="button"
                            aria-label="Insert image or divider"
                            onMouseDown={(e) => { e.preventDefault(); saveSelection(); }}
                            onClick={() => setInsertMenu((m) => (m === 'closed' ? 'menu' : 'closed'))}
                            className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer bg-white transition-transform"
                            style={{ border: '1px solid var(--color-text-muted)', color: 'var(--color-text-muted)', transform: insertMenu !== 'closed' ? 'rotate(45deg)' : 'none' }}
                        >
                            <Plus size={20} strokeWidth={1.5} />
                        </button>
                        {insertMenu === 'menu' && (
                            <div className="flex items-center gap-2 bg-white animate-fade-in" onMouseDown={(e) => e.preventDefault()}>
                                <button type="button" title="Add an image" aria-label="Add an image" onClick={() => setInsertMenu('image')}
                                    className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer" style={{ border: '1px solid var(--color-secondary-dark)', color: 'var(--color-secondary-dark)' }}>
                                    <ImageIcon size={17} />
                                </button>
                                <button type="button" title="Add a divider" aria-label="Add a divider" onClick={insertDivider}
                                    className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer" style={{ border: '1px solid var(--color-secondary-dark)', color: 'var(--color-secondary-dark)' }}>
                                    <Minus size={17} />
                                </button>
                            </div>
                        )}
                        {insertMenu === 'image' && (
                            <div className="flex items-center gap-2 bg-white rounded-lg shadow-md px-2 py-1.5" style={{ border: '1px solid var(--color-border)' }}>
                                <input
                                    autoFocus
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') { e.preventDefault(); insertImage(); }
                                        if (e.key === 'Escape') setInsertMenu('closed');
                                    }}
                                    placeholder="Paste an image link (https://…) and press Enter"
                                    className="w-[340px] max-w-[60vw] px-2 py-1 text-sm outline-none"
                                />
                                <button type="button" onClick={insertImage} className="px-3 py-1 text-sm rounded cursor-pointer text-white" style={{ background: 'var(--color-primary)' }}>Add</button>
                            </div>
                        )}
                    </div>
                )}
                {bubble && (
                    <div
                        className="forum-bubble absolute z-20 flex items-center rounded-lg shadow-lg px-1 py-1 -translate-x-1/2"
                        style={{ top: bubble.top, left: bubble.left, background: '#2d1810' }}
                        onMouseDown={(e) => { if ((e.target as HTMLElement).tagName !== 'INPUT') e.preventDefault(); }}
                    >
                        {linkOpen ? linkForm(true) : toolButtons(BUBBLE, true)}
                    </div>
                )}
                {editable}
            </div>
        );
    }

    return (
        <div ref={wrapRef} className="rounded-lg overflow-hidden" style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface)' }}>
            <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5" style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg-warm)' }}>
                {toolButtons(TOOLBAR, false)}
            </div>
            {linkOpen && <div style={{ borderBottom: '1px solid var(--color-border)' }}>{linkForm(false)}</div>}
            {editable}
        </div>
    );
}
