'use client';

import { Sun, Globe2, Moon } from 'lucide-react';
import { World, getUpperWorlds, getMiddleWorlds, getLowerWorlds } from '@/data/worlds';

interface WorldsSectionProps {
    worlds: World[];
    title: string;
    icon: React.ReactNode;
    accentColor: string;
    bgGradient: string;
}

function WorldsSection({ worlds, title, icon, accentColor, bgGradient }: WorldsSectionProps) {
    return (
        <div
            className="p-6 rounded-xl mb-4"
            style={{
                background: bgGradient,
                border: '1px solid var(--color-border-light)',
            }}
        >
            <div className="flex flex-col w-full gap-4">
                <div className="flex items-center gap-3">
                    <div
                        className="flex items-center justify-center w-9 h-9 rounded-lg"
                        style={{
                            background: accentColor,
                            boxShadow: `0 2px 10px ${accentColor}33`,
                        }}
                    >
                        {icon}
                    </div>
                    <h3
                        className="text-xl font-semibold"
                        style={{
                            color: accentColor,
                            fontFamily: 'var(--font-heading)',
                        }}
                    >
                        {title}
                    </h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 w-full">
                    {worlds.map((world) => (
                        <div
                            key={world.id}
                            className="px-4 py-2.5 rounded-lg cursor-pointer"
                            style={{
                                background: 'var(--color-surface)',
                                border: '1px solid var(--color-border-light)',
                                transition: 'all var(--transition-base)',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = accentColor;
                                e.currentTarget.style.boxShadow = `0 2px 12px ${accentColor}20`;
                                e.currentTarget.style.transform = 'translateY(-1px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'var(--color-border-light)';
                                e.currentTarget.style.boxShadow = 'none';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            <span
                                className="text-sm font-medium"
                                style={{
                                    color: 'var(--color-text)',
                                    fontFamily: 'var(--font-body)',
                                }}
                            >
                                {world.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function CompactWorlds() {
    const upperWorlds = getUpperWorlds();
    const middleWorlds = getMiddleWorlds();
    const lowerWorlds = getLowerWorlds();

    return (
        <div className="w-full mt-8">
            <h2
                className="mb-5"
                style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 700,
                    color: 'var(--color-primary)',
                }}
            >
                The Fourteen Planetary Systems
            </h2>

            <WorldsSection
                worlds={upperWorlds}
                title="Upper Worlds (Svargaloka)"
                icon={<Sun size={18} style={{ color: '#FFFFFF' }} />}
                accentColor="#DAA520"
                bgGradient="linear-gradient(135deg, #FFFBF0 0%, #FFF8E1 100%)"
            />

            <WorldsSection
                worlds={middleWorlds}
                title="Middle Worlds (Madhya-loka)"
                icon={<Globe2 size={18} style={{ color: '#FFFFFF' }} />}
                accentColor="#6B8E23"
                bgGradient="linear-gradient(135deg, #F5FBF0 0%, #EFF8E5 100%)"
            />

            <WorldsSection
                worlds={lowerWorlds}
                title="Lower Worlds (Pātāla)"
                icon={<Moon size={18} style={{ color: '#FFFFFF' }} />}
                accentColor="#8B4513"
                bgGradient="linear-gradient(135deg, #FBF5EE 0%, #F5EDE0 100%)"
            />
        </div>
    );
}
