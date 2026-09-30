'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState, type ComponentType, type ReactNode } from 'react';
import {
    Menu, ShoppingCart, PenLine, ChevronDown, ExternalLink, LogOut, User, BookOpen,
    Home, GraduationCap, Library, Newspaper, MessagesSquare, Feather, Headphones, PlayCircle, Rss, Boxes, Users,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';

type Icon = ComponentType<{ size?: number; strokeWidth?: number }>;
type SubItem = { label: string; href: string; external?: boolean };
type NavItem = { label: string; href: string; icon: Icon; external?: boolean; children?: SubItem[] };

const IDT = 'https://iskcondesiretree.com';
export const HEADER_H = 64;
const SIDEBAR_W = 240;
const COLLAPSE_KEY = 'sidebarCollapsed';

const PRIMARY: NavItem[] = [
    { label: 'Home', href: '/', icon: Home },
    {
        label: 'Courses', href: '/courses', icon: GraduationCap, children: [
            { label: 'All Courses', href: '/courses' },
            { label: 'Bhagavad Gītā', href: '/courses/bg' },
            { label: 'Śrīmad Bhāgavatam', href: '/courses/sb' },
        ],
    },
    { label: 'Library', href: '/library', icon: Library },
    { label: 'Back to Godhead', href: '/backtogodhead', icon: Newspaper },
    { label: 'Stories', href: '/stories', icon: Feather },
    { label: 'Forum', href: '/forum', icon: MessagesSquare },
];

const EXTERNAL: NavItem[] = [
    { label: 'Audio', href: 'https://audio.iskcondesiretree.com/', icon: Headphones, external: true },
    { label: 'Video', href: 'https://www.youtube.com/user/iskcondesiretree', icon: PlayCircle, external: true },
    { label: 'Blog', href: `${IDT}/profiles/blogs`, icon: Rss, external: true },
    {
        label: 'Resources', href: 'https://iskcondesiretree.ning.com/', icon: Boxes, children: [
            { label: 'Android Apps', href: 'https://play.google.com/store/apps/developer?id=www.iskcondesiretree.com', external: true },
            { label: 'iOS Apps', href: 'https://apps.apple.com/us/developer/iskcon-desire-tree/id1376434153', external: true },
            { label: 'Join WhatsApp Group', href: 'https://join.iskcondesiretree.com/', external: true },
            { label: 'Bhakti Courses', href: 'https://bhakticourses.com/', external: true },
            { label: 'Veg Recipes', href: 'https://food.iskcondesiretree.com/', external: true },
            { label: 'Free eBooks', href: 'https://ebooks.iskcondesiretree.com/', external: true },
            { label: 'Wallpapers', href: 'https://wallpapers.iskcondesiretree.com/', external: true },
            { label: 'Vaishnava Calendar 2026', href: `${IDT}/profiles/blogs/hare-krishna-calendar-2026`, external: true },
            { label: 'Motivational Quotes', href: 'https://quotes.iskcondesiretree.com/', external: true },
            { label: 'ISKCON Book Distribution', href: 'https://www.iskconbookdistribution.com/', external: true },
            { label: 'Contact Us', href: `${IDT}/main/index/feedback`, external: true },
            { label: 'Hare Krishna Japa', href: 'http://www.harekrishnajapa.com/', external: true },
        ],
    },
    {
        label: 'Connect', href: 'https://iskcondesiretree.ning.com/', icon: Users, children: [
            { label: 'Holy Dham', href: 'http://www.holydham.com/', external: true },
            { label: 'YouTube', href: 'https://youtube.com/iskcondesiretree', external: true },
            { label: 'How I Came to KC', href: 'http://howicame.com/', external: true },
            { label: 'E-Counseling', href: 'https://iskcondesiretree.ning.com/profiles/blogs/e-counseling', external: true },
            { label: 'For Kids', href: 'https://kids.iskcondesiretree.com/', external: true },
            { label: 'BTG Subscription', href: 'https://docs.google.com/forms/d/e/1FAIpQLSd0DLWOYleQ_O5qFdiAr2ZMHus-vXNOF7LX5PmmcA0OFJzh1A/viewform', external: true },
            { label: 'Hindi ISKCON Desire Tree', href: 'https://hindi.iskcondesiretree.com/', external: true },
            { label: 'Vedic Quiz', href: 'http://quiz.iskcondesiretree.com/', external: true },
            { label: 'Gaudiya History', href: 'https://gaudiyahistory.iskcondesiretree.com/', external: true },
            { label: 'Rupa Manjari Institute', href: 'https://srmi.iskcondesiretree.com/', external: true },
        ],
    },
];

const ext = { target: '_blank', rel: 'noopener noreferrer' } as const;

function isActive(pathname: string, href: string) {
    return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);
}

