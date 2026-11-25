import { useState } from 'react';
import { Eye, Lock, Unlock } from 'lucide-react';
import {
  ORDER_STATUS_STEPS,
  formatKz,
  getPieceLabel,
} from '../data/catalog';
import { OrderRecord, OrderStatus, PageId } from '../types';

interface AdminPageProps {
  orders: OrderRecord[];
  batchOpen: boolean;
  onToggleBatch: () => void;
  onUpdateStatus: (code: string, status: OrderStatus) => void;
  onInspectOrder: (code: string) => void;
  onNavigate: (page: PageId) => void;
}

export function AdminPage({
  orders,
  batchOpen,
  onToggleBatch,
  onUpdateStatus,
  onInspectOrder,
  onNavigate,
}: AdminPageProps) {
  const [statusFilter, setStatusFilter] = useState<'todos' | OrderStatus>('todos');

  const filteredOrders =
    statusFilter === 'todos' ? orders : orders.filter((o) => o.status === statusFilter);

  const totalDeposits = orders.reduce((acc, o) => acc + (o.depositAmount || 0), 0);
  const totalPendingDelivery = orders.reduce(
    (acc, o) => acc + (o.totalPrice && o.depositAmount ? o.totalPrice - o.depositAmount : 0),
    0,
  );

  return (
    <div className="flex-1 max-w-[1200px] w-full mx-auto px-4 lg:px-6 py-8 flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="font-label text-[12px] font-medium text-on-surface-variant">
            Painel da loja · Gestão de lotes manuais
          </span>
          <h1 className="font-headline text-[28px] lg:text-[36px] font-semibold text-on-surface">
            Lote #14 — Encomendas
          </h1>
        </div>

        <button
          type="button"
          onClick={onToggleBatch}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border font-label text-[14px] font-semibold transition-colors self-start md:self-auto ${
            batchOpen
              ? 'bg-primary text-gold-light border-gold/60 hover:bg-on-surface'
              : 'bg-surface-container text-on-surface border-outline-variant hover:border-gold'
          }`}
        >
          {batchOpen ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
          <span>{batchOpen ? 'Fechar Lote #14' : 'Reabrir Lote #14'}</span>
        </button>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-surface-container rounded-[20px] border border-outline-variant p-5 flex flex-col gap-1">
          <span className="font-label text-[12px] font-medium text-on-surface-variant">
            Peças no Lote #14
          </span>
          <span className="font-headline text-[28px] font-semibold text-on-surface tabular-nums">
            {orders.reduce((sum, o) => sum + o.config.qty, 0)}
          </span>
        </div>
        <div className="bg-surface-container rounded-[20px] border border-outline-variant p-5 flex flex-col gap-1">
          <span className="font-label text-[12px] font-medium text-on-surface-variant">
            1.ª prestação (50% entrada)
          </span>
          <span className="font-headline text-[28px] font-semibold text-on-surface tabular-nums">
            {formatKz(totalDeposits)}
          </span>
        </div>
        <div className="bg-surface-container rounded-[20px] border border-outline-variant p-5 flex flex-col gap-1">
          <span className="font-label text-[12px] font-medium text-on-surface-variant">
            Saldo na entrega (50%)
          </span>
          <span className="font-headline text-[28px] font-semibold text-on-surface tabular-nums">
            {formatKz(totalPendingDelivery)}
          </span>
        </div>
      </div>

      {/* Status Filter */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setStatusFilter('todos')}
          className={`px-4 py-2 rounded-full font-label text-[13px] font-medium border transition-colors ${
            statusFilter === 'todos'
              ? 'bg-primary text-on-primary border-gold/60'
              : 'bg-surface-container text-on-surface border-outline-variant hover:border-gold'
          }`}
        >
          Todas ({orders.length})
        </button>
        {ORDER_STATUS_STEPS.map((st) => {
          const count = orders.filter((o) => o.status === st.key).length;
          return (
            <button
              key={st.key}
              type="button"
              onClick={() => setStatusFilter(st.key)}
              className={`px-4 py-2 rounded-full font-label text-[13px] font-medium border transition-colors ${
                statusFilter === st.key
                  ? 'bg-primary text-on-primary border-gold/60'
                  : 'bg-surface-container text-on-surface border-outline-variant hover:border-gold'
              }`}
            >
              {st.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Orders List */}
      <div className="bg-surface-container rounded-[20px] border border-outline-variant overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant bg-surface-container-low text-[12px] font-label font-medium text-on-surface-variant">
                <th className="py-3.5 px-4">Código</th>
                <th className="py-3.5 px-4">Cliente</th>
                <th className="py-3.5 px-4">Peça & Gravação</th>
                <th className="py-3.5 px-4">Valor</th>
                <th className="py-3.5 px-4">Estado no lote</th>
                <th className="py-3.5 px-4 text-right">Ver</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant text-[14px]">
              {filteredOrders.map((order) => (
                <tr key={order.code} className="hover:bg-surface/60">
                  <td className="py-3.5 px-4 font-semibold text-on-surface tabular-nums whitespace-nowrap">
                    {order.code}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-medium text-on-surface">{order.customerName}</div>
                    <div className="text-[12px] text-on-surface-variant">{order.neighborhood}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-medium text-on-surface">
                      {getPieceLabel(order.config.piece)} · “{order.config.name}”
                    </div>
                    <div className="text-[12px] text-on-surface-variant">
                      {order.config.finish} · {order.config.fontId} · {order.config.qty}x
                    </div>
                  </td>
                  <td className="py-3.5 px-4 tabular-nums whitespace-nowrap">
                    <div className="font-semibold text-on-surface">
                      {order.totalPrice ? formatKz(order.totalPrice) : 'Sob consulta'}
                    </div>
                    <div className="text-[12px] text-on-surface-variant">
                      {order.paymentMethod}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <select
                      aria-label={`Estado do pedido ${order.code}`}
                      value={order.status}
                      onChange={(e) => onUpdateStatus(order.code, e.target.value as OrderStatus)}
                      className="rounded-[10px] bg-surface border border-outline-variant px-3 py-1.5 text-[13px] font-medium text-on-surface focus:border-gold focus:outline-none"
                    >
                      {ORDER_STATUS_STEPS.map((st) => (
                        <option key={st.key} value={st.key}>
                          {st.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => {
                        onInspectOrder(order.code);
                        onNavigate('acompanhar');
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-outline-variant hover:border-gold text-[12px] font-label font-medium text-on-surface"
                    >
                      <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Seguir</span>
                    </button>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-on-surface-variant">
                    Sem encomendas neste estado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
