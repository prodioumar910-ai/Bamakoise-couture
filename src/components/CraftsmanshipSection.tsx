import React from 'react';
import { Sparkles, Gem, Scissors, Feather, ShieldCheck } from 'lucide-react';

export const CraftsmanshipSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Le Bazin Impérial Teinté Main',
      icon: <Gem className="w-5 h-5 text-[#C5A46D]" />,
    },
    {
      num: '02',
      title: 'L’Orfèvrerie des Broderies d’Or',
      icon: <Scissors className="w-5 h-5 text-[#C5A46D]" />,
    },
    {
      num: '03',
      title: 'L’Art Sacré du Bogolan Minéral',
      icon: <Feather className="w-5 h-5 text-[#C5A46D]" />,
    },
    {
      num: '04',
      title: 'La Haute Couture Architecturale',
      icon: <ShieldCheck className="w-5 h-5 text-[#C5A46D]" />,
    },
  ];

  // Duplicate for seamless infinite horizontal marquee
  const marqueeItems = [...steps, ...steps];

  return (
    <section id="savoir-faire" className="py-24 bg-[#291A17] text-[#F6F1E9] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 mb-12">
        <div className="flex items-center gap-2 mb-3 text-[#C5A46D] text-xs uppercase tracking-[0.25em] font-medium">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A46D]" />
          <span>SAVOIR-FAIRE D'EXCEPTION</span>
        </div>
        <h2 className="font-editorial text-3xl sm:text-5xl text-[#F6F1E9] tracking-tight">
          La Noblesse du Geste Artisanal
        </h2>
      </div>

      {/* HORIZONTAL AUTOMATIC ANIMATED MARQUEE OF CRYSTAL GLASS CARDS */}
      <div className="relative w-full py-4 overflow-hidden">
        {/* Soft edge blur scrims */}
        <div className="absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-[#291A17] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-[#291A17] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee gap-6 flex">
          {marqueeItems.map((step, idx) => (
            <div
              key={`${step.title}-${idx}`}
              className="w-[280px] sm:w-[340px] p-7 rounded-2xl backdrop-blur-xl bg-white/[0.05] border border-white/20 hover:border-[#C5A46D] hover:bg-white/[0.09] transition-all duration-300 shadow-xl flex items-center gap-5 shrink-0 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-black/40 border border-[#C5A46D]/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                {step.icon}
              </div>

              <div>
                <span className="font-mono text-xs text-[#C5A46D] font-bold tracking-widest block mb-1">
                  ÉTAPE {step.num}
                </span>
                <h3 className="font-editorial text-xl sm:text-2xl text-[#F6F1E9] group-hover:text-[#C5A46D] transition-colors leading-snug">
                  {step.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
