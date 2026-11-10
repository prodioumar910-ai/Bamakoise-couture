import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, MessageCircle, X, Sparkles } from 'lucide-react';
import { LOOKBOOK_ITEMS } from '../data/coutureData';
import { LookbookItem } from '../types';
import { createWhatsAppLink } from '../utils/whatsapp';

interface CollectionGalleryProps {
  customWhatsAppNumber?: string;
}

export const CollectionGallery: React.FC<CollectionGalleryProps> = ({ customWhatsAppNumber }) => {
  const [selectedItem, setSelectedItem] = useState<LookbookItem | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollHorizontally = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section id="collections" className="py-24 px-6 sm:px-12 md:px-20 bg-[#191715] text-[#F6F1E9] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between pb-8 border-b border-[#C5A46D]/20">
          <div>
            <h2 className="font-editorial text-3xl sm:text-5xl text-[#F6F1E9] tracking-tight">
              Collections Exclusives
            </h2>
          </div>

          {/* Horizontal scroll navigation buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollHorizontally('left')}
              className="p-3 rounded-full border border-white/20 hover:border-[#C5A46D] text-[#F6F1E9] hover:text-[#C5A46D] transition-colors focus:outline-none"
              aria-label="Précédent"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollHorizontally('right')}
              className="p-3 rounded-full border border-white/20 hover:border-[#C5A46D] text-[#F6F1E9] hover:text-[#C5A46D] transition-colors focus:outline-none"
              aria-label="Suivant"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* HORIZONTAL IMAGE STRIP (NO TITLES, NO SUBTITLES, ONLY PRICE AT BOTTOM RIGHT) */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto py-10 no-scrollbar snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {LOOKBOOK_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="relative shrink-0 w-[280px] sm:w-[320px] md:w-[360px] aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer group shadow-2xl border border-white/10 hover:border-[#C5A46D]/60 transition-all duration-500 snap-start"
            >
              <img
                src={item.image}
                alt="Création Bamako Couture"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />

              {/* Scrim overlay on bottom for high legibility */}
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />

              {/* Price written strictly at bottom right */}
              <div className="absolute bottom-4 right-4 z-10">
                <span className="px-3.5 py-1.5 rounded-lg backdrop-blur-md bg-black/60 border border-[#C5A46D]/40 text-[#C5A46D] font-mono text-xs font-medium tracking-wider shadow-lg">
                  {item.priceNote}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* QUICK VIEW MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-3xl rounded-2xl bg-[#291A17] border border-[#C5A46D]/40 p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 p-2 text-[#F6F1E9]/70 hover:text-[#C5A46D]"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="aspect-[3/4] rounded-xl overflow-hidden border border-white/15">
                <img
                  src={selectedItem.image}
                  alt="Aperçu création"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <span className="font-mono text-xs text-[#C5A46D] uppercase tracking-widest block mb-2">
                  Création Bamako Couture
                </span>
                <span className="text-sm font-mono text-[#C5A46D] block mb-6">
                  {selectedItem.priceNote}
                </span>

                <a
                  href={createWhatsAppLink(
                    `Bonjour BAMAKO COUTURE, je souhaite commander la création affichée au prix : ${selectedItem.priceNote}.`,
                    customWhatsAppNumber
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-[#C5A46D] hover:bg-[#d8b982] text-[#191715] text-xs uppercase tracking-widest font-semibold rounded-full shadow-lg transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Commander sur WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
