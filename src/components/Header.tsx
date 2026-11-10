import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle, Calendar } from 'lucide-react';
import { createWhatsAppLink, WHATSAPP_MESSAGES } from '../utils/whatsapp';

interface HeaderProps {
  onOpenBooking: () => void;
  customWhatsAppNumber?: string;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking, customWhatsAppNumber }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'ACCUEIL', href: '#experience' },
    { label: 'SUR MESURE', href: '#sur-mesure' },
    { label: 'COLLECTIONS', href: '#collections' },
    { label: 'NOTRE SAVOIR-FAIRE', href: '#savoir-faire' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#291A17]/90 backdrop-blur-md border-b border-[#C5A46D]/20 py-3.5 shadow-xl'
          : 'bg-gradient-to-b from-[#191715]/80 to-transparent py-5 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between gap-8">
        {/* Brand Zone: Refined Serif Wordmark */}
        <a
          href="#experience"
          className="font-editorial text-xl sm:text-2xl md:text-3xl tracking-widest text-[#F6F1E9] hover:text-[#C5A46D] transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span>BAMAKO COUTURE</span>
        </a>

        {/* Center Nav Links: Strict single-line text links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs tracking-[0.2em] font-medium text-[#F6F1E9]/80">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-[#C5A46D] transition-colors whitespace-nowrap relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C5A46D] hover:after:w-full after:transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Primary Action Zone: WhatsApp button & Appointment */}
        <div className="hidden sm:flex items-center gap-4 shrink-0">
          <a
            href={createWhatsAppLink(WHATSAPP_MESSAGES.general, customWhatsAppNumber)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C5A46D]/40 text-[#C5A46D] hover:bg-[#C5A46D]/10 hover:border-[#C5A46D] text-xs uppercase tracking-wider transition-all whitespace-nowrap"
            title="Contacter l'atelier sur WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>

          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#641D32] hover:bg-[#7e253f] text-[#F6F1E9] text-xs uppercase tracking-wider font-medium transition-all shadow-md whitespace-nowrap"
          >
            <Calendar className="w-3.5 h-3.5 text-[#C5A46D]" />
            <span>Rendez-vous</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <a
            href={createWhatsAppLink(WHATSAPP_MESSAGES.general, customWhatsAppNumber)}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-[#C5A46D] hover:text-[#F6F1E9] transition-colors"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-5 h-5" />
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#F6F1E9] hover:text-[#C5A46D] transition-colors focus:outline-none"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#291A17] border-b border-[#C5A46D]/30 px-6 py-6 transition-all shadow-2xl">
          <nav className="flex flex-col gap-4 text-sm tracking-[0.2em] font-medium text-[#F6F1E9]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-[#F6F1E9]/10 hover:text-[#C5A46D] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 bg-[#641D32] text-[#F6F1E9] text-xs uppercase tracking-widest text-center font-medium"
              >
                Prendre Rendez-vous
              </button>
              <a
                href={createWhatsAppLink(WHATSAPP_MESSAGES.general, customWhatsAppNumber)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 border border-[#C5A46D] text-[#C5A46D] text-xs uppercase tracking-widest text-center flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Atelier WhatsApp</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
