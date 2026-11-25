import { useState } from 'react';
import { ArrowLeft, Menu, MessageCircle, X } from 'lucide-react';
import { PageId } from '../types';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId, anchor?: string) => void;
  progressText?: string;
}

export function Header({ currentPage, onNavigate, progressText }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (page: PageId, anchor?: string) => {
    setMobileMenuOpen(false);
    onNavigate(page, anchor);
  };

  const navItems: Array<{ id: PageId; label: string; anchor?: string; activeMatch: PageId[] }> = [
    { id: 'inicio', label: 'Início', activeMatch: ['inicio'] },
    { id: 'pecas', label: 'Peças', activeMatch: ['pecas', 'personalizar', 'resumo'] },
    { id: 'inicio', label: 'Como funciona', anchor: 'como-funciona', activeMatch: [] },
    { id: 'acompanhar', label: 'Acompanhar pedido', activeMatch: ['acompanhar'] },
  ];

  return (
    <header className="sticky top-0 z-30 bg-surface/95 backdrop-blur-sm border-b border-outline-variant">
      {/* Mobile streamlined bar when on Personalizar */}
      {currentPage === 'personalizar' && (
        <div className="lg:hidden px-4 py-3 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => handleNav('pecas')}
            className="flex items-center gap-2 text-on-surface hover:text-gold transition-colors min-h-[40px]"
          >
            <ArrowLeft className="w-5 h-5" aria-hidden="true" />
            <span className="font-headline text-[16px] font-semibold">Personalizar peça</span>
          </button>
          <div className="flex items-center gap-3">
            {progressText && (
              <span className="font-label text-[12px] font-medium text-on-surface-variant tabular-nums">
                {progressText}
              </span>
            )}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-surface-container border border-outline-variant text-on-surface"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      )}

      {/* Standard desktop + mobile header */}
      <div
        className={`${
          currentPage === 'personalizar' ? 'hidden lg:flex' : 'flex'
        } max-w-[1200px] mx-auto px-4 lg:px-6 py-3 lg:py-4 items-center justify-between gap-4 lg:gap-8`}
      >
        <button
          type="button"
          onClick={() => handleNav('inicio')}
          className="flex items-center gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-md shrink-0"
        >
          <span
            className="inline-flex items-center justify-center w-9 h-9 lg:w-10 lg:h-10 rounded-md bg-footer border border-gold/60 shrink-0"
            aria-hidden="true"
          >
            <svg viewBox="0 0 32 32" className="w-5 h-5 lg:w-6 lg:h-6" fill="none">
              <path d="M16 4L28 16L16 28L4 16L16 4Z" stroke="#E7C873" strokeWidth="1.6" />
              <circle cx="16" cy="18" r="2.2" fill="#E7C873" />
              <path d="M8 16H13L16 19L19 16H24" stroke="#B8893B" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </span>
          <span className="flex flex-col">
            <span className="font-headline text-[16px] font-semibold text-on-surface leading-tight whitespace-nowrap">
              Essência Eterna
            </span>
            <span className="hidden sm:block font-label text-[12px] font-medium text-on-surface-variant whitespace-nowrap">
              Jóias Personalizadas
            </span>
          </span>
        </button>

        <nav aria-label="Navegação principal" className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = item.activeMatch.includes(currentPage) && !item.anchor;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => handleNav(item.id, item.anchor)}
                className={`font-label text-[15px] font-semibold whitespace-nowrap shrink-0 transition-colors duration-150 ${
                  isActive
                    ? 'text-on-surface border-b-2 border-gold pb-0.5'
                    : 'text-on-surface-variant hover:text-on-surface pb-0.5'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href="https://wa.me/244946599662"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-3.5 lg:px-4 py-2 lg:py-2.5 rounded-full bg-primary text-on-primary border border-gold/50 hover:bg-on-surface transition-colors duration-150 shadow-sm whitespace-nowrap shrink-0"
          >
            <MessageCircle className="w-4 h-4 text-gold-light" aria-hidden="true" />
            <span className="font-label text-[13px] font-medium">WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full bg-surface-container border border-outline-variant text-on-surface"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="Menu móvel"
          className="lg:hidden border-t border-outline-variant bg-surface px-4 py-4 flex flex-col gap-2"
        >
          <button
            type="button"
            onClick={() => handleNav('inicio')}
            className={`text-left px-3 py-2.5 rounded-md font-label text-[15px] font-semibold ${
              currentPage === 'inicio'
                ? 'bg-gold-tint/50 text-on-surface'
                : 'text-on-surface-variant hover:bg-surface-container-low'
            }`}
          >
            Início
          </button>
          <button
            type="button"
            onClick={() => handleNav('pecas')}
            className={`text-left px-3 py-2.5 rounded-md font-label text-[15px] font-semibold ${
              currentPage === 'pecas'
                ? 'bg-gold-tint/50 text-on-surface'
                : 'text-on-surface-variant hover:bg-surface-container-low'
            }`}
          >
            Peças (Catálogo)
          </button>
          <button
            type="button"
            onClick={() => handleNav('personalizar')}
            className={`text-left px-3 py-2.5 rounded-md font-label text-[15px] font-semibold ${
              currentPage === 'personalizar'
                ? 'bg-gold-tint/50 text-on-surface'
                : 'text-on-surface-variant hover:bg-surface-container-low'
            }`}
          >
            Personalizar peça
          </button>
          <button
            type="button"
            onClick={() => handleNav('inicio', 'como-funciona')}
            className="text-left px-3 py-2.5 rounded-md font-label text-[15px] font-semibold text-on-surface-variant hover:bg-surface-container-low"
          >
            Como funciona
          </button>
          <button
            type="button"
            onClick={() => handleNav('acompanhar')}
            className={`text-left px-3 py-2.5 rounded-md font-label text-[15px] font-semibold ${
              currentPage === 'acompanhar'
                ? 'bg-gold-tint/50 text-on-surface'
                : 'text-on-surface-variant hover:bg-surface-container-low'
            }`}
          >
            Acompanhar pedido
          </button>
          <button
            type="button"
            onClick={() => handleNav('admin')}
            className={`text-left px-3 py-2.5 rounded-md font-label text-[14px] font-medium ${
              currentPage === 'admin'
                ? 'bg-gold-tint/50 text-on-surface'
                : 'text-on-surface-variant/80 hover:bg-surface-container-low'
            }`}
          >
            Painel da loja
          </button>
        </nav>
      )}
    </header>
  );
}
