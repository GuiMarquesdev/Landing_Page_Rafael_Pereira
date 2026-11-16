import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ShimmerButton } from './ui/ShimmerButton';
import { IMAGES } from '../images';

interface HeaderProps {
  onApplyClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onApplyClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'CONSULTAS', href: '#consultas' },
    { name: 'SOBRE', href: '#sobre' },
    { name: 'FAQ', href: '#duvidas' },
    { name: 'QUESTIONÁRIOS', href: '#questionarios' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="relative w-full z-40 py-5">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <a 
          href="#" 
          className="flex items-center gap-2.5 sm:gap-3 hover:opacity-90 transition-opacity"
        >
          <img
            src={IMAGES.logo}
            alt="Logo Rafael Pereira Nutricionista"
            width={84}
            height={56}
            decoding="async"
            className="h-12 sm:h-14 w-auto object-contain bg-transparent shrink-0"
          />
          <span className="font-bebas text-2xl sm:text-3xl tracking-wider text-[#2B2F2A] leading-none">
            RAFAEL PEREIRA <span className="text-[#395D89] text-lg sm:text-xl font-oswald ml-1 font-semibold">NUTRICIONISTA</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex items-center space-x-8 text-[12px] font-bold tracking-[0.14em] text-[#2B2F2A]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="hover:text-[#1E3A5F] transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Apply Now Shimmer Button (Magic UI / 21st.dev) */}
          <ShimmerButton
            onClick={onApplyClick}
            variant="terracotta"
            className="px-6 py-2.5 text-[12px]"
          >
            AGENDAR CONSULTA
          </ShimmerButton>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#2B2F2A] hover:bg-[#EBE5DB] transition-colors"
            aria-label="Alternar menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 p-4 bg-[#EBE5DB] rounded-2xl border border-[#DFD8CC] shadow-lg animate-in fade-in duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="px-3 py-2 text-xs font-bold tracking-[0.14em] text-[#2B2F2A] hover:text-[#1E3A5F] rounded-lg transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onApplyClick();
              }}
              className="w-full mt-2 py-3 rounded-full text-xs font-bold tracking-[0.14em] bg-[#1E3A5F] hover:bg-[#152944] text-white shadow-sm transition-all"
            >
              AGENDAR CONSULTA
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
