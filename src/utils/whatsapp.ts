export const DEFAULT_WHATSAPP_NUMBER = '[WHATSAPP NUMBER]';

export const WHATSAPP_MESSAGES = {
  custom: "Bonjour BAMAKO COUTURE, je souhaite commander une création sur mesure. Pouvez-vous m'accompagner ?",
  readyToWear: "Bonjour BAMAKO COUTURE, je souhaite découvrir vos collections prêt-à-porter.",
  appointment: "Bonjour BAMAKO COUTURE, je souhaite prendre rendez-vous pour une création.",
  general: "Bonjour BAMAKO COUTURE, je souhaite obtenir des informations sur vos créations et votre atelier.",
};

export function createWhatsAppLink(message: string, customNumber?: string): string {
  const number = customNumber?.trim() || DEFAULT_WHATSAPP_NUMBER;
  return `https://wa.me/${encodeURIComponent(number)}?text=${encodeURIComponent(message)}`;
}
