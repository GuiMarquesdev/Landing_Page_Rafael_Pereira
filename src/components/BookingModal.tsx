import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, ArrowRight, MessageCircle } from 'lucide-react';
import { ShimmerButton } from './ui/ShimmerButton';
import { NUTRITIONIST_CONTACT, buildWhatsAppUrl } from '../contact';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProgram?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialProgram = 'CONSULTA PRESENCIAL & BIOIMPEDÂNCIA',
}) => {
  const [selectedProgram, setSelectedProgram] = useState(initialProgram);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Sincroniza o programa selecionado quando abre
  useEffect(() => {
    if (initialProgram) {
      setSelectedProgram(initialProgram);
    }
  }, [initialProgram, isOpen]);

  // Fecha ao pressionar ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Previne rolagem de fundo enquanto o modal estiver aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim() || !email.trim()) {
      setErrorMessage('Por favor, preencha seu nome e seu e-mail.');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setErrorMessage('Por favor, informe um e-mail válido.');
      return;
    }

    setSubmitted(true);
  };

  const programs = [
    { id: 'CONSULTA PRESENCIAL & BIOIMPEDÂNCIA', label: 'Presencial' },
    { id: 'ACOMPANHAMENTO ONLINE PREMIUM', label: 'Online' },
    { id: 'PROTOCOLO RESET — 6 SEMANAS', label: 'Reset 6 Semanas' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Blur (shadcn overlay style) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            aria-hidden="true"
          />

          {/* Modal Panel (shadcn dialog content with Magic UI micro-spring) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="relative w-full max-w-lg bg-[#FAF7F2] rounded-[24px] border border-[#DFD8CC] shadow-2xl overflow-hidden z-20 my-8 text-[#2B2F2A]"
          >
            {/* Top decorative accent bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#395D89] via-[#1E3A5F] to-[#395D89]" />

            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Fechar janela"
              className="absolute top-4 right-4 p-2 rounded-full text-[#2B2F2A]/60 hover:text-[#2B2F2A] hover:bg-[#EBE5DB] transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="p-6 sm:p-8">
              {submitted ? (
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#395D89]/15 text-[#395D89] mx-auto flex items-center justify-center">
                    <CheckCircle2 size={40} className="stroke-[2.5]" />
                  </div>
                  <h3 className="font-bebas text-3xl tracking-wide uppercase text-[#2B2F2A]">
                    SOLICITAÇÃO RECEBIDA COM SUCESSO!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#2B2F2A]/80 max-w-sm mx-auto leading-relaxed">
                    Obrigado, <strong className="font-bold text-[#2B2F2A]">{name}</strong>! Recebemos sua solicitação para{' '}
                    <span className="font-semibold text-[#395D89]">{selectedProgram}</span>. Se quiser agilizar seu agendamento, envie os dados direto no WhatsApp ({NUTRITIONIST_CONTACT.whatsappDisplay}).
                  </p>
                  <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={buildWhatsAppUrl(
                        `Olá Rafael Pereira! Gostaria de agendar uma consulta.\n• Nome: ${name}\n• Modalidade: ${selectedProgram}\n• E-mail: ${email}${
                          phone ? `\n• WhatsApp: ${phone}` : ''
                        }${details ? `\n• Objetivo: ${details}` : ''}`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-oswald inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs font-bold tracking-wider uppercase bg-[#1E3A5F] hover:bg-[#152944] text-white shadow-sm transition-all"
                    >
                      <MessageCircle size={15} />
                      <span>Enviar no WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setName('');
                        setEmail('');
                        setPhone('');
                        setDetails('');
                        onClose();
                      }}
                      className="font-oswald px-7 py-3 rounded-full text-xs font-bold tracking-wider uppercase bg-[#EBE5DB] hover:bg-[#DDD5C7] text-[#2B2F2A] transition-all cursor-pointer"
                    >
                      Concluir e Fechar
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Header text */}
                  <div>
                    <span className="font-oswald text-[10px] font-bold tracking-[0.24em] text-[#395D89] uppercase block mb-1">
                      ATENDIMENTO NUTRICIONAL
                    </span>
                    <h3 id="modal-title" className="font-bebas text-3xl sm:text-4xl tracking-wide uppercase text-[#2B2F2A]">
                      AGENDE SUA CONSULTA INICIAL
                    </h3>
                    <p className="text-xs text-[#2B2F2A]/75 mt-1 leading-relaxed">
                      Dê o primeiro passo para conquistar um corpo saudável, sem terrorismo nutricional e com acompanhamento constante.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs font-semibold border border-red-200">
                      {errorMessage}
                    </div>
                  )}

                  {/* Program Selector Tabs (shadcn style segmented control) */}
                  <div>
                    <label className="font-oswald block text-[11px] font-bold uppercase tracking-wider text-[#2B2F2A] mb-2">
                      Modalidade de Consulta
                    </label>
                    <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#EBE5DB] rounded-xl border border-[#DFD8CC]">
                      {programs.map((p) => {
                        const isActive = selectedProgram === p.id;
                        return (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => setSelectedProgram(p.id)}
                            className={`font-oswald py-2 px-1 text-[11px] font-bold rounded-lg transition-all cursor-pointer truncate ${
                              isActive
                                ? 'bg-white text-[#2B2F2A] shadow-xs'
                                : 'text-[#2B2F2A]/70 hover:text-[#2B2F2A]'
                            }`}
                          >
                            {p.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Name Input */}
                  <div>
                    <label htmlFor="modal-name" className="font-oswald block text-[11px] font-bold uppercase tracking-wider text-[#2B2F2A] mb-1">
                      Nome Completo <span className="text-[#1E3A5F]">*</span>
                    </label>
                    <input
                      id="modal-name"
                      type="text"
                      required
                      placeholder="Seu nome completo"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DFD8CC] text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#395D89] transition-all"
                    />
                  </div>

                  {/* Email + WhatsApp Input */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label htmlFor="modal-email" className="font-oswald block text-[11px] font-bold uppercase tracking-wider text-[#2B2F2A] mb-1">
                        E-mail <span className="text-[#1E3A5F]">*</span>
                      </label>
                      <input
                        id="modal-email"
                        type="email"
                        required
                        placeholder="seuemail@exemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#DFD8CC] text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#395D89] transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="modal-phone" className="font-oswald block text-[11px] font-bold uppercase tracking-wider text-[#2B2F2A] mb-1">
                        Seu WhatsApp
                      </label>
                      <input
                        id="modal-phone"
                        type="tel"
                        placeholder="(71) 99999-9999"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#DFD8CC] text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#395D89] transition-all"
                      />
                    </div>
                  </div>

                  {/* Details Input */}
                  <div>
                    <label htmlFor="modal-details" className="font-oswald block text-[11px] font-bold uppercase tracking-wider text-[#2B2F2A] mb-1">
                      Idade, peso atual, altura e objetivo principal
                    </label>
                    <textarea
                      id="modal-details"
                      rows={2}
                      placeholder="Ex: 29 anos, 1,62m, 65 kg. Gostaria de emagrecer com saúde e melhorar meus exames."
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DFD8CC] text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#395D89] transition-all"
                    />
                  </div>

                  {/* Submit Button with Shimmer */}
                  <ShimmerButton
                    type="submit"
                    variant="terracotta"
                    className="font-oswald w-full py-3.5 text-xs text-white tracking-[0.14em]"
                  >
                    <span>CONFIRMAR MEU AGENDAMENTO</span>
                    <ArrowRight size={15} />
                  </ShimmerButton>

                  <div className="flex items-center justify-center space-x-1.5 text-[11px] text-[#2B2F2A]/60 font-medium">
                    <CheckCircle2 size={13} className="text-[#395D89]" />
                    <span>Avaliação individualizada e acolhedora. 100% personalizada.</span>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
