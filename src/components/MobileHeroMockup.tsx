import React from 'react';

export const MobileHeroMockup: React.FC = () => {
  return (
    <div className="relative group">
      {/* Phone outer chassis */}
      <div className="relative w-[180px] sm:w-[210px] md:w-[230px] rounded-[36px] bg-[#1C1F1B] p-2 sm:p-2.5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35)] ring-1 ring-white/20 transform transition-all duration-300 group-hover:scale-[1.02]">
        {/* Dynamic Island / Speaker notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-14 sm:w-16 h-3.5 bg-black rounded-full z-30 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-[#2a2a2a] mr-1.5"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#1b3a24]"></div>
        </div>

        {/* Screen container */}
        <div className="relative rounded-[28px] overflow-hidden bg-[#395D89] text-white flex flex-col justify-between pt-7 pb-4 px-3 sm:px-3.5 select-none aspect-[9/18]">
          {/* Subtle phone status bar */}
          <div className="flex justify-between items-center text-[9px] font-semibold text-white/70 px-1 mb-2">
            <span>9:41</span>
            <div className="flex items-center space-x-1">
              <span className="w-1.5 h-1.5 bg-white/70 rounded-full"></span>
              <span className="w-2.5 h-1.5 border border-white/70 rounded-xs"></span>
            </div>
          </div>

          {/* Mini hero content */}
          <div className="space-y-2">
            <span className="font-oswald inline-block text-[7px] sm:text-[8px] font-bold tracking-[0.16em] uppercase text-white/80">
              NUTRICIONISTA • CRN ATIVO
            </span>
            <h4 className="font-anton text-[14px] sm:text-[16px] uppercase leading-tight tracking-normal">
              SUA MELHOR VERSÃO<br />COMEÇA NO PRATO.
            </h4>
            <p className="text-[8px] sm:text-[9px] text-white/85 leading-snug font-normal line-clamp-3">
              Nutrição personalizada e sem extremos para a sua rotina real.
            </p>
            <div className="pt-1">
              <div className="font-oswald inline-flex items-center text-[8px] sm:text-[9px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-[#1E3A5F] text-white shadow-xs">
                CONSULTA
              </div>
            </div>
          </div>

          {/* Mini stats divider */}
          <div className="mt-3 pt-2 border-t border-white/20">
            <div className="grid grid-cols-3 gap-1 text-center">
              <div>
                <p className="font-bebas text-[11px] sm:text-[12px] tracking-wide">350+</p>
                <p className="text-[6px] uppercase tracking-wider text-white/75">PACIENTES</p>
              </div>
              <div className="border-x border-white/20">
                <p className="font-bebas text-[11px] sm:text-[12px] tracking-wide">5 ANOS</p>
                <p className="text-[6px] uppercase tracking-wider text-white/75">EXPERIÊNCIA</p>
              </div>
              <div>
                <p className="font-bebas text-[11px] sm:text-[12px] tracking-wide">4.9</p>
                <p className="text-[6px] uppercase tracking-wider text-white/75">AVALIAÇÃO</p>
              </div>
            </div>
          </div>

          {/* Phone home indicator bar */}
          <div className="mx-auto mt-2 w-16 h-1 bg-white/40 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
