'use client';

import { World, getUpperWorlds, getMiddleWorlds, getLowerWorlds } from '@/data/worlds';

interface WorldsSectionProps {
    worlds: World[];
    title: string;
    icon: string;
    color: string;
}

function WorldsSection({ worlds, title, icon, color }: WorldsSectionProps) {
    return (
        <div className="p-6 bg-gray-50 rounded-xl mb-4">
            <div className="flex flex-col w-full gap-3">
                <div className="flex items-center gap-3">
                    <span className="text-2xl">{icon}</span>
                    <h3 className="text-xl font-semibold" style={{ color }}>
                        {title}
                    </h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 w-full">
                    {worlds.map((world) => (
                        <div
                            key={world.id}
                            className="px-3 py-2 bg-white rounded-md border border-gray-200 transition-all hover:bg-gray-50 cursor-pointer"
                            style={{
                                borderColor: 'transparent',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.borderColor = color}
                            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
                        >
                            <span className="text-base font-medium text-gray-800">
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
        <div className="w-full mt-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                The Fourteen Planetary Systems
            </h2>

            <WorldsSection
                worlds={upperWorlds}
                title="Upper Worlds (Svargaloka)"
                icon="☀️"
                color="#DAA520"
            />

            <WorldsSection
                worlds={middleWorlds}
                title="Middle Worlds (Madhya-loka)"
                icon="🌍"
                color="#6B8E23"
            />

            <WorldsSection
                worlds={lowerWorlds}
                title="Lower Worlds (Pātāla)"
                icon="🌑"
                color="#8B4513"
            />
        </div>
    );
}
