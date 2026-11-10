import React from 'react';
import { MessageCircle, Scissors } from 'lucide-react';
import { createWhatsAppLink, WHATSAPP_MESSAGES } from '../utils/whatsapp';

interface CustomCoutureProcessProps {
  onOpenBooking: () => void;
  customWhatsAppNumber?: string;
}

export const CustomCoutureProcess: React.FC<CustomCoutureProcessProps> = ({
  customWhatsAppNumber,
}) => {
  const steps = [
    {
      num: '01',
      title: 'Choisissez votre style',
      subtitle: 'Silhouettes d’exception & inspirations',
      floatClass: 'animate-float',
    },
    {
      num: '02',
      title: 'Discutez de votre création',
      subtitle: 'Échange avec nos maîtres tailleurs',
      floatClass: 'animate-float-alt',
    },
    {
      num: '03',
      title: 'Prenez vos mesures',
      subtitle: 'En atelier à Bamako ou à distance',
      floatClass: 'animate-float-slow',
    },
    {
      num: '04',
      title: 'Nous confectionnons votre tenue',
      subtitle: 'Bazin teinté main & broderie d’or',
      floatClass: 'animate-float',
    },
    {
      num: '05',
      title: 'Recevez votre création',
      subtitle: 'Livraison de prestige sous housse couture',
      floatClass: 'animate-float-alt',
    },
  ];

  const firstThree = steps.slice(0, 3);
  const remainingTwo = steps.slice(3);

  // Unified card style ensuring steps 1, 2, 3, 4, 5 share the EXACT same dimensions
  const cardBaseStyle =
    'flex-1 w-full max-w-[280px] rounded-xl p-3.5 sm:p-5 backdrop-blur-xl bg-white/[0.05] border border-white/20 hover:border-[#C5A46D]/60 hover:bg-white/[0.08] transition-all duration-300 shadow-xl flex flex-col justify-between min-h-[130px] sm:min-h-[145px] group';

  return (
    <section id="sur-mesure" className="relative py-16 sm:py-20 px-4 sm:px-8 md:px-16 bg-[#291A17] text-[#F6F1E9] overflow-hidden">
      {/* Subtle ambient light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-[#C5A46D]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 mb-2 text-[#C5A46D] text-xs uppercase tracking-[0.25em] font-semibold">
            <Scissors className="w-3.5 h-3.5 text-[#C5A46D]" />
            <span>HAUTE CONFECTION MALIANE</span>
          </div>
          <h2 className="font-editorial text-2xl sm:text-4xl md:text-5xl text-[#F6F1E9] tracking-tight [text-wrap:balance]">
            Le Protocole du Sur-Mesure
          </h2>
        </div>

        {/* ROW 1: THE 3 FIRST STEPS ON THE SAME HORIZONTAL LINE */}
        <div className="flex flex-row justify-center items-stretch gap-2.5 sm:gap-4 mb-4 w-full">
          {firstThree.map((step) => (
            <div
              key={step.num}
              className={`${cardBaseStyle} ${step.floatClass}`}
            >
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <span className="font-editorial text-xl sm:text-2xl text-[#C5A46D] font-normal">
                  {step.num}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A46D]/40 group-hover:bg-[#C5A46D] transition-colors" />
              </div>

              <div>
                <h3 className="font-editorial text-sm sm:text-lg text-[#F6F1E9] group-hover:text-[#C5A46D] transition-colors mb-0.5 sm:mb-1 font-medium leading-snug">
                  {step.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-[#F6F1E9]/70 font-light leading-tight sm:leading-snug">
                  {step.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ROW 2: STEPS 4 & 5 ON THE SAME HORIZONTAL LINE WITH EXACT SAME SIZE */}
        <div className="flex flex-row justify-center items-stretch gap-2.5 sm:gap-4 mb-8 sm:mb-10 w-full">
          {remainingTwo.map((step) => (
            <div
              key={step.num}
              className={`${cardBaseStyle} ${step.floatClass}`}
            >
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <span className="font-editorial text-xl sm:text-2xl text-[#C5A46D] font-normal">
                  {step.num}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A46D]/40 group-hover:bg-[#C5A46D] transition-colors" />
              </div>

              <div>
                <h3 className="font-editorial text-sm sm:text-lg text-[#F6F1E9] group-hover:text-[#C5A46D] transition-colors mb-0.5 sm:mb-1 font-medium leading-snug">
                  {step.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-[#F6F1E9]/70 font-light leading-tight sm:leading-snug">
                  {step.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Compact WhatsApp CTA Button */}
        <div className="text-center">
          <a
            href={createWhatsAppLink(WHATSAPP_MESSAGES.custom, customWhatsAppNumber)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#C5A46D] hover:bg-[#d8b982] text-[#191715] text-[11px] uppercase tracking-[0.2em] font-semibold transition-all shadow-lg rounded-full hover:scale-105 active:scale-95"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Commander sur WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
