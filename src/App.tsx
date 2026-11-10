import React, { useState } from 'react';
import { Header } from './components/Header';
import { CinematicVideoExperience } from './components/CinematicVideoExperience';
import { CustomCoutureProcess } from './components/CustomCoutureProcess';
import { CollectionGallery } from './components/CollectionGallery';
import { CraftsmanshipSection } from './components/CraftsmanshipSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AppointmentBookingModal } from './components/AppointmentBookingModal';
import { WhatsAppConfigModal } from './components/WhatsAppConfigModal';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';
import { DEFAULT_WHATSAPP_NUMBER } from './utils/whatsapp';

export default function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [whatsappConfigOpen, setWhatsappConfigOpen] = useState(false);
  const [whatsAppNumber, setWhatsAppNumber] = useState(DEFAULT_WHATSAPP_NUMBER);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F1E9] text-[#191715] flex flex-col font-sans selection:bg-[#641D32] selection:text-[#F6F1E9]">
      {/* LUXURY TOP NAVIGATION BAR */}
      <Header
        onOpenBooking={() => setBookingModalOpen(true)}
        customWhatsAppNumber={whatsAppNumber}
      />

      {/* MAIN CINEMATIC SCROLL-DRIVEN VIDEO EXPERIENCE (520vh timeline scrub) */}
      <main className="flex-grow">
        <CinematicVideoExperience
          onOpenBooking={() => setBookingModalOpen(true)}
          onExploreCollections={() => scrollToSection('collections')}
          onOpenCustomOrder={() => scrollToSection('sur-mesure')}
          onOpenContact={() => scrollToSection('contact')}
          customWhatsAppNumber={whatsAppNumber}
        />

        {/* SECTION A: CUSTOM-MADE ORDERING (5-STEP PROCESS & MEASUREMENTS) */}
        <CustomCoutureProcess
          onOpenBooking={() => setBookingModalOpen(true)}
          customWhatsAppNumber={whatsAppNumber}
        />

        {/* SECTION B: COLLECTION GALLERY & EDITORIAL LOOKBOOK */}
        <CollectionGallery customWhatsAppNumber={whatsAppNumber} />

        {/* SECTION C: CRAFTSMANSHIP & MALIAN HERITAGE */}
        <CraftsmanshipSection />

        {/* SECTION D: IDENTIFIED CLIENT TESTIMONIALS */}
        <TestimonialsSection />

        {/* SECTION E: ATELIER BAMAKO & CONTACT */}
        <ContactSection
          onOpenBooking={() => setBookingModalOpen(true)}
          customWhatsAppNumber={whatsAppNumber}
        />
      </main>

      {/* LUXURY BRAND FOOTER */}
      <Footer
        onOpenBooking={() => setBookingModalOpen(true)}
        customWhatsAppNumber={whatsAppNumber}
        onConfigureWhatsApp={() => setWhatsappConfigOpen(true)}
      />

      {/* INTERACTIVE APPOINTMENT MODAL */}
      <AppointmentBookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        customWhatsAppNumber={whatsAppNumber}
      />

      {/* FLOATING WHATSAPP BUTTON (Follows scroll on the right) */}
      <FloatingWhatsAppButton customWhatsAppNumber={whatsAppNumber} />

      {/* WHATSAPP NUMBER CONFIGURATION / TEST MODAL */}
      <WhatsAppConfigModal
        isOpen={whatsappConfigOpen}
        onClose={() => setWhatsappConfigOpen(false)}
        currentNumber={whatsAppNumber}
        onSaveNumber={(num) => setWhatsAppNumber(num)}
      />
    </div>
  );
}
