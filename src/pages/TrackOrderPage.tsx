import { FormEvent, useEffect, useState } from 'react';
import { Check, Clock, MessageCircle, Search } from 'lucide-react';
import {
  ORDER_STATUS_STEPS,
  formatKz,
  getPieceLabel,
} from '../data/catalog';
import { OrderRecord, PageId } from '../types';
import { JewelrySketch } from '../components/JewelrySketch';

interface TrackOrderPageProps {
  orders: OrderRecord[];
  selectedCode: string;
  onSelectCode: (code: string) => void;
  onNavigate: (page: PageId) => void;
}

export function TrackOrderPage({
  orders,
  selectedCode,
  onSelectCode,
  onNavigate,
}: TrackOrderPageProps) {
  const [query, setQuery] = useState(selectedCode || orders[0]?.code || 'EE-2026-0001');

  useEffect(() => {
    if (selectedCode) {
      setQuery(selectedCode);
    }
  }, [selectedCode]);

  const normalized = query.trim().toUpperCase();
  const matchedOrder = orders.find((o) => o.code.toUpperCase() === normalized);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSelectCode(query.trim().toUpperCase());
  };

  const currentStepIndex = matchedOrder
    ? ORDER_STATUS_STEPS.findIndex((s) => s.key === matchedOrder.status)
    : -1;

  return (
    <div className="flex-1 max-w-[1000px] w-full mx-auto px-4 lg:px-6 py-8 lg:py-12 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <span className="font-label text-[12px] font-medium text-on-surface-variant">
          Acompanhamento em tempo real · Lote #14
        </span>
        <h1 className="font-headline text-[28px] lg:text-[36px] font-semibold text-on-surface">
          Acompanhar pedido
        </h1>
        <p className="font-body text-[15px] text-on-surface-variant max-w-prose">
          Insere o teu código único (ex.: EE-2026-0001) para ver em que fase está a tua peça.
        </p>
      </div>

      {/* Search Form */}
      <div className="bg-surface-container rounded-[20px] border border-outline-variant p-4 lg:p-6 shadow-sm flex flex-col gap-4">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <label className="relative flex-1">
            <span className="sr-only">Código do pedido</span>
            <Search
              className="w-4 h-4 text-on-surface-variant absolute left-4 top-1/2 -translate-y-1/2"
              aria-hidden="true"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ex.: EE-2026-0001"
              className="w-full rounded-full bg-surface border border-outline-variant pl-10 pr-4 py-3 text-[15px] text-on-surface uppercase tabular-nums focus:border-gold focus:ring-2 focus:ring-gold/30 focus:outline-none"
            />
          </label>
          <button
            type="submit"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-on-primary border border-gold/50 hover:bg-on-surface transition-colors font-label text-[15px] font-semibold shrink-0"
          >
            Consultar
          </button>
        </form>

        <div className="flex flex-wrap items-center gap-2 text-[13px]">
          <span className="text-on-surface-variant">Pedidos recentes:</span>
          {orders.slice(0, 4).map((o) => (
            <button
              key={o.code}
              type="button"
              onClick={() => {
                setQuery(o.code);
                onSelectCode(o.code);
              }}
              className={`px-3 py-1 rounded-full border font-label text-[12px] font-medium tabular-nums transition-colors ${
                matchedOrder?.code === o.code
                  ? 'bg-primary text-on-primary border-gold/60'
                  : 'bg-surface border-outline-variant text-on-surface hover:border-gold'
              }`}
            >
              {o.code}
            </button>
          ))}
        </div>
      </div>

      {matchedOrder ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Status Timeline */}
          <div className="lg:col-span-7 bg-surface-container rounded-[20px] border border-outline-variant p-6 shadow-sm flex flex-col gap-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-outline-variant pb-4">
              <div>
                <span className="font-label text-[12px] font-medium text-on-surface-variant">
                  Código {matchedOrder.code} · Lote #{matchedOrder.batchNumber}
                </span>
                <h2 className="font-title text-[20px] font-semibold text-on-surface">
                  {ORDER_STATUS_STEPS[currentStepIndex]?.label}
                </h2>
              </div>
              <span className="px-3 py-1 rounded-full bg-gold-tint text-on-gold-tint border border-gold/40 font-label text-[12px] font-medium">
                {matchedOrder.customerName}
              </span>
            </div>

            <ol className="flex flex-col gap-4">
              {ORDER_STATUS_STEPS.map((step, index) => {
                const isDone = index <= currentStepIndex;
                const isCurrent = index === currentStepIndex;
                return (
                  <li key={step.key} className="flex items-start gap-3.5">
                    <span
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-full border shrink-0 mt-0.5 ${
                        isDone
                          ? 'bg-primary text-gold-light border-gold/60'
                          : 'bg-surface border-outline-variant text-outline'
                      }`}
                    >
                      {isDone ? (
                        <Check className="w-4 h-4" aria-hidden="true" />
                      ) : (
                        <Clock className="w-4 h-4" aria-hidden="true" />
                      )}
                    </span>
                    <div className="flex flex-col gap-0.5">
                      <span
                        className={`font-title text-[15px] font-semibold ${
                          isCurrent
                            ? 'text-on-surface'
                            : isDone
                              ? 'text-on-surface'
                              : 'text-on-surface-variant'
                        }`}
                      >
                        {step.label}
                      </span>
                      <span className="font-body text-[13px] text-on-surface-variant">
                        {step.description}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Piece & Payment Details */}
          <aside className="lg:col-span-5 bg-surface-container rounded-[20px] border border-outline-variant p-6 shadow-sm flex flex-col gap-4">
            <h3 className="font-title text-[16px] font-semibold text-on-surface">
              Detalhes da peça
            </h3>

            <div className="rounded-[12px] bg-surface-container-low border border-outline-variant p-4 flex flex-col items-center">
              <JewelrySketch config={matchedOrder.config} compact idSuffix="track" />
            </div>

            <dl className="flex flex-col gap-2 text-[14px]">
              <div className="flex justify-between gap-2 py-1 border-b border-outline-variant">
                <dt className="text-on-surface-variant">Peça</dt>
                <dd className="font-semibold text-on-surface">
                  {getPieceLabel(matchedOrder.config.piece)} ({matchedOrder.config.qty}x)
                </dd>
              </div>
              <div className="flex justify-between gap-2 py-1 border-b border-outline-variant">
                <dt className="text-on-surface-variant">Acabamento</dt>
                <dd className="font-semibold text-on-surface">{matchedOrder.config.finish}</dd>
              </div>
              <div className="flex justify-between gap-2 py-1 border-b border-outline-variant">
                <dt className="text-on-surface-variant">1.ª prestação (50%)</dt>
                <dd className="font-semibold text-success tabular-nums">
                  {matchedOrder.depositAmount
                    ? `${formatKz(matchedOrder.depositAmount)} (${matchedOrder.paymentMethod})`
                    : 'A confirmar'}
                </dd>
              </div>
              <div className="flex justify-between gap-2 py-1 border-b border-outline-variant">
                <dt className="text-on-surface-variant">Na entrega (50%)</dt>
                <dd className="font-semibold text-on-surface tabular-nums">
                  {matchedOrder.depositAmount ? formatKz(matchedOrder.depositAmount) : 'A confirmar'}
                </dd>
              </div>
              <div className="flex justify-between gap-2 py-1">
                <dt className="text-on-surface-variant">Zona de entrega</dt>
                <dd className="font-semibold text-on-surface">{matchedOrder.neighborhood}</dd>
              </div>
            </dl>

            <a
              href={`https://wa.me/244946599662?text=${encodeURIComponent(
                `Olá Essência Eterna! Gostaria de saber novidades sobre o pedido ${matchedOrder.code}.`,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full bg-transparent text-on-surface border border-primary/30 hover:border-primary hover:bg-secondary/60 transition-colors font-label text-[14px] font-semibold"
            >
              <MessageCircle className="w-4 h-4 text-gold" aria-hidden="true" />
              <span>Falar sobre este pedido</span>
            </a>
          </aside>
        </div>
      ) : (
        <div className="bg-surface-container rounded-[20px] border border-outline-variant p-8 text-center flex flex-col items-center gap-3">
          <h2 className="font-title text-[18px] font-semibold text-on-surface">
            Código não encontrado
          </h2>
          <p className="font-body text-[14px] text-on-surface-variant max-w-md">
            Verifica se escreveste o código corretamente (por exemplo, EE-2026-0001) ou cria uma nova peça personalizada.
          </p>
          <button
            type="button"
            onClick={() => onNavigate('personalizar')}
            className="mt-2 px-6 py-3 rounded-full bg-primary text-on-primary border border-gold/50 font-label text-[14px] font-semibold"
          >
            Criar nova peça
          </button>
        </div>
      )}
    </div>
  );
}
