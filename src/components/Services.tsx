import React from 'react';
import { Utensils, Smartphone, Activity, ArrowRight } from 'lucide-react';
import { SpotlightCard } from './ui/SpotlightCard';

interface ServicesProps {
  onSelectProgram: (programName: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectProgram }) => {
  const services = [
    {
      id: 'consulta-presencial',
      name: 'CONSULTA PRESENCIAL & BIOIMPEDÂNCIA',
      description: 'Avaliação física minuciosa com bioimpedância tetrapolar, rastreamento metabólico e plano alimentar entregue na hora.',
      icon: Utensils,
      badge: 'Atendimento em Consultório',
      highlights: [
        'Bioimpedância tetrapolar de precisão',
        'Cardápio calculado para sua rotina real',
        'Avaliação de exames laboratoriais detalhada',
      ],
    },
    {
      id: 'online-coaching',
      name: 'ACOMPANHAMENTO ONLINE PREMIUM',
      description: 'Consultas por vídeo de onde você estiver, suporte contínuo no WhatsApp e ajustes semanais com foco em consistência.',
      icon: Smartphone,
      badge: 'Mais Escolhido & Flexível',
      highlights: [
        'Consultas ao vivo com anamnese profunda',
        'Suporte contínuo direto no WhatsApp',
        'Lista de compras inteligente e substituições',
      ],
    },
    {
      id: 'the-reset',
      name: 'PROTOCOLO RESET — 6 SEMANAS',
      description: 'Um programa intensivo e guiado passo a passo para destravar o metabolismo, desinflamar e resgatar sua energia vital.',
      icon: Activity,
      badge: 'Acelerador de Resultados',
      highlights: [
        'Cardápio anti-inflamatório estruturado',
        'Guia de suplementação personalizada',
        'Rastreador de metas e hábitos diários',
      ],
    },
  ];

  return (
    <section id="consultas" className="py-12 sm:py-16">
      {/* Header da Seção */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <span className="font-oswald text-[11px] sm:text-[12px] font-bold tracking-[0.24em] text-[#395D89] uppercase inline-block mb-1">
          MODALIDADES
        </span>
        <h2 className="font-bebas text-3xl sm:text-4xl lg:text-5xl tracking-wide uppercase text-[#2B2F2A] mb-2">
          NUTRIÇÃO FEITA SOB MEDIDA PARA VOCÊ
        </h2>
        <p className="text-sm sm:text-base text-[#2B2F2A]/80 font-normal">
          Cardápio flexível. Resultados duradouros. Sem passar fome ou cortar o que você ama.
        </p>
      </div>

      {/* Card largo dividido em 3 colunas com Magic UI Spotlight (#EBE5DB) */}
      <SpotlightCard
        spotlightColor="rgba(185, 112, 90, 0.16)"
        className="bg-[#EBE5DB] rounded-[20px] md:rounded-[24px] p-6 sm:p-8 lg:p-10 border border-[#E0D9CE] shadow-xs"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#D7CFBF]/80 gap-8 md:gap-0">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className={`flex flex-col justify-between ${
                  index === 0
                    ? 'md:pr-8'
                    : index === 1
                    ? 'md:px-8 pt-8 md:pt-0'
                    : 'md:pl-8 pt-8 md:pt-0'
                } group`}
              >
                <div>
                  {/* Ícone Circular Verde Sálvia com micro-interação */}
                  <div className="w-13 h-13 rounded-full bg-[#395D89] flex items-center justify-center text-white mb-5 shadow-xs group-hover:scale-105 group-hover:bg-[#2D4B70] transition-all duration-300">
                    <Icon size={24} strokeWidth={2.2} />
                  </div>

                  {/* Badge sutil */}
                  <span className="font-oswald inline-block text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[#DFD7CB] text-[#2B2F2A]/80 mb-2.5">
                    {service.badge}
                  </span>

                  {/* Título da Coluna com Oswald */}
                  <h3 className="font-oswald text-lg sm:text-xl font-bold uppercase tracking-tight text-[#2B2F2A] mb-2 leading-snug">
                    {service.name}
                  </h3>

                  {/* Descrição Curta */}
                  <p className="text-xs sm:text-sm text-[#2B2F2A]/85 leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* Highlights discretos */}
                  <ul className="space-y-1.5 mb-6 text-[11px] sm:text-xs text-[#2B2F2A]/75">
                    {service.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="flex items-center space-x-2">
                        <span className="w-1 h-1 rounded-full bg-[#395D89]" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Ação de Selecionar que abre o modal */}
                <button
                  type="button"
                  onClick={() => onSelectProgram(service.name)}
                  className="inline-flex items-center space-x-2 text-[11px] sm:text-[12px] font-bold tracking-[0.14em] text-[#1E3A5F] group-hover:text-[#152944] hover:underline uppercase pt-2 transition-colors cursor-pointer"
                >
                  <span>CONHECER E AGENDAR</span>
                  <ArrowRight size={14} className="transform group-hover:translate-x-1.5 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>
        <div className="mt-8 pt-6 border-t border-[#D7CFBF]/80 text-center">
          <a
            href="#questionarios"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#questionarios')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="font-oswald inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#2B2F2A]/80 hover:text-[#1E3A5F] transition-colors"
          >
            <span>Já agendou sua consulta? Preencha o questionário de pré-atendimento</span>
            <ArrowRight size={14} />
          </a>
        </div>
      </SpotlightCard>
    </section>
  );
};
