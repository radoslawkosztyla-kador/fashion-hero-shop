import React, { useState } from 'react';
import { brands, BrandKey, calculateSizeFromBrand, calculateSizeFromFoot } from '@/lib/sizingLogic';

type SizeTwinModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onApplySize: (size: number) => void;
};

export function SizeTwinModal({ isOpen, onClose, onApplySize }: SizeTwinModalProps) {
  const [activeTab, setActiveTab] = useState<'MIERZ STOPĘ' | 'PORÓWNAJ MARKĘ'>('MIERZ STOPĘ');
  
  // Tab 1 state
  const [unit, setUnit] = useState<'cm' | 'cale'>('cm');
  const [length, setLength] = useState<string>('');
  const [width, setWidth] = useState<'WĄSKA' | 'STANDARDOWA' | 'SZEROKA'>('STANDARDOWA');

  // Tab 2 state
  const [brand, setBrand] = useState<BrandKey>('nike-standard');
  const [userSize, setUserSize] = useState<string>('');
  const [system, setSystem] = useState<'EU' | 'US' | 'UK'>('EU');

  if (!isOpen) return null;

  // Calculations
  let recommendation: any = null;
  let calculationNote = '';

  if (activeTab === 'MIERZ STOPĘ' && length) {
    const parsedLength = parseFloat(length);
    if (!isNaN(parsedLength)) {
      const lengthInCm = unit === 'cale' ? parsedLength * 2.54 : parsedLength;
      recommendation = calculateSizeFromFoot(lengthInCm, width);
      calculationNote = `Rozmiar oparty na długości stopy ${lengthInCm.toFixed(1)} cm.`;
    }
  } else if (activeTab === 'PORÓWNAJ MARKĘ' && userSize) {
    const parsedSize = parseFloat(userSize);
    if (!isNaN(parsedSize)) {
      recommendation = calculateSizeFromBrand(brand, parsedSize, system);
      calculationNote = brands[brand].note;
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50" onClick={onClose}>
      <div 
        className="w-full max-w-[520px] bg-white sm:rounded-sm max-h-[90vh] overflow-y-auto transform transition-transform"
        onClick={e => e.stopPropagation()}
      >
        {/* Handle for mobile */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 bg-[#E8E8E8] rounded-full"></div>
        </div>

        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-[#1A6B3A]"></div>
                <span className="text-[11px] font-bold tracking-widest text-[#1A6B3A]">NOWA FUNKCJA — BETA</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight">SIZE TWIN</h2>
              <p className="text-sm text-[#666666] mt-1">Dobieramy rozmiar do Ciebie — nie zgadujesz, nie zwracasz.</p>
            </div>
            <button onClick={onClose} className="p-2 text-[#666666] hover:text-black">
              ✕
            </button>
          </div>

          {/* Product Chip */}
          <div className="flex items-center gap-4 mb-8 p-3 border border-[#E8E8E8]">
            <div className="w-12 h-12 bg-[#F4F4F4]"></div>
            <div>
              <div className="font-bold text-sm">MESH RUNNER LOW</div>
              <div className="text-xs text-[#666666]">UrbanEdgePro · 419 zł · Biały</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-[#E8E8E8] mb-6">
            <button 
              className={`flex-1 pb-3 text-sm font-bold tracking-wide ${activeTab === 'MIERZ STOPĘ' ? 'text-black border-b-2 border-black' : 'text-[#666666]'}`}
              onClick={() => setActiveTab('MIERZ STOPĘ')}
            >
              📏 MIERZ STOPĘ
            </button>
            <button 
              className={`flex-1 pb-3 text-sm font-bold tracking-wide ${activeTab === 'PORÓWNAJ MARKĘ' ? 'text-black border-b-2 border-black' : 'text-[#666666]'}`}
              onClick={() => setActiveTab('PORÓWNAJ MARKĘ')}
            >
              👟 PORÓWNAJ MARKĘ
            </button>
          </div>

          {/* Tab 1 Content */}
          {activeTab === 'MIERZ STOPĘ' && (
            <div className="space-y-6">
              <div className="bg-[#FFF9E6] p-4 text-sm text-[#856404] border border-[#FFEEBA]">
                ℹ️ Mesh Runner Low ma wąski krój — full mesh upper przylega do stopy. Zmierz stopę wieczorem, kiedy jest lekko opuchnięta.
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-bold">DŁUGOŚĆ STOPY</label>
                  <div className="flex border border-[#E8E8E8]">
                    <button className={`px-3 py-1 text-xs ${unit === 'cm' ? 'bg-black text-white' : 'bg-white text-black'}`} onClick={() => setUnit('cm')}>cm</button>
                    <button className={`px-3 py-1 text-xs ${unit === 'cale' ? 'bg-black text-white' : 'bg-white text-black'}`} onClick={() => setUnit('cale')}>cale</button>
                  </div>
                </div>
                <input 
                  type="number" 
                  step="0.5"
                  value={length}
                  onChange={e => setLength(e.target.value)}
                  placeholder={`np. ${unit === 'cm' ? '27.5' : '10.5'}`}
                  className="w-full border border-[#E8E8E8] p-3 text-lg outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="text-sm font-bold block mb-2">SZEROKOŚĆ STOPY</label>
                <div className="flex gap-2">
                  {['WĄSKA', 'STANDARDOWA', 'SZEROKA'].map((w) => (
                    <button 
                      key={w}
                      className={`flex-1 py-2 text-xs font-bold border ${width === w ? 'bg-black text-white border-black' : 'bg-white text-black border-[#E8E8E8]'}`}
                      onClick={() => setWidth(w as any)}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2 Content */}
          {activeTab === 'PORÓWNAJ MARKĘ' && (
            <div className="space-y-6">
              <div>
                <label className="text-sm font-bold block mb-2">WYBIERZ MARKĘ</label>
                <select 
                  className="w-full border border-[#E8E8E8] p-3 text-base outline-none focus:border-black bg-white"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value as BrandKey)}
                >
                  {Object.entries(brands).map(([key, data]) => (
                    <option key={key} value={key}>{data.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-sm font-bold block mb-2">TWÓJ ROZMIAR</label>
                  <input 
                    type="number" 
                    step="0.5"
                    value={userSize}
                    onChange={e => setUserSize(e.target.value)}
                    placeholder="np. 42"
                    className="w-full border border-[#E8E8E8] p-3 text-lg outline-none focus:border-black"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-bold block mb-2">SYSTEM</label>
                  <div className="flex border border-[#E8E8E8] h-[52px]">
                    {['EU', 'US', 'UK'].map(s => (
                      <button 
                        key={s}
                        className={`flex-1 text-xs font-bold ${system === s ? 'bg-black text-white' : 'bg-white text-black'}`}
                        onClick={() => setSystem(s as any)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results Area */}
          {recommendation && (
            <div className="mt-8 bg-[#EDF5F0] border border-[#C6E0D0] p-5">
              <div className="flex items-center gap-2 mb-3 text-[#1A6B3A] font-bold text-sm">
                <span>✅</span> REKOMENDACJA SIZE TWIN
              </div>
              <div className="text-3xl font-bold mb-1">
                US {recommendation.nearestUs}
              </div>
              <div className="text-[#666666] text-sm mb-4">
                EU {recommendation.eu}
              </div>
              <div className="border-t border-[#C6E0D0] pt-4 text-sm text-[#1A6B3A]">
                {calculationNote} {activeTab === 'PORÓWNAJ MARKĘ' ? 'Mesh Runner Low ma wąski krój — wzięliśmy to pod uwagę.' : 'Mesh Runner Low ma wąski krój — uwzględniliśmy to w rekomendacji.'}
                {!recommendation.available && (
                  <div className="mt-2 font-bold text-red-600">
                    Ten rozmiar nie jest dostępny. Najbliższy: US {recommendation.nearestUs}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* CTA */}
          <button 
            className={`w-full py-4 mt-6 text-sm font-bold tracking-wide transition-colors ${recommendation ? 'bg-[#1A6B3A] text-white hover:bg-[#13502b]' : 'bg-[#E8E8E8] text-[#666666] cursor-not-allowed'}`}
            disabled={!recommendation}
            onClick={() => {
              if (recommendation) {
                onApplySize(recommendation.nearestUs);
                onClose();
              }
            }}
          >
            WYBIERZ TEN ROZMIAR →
          </button>

        </div>
      </div>
    </div>
  );
}
