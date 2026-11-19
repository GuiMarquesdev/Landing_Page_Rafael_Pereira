import React from 'react';
import { IMAGES } from '../images';

export const About: React.FC = () => {
  return (
    <section id="sobre" className="py-12 sm:py-16">
      {/* 8. Hierarquia dos títulos: H2 de Seção */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <span className="font-oswald text-[11px] sm:text-[12px] font-bold tracking-[0.24em] text-[#395D89] uppercase inline-block mb-1">
          SOBRE MIM
        </span>
        <h2 className="font-bebas text-3xl sm:text-4xl lg:text-5xl tracking-wide uppercase text-[#2B2F2A] mb-2">
          CONHEÇA RAFAEL PEREIRA
        </h2>
        <p className="text-sm sm:text-base text-[#2B2F2A]/80 font-normal">
          Ciência, empatia e estratégias sustentáveis para transformar sua relação com a comida.
        </p>
      </div>

      {/* Card Largo em 3 Partes (#EBE5DB) */}
      <div className="bg-[#EBE5DB] rounded-[20px] md:rounded-[24px] p-6 sm:p-8 lg:p-10 border border-[#E0D9CE]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Parte 1: Esquerda - Foto do Nutricionista com frase de destaque */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <div className="relative w-full max-w-[280px] sm:max-w-[320px]">
              {/* Moldura da Foto */}
              <div className="aspect-square rounded-[20px] overflow-hidden shadow-xs border-2 border-white/60 bg-[#DED6C7]">
                <img
                  src={IMAGES.about}
                  alt="Rafael Pereira nutricionista durante apresentação de Nutrição"
                  width={320}
                  height={320}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Frase de filosofia nutricional */}
              <div className="mt-4 text-center sm:text-left bg-white/75 backdrop-blur-xs rounded-xl px-4 py-3 border border-white/80 shadow-xs">
                <p className="font-script text-xl sm:text-2xl text-[#2B2F2A] font-semibold leading-snug">
                  “Mais saúde, mais disposição e uma vida mais leve”
                </p>
                <p className="font-oswald text-[10px] tracking-widest uppercase font-bold text-[#395D89] mt-0.5">
                  FILOSOFIA NUTRICIONAL
                </p>
              </div>
            </div>
          </div>

          {/* Parte 2: Direita - Texto de Apresentação e Assinatura */}
          <div className="lg:col-span-8 flex flex-col justify-center space-y-4 lg:pl-2">
            <span className="font-oswald text-[11px] font-bold tracking-[0.2em] text-[#395D89] uppercase">
              NUTRICIONISTA CLÍNICO • CRN ATIVO
            </span>
            <p className="text-xs sm:text-sm text-[#2B2F2A] leading-relaxed font-normal">
              Sou nutricionista apaixonado por ajudar pessoas a construírem saúde duradoura, autoestima e energia — sem terrorismo nutricional e sem culpa. Minha abordagem é baseada na ciência e na vida real: nada de extremos, nada de dietas punitivas ou cardápios impossíveis de manter.
            </p>
            <p className="text-xs sm:text-sm text-[#2B2F2A]/85 leading-relaxed font-normal">
              Acredito no poder da comida de verdade e de um planejamento flexível onde cabem a sua rotina corrida, o jantar com a família e a sua sobremesa favorita. Você terá acolhimento, escuta atenta e suporte constante para atingir seu peso ideal com saúde.
            </p>

            {/* Assinatura */}
            <div className="pt-2">
              <p className="font-oswald text-[10px] uppercase tracking-widest font-bold text-[#2B2F2A]/60 mb-0.5">
                COM ATENÇÃO E DEDICAÇÃO,
              </p>
              <p className="font-signature text-3xl sm:text-4xl text-[#2B2F2A] transform -rotate-1 select-none">
                Rafael Pereira
              </p>
              <p className="font-oswald text-[10px] text-[#395D89] font-semibold tracking-wider uppercase mt-1">
                Nutricionista Clínico
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
