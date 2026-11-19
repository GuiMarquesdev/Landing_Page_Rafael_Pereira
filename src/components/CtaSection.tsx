import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react';
import { NUTRITIONIST_CONTACT, buildWhatsAppUrl, openWhatsAppWithMessage } from '../contact';

interface CtaProps {
  initialProgram?: string;
}

export const CtaSection: React.FC<CtaProps> = ({ initialProgram }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [details, setDetails] = useState('');
  const [selectedProgram, setSelectedProgram] = useState(
    initialProgram || 'ACOMPANHAMENTO ONLINE PREMIUM'
  );
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Sincroniza caso venha de um clique nos serviços
  React.useEffect(() => {
    if (initialProgram) {
      setSelectedProgram(initialProgram);
    }
  }, [initialProgram]);

  const buildBookingMessage = () =>
    `Olá Rafael Pereira! Gostaria de agendar minha avaliação.\n• Nome: ${name}\n• Modalidade: ${selectedProgram}\n• E-mail: ${email}${
      phone ? `\n• WhatsApp: ${phone}` : ''
    }${details ? `\n• Objetivo: ${details}` : ''}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim() || !email.trim()) {
      setErrorMessage('Por favor, preencha seu nome e seu e-mail.');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setErrorMessage('Por favor, informe um endereço de e-mail válido.');
      return;
    }

    openWhatsAppWithMessage(buildBookingMessage());
    setSubmitted(true);
  };

  return (
    <section id="agendar" className="py-12 sm:py-16">
      {/* Bloco Azul R (#6B8FB4) com cantos arredondados */}
      <div className="bg-[#6B8FB4] rounded-[20px] md:rounded-[24px] p-8 sm:p-12 lg:p-14 text-white grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center shadow-md">
        
        {/* Esquerda: Mini rótulo, título e texto */}
        <div className="lg:col-span-6 space-y-4">
          <div className="inline-flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
            <span className="font-oswald text-[11px] font-bold tracking-[0.24em] text-white/90 uppercase">
              PRIMEIRO PASSO
            </span>
          </div>

          {/* 8. Hierarquia: H2 de Seção com Anton */}
          <h2 className="font-anton text-3xl sm:text-4xl lg:text-5xl uppercase tracking-normal leading-[1.05] text-white">
            AGENDE SUA AVALIAÇÃO NUTRICIONAL
          </h2>

          <p className="text-sm sm:text-base text-white/90 font-normal leading-relaxed max-w-md">
            Vamos conversar sobre sua rotina, seus exames e planejar o cardápio perfeito para você conquistar o corpo e a energia que deseja.
          </p>

          <div className="pt-2 flex flex-col gap-2.5 text-xs text-white/85 font-medium">
            <div className="flex items-center space-x-2">
              <CheckCircle2 size={16} className="text-white/85 shrink-0" />
              <span>Atendimento humanizado, acolhedor e sem julgamentos.</span>
            </div>
            <a
              href={buildWhatsAppUrl('Olá Rafael! Gostaria de agendar uma consulta nutricional.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-white hover:text-white/85 underline underline-offset-4 w-fit"
            >
              <MessageCircle size={16} className="shrink-0" />
              <span>WhatsApp direto: {NUTRITIONIST_CONTACT.whatsappDisplay}</span>
            </a>
          </div>
        </div>

        {/* Direita: Formulário funcional com validação e acessibilidade */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-8 text-[#2B2F2A] shadow-md">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <CheckCircle2 size={52} className="text-[#395D89] mx-auto animate-bounce" />
              <h3 className="font-bebas text-2xl tracking-wide uppercase text-[#2B2F2A]">
                SOLICITAÇÃO RECEBIDA COM SUCESSO!
              </h3>
              <p className="text-xs sm:text-sm text-[#2B2F2A]/80 max-w-sm mx-auto leading-relaxed">
                Obrigado, <strong className="font-bold text-[#2B2F2A]">{name}</strong>! Recebemos sua solicitação para{' '}
                <span className="font-semibold text-[#395D89]">{selectedProgram}</span>. Se desejar atendimento imediato, envie sua solicitação agora pelo WhatsApp ({NUTRITIONIST_CONTACT.whatsappDisplay}).
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <a
                  href={buildWhatsAppUrl(buildBookingMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-oswald inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase bg-[#1E3A5F] hover:bg-[#152944] text-white transition-colors shadow-xs"
                >
                  <MessageCircle size={15} />
                  <span>Confirmar no WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setEmail('');
                    setPhone('');
                    setDetails('');
                  }}
                  className="font-oswald px-6 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase bg-[#EBE5DB] hover:bg-[#DDD5C7] text-[#2B2F2A] transition-colors cursor-pointer"
                >
                  Enviar Outra Solicitação
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs font-semibold border border-red-200">
                  {errorMessage}
                </div>
              )}

              {/* Programa de Interesse */}
              <div>
                <label htmlFor="program-select" className="font-oswald block text-[11px] font-bold uppercase tracking-wider text-[#2B2F2A] mb-1">
                  Modalidade de Interesse
                </label>
                <select
                  id="program-select"
                  value={selectedProgram}
                  onChange={(e) => setSelectedProgram(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DFD8CC] text-xs sm:text-sm bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#395D89] transition-all font-oswald"
                >
                  <option value="ACOMPANHAMENTO ONLINE PREMIUM">Acompanhamento Online Premium</option>
                  <option value="CONSULTA AVULSA">Consulta Avulsa</option>
                  <option value="PLANO TRIMESTRAL">Plano Trimestral</option>
                  <option value="Ainda não sei / Quero orientação">Ainda não sei / Quero orientação</option>
                </select>
              </div>

              {/* Campo Name */}
              <div>
                <label htmlFor="applicant-name" className="font-oswald block text-[11px] font-bold uppercase tracking-wider text-[#2B2F2A] mb-1">
                  Nome Completo <span className="text-[#1E3A5F]">*</span>
                </label>
                <input
                  id="applicant-name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Seu nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DFD8CC] text-xs sm:text-sm bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#395D89] transition-all"
                />
              </div>

              {/* Campo Email + Telefone/WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label htmlFor="applicant-email" className="font-oswald block text-[11px] font-bold uppercase tracking-wider text-[#2B2F2A] mb-1">
                    E-mail <span className="text-[#1E3A5F]">*</span>
                  </label>
                  <input
                    id="applicant-email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="seuemail@exemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#DFD8CC] text-xs sm:text-sm bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#395D89] transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="applicant-phone" className="font-oswald block text-[11px] font-bold uppercase tracking-wider text-[#2B2F2A] mb-1">
                    Seu WhatsApp
                  </label>
                  <input
                    id="applicant-phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="(71) 99999-9999"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#DFD8CC] text-xs sm:text-sm bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#395D89] transition-all"
                  />
                </div>
              </div>

              {/* Textarea: idade, peso, altura e objetivo */}
              <div>
                <label htmlFor="applicant-details" className="font-oswald block text-[11px] font-bold uppercase tracking-wider text-[#2B2F2A] mb-1">
                  Idade, peso atual, altura e seu principal objetivo
                </label>
                <textarea
                  id="applicant-details"
                  rows={3}
                  placeholder="Ex: 31 anos, 1,65m, 68 kg. Objetivo: perder 8 kg, diminuir inchaço e ter disposição sem dietas malucas."
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DFD8CC] text-xs sm:text-sm bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#395D89] transition-all"
                />
              </div>

              {/* Botão Verde Sálvia */}
              <button
                type="submit"
                className="font-oswald w-full py-3.5 rounded-full text-xs font-bold tracking-[0.14em] bg-[#395D89] hover:bg-[#2D4B70] active:scale-[0.99] text-white uppercase flex items-center justify-center space-x-2 shadow-sm hover:shadow transition-all duration-200 cursor-pointer"
              >
                <span>SOLICITAR MEU HORÁRIO</span>
                <ArrowRight size={16} />
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
