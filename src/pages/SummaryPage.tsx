import { FormEvent, useState } from 'react';
import {
  ArrowLeft,
  BadgeCheck,
  Check,
  Copy,
  MessageCircle,
  Upload,
} from 'lucide-react';
import {
  FONT_STYLES,
  formatKz,
  getPieceLabel,
  getPiecePrice,
} from '../data/catalog';
import {
  OrderConfig,
  OrderRecord,
  PageId,
  PaymentMethod,
} from '../types';
import { JewelrySketch } from '../components/JewelrySketch';

interface SummaryPageProps {
  config: OrderConfig;
  batchOpen: boolean;
  onNavigate: (page: PageId) => void;
  onCreateOrder: (order: Omit<OrderRecord, 'code' | 'batchNumber' | 'createdAt' | 'status'>) => OrderRecord;
  onSelectTrackingCode: (code: string) => void;
}

export function SummaryPage({
  config,
  batchOpen,
  onNavigate,
  onCreateOrder,
  onSelectTrackingCode,
}: SummaryPageProps) {
  const [customerName, setCustomerName] = useState('');
  const [whatsapp, setWhatsapp] = useState('+244 ');
  const [neighborhood, setNeighborhood] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Multicaixa Express');
  const [receiptRef, setReceiptRef] = useState('');
  const [receiptFileName, setReceiptFileName] = useState('');
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [copiedIban, setCopiedIban] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<OrderRecord | null>(null);

  const unitPrice = getPiecePrice(config.piece);
  const totalPrice = unitPrice ? unitPrice * config.qty : null;
  const depositAmount = totalPrice ? totalPrice / 2 : null;
  const showStone = config.piece === 'mascote' || config.size === 'Criança';
  const pieceLabel = getPieceLabel(config.piece);
  const fontLabel = FONT_STYLES.find((f) => f.id === config.fontId)?.label || config.fontId;

  const ibanText = 'AO06 0040 0000 8491 2205 1013 4';

  const handleCopyIban = () => {
    navigator.clipboard?.writeText(ibanText).catch(() => {});
    setCopiedIban(true);
    setTimeout(() => setCopiedIban(false), 2000);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setErrorMsg('Indica o teu nome completo para registarmos o pedido.');
      return;
    }
    if (whatsapp.replace(/\D/g, '').length < 9) {
      setErrorMsg('Indica um número de WhatsApp válido (ex.: +244 9XX XXX XXX).');
      return;
    }
    if (!neighborhood.trim()) {
      setErrorMsg('Indica o bairro ou zona de entrega em Luanda.');
      return;
    }

    setErrorMsg('');
    const order = onCreateOrder({
      customerName: customerName.trim(),
      whatsapp: whatsapp.trim(),
      neighborhood: neighborhood.trim(),
      paymentMethod,
      receiptRef: receiptRef.trim() || receiptFileName || 'Comprovativo pendente',
      notes: notes.trim() || undefined,
      config: { ...config, approved: true },
      unitPrice,
      totalPrice,
      depositAmount,
    });
    setCreatedOrder(order);
  };

  if (createdOrder) {
    const waText = encodeURIComponent(
      `Olá Essência Eterna! Acabei de registar o pedido ${createdOrder.code} (${getPieceLabel(
        createdOrder.config.piece,
      )} — "${createdOrder.config.name}", ${createdOrder.config.finish}). Segue o comprovativo da 1.ª prestação (${
        createdOrder.depositAmount ? formatKz(createdOrder.depositAmount) : 'a confirmar'
      }).`,
    );

    return (
      <div className="flex-1 max-w-[880px] w-full mx-auto px-4 lg:px-6 py-8 lg:py-12">
        <div className="bg-surface-container rounded-[20px] border border-gold/60 p-6 lg:p-8 shadow-sm flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant pb-6">
            <div className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-success-container text-on-success-container shrink-0">
                <Check className="w-6 h-6" aria-hidden="true" />
              </span>
              <div>
                <span className="font-label text-[12px] font-medium text-success">
                  Pedido registado no Lote #{createdOrder.batchNumber}
                </span>
                <h1 className="font-headline text-[26px] lg:text-[32px] font-semibold text-on-surface">
                  O teu código é {createdOrder.code}
                </h1>
              </div>
            </div>
            <span className="font-label text-[13px] font-semibold px-3.5 py-1.5 rounded-full bg-gold-tint text-on-gold-tint border border-gold/40 tabular-nums self-start sm:self-center">
              {createdOrder.totalPrice ? formatKz(createdOrder.totalPrice) : 'Sob consulta'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-5 rounded-[12px] bg-surface-container-low border border-outline-variant p-4 flex flex-col items-center">
              <JewelrySketch config={createdOrder.config} compact idSuffix="confirmed" />
            </div>

            <div className="md:col-span-7 flex flex-col gap-3 text-[14px]">
              <div className="flex justify-between gap-2 py-1.5 border-b border-outline-variant">
                <span className="text-on-surface-variant">Cliente</span>
                <span className="font-semibold text-on-surface">{createdOrder.customerName}</span>
              </div>
              <div className="flex justify-between gap-2 py-1.5 border-b border-outline-variant">
                <span className="text-on-surface-variant">Peça & Acabamento</span>
                <span className="font-semibold text-on-surface">
                  {getPieceLabel(createdOrder.config.piece)} · {createdOrder.config.finish}
                </span>
              </div>
              <div className="flex justify-between gap-2 py-1.5 border-b border-outline-variant">
                <span className="text-on-surface-variant">Gravação</span>
                <span className="font-semibold text-on-surface">
                  {createdOrder.config.name} ({createdOrder.config.fontId})
                </span>
              </div>
              <div className="flex justify-between gap-2 py-1.5 border-b border-outline-variant">
                <span className="text-on-surface-variant">1.ª prestação (50%)</span>
                <span className="font-semibold text-on-surface tabular-nums">
                  {createdOrder.depositAmount
                    ? `${formatKz(createdOrder.depositAmount)} · ${createdOrder.paymentMethod}`
                    : 'A confirmar'}
                </span>
              </div>
              <div className="flex justify-between gap-2 py-1.5">
                <span className="text-on-surface-variant">Entrega</span>
                <span className="font-semibold text-on-surface">{createdOrder.neighborhood}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                onSelectTrackingCode(createdOrder.code);
                onNavigate('acompanhar');
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-primary text-on-primary border border-gold/50 hover:bg-on-surface transition-colors"
            >
              <span className="font-label text-[15px] font-semibold">Acompanhar pedido</span>
            </button>
            <a
              href={`https://wa.me/244946599662?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-transparent text-on-surface border border-primary/30 hover:border-primary hover:bg-secondary/60 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-gold" aria-hidden="true" />
              <span className="font-label text-[15px] font-semibold">Enviar comprovativo no WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 max-w-[1200px] w-full mx-auto px-4 lg:px-6 py-6 lg:py-8">
      <div className="flex flex-col gap-2 mb-6 lg:mb-8">
        <button
          type="button"
          onClick={() => onNavigate('personalizar')}
          className="self-start inline-flex items-center gap-1.5 text-[14px] font-label font-medium text-on-surface-variant hover:text-on-surface"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Voltar ao personalizador</span>
        </button>
        <h1 className="font-headline text-[28px] lg:text-[36px] font-semibold text-on-surface">
          Resumo e confirmação do pedido
        </h1>
        <p className="font-body text-[15px] text-on-surface-variant">
          Confirma os detalhes do teu esboço e indica os dados de entrega em Luanda para gerar o teu número de pedido.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left: Approved Sketch & Spec Summary */}
        <aside className="lg:col-span-5 bg-surface-container rounded-[20px] border border-outline-variant p-6 shadow-sm flex flex-col gap-5">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-title text-[18px] font-semibold text-on-surface">A tua peça</h2>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-success-container text-on-success-container text-[12px] font-label font-medium">
              <BadgeCheck className="w-3.5 h-3.5" aria-hidden="true" />
              Esboço pronto
            </span>
          </div>

          <div className="rounded-[12px] bg-surface-container-low border border-outline-variant p-4 flex flex-col items-center">
            <JewelrySketch config={config} compact idSuffix="summary" />
          </div>

          <dl className="flex flex-col gap-2.5 text-[14px]">
            <div className="flex justify-between gap-2 py-1 border-b border-outline-variant">
              <dt className="text-on-surface-variant">Modelo</dt>
              <dd className="font-semibold text-on-surface">{pieceLabel}</dd>
            </div>
            <div className="flex justify-between gap-2 py-1 border-b border-outline-variant">
              <dt className="text-on-surface-variant">Para quem</dt>
              <dd className="font-semibold text-on-surface">
                {config.gender} · {config.size}
              </dd>
            </div>
            <div className="flex justify-between gap-2 py-1 border-b border-outline-variant">
              <dt className="text-on-surface-variant">Acabamento</dt>
              <dd className="font-semibold text-on-surface">Aço inox {config.finish.toLowerCase()}</dd>
            </div>
            <div className="flex justify-between gap-2 py-1 border-b border-outline-variant">
              <dt className="text-on-surface-variant">Nome gravado</dt>
              <dd className="font-semibold text-on-surface">{config.name || 'O teu nome'}</dd>
            </div>
            <div className="flex justify-between gap-2 py-1 border-b border-outline-variant">
              <dt className="text-on-surface-variant">Estilo de letra</dt>
              <dd className="font-semibold text-on-surface">{fontLabel}</dd>
            </div>
            {showStone && (
              <div className="flex justify-between gap-2 py-1 border-b border-outline-variant">
                <dt className="text-on-surface-variant">Pedra</dt>
                <dd className="font-semibold text-on-surface">{config.stone}</dd>
              </div>
            )}
            <div className="flex justify-between gap-2 py-1">
              <dt className="text-on-surface-variant">Quantidade</dt>
              <dd className="font-semibold text-on-surface tabular-nums">{config.qty}</dd>
            </div>
          </dl>

          <div className="rounded-[12px] bg-surface-container-low border border-outline-variant p-4 flex flex-col gap-2">
            <div className="flex justify-between text-[14px] text-on-surface-variant">
              <span>Total da encomenda</span>
              <span className="font-semibold text-on-surface tabular-nums">
                {totalPrice ? formatKz(totalPrice) : 'Preço sob consulta'}
              </span>
            </div>
            <div className="flex justify-between text-[15px] font-semibold text-on-surface">
              <span>1.ª prestação (50% agora)</span>
              <span className="text-on-gold-tint bg-gold-tint px-2 py-0.5 rounded-[8px] tabular-nums">
                {depositAmount ? formatKz(depositAmount) : 'A confirmar'}
              </span>
            </div>
            <div className="flex justify-between text-[13px] text-on-surface-variant">
              <span>2.ª prestação (na entrega)</span>
              <span className="tabular-nums">
                {depositAmount ? formatKz(depositAmount) : 'A confirmar'}
              </span>
            </div>
          </div>
        </aside>

        {/* Right: Customer & Payment Form */}
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-7 bg-surface-container rounded-[20px] border border-outline-variant p-6 shadow-sm flex flex-col gap-5"
        >
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-title text-[20px] font-semibold text-on-surface">
              Dados de entrega e 1.ª prestação
            </h2>
            <span className="font-label text-[12px] font-medium px-3 py-1 rounded-full bg-primary text-gold-light">
              {batchOpen ? 'Lote #14 aberto' : 'Lista do próximo lote'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="font-label text-[13px] font-medium text-on-surface">
                Nome completo
              </span>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Ex.: Miriam Manuel"
                className="w-full rounded-[12px] bg-surface border border-outline-variant px-4 py-3 text-[15px] text-on-surface focus:border-gold focus:ring-2 focus:ring-gold/30 focus:outline-none"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="font-label text-[13px] font-medium text-on-surface">
                WhatsApp para contacto
              </span>
              <input
                type="tel"
                required
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="+244 923 000 000"
                className="w-full rounded-[12px] bg-surface border border-outline-variant px-4 py-3 text-[15px] text-on-surface tabular-nums focus:border-gold focus:ring-2 focus:ring-gold/30 focus:outline-none"
              />
            </label>
          </div>

          <label className="flex flex-col gap-1.5">
            <span className="font-label text-[13px] font-medium text-on-surface">
              Bairro / Ponto de entrega em Luanda
            </span>
            <input
              type="text"
              required
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
              placeholder="Ex.: Tala Hadi, Maianga, Kilamba, Talatona..."
              className="w-full rounded-[12px] bg-surface border border-outline-variant px-4 py-3 text-[15px] text-on-surface focus:border-gold focus:ring-2 focus:ring-gold/30 focus:outline-none"
            />
          </label>

          <div className="flex flex-col gap-2">
            <span className="font-label text-[13px] font-medium text-on-surface">
              Como vais pagar a 1.ª prestação (50%)?
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(['Multicaixa Express', 'IBAN'] as PaymentMethod[]).map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setPaymentMethod(method)}
                  className={`p-4 rounded-[12px] text-left transition-colors ${
                    paymentMethod === method
                      ? 'border-2 border-primary bg-gold-tint/35'
                      : 'border border-outline-variant bg-surface hover:border-gold'
                  }`}
                >
                  <div className="font-title text-[15px] font-semibold text-on-surface">
                    {method === 'IBAN' ? 'Transferência (IBAN)' : 'Multicaixa Express'}
                  </div>
                  <div className="font-body text-[13px] text-on-surface-variant mt-0.5 tabular-nums">
                    {method === 'IBAN' ? 'BAI · Confirmação rápida' : '+244 946 599 662'}
                  </div>
                </button>
              ))}
            </div>

            {paymentMethod === 'IBAN' ? (
              <div className="rounded-[12px] bg-surface-container-low border border-outline-variant p-3.5 flex flex-wrap items-center justify-between gap-2 text-[13px]">
                <div>
                  <span className="text-on-surface-variant block">IBAN Essência Eterna (BAI)</span>
                  <span className="font-semibold text-on-surface tabular-nums">{ibanText}</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyIban}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container border border-outline-variant text-[12px] font-label font-medium hover:border-gold"
                >
                  {copiedIban ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedIban ? 'Copiado' : 'Copiar IBAN'}</span>
                </button>
              </div>
            ) : (
              <div className="rounded-[12px] bg-surface-container-low border border-outline-variant p-3.5 text-[13px] text-on-surface-variant">
                Envia a 1.ª prestação por Multicaixa Express para{' '}
                <strong className="text-on-surface tabular-nums">+244 946 599 662</strong> (Essência Eterna).
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="font-label text-[13px] font-medium text-on-surface">
                Referência do comprovativo (opcional)
              </span>
              <input
                type="text"
                value={receiptRef}
                onChange={(e) => setReceiptRef(e.target.value)}
                placeholder="Ex.: MCX-91042"
                className="w-full rounded-[12px] bg-surface border border-outline-variant px-4 py-3 text-[15px] text-on-surface focus:border-gold focus:ring-2 focus:ring-gold/30 focus:outline-none"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="font-label text-[13px] font-medium text-on-surface">
                Anexar comprovativo (opcional)
              </span>
              <div className="relative flex items-center gap-2 rounded-[12px] bg-surface border border-outline-variant px-4 py-3 text-[14px] text-on-surface-variant hover:border-gold cursor-pointer">
                <Upload className="w-4 h-4 text-gold shrink-0" aria-hidden="true" />
                <span className="truncate">
                  {receiptFileName || 'Selecionar imagem ou PDF'}
                </span>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => setReceiptFileName(e.target.files?.[0]?.name || '')}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </label>
          </div>

          <label className="flex flex-col gap-1.5">
            <span className="font-label text-[13px] font-medium text-on-surface">
              Observações para a bancada (opcional)
            </span>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex.: Embalagem para presente ou preferência de comprimento."
              className="w-full rounded-[12px] bg-surface border border-outline-variant px-4 py-2.5 text-[15px] text-on-surface focus:border-gold focus:ring-2 focus:ring-gold/30 focus:outline-none"
            />
          </label>

          {errorMsg && (
            <p role="alert" className="text-[14px] font-medium text-error bg-error-container px-4 py-2.5 rounded-[12px]">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-full bg-primary text-on-primary border border-gold/50 hover:bg-on-surface transition-colors shadow-sm"
          >
            <span className="font-label text-[15px] font-semibold">
              Confirmar pedido e gerar código
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
