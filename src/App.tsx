import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { About } from './components/About';
import { Faq } from './components/Faq';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { QuestionnairesSection } from './components/QuestionnairesSection';

export default function App() {
  const [selectedProgram, setSelectedProgram] = useState<string>(
    'CONSULTA PRESENCIAL & BIOIMPEDÂNCIA'
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openBookingModal = (program?: string) => {
    if (program) {
      setSelectedProgram(program);
    }
    setIsModalOpen(true);
  };

  const scrollToApply = (program?: string) => {
    if (program) {
      setSelectedProgram(program);
    }
    const element = document.getElementById('agendar');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F3EEE6] text-[#2B2F2A] flex flex-col justify-between overflow-x-clip">
      {/* Container Central com cantos arredondados e margens limpas */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header com Navegação e Ação que abre o modal */}
        <Header onApplyClick={() => openBookingModal()} />

        {/* Conteúdo Principal Semântico */}
        <main className="space-y-4 sm:space-y-6">
          {/* Hero com 1 único H1 semântico na página inteira */}
          <Hero onStartPlanClick={() => openBookingModal()} />

          {/* Seção Services com Spotlight Effect (Magic UI) e Modal Trigger */}
          <Services onSelectProgram={(prog) => openBookingModal(prog)} />

          {/* Seção About ("Meet Brooke") com H2 */}
          <About />

          {/* Seção FAQ com H2 e H3 nas perguntas */}
          <Faq />

          {/* Seção Questionários (Pré-Atendimento em 5 etapas + Check-in Semanal) */}
          <QuestionnairesSection />

          {/* Seção Final CTA com H2 e Formulário inline */}
          <CtaSection initialProgram={selectedProgram} />
        </main>

        {/* Footer com Redes Sociais e Metadados */}
        <Footer onApplyClick={() => openBookingModal()} />
      </div>

      {/* 1. Shadcn Dialog / Modal Component (Accessible, Backdrop Blur, ESC close, Spring Animation) */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialProgram={selectedProgram}
      />
    </div>
  );
}
