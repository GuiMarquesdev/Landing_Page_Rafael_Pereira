import React, { useState } from 'react';
import { IMAGES } from '../images';
import { ChevronDown } from 'lucide-react';

export const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      id: 'faq-1',
      q: 'Qual modalidade de consulta é a ideal para mim?',
      a: 'Todo o atendimento é 100% online, com a mesma precisão clínica. Se você deseja uma avaliação completa e orientações em um encontro único, a Consulta Avulsa é ideal. Para acompanhamento inicial com 2 retornos e ajustes contínuos, escolha o Plano Trimestral ou o Acompanhamento Online Premium com suporte semanal no WhatsApp.',
    },
    {
      id: 'faq-2',
      q: 'Vou ter que passar fome ou cortar pão e doces?',
      a: 'De forma alguma! Não acredito em terrorismo nutricional ou dietas punitivas. O cardápio é calculado para incluir os alimentos que você ama com equilíbrio, densidade nutricional e saciedade garantida.',
    },
    {
      id: 'faq-3',
      q: 'Como funciona o suporte entre as consultas?',
      a: 'Você terá documentos exclusivos com seu plano alimentar, lista de compras e receitas, além de canal direto comigo pelo WhatsApp para tirar dúvidas rápidas sobre compras no supermercado ou escolhas em restaurantes.',
    },
    {
      id: 'faq-4',
      q: 'Já tentei várias dietas e desisti. Vai funcionar comigo?',
      a: 'Com certeza! Não trabalhamos com dietas genéricas de gaveta. O planejamento é desenhado sob medida para se adaptar à sua rotina real, trabalho e família. Quando a nutrição cabe na sua vida, o resultado se torna sustentável.',
    },
  ];

  return (
    <section id="duvidas" className="py-12 sm:py-16">
      {/* 8. Hierarquia dos títulos: H2 de Seção */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <span className="font-oswald text-[11px] sm:text-[12px] font-bold tracking-[0.24em] text-[#395D89] uppercase inline-block mb-1">
          DÚVIDAS
        </span>
        <h2 className="font-bebas text-3xl sm:text-4xl lg:text-5xl tracking-wide uppercase text-[#2B2F2A] mb-2">
          PERGUNTAS FREQUENTES
        </h2>
        <p className="text-sm sm:text-base text-[#2B2F2A]/80 font-normal">
          Respostas claras e transparentes para você dar o primeiro passo hoje.
        </p>
      </div>

      {/* Card em duas colunas (#EBE5DB) */}
      <div className="bg-[#EBE5DB] rounded-[20px] md:rounded-[24px] overflow-hidden border border-[#E0D9CE] grid grid-cols-1 lg:grid-cols-12 shadow-sm">
        
        {/* Esquerda: Foto de estilo de vida saudável */}
        <div className="lg:col-span-5 min-h-[300px] lg:min-h-full relative bg-[#DDD6C8] overflow-hidden">
          <img
            src={IMAGES.faq}
            alt="Comunicado de Rafael Pereira Nutricionista (@rafaelpsnutri) sobre a atuação legal exclusiva do nutricionista na prescrição de dietas"
            width={600}
            height={750}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain bg-[#F6F5F3] hover:scale-[1.02] transition-transform duration-500"
          />
        </div>

        {/* Direita: 4 perguntas em negrito com respostas curtas */}
        <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-center space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.id}
                className="bg-white/80 backdrop-blur-xs rounded-xl border border-[#DFD8CC] transition-all duration-200 overflow-hidden shadow-xs hover:border-[#395D89]/50"
              >
                <button
                  type="button"
                  id={`btn-${faq.id}`}
                  aria-expanded={isOpen}
                  aria-controls={`answer-${faq.id}`}
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left p-4 sm:p-5 transition-colors group cursor-pointer"
                >
                  {/* 8. Hierarquia: H3 nas perguntas */}
                  <h3 className="font-oswald font-semibold text-xs sm:text-sm uppercase tracking-tight text-[#2B2F2A] group-hover:text-[#1E3A5F] transition-colors pr-4">
                    {faq.q}
                  </h3>
                  <ChevronDown
                    size={18}
                    className={`text-[#395D89] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#1E3A5F]' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>

                {isOpen && (
                  <div
                    id={`answer-${faq.id}`}
                    role="region"
                    aria-labelledby={`btn-${faq.id}`}
                    className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-[#2B2F2A]/85 leading-relaxed border-t border-[#EAE3D7]/80"
                  >
                    <p className="pt-2">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
