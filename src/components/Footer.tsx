import { STITCH_IMAGES } from '../data/catalog';
import { PageId } from '../types';
import { SmartImage } from './SmartImage';

interface FooterProps {
  onNavigate: (page: PageId, anchor?: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-footer text-on-footer py-8 border-t border-gold/30">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div className="flex flex-col gap-4">
          <SmartImage
            src={STITCH_IMAGES.footerLogo}
            alt="Logótipo Essência Eterna – Jóias Personalizadas"
            className="w-24 h-24 md:w-28 md:h-28 object-contain rounded-md"
            fallbackLabel="Essência Eterna"
          />
          <p className="font-body text-[14px] leading-[20px] text-on-footer/80 max-w-xs">
            Minimalismo, durabilidade e alma. Jóias personalizadas que não se apagam.
          </p>
        </div>

        <div className="flex flex-col gap-2 items-start">
          <h3 className="font-title text-[16px] font-semibold text-gold-light">Navegação</h3>
          <button
            type="button"
            onClick={() => onNavigate('inicio')}
            className="font-body text-[14px] text-on-footer/80 hover:text-on-footer transition-colors"
          >
            Início
          </button>
          <button
            type="button"
            onClick={() => onNavigate('pecas')}
            className="font-body text-[14px] text-on-footer/80 hover:text-on-footer transition-colors"
          >
            Peças
          </button>
          <button
            type="button"
            onClick={() => onNavigate('inicio', 'como-funciona')}
            className="font-body text-[14px] text-on-footer/80 hover:text-on-footer transition-colors"
          >
            Como funciona
          </button>
          <button
            type="button"
            onClick={() => onNavigate('acompanhar')}
            className="font-body text-[14px] text-on-footer/80 hover:text-on-footer transition-colors"
          >
            Acompanhar pedido
          </button>
          <button
            type="button"
            onClick={() => onNavigate('admin')}
            className="font-body text-[14px] text-on-footer/60 hover:text-on-footer transition-colors"
          >
            Painel da loja
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-title text-[16px] font-semibold text-gold-light">Contactos</h3>
          <a
            href="https://wa.me/244946599662"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-[14px] text-on-footer/80 hover:text-on-footer tabular-nums"
          >
            WhatsApp: +244 946 599 662
          </a>
          <p className="font-body text-[14px] text-on-footer/80">
            Email: contacto@essenciaeterna.ao
          </p>
          <p className="font-body text-[14px] text-on-footer/80">Tala Hadi, Luanda — Angola</p>
        </div>
      </div>
    </footer>
  );
}
