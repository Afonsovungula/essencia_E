import { useState } from 'react';
import { ArrowRight, BadgeCheck, Check, Minus, Plus } from 'lucide-react';
import {
  FONT_STYLES,
  NAME_SUGGESTIONS,
  STONE_OPTIONS,
  formatKz,
  getPieceLabel,
  getPiecePrice,
} from '../data/catalog';
import {
  FinishType,
  GenderType,
  OrderConfig,
  PageId,
  PieceType,
  SizeType,
} from '../types';
import { JewelrySketch } from '../components/JewelrySketch';

interface CustomizePageProps {
  config: OrderConfig;
  onChangeConfig: (next: OrderConfig) => void;
  onNavigate: (page: PageId) => void;
}

export function CustomizePage({ config, onChangeConfig, onNavigate }: CustomizePageProps) {
  const [suggestionIndex, setSuggestionIndex] = useState(0);

  const unitPrice = getPiecePrice(config.piece);
  const totalPrice = unitPrice ? unitPrice * config.qty : null;
  const depositAmount = totalPrice ? totalPrice / 2 : null;
  const showStone = config.piece === 'mascote' || config.size === 'Criança';
  const pieceLabel = getPieceLabel(config.piece);

  const progressSteps = config.approved ? 6 : 5;

  const update = (patch: Partial<OrderConfig>) => {
    onChangeConfig({ ...config, ...patch });
  };

  const applySuggestion = () => {
    const nextName = NAME_SUGGESTIONS[suggestionIndex % NAME_SUGGESTIONS.length];
    setSuggestionIndex((i) => i + 1);
    update({ name: nextName });
  };

  const pieceOptions: Array<{ id: PieceType; title: string; priceLabel: string }> = [
    { id: 'colar', title: 'Colar com nome', priceLabel: '7.000 Kz' },
    { id: 'mascote', title: 'Mascote de bebé', priceLabel: '8.000 Kz' },
    { id: 'pulseira', title: 'Pulseira', priceLabel: 'Preço sob consulta' },
  ];

  const genders: GenderType[] = ['Feminino', 'Masculino'];
  const sizes: SizeType[] = ['Criança', 'Adulto'];
  const finishes: Array<{ id: FinishType; label: string }> = [
    { id: 'Prateado', label: 'Aço inox prateado' },
    { id: 'Dourado', label: 'Aço inox dourado' },
  ];

  return (
    <div className="flex-1 pb-24 lg:pb-12">
      <div className="max-w-[1200px] w-full mx-auto px-4 lg:px-6 py-5 lg:py-8">
        {/* Desktop Page Header */}
        <div className="hidden lg:flex flex-row items-end justify-between gap-4 mb-8">
          <div className="flex flex-col gap-1">
            <span className="font-label text-[12px] font-medium text-on-surface-variant">
              Personalização guiada · Esboço em tempo real
            </span>
            <h1 className="font-headline text-[36px] leading-[44px] font-semibold text-on-surface">
              Cria a tua peça
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-label text-[12px] font-medium text-on-surface-variant">
              Progresso
            </span>
            <div className="w-36 h-2 rounded-full bg-silver-light overflow-hidden">
              <div
                className="h-full bg-gold rounded-full transition-all duration-300"
                style={{ width: `${(progressSteps / 6) * 100}%` }}
              />
            </div>
            <span className="font-label text-[12px] font-medium text-on-surface tabular-nums">
              {progressSteps} de 6
            </span>
          </div>
        </div>

        {/* Two-Column Builder */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Sticky Preview ("Esboço digital") */}
          <aside className="lg:col-span-5 lg:sticky lg:top-24 flex flex-col gap-4">
            <article className="bg-surface-container rounded-[20px] border border-outline-variant p-4 lg:p-6 shadow-sm flex flex-col gap-4 lg:gap-6">
              <header className="flex items-center justify-between gap-2">
                <div>
                  <h2 className="font-title text-[16px] lg:text-[20px] font-semibold text-on-surface">
                    Esboço digital
                  </h2>
                  <p className="hidden lg:block font-body text-[14px] text-on-surface-variant">
                    Pré-visualização em tempo real
                  </p>
                </div>
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border shrink-0 ${
                    config.finish === 'Dourado'
                      ? 'bg-gold-tint text-on-gold-tint border-gold/40'
                      : 'bg-silver-tint text-on-silver-tint border-silver/40'
                  }`}
                >
                  <span className="font-label text-[12px] font-medium">
                    {config.finish === 'Dourado' ? 'Aço inox dourado' : 'Aço inox prateado'}
                  </span>
                </span>
              </header>

              {/* Live Jewelry Canvas */}
              <div className="relative rounded-[12px] bg-surface-container-low border border-outline-variant p-4 lg:p-8 flex flex-col items-center justify-center min-h-[190px] lg:min-h-[260px]">
                <JewelrySketch config={config} idSuffix="builder" />

                <div className="mt-3 lg:mt-4 flex items-center justify-between gap-2 w-full text-[13px] lg:text-[14px] text-on-surface-variant">
                  <span className="truncate">
                    {showStone
                      ? `${pieceLabel} · ${config.size} · ${config.stone}`
                      : `${pieceLabel} · ${config.size}`}
                  </span>
                  <span className="font-title text-[15px] lg:text-[16px] font-semibold text-on-surface tabular-nums shrink-0">
                    {totalPrice ? formatKz(totalPrice) : 'Preço sob consulta'}
                  </span>
                </div>
              </div>

              {/* Approval & Suggestion */}
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => update({ approved: !config.approved })}
                  className={`inline-flex items-center justify-center gap-2 w-full px-6 py-3 lg:py-3.5 rounded-full border transition-colors duration-150 shadow-sm ${
                    config.approved
                      ? 'bg-success text-on-success border-success'
                      : 'bg-primary text-on-primary border-gold/50 hover:bg-on-surface'
                  }`}
                >
                  {config.approved ? (
                    <Check className="w-5 h-5" aria-hidden="true" />
                  ) : (
                    <BadgeCheck className="w-5 h-5 text-gold-light" aria-hidden="true" />
                  )}
                  <span className="font-label text-[15px] font-semibold">
                    {config.approved ? 'Esboço aprovado' : 'Aprovo este esboço'}
                  </span>
                </button>

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={applySuggestion}
                    className="text-[14px] text-on-surface-variant underline decoration-gold underline-offset-4 hover:text-on-surface"
                  >
                    Quero uma sugestão
                  </button>
                  <span className="font-label text-[12px] font-medium text-on-surface-variant tabular-nums">
                    1.ª prestação:{' '}
                    <strong className="text-on-surface">
                      {depositAmount ? formatKz(depositAmount) : 'A confirmar'}
                    </strong>
                  </span>
                </div>
              </div>
            </article>
          </aside>

          {/* Right Guided Conversational Form */}
          <section className="lg:col-span-7 flex flex-col gap-4 lg:gap-6">
            {/* Step 1: Que peça queres criar? */}
            <div className="bg-surface-container rounded-[20px] border border-outline-variant p-4 lg:p-6 flex flex-col gap-3 lg:gap-4">
              <h2 className="font-title text-[16px] lg:text-[20px] font-semibold text-on-surface">
                1. Que peça queres criar?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 lg:gap-3">
                {pieceOptions.map((item) => {
                  const selected = config.piece === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => update({ piece: item.id })}
                      className={`text-left p-3.5 lg:p-4 rounded-[12px] transition-colors duration-150 flex md:flex-col items-center md:items-start justify-between gap-1 ${
                        selected
                          ? 'border-2 border-primary bg-gold-tint/35'
                          : 'border border-outline-variant bg-surface hover:border-gold'
                      }`}
                    >
                      <span className="font-title text-[15px] lg:text-[16px] font-semibold text-on-surface">
                        {item.title}
                      </span>
                      <span className="font-body text-[14px] text-on-surface-variant tabular-nums">
                        {item.priceLabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Para quem é? */}
            <div className="bg-surface-container rounded-[20px] border border-outline-variant p-4 lg:p-6 flex flex-col gap-3 lg:gap-4">
              <h2 className="font-title text-[16px] lg:text-[20px] font-semibold text-on-surface">
                2. Para quem é?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <span className="font-label text-[13px] font-medium text-on-surface-variant">
                    Género
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {genders.map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => update({ gender: g })}
                        className={`px-4 py-2 rounded-full text-[13px] font-label font-medium transition-colors duration-150 ${
                          config.gender === g
                            ? 'border border-gold bg-primary text-on-primary'
                            : 'border border-outline-variant bg-surface text-on-surface hover:border-gold'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="font-label text-[13px] font-medium text-on-surface-variant">
                    Tamanho
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => update({ size: s })}
                        className={`px-4 py-2 rounded-full text-[13px] font-label font-medium transition-colors duration-150 ${
                          config.size === s
                            ? 'border border-gold bg-primary text-on-primary'
                            : 'border border-outline-variant bg-surface text-on-surface hover:border-gold'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Que acabamento preferes? */}
            <div className="bg-surface-container rounded-[20px] border border-outline-variant p-4 lg:p-6 flex flex-col gap-3 lg:gap-4">
              <h2 className="font-title text-[16px] lg:text-[20px] font-semibold text-on-surface">
                3. Que acabamento preferes?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {finishes.map((f) => {
                  const selected = config.finish === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => update({ finish: f.id })}
                      className={`flex items-center gap-3 p-3.5 lg:p-4 rounded-[12px] transition-colors duration-150 ${
                        selected
                          ? 'border-2 border-primary bg-gold-tint/35'
                          : 'border border-outline-variant bg-surface hover:border-gold'
                      }`}
                    >
                      <span
                        className={`w-8 h-8 rounded-full border shrink-0 ${
                          f.id === 'Dourado'
                            ? 'border-gold bg-gradient-to-br from-gold-light to-gold'
                            : 'border-outline-variant bg-gradient-to-br from-surface-container to-outline'
                        }`}
                        aria-hidden="true"
                      />
                      <span className="font-title text-[16px] font-semibold text-on-surface">
                        {f.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Nome + 6 Estilos de Letra */}
            <div className="bg-surface-container rounded-[20px] border border-outline-variant p-4 lg:p-6 flex flex-col gap-4">
              <h2 className="font-title text-[16px] lg:text-[20px] font-semibold text-on-surface">
                4. Que nome ou frase vamos gravar?
              </h2>

              <label className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-label text-[13px] font-medium text-on-surface">
                    Escreve o nome tal como o queres gravar
                  </span>
                  <span className="font-label text-[12px] font-medium text-on-surface-variant tabular-nums">
                    {config.name.length} / 24
                  </span>
                </div>
                <input
                  type="text"
                  maxLength={24}
                  value={config.name}
                  onChange={(e) => update({ name: e.target.value })}
                  placeholder="Ex.: Rael Manuel"
                  className="w-full rounded-[12px] bg-surface border border-outline-variant px-4 py-3 text-[16px] text-on-surface placeholder:text-outline focus:border-gold focus:ring-2 focus:ring-gold/30 focus:outline-none"
                />
                <span className="font-body text-[13px] lg:text-[14px] text-on-surface-variant">
                  Confere os acentos, gravamos exatamente como escreveres (1 ou 2 nomes).
                </span>
              </label>

              <div className="flex flex-col gap-2 pt-1">
                <span className="font-label text-[13px] font-medium text-on-surface">
                  Escolhe o estilo de letra
                </span>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 lg:gap-3">
                  {FONT_STYLES.map((font) => {
                    const selected = config.fontId === font.id;
                    const sample = config.name.trim() || 'O teu nome';
                    return (
                      <button
                        key={font.id}
                        type="button"
                        onClick={() => update({ fontId: font.id, fontFamily: font.family })}
                        className={`p-3.5 lg:p-4 rounded-[12px] text-center flex flex-col items-center justify-center gap-1 transition-colors duration-150 ${
                          selected
                            ? 'border-2 border-gold bg-gold-tint/30'
                            : 'border border-outline-variant bg-surface hover:border-gold'
                        }`}
                      >
                        <span
                          className={`text-on-surface truncate max-w-full ${
                            font.italic ? 'italic' : ''
                          } ${font.semibold ? 'font-semibold' : ''}`}
                          style={{
                            fontFamily: font.family,
                            fontSize: `${font.previewSizePx}px`,
                            lineHeight: 1.25,
                          }}
                        >
                          {sample}
                        </span>
                        <span className="font-label text-[12px] font-medium text-on-surface-variant">
                          {font.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Step 5: Cor da pedra */}
            {showStone && (
              <div className="bg-surface-container rounded-[20px] border border-outline-variant p-4 lg:p-6 flex flex-col gap-3 lg:gap-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="font-title text-[16px] lg:text-[20px] font-semibold text-on-surface">
                    5. Que cor queres para a pedra?
                  </h2>
                  <span className="font-label text-[12px] font-medium text-on-surface-variant">
                    Para mascotes e peças de criança
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {STONE_OPTIONS.map((stone) => {
                    const selected = config.stone === stone.name;
                    return (
                      <button
                        key={stone.name}
                        type="button"
                        onClick={() => update({ stone: stone.name })}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-label font-medium text-on-surface transition-colors duration-150 ${
                          selected
                            ? 'border-2 border-primary bg-gold-tint/35'
                            : 'border border-outline-variant bg-surface hover:border-gold'
                        }`}
                      >
                        <span className={`w-3.5 h-3.5 rounded-full ${stone.dotClass}`} aria-hidden="true" />
                        <span>{stone.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 6: Quantidade e Continuar */}
            <div className="bg-surface-container rounded-[20px] border border-outline-variant p-4 lg:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="font-title text-[16px] font-semibold text-on-surface">
                  Quantidade
                </span>
                <div className="inline-flex items-center rounded-full border border-outline-variant bg-surface p-1 gap-3">
                  <button
                    type="button"
                    onClick={() => update({ qty: Math.max(1, config.qty - 1) })}
                    aria-label="Diminuir quantidade"
                    className="w-8 h-8 rounded-full hover:bg-surface-container-low flex items-center justify-center text-on-surface"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-title text-[16px] font-semibold tabular-nums min-w-[20px] text-center">
                    {config.qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => update({ qty: Math.min(20, config.qty + 1) })}
                    aria-label="Aumentar quantidade"
                    className="w-8 h-8 rounded-full hover:bg-surface-container-low flex items-center justify-center text-on-surface"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('resumo')}
                className="hidden lg:inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-primary text-on-primary border border-gold/50 hover:bg-on-surface transition-colors duration-150 shadow-sm"
              >
                <span className="font-label text-[15px] font-semibold">
                  Continuar para o resumo
                </span>
                <ArrowRight className="w-4 h-4 text-gold-light" aria-hidden="true" />
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* Sticky Mobile Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-surface-container border-t border-outline-variant px-4 py-3 flex items-center justify-between gap-4 shadow-sm">
        <div className="flex flex-col">
          <span className="font-label text-[12px] font-medium text-on-surface-variant">
            Total (50% agora)
          </span>
          <span className="font-title text-[18px] font-semibold text-on-surface tabular-nums">
            {totalPrice ? formatKz(totalPrice) : 'Sob consulta'}
          </span>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('resumo')}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-on-primary border border-gold/50"
        >
          <span className="font-label text-[15px] font-semibold">Continuar</span>
          <ArrowRight className="w-4 h-4 text-gold-light" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
