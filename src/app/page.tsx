'use client';
import React, { useState, useEffect } from 'react';
import { TopBar, Navigation } from '../components/ui/Navigation';
import { ProductGallery } from '../components/ui/ProductGallery';
import { SizeTwinModal } from '../components/features/SizeTwinModal';
import { availableUsSizes } from '../lib/sizingLogic';

export default function ProductPage() {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [isSizeTwinOpen, setIsSizeTwinOpen] = useState(false);
  const [sizeTwinRecommendation, setSizeTwinRecommendation] = useState<number | null>(null);
  const [toast, setToast] = useState<{ message: string, visible: boolean }>({ message: '', visible: false });
  const [accordionState, setAccordionState] = useState<Record<string, boolean>>({
    'DESCRIPTION': false,
    'FEATURES': false,
    'MATERIALS': false,
    'CARE': false
  });

  const showToast = (message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 3000);
  };

  const handleApplySizeTwin = (size: number) => {
    setSelectedSize(size);
    setSizeTwinRecommendation(size);
    showToast(`✓ Rozmiar US ${size} wybrany przez Size Twin`);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      showToast("Wybierz rozmiar");
      return;
    }
    showToast(`Dodano: Mesh Runner Low US ${selectedSize}`);
  };

  const toggleAccordion = (key: string) => {
    setAccordionState(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Navigation />

      <main className="flex-1 w-full max-w-[1280px] mx-auto px-6 lg:px-8 py-8">
        
        {/* Breadcrumb */}
        <div className="text-[12px] text-[#666666] mb-8">
          Home / Men's Shoes / Mesh Runner Low
        </div>

        {/* Product Grid */}
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Left Column - Gallery */}
          <div className="w-full lg:w-[60%]">
            <ProductGallery />
          </div>

          {/* Right Column - Details */}
          <div className="w-full lg:w-[40%] flex flex-col">
            <div className="text-[13px] text-[#666666] mb-2">Sold by UrbanEdgePro</div>
            <h1 className="text-3xl font-bold uppercase tracking-tight mb-2">MESH RUNNER LOW</h1>
            
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[13px] tracking-widest text-black">★★★★<span className="text-[#E8E8E8]">☆</span></span>
              <span className="text-[13px] text-[#666666] underline">(14 reviews)</span>
            </div>

            <div className="text-[28px] font-semibold mb-2">419 zł</div>
            <div className="flex items-center gap-2 text-[12px] text-[#1A6B3A] font-medium mb-8">
              <div className="w-2 h-2 rounded-full bg-[#1A6B3A]"></div>
              In Stock — Ready to Ship
            </div>

            <hr className="border-[#E8E8E8] mb-6" />

            {/* Color */}
            <div className="mb-8">
              <div className="text-[11px] font-bold tracking-widest mb-3">COLOR</div>
              <button className="w-8 h-8 rounded-full border border-black p-1">
                <div className="w-full h-full rounded-full bg-white border border-[#E8E8E8]"></div>
              </button>
            </div>

            <hr className="border-[#E8E8E8] mb-6" />

            {/* Size */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <div className="text-[11px] font-bold tracking-widest">SIZE</div>
                <div className="flex text-[11px] font-bold tracking-widest text-[#666666] gap-4">
                  <button className="text-black">MEN'S SIZES</button>
                  <button>WOMEN'S SIZES</button>
                </div>
              </div>

              {/* Size Grid */}
              <div className="flex flex-wrap gap-2 mb-4">
                {availableUsSizes.map(size => {
                  const isSelected = selectedSize === size;
                  const isRecommended = sizeTwinRecommendation === size;
                  
                  return (
                    <button
                      key={size}
                      onClick={() => {
                        setSelectedSize(size);
                        // If user manually changes size, we don't necessarily clear recommendation, 
                        // but we just highlight the selected one.
                      }}
                      className={`relative w-[52px] h-[44px] flex items-center justify-center text-sm font-medium border transition-colors ${
                        isSelected && isRecommended 
                          ? 'bg-black text-white border-black' // Priority to selected state
                          : isSelected 
                          ? 'bg-black text-white border-black'
                          : isRecommended 
                          ? 'bg-white text-[#1A6B3A] border-2 border-[#1A6B3A]'
                          : 'bg-white text-black border-[#E8E8E8] hover:border-black'
                      }`}
                    >
                      {size}
                      {isRecommended && !isSelected && (
                         <span className="absolute top-[2px] right-[2px] text-[8px] text-[#1A6B3A]">★</span>
                      )}
                      {isRecommended && isSelected && (
                         <span className="absolute top-[2px] right-[2px] text-[8px] text-white">★</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Size Twin Confirmation Text */}
              {sizeTwinRecommendation && selectedSize === sizeTwinRecommendation && (
                <div className="flex items-center gap-2 text-[12px] text-[#1A6B3A] font-medium mb-4">
                  <div className="flex items-center justify-center w-4 h-4 rounded-full bg-[#1A6B3A] text-white text-[10px]">✓</div>
                  US {sizeTwinRecommendation} — rozmiar dobrany przez Size Twin
                </div>
              )}

              {/* Size Twin Trigger */}
              <div className="flex items-center gap-3 py-3 px-4 bg-[#EDF5F0] border border-[#C6E0D0]">
                <div className="text-[10px] font-bold tracking-widest text-white bg-[#1A6B3A] px-2 py-1">SIZE TWIN</div>
                <button 
                  onClick={() => setIsSizeTwinOpen(true)}
                  className="text-[13px] text-[#1A6B3A] font-medium underline underline-offset-4 decoration-1"
                >
                  Nie wiesz jaki rozmiar? Dobierz idealny →
                </button>
              </div>
            </div>

            <hr className="border-[#E8E8E8] mb-8" />

            {/* CTAs */}
            <div className="flex flex-col gap-3 mb-8">
              <button 
                onClick={handleAddToCart}
                className="w-full bg-black text-white py-4 text-[13px] font-bold tracking-widest hover:bg-gray-900 transition-colors"
              >
                DODAJ DO KOSZYKA
              </button>
              <button className="w-full bg-white text-black border border-black py-4 text-[13px] font-bold tracking-widest hover:bg-gray-50 transition-colors">
                DODAJ DO ULUBIONYCH ♡
              </button>
            </div>

            <hr className="border-[#E8E8E8] mb-6" />

            {/* Perks */}
            <div className="flex flex-col gap-4 mb-8 text-[13px]">
              <div className="flex items-start gap-3">
                <span className="text-lg leading-none">🚚</span>
                <div>
                  <span className="font-bold">Free Shipping on Orders over 299 zł</span><br/>
                  <span className="text-[#666666]">Estimated delivery: Apr 22–24</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-lg leading-none">↩</span>
                <div>
                  <span className="font-bold">Easy Returns</span><br/>
                  <span className="text-[#666666]">30 dni na zwrot, bez pytań</span>
                </div>
              </div>
            </div>

            <hr className="border-[#E8E8E8] mb-2" />

            {/* Accordion */}
            <div className="flex flex-col">
              {[
                { id: 'DESCRIPTION', content: 'Low-profile mesh runner with a thin sole and minimal upper.' },
                { id: 'FEATURES', content: 'Low-profile sole / Full mesh upper / Minimal padding / Lightweight' },
                { id: 'MATERIALS', content: 'Upper: Recycled mesh. Midsole: Thin EVA. Outsole: Rubber.' },
                { id: 'CARE', content: 'Machine wash cold. Air dry.' },
              ].map(item => (
                <div key={item.id} className="border-b border-[#E8E8E8]">
                  <button 
                    className="w-full py-4 flex justify-between items-center text-[12px] font-bold tracking-widest"
                    onClick={() => toggleAccordion(item.id)}
                  >
                    {item.id}
                    <span className="text-xl font-normal leading-none">{accordionState[item.id] ? '−' : '+'}</span>
                  </button>
                  {accordionState[item.id] && (
                    <div className="pb-4 text-[14px] text-[#666666] leading-relaxed">
                      {item.content}
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>
      </main>

      <SizeTwinModal 
        isOpen={isSizeTwinOpen} 
        onClose={() => setIsSizeTwinOpen(false)} 
        onApplySize={handleApplySizeTwin}
      />

      {/* Toast */}
      {toast.visible && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 text-sm font-medium z-50 shadow-lg animate-in slide-in-from-bottom-5 fade-in">
          {toast.message}
        </div>
      )}
    </div>
  );
}
