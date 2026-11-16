import React from 'react';
import { IMAGES } from '../images';
import { ArrowRight } from 'lucide-react';
import { ShimmerButton } from './ui/ShimmerButton';

interface HeroProps {
  onStartPlanClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartPlanClick }) => {
  return (
    <section className="relative w-full pt-2 pb-10">
      {/* Container 2 colunas com cantos arredondados */}
      <div className="relative rounded-[20px] md:rounded-[24px] overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[540px] lg:min-h-[580px] shadow-sm">
        
        {/* Coluna Esquerda: Sage Green (#395D89) */}
        <div className="lg:col-span-6 bg-[#395D89] p-8 sm:p-10 lg:p-14 text-white flex flex-col justify-center z-10">
          <div className="space-y-6 max-w-lg">
            {/* Mini Rótulo */}
            <div className="inline-flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
              <p className="text-[11px] sm:text-[12px] font-bold tracking-[0.22em] text-white/90 uppercase">
                NUTRICIONISTA CLÍNICO &amp; ESPORTIVO • CRN ATIVO
              </p>
            </div>

            {/* Título Principal com Anton */}
            <h1 className="font-anton text-4xl sm:text-5xl lg:text-6xl uppercase tracking-normal text-white leading-[1.05]">
              SUA MELHOR VERSÃO<br />
              COMEÇA NO PRATO.
            </h1>

            {/* Subtítulo */}
            <p className="text-sm sm:text-base text-white/90 font-normal leading-relaxed max-w-md">
              Nutrição personalizada para a sua rotina real — construída para os seus objetivos, seus exames e a sua versão mais saudável e confiante.
            </p>

            {/* Botão Terracota com Magic UI Shimmer Effect */}
            <div className="pt-2">
              <ShimmerButton
                onClick={onStartPlanClick}
                variant="terracotta"
                className="px-8 py-3.5 text-xs sm:text-sm tracking-[0.14em] ring-1 ring-white/25"
              >
                <span>QUERO MEU PLANO NUTRICIONAL</span>
                <ArrowRight size={16} />
              </ShimmerButton>
            </div>
          </div>
        </div>

        {/* Coluna Direita: Foto do nutricionista com mock-up sobreposto */}
        <div className="lg:col-span-6 relative min-h-[380px] lg:min-h-full bg-[#EBE5DB] overflow-hidden">
          <img
            src={IMAGES.hero}
            alt="Rafael Pereira nutricionista clínico e esportivo praticando corrida ao ar livre"
            width={800}
            height={800}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="w-full h-full object-cover object-top filter brightness-[0.98] transition-transform duration-700 hover:scale-105"
          />

          {/* Gradiente sutil para harmonização */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
};