function SidebarLink({ item, pathname, onNavigate }: { item: NavItem; pathname: string; onNavigate: () => void }) {
    const active = !item.external && isActive(pathname, item.href);
    const childActive = item.children?.some((c) => !c.external && isActive(pathname, c.href)) ?? false;
    const [open, setOpen] = useState(childActive);
    const Icon = item.icon;

    const rowClass = 'relative w-full flex items-center gap-4 pl-6 pr-4 py-2.5 text-[15px] cursor-pointer transition-colors hover:bg-[rgba(139,26,26,0.05)]';
    const rowStyle = { color: active || childActive ? 'var(--color-primary)' : 'var(--color-text-secondary)', fontWeight: active || childActive ? 600 : 400 };
    const marker = (active || childActive) && <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r" style={{ background: 'var(--color-primary)' }} />;
    const icon = <Icon size={22} strokeWidth={active || childActive ? 2.2 : 1.6} />;

    if (item.children) {
        return (
            <div>
                <button type="button" onClick={() => setOpen((o) => !o)} className={rowClass} style={rowStyle} aria-expanded={open}>
                    {marker}{icon}
                    <span className="flex-1 text-left">{item.label}</span>
                    <ChevronDown size={15} className="transition-transform" style={{ transform: open ? 'rotate(180deg)' : 'none' }} />
                </button>
                {open && (
                    <div className="pb-1">
                        {item.children.map((c) => {
                            const cActive = !c.external && pathname === c.href;
                            const cls = 'flex items-center gap-2 pl-[62px] pr-4 py-1.5 text-sm transition-colors hover:bg-[rgba(139,26,26,0.05)]';
                            const style = { color: cActive ? 'var(--color-primary)' : 'var(--color-text-muted)', fontWeight: cActive ? 600 : 400 };
                            return c.external ? (
                                <a key={c.href + c.label} href={c.href} {...ext} className={cls} style={style}>{c.label}</a>
                            ) : (
                                <Link key={c.href + c.label} href={c.href} onClick={onNavigate} className={cls} style={style}>{c.label}</Link>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    }

    return item.external ? (
        <a href={item.href} {...ext} className={rowClass} style={rowStyle}>
            {icon}
            <span className="flex-1">{item.label}</span>
            <ExternalLink size={13} style={{ opacity: 0.45 }} />
        </a>
    ) : (
        <Link href={item.href} onClick={onNavigate} className={rowClass} style={rowStyle} aria-current={active ? 'page' : undefined}>
            {marker}{icon}
            <span className="flex-1">{item.label}</span>
        </Link>
    );
}

function AccountMenu() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;
        const onDown = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
        document.addEventListener('mousedown', onDown);
        document.addEventListener('keydown', onKey);
        return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
    }, [open]);

    if (!user) {
        return (
            <Link
                href="/signin"
                className="px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-opacity hover:opacity-90"
                style={{ background: 'var(--color-secondary)', color: 'var(--color-primary-dark)' }}
            >
                Sign in
            </Link>
        );
    }

    const name = user.displayName || user.email?.split('@')[0] || 'Account';
    const item = 'flex items-center gap-3 px-4 py-2.5 text-sm w-full text-left cursor-pointer hover:bg-[rgba(139,26,26,0.05)]';

    return (
        <div ref={ref} className="relative">
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="flex items-center rounded-full cursor-pointer"
                aria-label="Account menu"
                aria-expanded={open}
                style={{ outline: open ? '2px solid rgba(212,168,83,0.8)' : 'none', outlineOffset: 2 }}
            >
                {user.photoURL ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={user.photoURL} alt="" referrerPolicy="no-referrer" className="w-9 h-9 rounded-full object-cover" />
                ) : (
                    <span className="w-9 h-9 rounded-full flex items-center justify-center font-semibold" style={{ background: 'var(--color-secondary)', color: 'var(--color-primary-dark)' }}>
                        {name[0].toUpperCase()}
                    </span>
                )}
            </button>
            {open && (
                <div
                    className="absolute right-0 top-full mt-2 w-64 rounded-xl py-2 z-[70] animate-fade-in"
                    style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', boxShadow: '0 16px 48px rgba(45,24,16,0.18)' }}
                >
                    <div className="px-4 pb-2 mb-1" style={{ borderBottom: '1px solid var(--color-divider)' }}>
                        <p className="font-semibold truncate" style={{ color: 'var(--color-text)' }}>{name}</p>
                        {user.email && <p className="text-xs truncate" style={{ color: 'var(--color-text-muted)' }}>{user.email}</p>}
                    </div>
                    <Link href="/my-account" onClick={() => setOpen(false)} className={item} style={{ color: 'var(--color-text-secondary)' }}><User size={17} /> My Account</Link>
                    <Link href="/my-learning" onClick={() => setOpen(false)} className={item} style={{ color: 'var(--color-text-secondary)' }}><BookOpen size={17} /> My Learning</Link>
                    <Link href="/write" onClick={() => setOpen(false)} className={item} style={{ color: 'var(--color-text-secondary)' }}><PenLine size={17} /> Write a Story</Link>
                    <button
                        type="button"
                        onClick={async () => { setOpen(false); await logout(); router.push('/'); }}
                        className={item}
                        style={{ color: 'var(--color-text-secondary)', borderTop: '1px solid var(--color-divider)', marginTop: 4 }}
                    >
                        <LogOut size={17} /> Sign out
                    </button>
                </div>
            )}
        </div>
    );
}

export function SiteShell({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const { user } = useAuth();
    const { cartCount } = useCart();
    const [collapsed, setCollapsed] = useState(false); // desktop
    const [mobileOpen, setMobileOpen] = useState(false); // below lg

    // Restore the desktop collapse preference after mount.
    useEffect(() => {
        try {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            if (localStorage.getItem(COLLAPSE_KEY) === '1') setCollapsed(true);
        } catch { /* storage unavailable */ }
    }, []);

    // Lock page scroll while the mobile drawer is open.
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    const toggleSidebar = () => {
        if (window.matchMedia('(min-width: 1024px)').matches) {
            setCollapsed((c) => {
                try { localStorage.setItem(COLLAPSE_KEY, c ? '0' : '1'); } catch { /* ignore */ }
                return !c;
            });
        } else {
            setMobileOpen((o) => !o);
        }
    };
    const closeMobile = () => setMobileOpen(false);
    const writeHref = user ? '/write' : `/signin?next=${encodeURIComponent('/write')}`;

    return (
        <>
            {/* Top bar */}
            <header
                className="fixed top-0 inset-x-0 z-[60] flex items-center gap-3 sm:gap-4 px-3 sm:px-5"
                style={{
                    height: HEADER_H,
                    background: 'linear-gradient(135deg, rgba(139, 26, 26, 0.97) 0%, rgba(107, 16, 16, 0.98) 100%)',
                    borderBottom: '1px solid rgba(212, 168, 83, 0.25)',
                    boxShadow: '0 2px 16px rgba(45, 24, 16, 0.15)',
                }}
            >
                <button
                    type="button"
                    onClick={toggleSidebar}
                    className="p-2 rounded-lg cursor-pointer hover:bg-white/10"
                    aria-label="Toggle navigation"
                    style={{ color: '#F5EDE0' }}
                >
                    <Menu size={22} />
                </button>

                <Link href="/" className="flex items-center gap-2.5 min-w-0" onClick={closeMobile}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/fourteen-worlds-logo.png" alt="" className="h-10 w-10 rounded-md object-cover flex-shrink-0" style={{ border: '1.5px solid rgba(212, 168, 83, 0.5)' }} />
                    <span className="hidden sm:flex flex-col leading-tight">
                        <span className="text-base font-bold tracking-wider" style={{ color: '#F5EDE0', fontFamily: 'var(--font-heading)', letterSpacing: '0.08em' }}>
                            FOURTEEN WORLDS
                        </span>
                        <span className="text-[10px] font-medium tracking-[0.25em] uppercase" style={{ color: 'rgba(212, 168, 83, 0.85)' }}>
                            Vedic Cosmology
                        </span>
                    </span>
                </Link>

                <div className="ml-auto flex items-center gap-1 sm:gap-3">
                    <Link
                        href={writeHref}
                        className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-white/10"
                        style={{ color: '#F5EDE0' }}
                    >
                        <PenLine size={19} strokeWidth={1.6} /> Write
                    </Link>
                    <Link href="/cart" className="relative p-2 rounded-lg hover:bg-white/10" style={{ color: '#F5EDE0' }} aria-label="Cart">
                        <ShoppingCart size={21} strokeWidth={1.6} />
                        {cartCount > 0 && (
                            <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full text-[11px] font-bold flex items-center justify-center" style={{ background: 'var(--color-secondary)', color: 'var(--color-primary-dark)' }}>
                                {cartCount}
                            </span>
                        )}
                    </Link>
                    <AccountMenu />
                </div>
            </header>

            {/* Mobile backdrop */}
            {mobileOpen && (
                <div className="lg:hidden fixed inset-0 z-[55]" style={{ top: HEADER_H, background: 'rgba(45,24,16,0.35)' }} onClick={closeMobile} />
            )}

            {/* Left sidebar */}
            <aside
                className={`fixed left-0 bottom-0 z-[56] overflow-y-auto transition-transform duration-200
                    ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
                    ${collapsed ? 'lg:-translate-x-full' : 'lg:translate-x-0'}`}
                style={{ top: HEADER_H, width: SIDEBAR_W, background: 'var(--color-surface)', borderRight: '1px solid var(--color-border-light)' }}
                aria-label="Main navigation"
            >
                <nav className="py-4">
                    {PRIMARY.map((item) => <SidebarLink key={item.label} item={item} pathname={pathname} onNavigate={closeMobile} />)}
                    {user && (
                        <SidebarLink item={{ label: 'My Learning', href: '/my-learning', icon: BookOpen }} pathname={pathname} onNavigate={closeMobile} />
                    )}
                    <div className="mx-6 my-3 h-px" style={{ background: 'var(--color-divider)' }} />
                    <p className="px-6 pb-1 text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-light)' }}>ISKCON Desire Tree</p>
                    {EXTERNAL.map((item) => <SidebarLink key={item.label} item={item} pathname={pathname} onNavigate={closeMobile} />)}
                    <div className="mx-6 my-3 h-px sm:hidden" style={{ background: 'var(--color-divider)' }} />
                    <div className="sm:hidden">
                        <SidebarLink item={{ label: 'Write', href: writeHref, icon: PenLine }} pathname={pathname} onNavigate={closeMobile} />
                    </div>
                </nav>
            </aside>

            <div style={{ height: HEADER_H }} />
            <main className={`min-h-screen transition-[padding] duration-200 ${collapsed ? '' : 'lg:pl-[240px]'}`}>{children}</main>
        </>
    );
}
