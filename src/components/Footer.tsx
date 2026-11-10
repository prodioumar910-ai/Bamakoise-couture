import React from 'react';
import { Sparkles, MessageCircle, ArrowUp } from 'lucide-react';
import { createWhatsAppLink, WHATSAPP_MESSAGES } from '../utils/whatsapp';

interface FooterProps {
  onOpenBooking: () => void;
  customWhatsAppNumber?: string;
  onConfigureWhatsApp?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBooking,
  customWhatsAppNumber,
  onConfigureWhatsApp,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#191715] text-[#F6F1E9] border-t border-[#C5A46D]/20 pt-20 pb-12 px-6 sm:px-12 md:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#C5A46D]/15">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <span className="font-editorial text-3xl sm:text-4xl text-[#F6F1E9] tracking-wider block mb-2">
              BAMAKO COUTURE
            </span>
            <span className="text-xs uppercase tracking-[0.28em] text-[#C5A46D] font-medium block mb-6">
              Maison de Haute Couture · Bamako, Mali
            </span>
            <p className="text-xs sm:text-sm text-[#F6F1E9]/70 font-light leading-relaxed max-w-sm mb-6">
              L'art de sublimer l’élégance africaine à travers la confection sur mesure, les parures royales en Bazin riche et un savoir-faire d’orfèvre textile.
            </p>
            <p className="text-xs italic text-[#C5A46D] font-editorial text-base">
              « LA BEAUTÉ DE L'HÉRITAGE. L'ÉLÉGANCE DU PRÉSENT. »
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3">
            <span className="text-xs uppercase tracking-widest text-[#C5A46D] font-medium block mb-4">
              La Maison
            </span>
            <ul className="space-y-2.5 text-xs text-[#F6F1E9]/80 font-light">
              <li>
                <a href="#experience" className="hover:text-[#C5A46D] transition-colors">
                  Expérience Cinématique
                </a>
              </li>
              <li>
                <a href="#sur-mesure" className="hover:text-[#C5A46D] transition-colors">
                  Protocole Sur Mesure
                </a>
              </li>
              <li>
                <a href="#collections" className="hover:text-[#C5A46D] transition-colors">
                  Galerie des Silhouettes
                </a>
              </li>
              <li>
                <a href="#savoir-faire" className="hover:text-[#C5A46D] transition-colors">
                  Savoir-Faire & Matières
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#C5A46D] transition-colors">
                  Atelier Bamako & Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Direct & Conciergerie */}
          <div className="md:col-span-4">
            <span className="text-xs uppercase tracking-widest text-[#C5A46D] font-medium block mb-4">
              Conciergerie Privée
            </span>
            <p className="text-xs text-[#F6F1E9]/70 font-light mb-4">
              Nos conseillers accompagnent notre clientèle pour les essayages, commandes spéciales et livraisons internationales.
            </p>
            <div className="flex flex-col gap-2.5">
              <a
                href={createWhatsAppLink(WHATSAPP_MESSAGES.general, customWhatsAppNumber)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-[#C5A46D] hover:text-[#F6F1E9] transition-colors font-medium"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp : https://wa.me/[WHATSAPP NUMBER]</span>
              </a>
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 text-xs text-[#F6F1E9]/80 hover:text-[#C5A46D] transition-colors text-left"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C5A46D]" />
                <span>Prendre rendez-vous avec un maître tailleur</span>
              </button>
              {onConfigureWhatsApp && (
                <button
                  onClick={onConfigureWhatsApp}
                  className="text-[11px] text-[#F6F1E9]/40 hover:text-[#C5A46D] text-left underline decoration-dotted transition-colors pt-1"
                >
                  Configurer le numéro WhatsApp de test
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#F6F1E9]/50 font-light">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} BAMAKO COUTURE. Tous droits réservés.</span>
            <span>·</span>
            <span>Bamako, Mali</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-[#C5A46D] hover:text-[#F6F1E9] transition-colors uppercase tracking-wider text-[11px]"
          >
            <span>Haut de page</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
