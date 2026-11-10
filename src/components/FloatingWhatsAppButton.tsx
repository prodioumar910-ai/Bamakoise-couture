import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { createWhatsAppLink, WHATSAPP_MESSAGES } from '../utils/whatsapp';

interface FloatingWhatsAppButtonProps {
  customWhatsAppNumber?: string;
}

export const FloatingWhatsAppButton: React.FC<FloatingWhatsAppButtonProps> = ({
  customWhatsAppNumber,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <aside
      aria-label="Contact direct WhatsApp"
      className="fixed bottom-7 right-6 sm:bottom-8 sm:right-8 z-50 flex items-center gap-3 pointer-events-auto"
    >
      {/* Discreet Luxury Tooltip on Hover */}
      <span
        aria-hidden="true"
        className={`px-3.5 py-1.5 rounded-full bg-[#291A17]/95 border border-[#C5A46D]/40 text-[#F6F1E9] text-xs uppercase tracking-widest font-medium shadow-2xl backdrop-blur-md transition-all duration-300 ${
          hovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'
        }`}
      >
        WhatsApp Atelier
      </span>

      {/* Floating Circular Action Button */}
      <a
        href={createWhatsAppLink(WHATSAPP_MESSAGES.general, customWhatsAppNumber)}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative group w-14 h-14 rounded-full bg-[#291A17] hover:bg-[#191715] text-[#C5A46D] hover:text-[#F6F1E9] border-2 border-[#C5A46D] hover:border-[#F6F1E9] flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
        title="Contacter l'atelier sur WhatsApp"
        aria-label="Contacter l'atelier Bamako Couture sur WhatsApp"
      >
        {/* Subtle breathing ripple */}
        <span className="absolute inset-0 rounded-full border border-[#C5A46D]/50 animate-ping opacity-40 pointer-events-none" />

        <MessageCircle className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
      </a>
    </aside>
  );
};
