import { useState } from 'react';
import { ArrowRight, BadgeCheck } from 'lucide-react';
import { CATALOG_ITEMS } from '../data/catalog';
import { OrderConfig, PageId } from '../types';
import { SmartImage } from '../components/SmartImage';

interface CatalogPageProps {
  onNavigate: (page: PageId) => void;
  onStartCustomize: (preset: Partial<OrderConfig>) => void;
}

type FilterKey =
  | 'todas'
  | 'colar'
  | 'mascote'
  | 'pulseira'
  | 'Prateado'
  | 'Dourado'
  | 'Adulto'
  | 'Criança';

export function CatalogPage({ onNavigate, onStartCustomize }: CatalogPageProps) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('todas');

  const chips: Array<{ key: FilterKey; label: string; kind: 'default' | 'silver' | 'gold' }> = [
    { key: 'todas', label: 'Todas', kind: 'default' },
    { key: 'colar', label: 'Colares', kind: 'default' },
    { key: 'mascote', label: 'Mascotes', kind: 'default' },
    { key: 'pulseira', label: 'Pulseiras', kind: 'default' },
    { key: 'Prateado', label: 'Prateado', kind: 'silver' },
    { key: 'Dourado', label: 'Dourado', kind: 'gold' },
    { key: 'Adulto', label: 'Adulto', kind: 'default' },
    { key: 'Criança', label: 'Criança', kind: 'default' },
  ];

  const filteredItems = CATALOG_ITEMS.filter((item) => {
    if (activeFilter === 'todas') return true;
    return (
      item.id === activeFilter ||
      item.finishes.includes(activeFilter as 'Prateado' | 'Dourado') ||
      item.audiences.includes(activeFilter as 'Adulto' | 'Criança')
    );
  });

  const getChipClass = (chip: (typeof chips)[number]) => {
    if (chip.key === activeFilter) {
      return 'px-4 py-2 rounded-full bg-primary text-on-primary border border-gold/60 font-label text-[13px] font-medium transition-colors duration-150 whitespace-nowrap shrink-0';
    }
    if (chip.kind === 'silver') {
      return 'px-4 py-2 rounded-full bg-silver-tint text-on-silver-tint border border-silver/40 hover:border-primary font-label text-[13px] font-medium transition-colors duration-150 whitespace-nowrap shrink-0';
    }
    if (chip.kind === 'gold') {
      return 'px-4 py-2 rounded-full bg-gold-tint text-on-gold-tint border border-gold/40 hover:border-primary font-label text-[13px] font-medium transition-colors duration-150 whitespace-nowrap shrink-0';
    }
    return 'px-4 py-2 rounded-full bg-surface-container text-on-surface border border-outline-variant hover:border-gold font-label text-[13px] font-medium transition-colors duration-150 whitespace-nowrap shrink-0';
  };

  return (
    <div className="flex-1 max-w-[1200px] w-full mx-auto px-4 lg:px-6 py-6 lg:py-8 flex flex-col gap-8">
      {/* Page Title */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-1 max-w-2xl">
          <span className="font-label text-[12px] font-medium text-on-surface-variant">
            Catálogo Essência Eterna · Aço inoxidável
          </span>
          <h1 className="font-headline text-[28px] leading-[34px] lg:text-[36px] lg:leading-[44px] font-semibold text-on-surface text-balance">
            Escolhe a tua peça
          </h1>
          <p className="font-body text-[15px] lg:text-[16px] text-on-surface-variant text-pretty">
            Todas as peças são feitas por encomenda em Luanda. Escolhe o modelo que queres personalizar e vê o esboço digital na hora.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary text-gold-light border border-gold/60">
            <span className="w-2 h-2 rounded-full bg-gold-light" aria-hidden="true" />
            <span className="font-label text-[12px] font-medium">Lote #14 aberto</span>
          </span>
        </div>
      </section>

      {/* Filter Chips */}
      <section aria-label="Filtrar peças" className="flex flex-wrap items-center gap-2">
        {chips.slice(0, 4).map((chip) => (
          <button
            key={chip.key}
            type="button"
            onClick={() => setActiveFilter(chip.key)}
            className={getChipClass(chip)}
          >
            {chip.label}
          </button>
        ))}
        <span className="w-px h-5 bg-outline-variant mx-1 hidden sm:inline-block" aria-hidden="true" />
        {chips.slice(4).map((chip) => (
          <button
            key={chip.key}
            type="button"
            onClick={() => setActiveFilter(chip.key)}
            className={getChipClass(chip)}
          >
            {chip.label}
          </button>
        ))}
      </section>

      {/* Catalog Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {filteredItems.map((item) => (
          <article
            key={item.id}
            className="h-full bg-surface-container rounded-[20px] border border-outline-variant overflow-hidden shadow-sm flex flex-col transition-transform duration-150 hover:-translate-y-0.5"
          >
            <div className="relative aspect-[4/3] bg-surface-container-low overflow-hidden">
              <SmartImage
                src={item.image}
                alt={item.imageAlt}
                className="w-full h-full object-cover"
                fallbackLabel={item.title}
              />
              <span
                className={`absolute top-3 left-3 px-3 py-1 rounded-full border font-label text-[12px] font-medium ${
                  item.badgeVariant === 'silver'
                    ? 'bg-silver-tint text-on-silver-tint border-silver/40'
                    : item.badgeVariant === 'gold'
                      ? 'bg-gold-tint text-on-gold-tint border-gold/40'
                      : 'bg-primary text-gold-light border-gold/50'
                }`}
              >
                {item.badgeText}
              </span>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="font-title text-[20px] font-semibold text-on-surface">
                    {item.title}
                  </h2>
                  <span
                    className={`font-title shrink-0 ${
                      item.price
                        ? 'text-[16px] font-semibold text-on-surface tabular-nums'
                        : 'text-[13px] font-medium text-on-surface-variant'
                    }`}
                  >
                    {item.priceLabel}
                  </span>
                </div>
                <p className="font-body text-[14px] leading-[20px] text-on-surface-variant text-pretty">
                  {item.description}
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-2 text-[12px] font-label font-medium text-on-surface-variant">
                  <span>{item.audienceLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-on-gold-tint bg-gold-tint px-2.5 py-0.5 rounded-full">
                    {item.depositLabel}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  onStartCustomize({
                    piece: item.id,
                    finish: item.defaultFinish,
                    size: item.defaultSize,
                  })
                }
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-on-primary border border-gold/50 hover:bg-on-surface transition-colors duration-150"
              >
                <span className="font-label text-[15px] font-semibold">Personalizar</span>
                <ArrowRight className="w-4 h-4 text-gold-light" aria-hidden="true" />
              </button>
            </div>
          </article>
        ))}
      </section>

      {/* Batch & Payment Reminder Strip */}
      <section className="rounded-[20px] bg-surface-container-low border border-outline-variant p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <span
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-gold-light shrink-0"
            aria-hidden="true"
          >
            <BadgeCheck className="w-5 h-5" />
          </span>
          <div className="flex flex-col gap-1">
            <h3 className="font-title text-[16px] font-semibold text-on-surface">
              Como funciona a encomenda por lote
            </h3>
            <p className="font-body text-[14px] leading-[20px] text-on-surface-variant max-w-2xl">
              Personalizas primeiro, aprovas o esboço digital na hora e pagas 50% para entrar no lote aberto. Os restantes 50% pagam-se na entrega (cerca de 2 semanas após fechar o lote).
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('personalizar')}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-transparent text-on-surface border border-primary/30 hover:border-primary hover:bg-surface-container transition-colors duration-150 shrink-0"
        >
          <span className="font-label text-[15px] font-semibold">Abrir personalizador</span>
        </button>
      </section>
    </div>
  );
}
