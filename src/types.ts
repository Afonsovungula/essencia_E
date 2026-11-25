export type PageId = 'inicio' | 'pecas' | 'personalizar' | 'resumo' | 'acompanhar' | 'admin';

export type PieceType = 'colar' | 'mascote' | 'pulseira';

export type FinishType = 'Prateado' | 'Dourado';

export type SizeType = 'Criança' | 'Adulto';

export type GenderType = 'Feminino' | 'Masculino';

export type FontStyleId = 'B01' | 'B02' | 'B03' | 'B08' | 'B15' | 'B20';

export type StoneName = 'Rosa' | 'Azul' | 'Branco' | 'Vermelho' | 'Verde' | 'Roxo';

export type PaymentMethod = 'IBAN' | 'Multicaixa Express';

export type OrderStatus =
  | 'pedido_recebido'
  | 'entrada_confirmada'
  | 'lote_fechado'
  | 'em_producao'
  | 'pronto_entrega';

export interface OrderConfig {
  piece: PieceType;
  gender: GenderType;
  size: SizeType;
  finish: FinishType;
  name: string;
  fontId: FontStyleId;
  fontFamily: string;
  stone: StoneName;
  qty: number;
  approved: boolean;
  occasion?: string;
}

export interface OrderRecord {
  code: string;
  batchNumber: number;
  createdAt: string;
  customerName: string;
  whatsapp: string;
  neighborhood: string;
  paymentMethod: PaymentMethod;
  receiptRef: string;
  notes?: string;
  status: OrderStatus;
  config: OrderConfig;
  unitPrice: number | null;
  totalPrice: number | null;
  depositAmount: number | null;
}
