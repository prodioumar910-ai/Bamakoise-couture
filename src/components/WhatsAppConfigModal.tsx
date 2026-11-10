import React, { useState } from 'react';
import { X, MessageCircle, Check, Info } from 'lucide-react';
import { DEFAULT_WHATSAPP_NUMBER } from '../utils/whatsapp';

interface WhatsAppConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentNumber: string;
  onSaveNumber: (num: string) => void;
}

export const WhatsAppConfigModal: React.FC<WhatsAppConfigModalProps> = ({
  isOpen,
  onClose,
  currentNumber,
  onSaveNumber,
}) => {
  const [val, setVal] = useState(currentNumber || DEFAULT_WHATSAPP_NUMBER);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveNumber(val.trim());
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1200);
  };

  const handleReset = () => {
    setVal(DEFAULT_WHATSAPP_NUMBER);
    onSaveNumber(DEFAULT_WHATSAPP_NUMBER);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#191715]/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-[#291A17] text-[#F6F1E9] border border-[#C5A46D]/40 p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#F6F1E9]/60 hover:text-[#C5A46D]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-3 text-[#C5A46D] text-xs uppercase tracking-widest font-medium">
          <MessageCircle className="w-4 h-4 text-[#C5A46D]" />
          <span>Configuration WhatsApp</span>
        </div>

        <h3 className="font-editorial text-2xl text-[#F6F1E9] mb-2">
          Numéro WhatsApp de l'Atelier
        </h3>

        <p className="text-xs text-[#F6F1E9]/75 font-light leading-relaxed mb-6">
          Conformément aux spécifications, le site utilise par défaut l’identifiant réservé{' '}
          <code className="px-1.5 py-0.5 bg-black/40 text-[#C5A46D] font-mono text-[11px]">
            [WHATSAPP NUMBER]
          </code>
          . Si vous souhaitez tester l'envoi vers un véritable numéro WhatsApp, vous pouvez le renseigner ci-dessous (format international, ex: 22370000000).
        </p>

        {saved ? (
          <div className="p-4 bg-black/30 border border-[#C5A46D]/50 text-center">
            <Check className="w-6 h-6 text-[#C5A46D] mx-auto mb-1" />
            <span className="text-xs text-[#F6F1E9]">Numéro WhatsApp mis à jour</span>
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#C5A46D] font-medium mb-1.5">
                Numéro ou placeholder
              </label>
              <input
                type="text"
                value={val}
                onChange={(e) => setVal(e.target.value)}
                placeholder="[WHATSAPP NUMBER]"
                className="w-full px-4 py-2.5 bg-[#191715] border border-[#F6F1E9]/20 focus:border-[#C5A46D] text-xs text-[#F6F1E9] font-mono outline-none"
              />
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-[#F6F1E9]/60 hover:text-[#C5A46D] underline underline-offset-4"
              >
                Rétablir le placeholder par défaut
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 bg-[#C5A46D] hover:bg-[#d8b982] text-[#191715] text-xs uppercase tracking-widest font-semibold transition-all shadow"
              >
                Appliquer
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
