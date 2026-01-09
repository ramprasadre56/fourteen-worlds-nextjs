'use client';

import Image from 'next/image';
import { VaishnavCalendar } from '@/components/sections/VaishnavCalendar';
import { PrabhupadaQuotes } from '@/components/sections/PrabhupadaQuotes';
import { QuickLinks } from '@/components/sections/QuickLinks';
import { CompactWorlds } from '@/components/sections/CompactWorlds';
import { LOTUS_COSMOLOGY, LOKA_TRAYA_INFO } from '@/data/worlds';

function CompactLotusSection() {
  return (
    <div
      className="p-6 rounded-xl border mb-6"
      style={{
        background: 'linear-gradient(135deg, #fff5f8 0%, #ffeef2 100%)',
        borderColor: 'rgba(255, 105, 180, 0.3)'
      }}
    >
      <div className="flex flex-wrap items-start gap-4 w-full">
        <Image
          src="/home_page/vishnu_lotus.jpg"
          alt="Lotus Cosmology"
          width={200}
          height={150}
          className="rounded-lg object-cover"
        />
        <div className="flex-1 flex flex-col items-start gap-2">
          <h2 className="text-lg font-bold" style={{ color: '#8B0000' }}>
            🌺 The Lotus Flower Cosmology
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            {LOTUS_COSMOLOGY.description.substring(0, 200)}...
          </p>
          <p className="text-xs text-gray-400 italic">
            — {LOTUS_COSMOLOGY.reference}
          </p>
        </div>
      </div>
    </div>
  );
}

function CompactIntroductionSection() {
  return (
    <div className="p-6 bg-white rounded-xl shadow-sm mb-6">
      <div className="flex flex-col items-center w-full gap-3">
        <h2 className="text-2xl font-bold text-center" style={{ color: '#8B0000' }}>
          {LOKA_TRAYA_INFO.title}
        </h2>
        <p className="text-sm text-gray-600 text-center leading-relaxed mb-4">
          {LOKA_TRAYA_INFO.description}
        </p>

        {/* Three worlds grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
          {/* Upper World */}
          <div
            className="p-3 rounded-lg border"
            style={{
              background: 'linear-gradient(135deg, #fffef0 0%, #fff8dc 100%)',
              borderColor: '#DAA520'
            }}
          >
            <div className="flex items-start gap-2">
              <span className="text-2xl">☀️</span>
              <div className="flex flex-col items-start">
                <span className="font-semibold text-sm" style={{ color: '#DAA520' }}>
                  {LOKA_TRAYA_INFO.upperWorld.name}
                </span>
                <span className="text-xs text-gray-600 leading-snug">
                  {LOKA_TRAYA_INFO.upperWorld.description}
                </span>
              </div>
            </div>
          </div>

          {/* Middle World */}
          <div
            className="p-3 rounded-lg border"
            style={{
              background: 'linear-gradient(135deg, #f0fff0 0%, #e8f5e9 100%)',
              borderColor: '#6B8E23'
            }}
          >
            <div className="flex items-start gap-2">
              <span className="text-2xl">🌍</span>
              <div className="flex flex-col items-start">
                <span className="font-semibold text-sm" style={{ color: '#6B8E23' }}>
                  {LOKA_TRAYA_INFO.middleWorld.name}
                </span>
                <span className="text-xs text-gray-600 leading-snug">
                  {LOKA_TRAYA_INFO.middleWorld.description}
                </span>
              </div>
            </div>
          </div>

          {/* Lower World */}
          <div
            className="p-3 rounded-lg border"
            style={{
              background: 'linear-gradient(135deg, #faf0e6 0%, #f5deb3 100%)',
              borderColor: '#8B4513'
            }}
          >
            <div className="flex items-start gap-2">
              <span className="text-2xl">🌑</span>
              <div className="flex flex-col items-start">
                <span className="font-semibold text-sm" style={{ color: '#8B4513' }}>
                  {LOKA_TRAYA_INFO.lowerWorld.name}
                </span>
                <span className="text-xs text-gray-600 leading-snug">
                  {LOKA_TRAYA_INFO.lowerWorld.description}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="w-full bg-gray-50 border-t border-gray-200">
      <div className="flex flex-col items-center gap-1 py-8">
        <p className="text-sm text-gray-600 text-center">
          Based on Śrīmad-Bhāgavatam and other Vedic scriptures
        </p>
        <p className="text-xs text-gray-400 italic text-center">
          Source: bhu-mandala cosmological research and vedabase.io
        </p>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="w-full bg-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6 p-8 w-full">
          {/* Main Content Column */}
          <div className="flex flex-col">
            <CompactLotusSection />
            <QuickLinks />
            <CompactWorlds />
          </div>

          {/* Sidebar */}
          <div className="flex flex-col">
            <VaishnavCalendar />
            <PrabhupadaQuotes />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
