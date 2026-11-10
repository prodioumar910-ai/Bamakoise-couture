import React from 'react';
import { MapPin, Clock, MessageCircle, Instagram, Facebook, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { createWhatsAppLink, WHATSAPP_MESSAGES } from '../utils/whatsapp';

interface ContactSectionProps {
  onOpenBooking: () => void;
  customWhatsAppNumber?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onOpenBooking,
  customWhatsAppNumber,
}) => {
  return (
    <section id="contact" className="py-24 px-6 sm:px-12 md:px-20 bg-[#F6F1E9] text-[#191715] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Atelier & Heritage Information */}
          <div className="lg:col-span-6">
            <h2 className="font-editorial text-4xl sm:text-5xl text-[#191715] tracking-tight leading-[1.08] mb-8 [text-wrap:balance]">
              Entrez en Contact avec la Maison
            </h2>

            <div className="space-y-6 pt-2 text-xs">
              {/* Atelier Address */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/70 border border-[#191715]/10 hover:border-[#C5A46D] transition-all hover:shadow-md">
                <div className="w-10 h-10 rounded-full bg-[#291A17] text-[#C5A46D] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-semibold text-sm text-[#191715] block">
                    Atelier Principal & Salon Privé
                  </span>
                  <span className="text-[#191715]/70 block font-light">
                    BAMAKO COUTURE · Quartier du Fleuve / ACI 2000
                  </span>
                  <span className="text-[#641D32] font-medium block mt-0.5">
                    Bamako, Mali
                  </span>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/70 border border-[#191715]/10 hover:border-[#C5A46D] transition-all hover:shadow-md">
                <div className="w-10 h-10 rounded-full bg-[#291A17] text-[#C5A46D] flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-semibold text-sm text-[#191715] block">
                    Horaires d'Ouverture
                  </span>
                  <span className="text-[#191715]/70 block font-light">
                    Lundi au Samedi : 09h00 — 19h00 (GMT)
                  </span>
                  <span className="text-[#191715]/60 block font-light text-[11px] mt-0.5">
                    Réception sur rendez-vous pour les essayages haute couture.
                  </span>
                </div>
              </div>
            </div>

            {/* CANAUX OFFICIELS & RÉSEAUX (WITH REAL ICONS & ATTRACTIVE ANIMATIONS) */}
            <div className="mt-8 pt-6 border-t border-[#191715]/15">
              <span className="text-xs uppercase tracking-widest text-[#191715]/60 block mb-4 font-medium">
                Canaux Officiels & Réseaux
              </span>
              <div className="flex items-center gap-4">
                {/* Instagram Icon */}
                <motion.a
                  href="https://instagram.com/[INSTAGRAM]"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-full bg-[#291A17] text-[#F6F1E9] hover:text-[#C5A46D] hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] flex items-center justify-center transition-all shadow-md group"
                  aria-label="Instagram officiel"
                  title="Instagram officiel"
                >
                  <Instagram className="w-5 h-5 transition-transform group-hover:scale-110" />
                </motion.a>

                {/* Facebook Icon */}
                <motion.a
                  href="https://facebook.com/[FACEBOOK]"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, rotate: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-full bg-[#291A17] text-[#F6F1E9] hover:bg-[#1877F2] hover:text-white flex items-center justify-center transition-all shadow-md group"
                  aria-label="Facebook officiel"
                  title="Facebook officiel"
                >
                  <Facebook className="w-5 h-5 transition-transform group-hover:scale-110" />
                </motion.a>

                {/* WhatsApp Direct Icon */}
                <motion.a
                  href={createWhatsAppLink(WHATSAPP_MESSAGES.general, customWhatsAppNumber)}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-full bg-[#291A17] text-[#C5A46D] hover:bg-[#25D366] hover:text-white flex items-center justify-center transition-all shadow-md group"
                  aria-label="WhatsApp direct"
                  title="WhatsApp direct"
                >
                  <MessageCircle className="w-5 h-5 transition-transform group-hover:scale-110" />
                </motion.a>
              </div>
            </div>
          </div>

          {/* GROS BOUTON WHATSAPP EN VERT (Replaces the form) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full rounded-3xl p-8 sm:p-12 bg-[#291A17] border border-[#C5A46D]/30 shadow-2xl text-center relative overflow-hidden flex flex-col items-center"
            >
              {/* Subtle ambient light */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#25D366]/10 via-transparent to-transparent pointer-events-none" />

              <span className="text-xs uppercase tracking-[0.25em] text-[#C5A46D] font-medium block mb-3">
                Liaison Directe Atelier
              </span>

              <h3 className="font-editorial text-3xl sm:text-4xl text-[#F6F1E9] mb-4 [text-wrap:balance]">
                Échangez Instantanément avec Notre Atelier
              </h3>

              <p className="text-sm text-[#F6F1E9]/80 font-light mb-8 max-w-md">
                Discutez directement de vos projets de couture, posez vos questions ou soumettez vos mesures en un clic.
              </p>

              {/* Big Green WhatsApp Button */}
              <motion.a
                href={createWhatsAppLink(WHATSAPP_MESSAGES.general, customWhatsAppNumber)}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-4 px-10 py-5 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-base sm:text-lg font-semibold tracking-wide shadow-[0_10px_35px_rgba(37,211,102,0.4)] transition-all duration-300"
              >
                {/* Ripple ring on hover */}
                <span className="absolute inset-0 rounded-2xl bg-[#25D366] animate-ping opacity-25 pointer-events-none" />

                <MessageCircle className="w-7 h-7 shrink-0 text-white transition-transform group-hover:scale-110" />
                <span>Discuter sur WhatsApp</span>
                <ArrowRight className="w-5 h-5 shrink-0 transition-transform group-hover:translate-x-1" />
              </motion.a>

              {/* Secondary discreet action */}
              <div className="mt-6">
                <button
                  onClick={onOpenBooking}
                  className="text-xs uppercase tracking-widest text-[#C5A46D] hover:text-[#F6F1E9] transition-colors underline underline-offset-4 font-medium"
                >
                  Ou planifier un rendez-vous privé d'essayage
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
