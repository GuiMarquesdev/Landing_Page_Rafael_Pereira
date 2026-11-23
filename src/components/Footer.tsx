import React from 'react';
import { Instagram } from 'lucide-react';
import { IMAGES } from '../images';
import { NUTRITIONIST_CONTACT, buildWhatsAppUrl } from '../contact';

interface FooterProps {
  onApplyClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onApplyClick }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, selector: string) => {
    e.preventDefault();
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="pt-10 pb-12 border-t border-[#DFD8CC]/80 mt-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Esquerda: Logo + Nome / Brand */}
        <div className="flex items-center gap-3 text-center md:text-left">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
            className="shrink-0 hover:opacity-90 transition-opacity"
            aria-label="Voltar ao topo - Rafael Pereira Nutricionista"
          >
            <img
              src={IMAGES.logo}
              alt="Logo Rafael Pereira Nutricionista"
              width={72}
              height={48}
              loading="lazy"
              decoding="async"
              className="h-12 w-auto object-contain mix-blend-multiply"
            />
          </a>
          <div>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="font-bebas text-xl sm:text-2xl tracking-wider text-[#2B2F2A] hover:text-[#1E3A5F] transition-colors"
            >
              RAFAEL PEREIRA
            </a>
            <p className="font-oswald text-[11px] text-[#2B2F2A]/60 uppercase tracking-widest mt-0.5">
              NUTRIÇÃO CLÍNICA • CRN ATIVO
            </p>
            <a
              href={buildWhatsAppUrl('Olá Rafael! Vim pelo site e gostaria de mais informações.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-xs text-[#395D89] hover:text-[#1E3A5F] font-semibold mt-0.5 transition-colors"
            >
              Falar pelo WhatsApp
            </a>
          </div>
        </div>

        {/* Centro: Ícones Circulares de Contato */}
        <div className="flex items-center space-x-3">
          <a
            href={NUTRITIONIST_CONTACT.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram de Rafael Pereira Nutricionista"
            className="w-10 h-10 rounded-full bg-[#EBE5DB] hover:bg-[#395D89] hover:text-white flex items-center justify-center text-[#2B2F2A] transition-all duration-200 shadow-xs"
          >
            <Instagram size={18} />
          </a>
          <a
            href={buildWhatsAppUrl('Olá Rafael! Gostaria de agendar uma consulta nutricional.')}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp de Rafael Pereira Nutricionista"
            className="w-10 h-10 rounded-full bg-[#EBE5DB] hover:bg-[#395D89] hover:text-white flex items-center justify-center text-[#2B2F2A] transition-all duration-200 shadow-xs"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-[18px] h-[18px] fill-current"
              aria-hidden="true"
            >
              <path d="M12.031 2c-5.516 0-9.969 4.453-9.969 9.969 0 1.766.469 3.484 1.344 5l-1.406 5.141 5.281-1.391c1.469.797 3.109 1.219 4.75 1.219 5.516 0 9.969-4.453 9.969-9.969S17.547 2 12.031 2zm5.813 14.125c-.25.703-1.438 1.344-2 1.422-.516.078-1.172.109-1.891-.125-.438-.141-1-.328-1.719-.641-3.031-1.313-5-4.375-5.156-4.578-.156-.203-1.234-1.641-1.234-3.125s.781-2.219 1.063-2.516c.281-.297.609-.375.813-.375.203 0 .406 0 .578.016.188.016.438-.078.688.516.25.609.859 2.094.938 2.25.078.156.125.344.016.547-.109.203-.156.328-.313.5-.156.172-.328.391-.469.516-.156.156-.313.328-.141.625.172.297.781 1.297 1.688 2.094 1.156 1.031 2.141 1.359 2.438 1.516.297.156.469.125.641-.078.172-.203.75-.875.953-1.172.203-.297.406-.25.688-.141.281.109 1.781.844 2.094 1 .313.156.516.234.594.359.078.125.078.734-.172 1.438z" />
            </svg>
          </a>
        </div>

        {/* Direita: Direitos autorais & links internos e técnicos */}
        <div className="text-center md:text-right space-y-1.5">
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-3 gap-y-1 text-[11px] font-oswald font-semibold uppercase tracking-wider text-[#2B2F2A]/75">
            <a href="#consultas" onClick={(e) => scrollToSection(e, '#consultas')} className="hover:text-[#1E3A5F] transition-colors">Consultas</a>
            <a href="#sobre" onClick={(e) => scrollToSection(e, '#sobre')} className="hover:text-[#1E3A5F] transition-colors">Sobre</a>
            <a href="#duvidas" onClick={(e) => scrollToSection(e, '#duvidas')} className="hover:text-[#1E3A5F] transition-colors">Dúvidas</a>
            <a href="#questionarios" onClick={(e) => scrollToSection(e, '#questionarios')} className="hover:text-[#1E3A5F] transition-colors">Questionários</a>
            <a
              href="#agendar"
              onClick={(e) => {
                e.preventDefault();
                onApplyClick();
              }}
              className="hover:text-[#1E3A5F] transition-colors cursor-pointer"
            >
              Agendar
            </a>
          </div>
          <p className="sr-only">
            © 2026 Rafael Pereira Nutricionista. Todos os direitos reservados.
          </p>
          <div className="sr-only">
            <a href="/sitemap.xml">
              Sitemap.xml
            </a>
            <a href="/robots.txt">
              Robots.txt
            </a>
            <a href="/llms.txt">
              LLMs.txt
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
