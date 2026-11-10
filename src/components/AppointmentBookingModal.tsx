import React, { useState } from 'react';
import { X, Calendar, MessageCircle, Clock, MapPin, Sparkles, Check } from 'lucide-react';
import { createWhatsAppLink } from '../utils/whatsapp';

interface AppointmentBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  customWhatsAppNumber?: string;
}

export const AppointmentBookingModal: React.FC<AppointmentBookingModalProps> = ({
  isOpen,
  onClose,
  customWhatsAppNumber,
}) => {
  const [name, setName] = useState('');
  const [serviceType, setServiceType] = useState('sur-mesure-atelier');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('14:00');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const services = [
    {
      id: 'sur-mesure-atelier',
      label: 'Consultation Privée en Atelier (Bamako)',
      desc: 'Essayage de silhouettes, sélection de Bazin teinté et prise de mesures complète.',
    },
    {
      id: 'sur-mesure-distance',
      label: 'Rendez-vous Conseil à Distance (Visio WhatsApp)',
      desc: 'Accompagnement international pour clients basés hors du Mali (Europe, USA, Afrique).',
    },
    {
      id: 'pret-a-porter-essayage',
      label: 'Découverte Collections & Prêt-à-Porter',
      desc: 'Aperçu des pièces exclusives prêtes à l’achat et ajustements rapides.',
    },
  ];

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const serviceObj = services.find((s) => s.id === serviceType);
    const serviceName = serviceObj ? serviceObj.label : 'Création sur mesure';

    const message = `Bonjour BAMAKO COUTURE, je souhaite prendre rendez-vous pour une création.\n\nNom: ${name || 'Non spécifié'}\nPrestation: ${serviceName}\nDate souhaitée: ${preferredDate || 'À convenir'}\nHeure souhaitée: ${preferredTime}\nPrécisions: ${notes || 'Aucune'}`;

    const url = createWhatsAppLink(message, customWhatsAppNumber);
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#191715]/85 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-[#291A17] text-[#F6F1E9] border border-[#C5A46D]/40 p-6 sm:p-10 shadow-2xl max-h-[95vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#F6F1E9]/70 hover:text-[#C5A46D] transition-colors focus:outline-none"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-10">
            <div className="w-14 h-14 bg-[#C5A46D] text-[#191715] rounded-full flex items-center justify-center mx-auto mb-5">
              <Check className="w-7 h-7" />
            </div>
            <h3 className="font-editorial text-3xl text-[#F6F1E9] mb-3">
              Demande Transmise
            </h3>
            <p className="text-sm text-[#F6F1E9]/80 font-light max-w-md mx-auto mb-8">
              Votre demande a été préparée pour WhatsApp. Notre direction d’atelier vous répondra dans les plus brefs délais pour confirmer votre créneau.
            </p>
            <button
              onClick={() => {
                setIsSuccess(false);
                onClose();
              }}
              className="px-8 py-3 bg-[#641D32] hover:bg-[#7e253f] text-[#F6F1E9] text-xs uppercase tracking-widest font-medium transition-all"
            >
              Fermer la fenêtre
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2 text-[#C5A46D] text-xs uppercase tracking-[0.25em] font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>RÉSERVATION PRIVÉE</span>
            </div>

            <h3 className="font-editorial text-3xl sm:text-4xl text-[#F6F1E9] mb-2">
              Prendre Rendez-vous
            </h3>

            <p className="text-xs sm:text-sm text-[#F6F1E9]/75 font-light mb-6">
              Planifiez un moment privilégié avec nos maîtres tailleurs, à notre atelier du Quartier du Fleuve à Bamako ou en visioconférence internationale.
            </p>

            <form onSubmit={handleWhatsAppSubmit} className="space-y-5">
              {/* Service Selection */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#C5A46D] font-medium mb-2">
                  Nature de la consultation
                </label>
                <div className="space-y-2">
                  {services.map((s) => (
                    <label
                      key={s.id}
                      className={`block p-3 border cursor-pointer transition-all ${
                        serviceType === s.id
                          ? 'border-[#C5A46D] bg-[#191715]'
                          : 'border-[#F6F1E9]/15 hover:border-[#C5A46D]/50 bg-black/20'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="service"
                          value={s.id}
                          checked={serviceType === s.id}
                          onChange={(e) => setServiceType(e.target.value)}
                          className="mt-1 accent-[#C5A46D]"
                        />
                        <div>
                          <span className="text-xs font-semibold text-[#F6F1E9] block">
                            {s.label}
                          </span>
                          <span className="text-[11px] text-[#F6F1E9]/65 font-light">
                            {s.desc}
                          </span>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#C5A46D] font-medium mb-1.5">
                  Votre Nom & Prénom
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Mme Mariam Diarra"
                  className="w-full px-4 py-2.5 bg-[#191715] border border-[#F6F1E9]/20 focus:border-[#C5A46D] text-xs text-[#F6F1E9] placeholder-[#F6F1E9]/30 outline-none"
                />
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#C5A46D] font-medium mb-1.5">
                    Date souhaitée
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#191715] border border-[#F6F1E9]/20 focus:border-[#C5A46D] text-xs text-[#F6F1E9] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#C5A46D] font-medium mb-1.5">
                    Créneau horaire
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#191715] border border-[#F6F1E9]/20 focus:border-[#C5A46D] text-xs text-[#F6F1E9] outline-none"
                  >
                    <option value="10:00">10:00 — Matinée</option>
                    <option value="12:00">12:00 — Midi</option>
                    <option value="14:00">14:00 — Après-midi</option>
                    <option value="16:00">16:00 — Fin d'après-midi</option>
                    <option value="18:00">18:00 — Soirée privée</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#C5A46D] font-medium mb-1.5">
                  Projet ou événement (facultatif)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ex: Cérémonie de mariage, tenue de gala, choix des étoffes..."
                  className="w-full px-4 py-2 bg-[#191715] border border-[#F6F1E9]/20 focus:border-[#C5A46D] text-xs text-[#F6F1E9] placeholder-[#F6F1E9]/30 outline-none resize-none"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 bg-[#C5A46D] hover:bg-[#d8b982] text-[#191715] text-xs uppercase tracking-[0.22em] font-semibold transition-all flex items-center justify-center gap-2 shadow-xl"
              >
                <MessageCircle className="w-4 h-4 text-[#191715]" />
                <span>Confirmer le rendez-vous sur WhatsApp</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
