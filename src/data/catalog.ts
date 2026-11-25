import { FontStyleId, OrderConfig, OrderRecord, OrderStatus, PieceType, StoneName } from '../types';

export const STITCH_IMAGES = {
  heroJewelry:
    'https://lh3.googleusercontent.com/aida/ALJJyrBLrWRq_zqgR8TGCLs5fcsMosFW5ELEYS_WLDz5znPc5vydboY4t2zbw7xR1l7ETtnHL4AwFDWsZLJoEsmLiWGjf5zVKKdMVV4U3iJ4ryP46oQ54kSjFo4jtrLpLHejM1ao9j20waUYf12cCKRIUluPINO9oweReh1agiJx-lCUM3ghd-jWrDqLlmvQXSFehnxIoNcxVE3d9dkvnZJBXf131P6RMJQqxJhMDoiOLG2uexf_Pu3_',
  colarPrateado:
    'https://lh3.googleusercontent.com/aida/ALJJyrD_lppCbYLkjnuerhFj1B5CIcfG8OQJat2mJfSuRqUuDWsckmQ3inKu9t28ry2vpuMNh021PAUl-PTQQkI7Gd_-M5n9gxhnaWLKJfzETHHWUEJJFx_2PGH2qykT2GJf3ZVbTmIlgvMG8Jy6EmpPX6LNmu9cGOyAx19xcZZAm-hBZi-OsL_JVJfbtq6TlJuDWj755CraSOebYqlsjydEeFnQ0fe9wSwtIJL1jB1YzI0ujNopHqryo6qHoe4',
  mascoteBebe:
    'https://lh3.googleusercontent.com/aida/ALJJyrBTOjQrGgs32hJob790X9iuHRuRh_o3Kiszg3eaavMCwvCyEWJi3bZeY6V4l9LeYHhJmfruHF0wBT2R6bWC9au63O_I8yE1BhZotELIEkwdeVbarexZdtyeE7_dxnHFhon1_Q1JWDQPj9rxBpYndT6UjP20d_32ZFfOfw4TryPtI52q627tnPiFTBRqNkV3S1UMVto0LBUcWGdof4PKDvWwLKl7uNO7Rd5b6-tnLj0ezHpFI-QPelLngFc',
  galleryBabyWrist:
    'https://lh3.googleusercontent.com/aida/ALJJyrDvgpoZP6WBXDnl0Q3wq34vu9BaZYjBiahFKle64PUQAeg5fzSfWxEWf6uOgclQz8CBj1nDp1nWSDLc0U5rFyxo3V2aR9xYvjEmhWsWKctcMyFSt5mLcIhWUB8t7WiGNz_oh8nIhiV21tQYwOmjjP7mBFGaxungc86VxqhyYK2Rv3ayHdbg97XXugjqon_36wjwdHtKR6bFbt8d8fIImQyAlcHkM9SGoxD0ubDaiicO9OsUUqcFUBm3e_cCuA',
  galleryGiftBox:
    'https://lh3.googleusercontent.com/aida/ALJJyrDAJ_4yee-wifLErLy7ls3pHVUsFGfuSaePZGfZKp2rqqKJfMxA2hmzfD4SYCRVuiWs_aDeCPF5Wwz7PQsmVS7wMmneOgWuXgDWSzdRnGlyJcqAydla85LPbADmXiOWTHega_ceHT0p71L2EMhVwCxAagmyUB4_vZq9hraILQV30NCi119Ah39dCLTc5J2LkZ_KK2EqY53QsUbyVkfiAMGDWIhZZi5mX3w6m_EJq7TCYh2AAvTfcIU5jRI',
  galleryWorkshop:
    'https://lh3.googleusercontent.com/aida/ALJJyrCftr2hf9bW7mhpcoEtDKKA3bz3xXXSPRr4KwtMUMZd0G9mZmmd7eVY0xZc2M8w7pqslLNlnUpi4DNyX1dFIATubn8s2mzIX7lej8LOPdangSIMDKW59txHeRuJGO3ioIarisM4xq_odIeiq8v1tFeS6dI2chrpC_kQBws6Facy9Xtgk7ZNLZheKYY5pk1S1nxWeHj-nNBjS8eiYLIlT30I6T3JPRgstxUjRotWTH8PT9tYez8OM9n8EA',
  galleryDelivery:
    'https://lh3.googleusercontent.com/aida/ALJJyrDK_MF6T5Nq1uhS-04_c-KLpWEdNoRgHVbwTQ2ewDYu5gt3MEN-qeAx-fo-hbtlP1arcy6xYrDyx3ZNp9EAPsXN9aVJbQqkDFXSoBC462tL_R_s5F5krvn_g7F8lehHFbwjRMnngaAFCCApuP3u1dJOPfIPgT6CLTyFHdGEI7hBvYtHWCOwqPNjWmncT8u1hSu0MvuGPfM4_-0iJvwEtha-HWelS5HW7KTXGPVXT-uEJeeBoTChMyhLg0k',
  aboutMaker:
    'https://lh3.googleusercontent.com/aida/ALJJyrABVPsaDIZjOb-9hAFbRVeWPsYfyklLvEXiYE9TdWiWVirfR9NBWggbGR4pQdKjwy0xs0Rh3pyvnuQcDI70Q1bJgfCYdEPC3oLxBagEOtFbFO4g3oVPWhZ5u3Vf-116bPLYiGV_bjIjqgHGHlXHd_xJVUKJaYL88MkgS8fz_8HHZyI9sOklnpE0Ys38Nb-8bHRUCBYH6p4uEPld5ItbpW6p9O0yrTfeYVRzZXphxRVO5k0U5NQ',
  footerLogo:
    'https://lh3.googleusercontent.com/aida/ALJJyrAjvo7lyQIEfl5SetGNeF7knNiydud8r8jIm5gnjpBazSxThY-k3cCpK49subaLqH7vwLQXE-znNVkcPSPkfcWuvrxyZG6rEq78lBXvvLH0iUnBeJNlqLmlrFEvTrcR5cxEjt4W14J6YSZAqp7iHPa-09CqyV3YDPcprCWFZnWvsM_GbjvmZGioWQzOY1OgxromTGo9azmvnA0k9hxUVBTpr2TFsyrjNHc881p50WOrh1I9_wmzbP8jaaI',
} as const;

export interface CatalogItem {
  id: PieceType;
  title: string;
  subtitle: string;
  description: string;
  price: number | null;
  priceLabel: string;
  depositLabel: string;
  image: string;
  imageAlt: string;
  badgeText: string;
  badgeVariant: 'silver' | 'gold' | 'dark';
  finishes: Array<'Prateado' | 'Dourado'>;
  audiences: Array<'Adulto' | 'Criança'>;
  audienceLabel: string;
  defaultFinish: 'Prateado' | 'Dourado';
  defaultSize: 'Adulto' | 'Criança';
}

export const CATALOG_ITEMS: CatalogItem[] = [
  {
    id: 'colar',
    title: 'Colar com nome',
    subtitle: 'Com 1 ou 2 nomes · Prateado ou aço inox dourado',
    description:
      'Com 1 ou 2 nomes recortados em aço inoxidável (B01 a B21). Não escurece com água ou suor.',
    price: 7000,
    priceLabel: '7.000 Kz',
    depositLabel: '3.500 Kz entrada',
    image: STITCH_IMAGES.colarPrateado,
    imageAlt: 'Colar personalizado prateado com o nome Ricci',
    badgeText: 'Prateado ou Dourado',
    badgeVariant: 'silver',
    finishes: ['Prateado', 'Dourado'],
    audiences: ['Adulto', 'Criança'],
    audienceLabel: 'Adulto & Criança',
    defaultFinish: 'Prateado',
    defaultSize: 'Adulto',
  },
  {
    id: 'mascote',
    title: 'Mascote de bebé',
    subtitle: 'Placa gravada + pedra colorida à escolha',
    description:
      'Pulseira de identificação com chapa gravada e um pequeno berloque colorido (rosa, azul, branco, vermelho, verde ou roxo).',
    price: 8000,
    priceLabel: '8.000 Kz',
    depositLabel: '4.000 Kz entrada',
    image: STITCH_IMAGES.mascoteBebe,
    imageAlt: 'Mascote personalizada para bebé dourada com o nome Rael Manuel',
    badgeText: 'Inclui pedra colorida',
    badgeVariant: 'gold',
    finishes: ['Dourado', 'Prateado'],
    audiences: ['Criança'],
    audienceLabel: 'Bebé & Criança',
    defaultFinish: 'Dourado',
    defaultSize: 'Criança',
  },
  {
    id: 'pulseira',
    title: 'Pulseira gravada',
    subtitle: 'Corrente fina em aço prateado ou dourado',
    description:
      'Corrente fina em aço prateado ou dourado com chapa gravada à mão com nome, data ou palavra especial.',
    price: null,
    priceLabel: 'Sob consulta',
    depositLabel: '50% na entrada',
    image: STITCH_IMAGES.heroJewelry,
    imageAlt: 'Pulseira personalizada em aço inoxidável',
    badgeText: 'Aço inox',
    badgeVariant: 'dark',
    finishes: ['Prateado', 'Dourado'],
    audiences: ['Adulto'],
    audienceLabel: 'Adulto',
    defaultFinish: 'Dourado',
    defaultSize: 'Adulto',
  },
];

export interface FontStyleOption {
  id: FontStyleId;
  label: string;
  family: string;
  previewSizePx: number;
  italic?: boolean;
  semibold?: boolean;
}

export const FONT_STYLES: FontStyleOption[] = [
  { id: 'B01', label: 'B01 Clássico', family: "'Great Vibes', cursive", previewSizePx: 26 },
  { id: 'B02', label: 'B02 Suave', family: "'Dancing Script', cursive", previewSizePx: 22 },
  { id: 'B03', label: 'B03 Redondo', family: "'Pacifico', cursive", previewSizePx: 19 },
  { id: 'B08', label: 'B08 Itálico', family: "'Cormorant Garamond', serif", previewSizePx: 22, italic: true },
  { id: 'B15', label: 'B15 Editorial', family: "'Fraunces', serif", previewSizePx: 20 },
  { id: 'B20', label: 'B20 Imprensa', family: "'DM Sans', sans-serif", previewSizePx: 18, semibold: true },
];

export interface StoneOption {
  name: StoneName;
  hex: string;
  dotClass: string;
}

export const STONE_OPTIONS: StoneOption[] = [
  { name: 'Rosa', hex: '#E87A90', dotClass: 'bg-stone-pink' },
  { name: 'Azul', hex: '#4B83C3', dotClass: 'bg-stone-blue' },
  { name: 'Branco', hex: '#F5F3EE', dotClass: 'bg-stone-white border border-outline' },
  { name: 'Vermelho', hex: '#C83E3E', dotClass: 'bg-stone-red' },
  { name: 'Verde', hex: '#3B8A5A', dotClass: 'bg-stone-green' },
  { name: 'Roxo', hex: '#7E57A6', dotClass: 'bg-stone-purple' },
];

export const NAME_SUGGESTIONS = [
  'Ana & Pedro',
  'Rael Manuel',
  'Kiara Sofia',
  'Mateus & Luz',
  'Dinis Miguel',
];

export const DEFAULT_ORDER_CONFIG: OrderConfig = {
  piece: 'mascote',
  gender: 'Masculino',
  size: 'Criança',
  finish: 'Dourado',
  name: 'Rael Manuel',
  fontId: 'B01',
  fontFamily: "'Great Vibes', cursive",
  stone: 'Rosa',
  qty: 1,
  approved: false,
};

export const ORDER_STATUS_STEPS: Array<{
  key: OrderStatus;
  label: string;
  description: string;
}> = [
  {
    key: 'pedido_recebido',
    label: 'Pedido recebido',
    description: 'Esboço aprovado e pedido registado no sistema.',
  },
  {
    key: 'entrada_confirmada',
    label: '1.ª prestação confirmada',
    description: 'Pagamento de 50% validado e vaga garantida no lote.',
  },
  {
    key: 'lote_fechado',
    label: 'Lote fechado',
    description: 'O lote reuniu todas as peças e seguiu para a bancada.',
  },
  {
    key: 'em_producao',
    label: 'Em produção manual',
    description: 'Corte, gravação e polimento em aço inoxidável (~2 semanas).',
  },
  {
    key: 'pronto_entrega',
    label: 'Pronto para entrega',
    description: 'Peça finalizada em Luanda. Restantes 50% no ato da entrega.',
  },
];

export const INITIAL_ORDERS: OrderRecord[] = [
  {
    code: 'EE-2026-0001',
    batchNumber: 14,
    createdAt: '2026-11-22T14:30:00Z',
    customerName: 'Miriam Manuel',
    whatsapp: '+244 923 410 882',
    neighborhood: 'Tala Hadi, Luanda',
    paymentMethod: 'Multicaixa Express',
    receiptRef: 'MCX-88412',
    status: 'em_producao',
    config: {
      piece: 'mascote',
      gender: 'Masculino',
      size: 'Criança',
      finish: 'Dourado',
      name: 'Rael Manuel',
      fontId: 'B01',
      fontFamily: "'Great Vibes', cursive",
      stone: 'Rosa',
      qty: 1,
      approved: true,
    },
    unitPrice: 8000,
    totalPrice: 8000,
    depositAmount: 4000,
  },
  {
    code: 'EE-2026-0002',
    batchNumber: 14,
    createdAt: '2026-11-23T10:15:00Z',
    customerName: 'Carla Neto',
    whatsapp: '+244 912 774 301',
    neighborhood: 'Maianga, Luanda',
    paymentMethod: 'IBAN',
    receiptRef: 'BAI-004192',
    status: 'entrada_confirmada',
    config: {
      piece: 'colar',
      gender: 'Feminino',
      size: 'Adulto',
      finish: 'Prateado',
      name: 'Ricci',
      fontId: 'B02',
      fontFamily: "'Dancing Script', cursive",
      stone: 'Branco',
      qty: 1,
      approved: true,
    },
    unitPrice: 7000,
    totalPrice: 7000,
    depositAmount: 3500,
  },
  {
    code: 'EE-2026-0003',
    batchNumber: 14,
    createdAt: '2026-11-24T17:45:00Z',
    customerName: 'Joana Domingos',
    whatsapp: '+244 941 205 918',
    neighborhood: 'Kilamba, Luanda',
    paymentMethod: 'Multicaixa Express',
    receiptRef: 'MCX-90124',
    status: 'pronto_entrega',
    config: {
      piece: 'colar',
      gender: 'Feminino',
      size: 'Adulto',
      finish: 'Dourado',
      name: 'Ana & Pedro',
      fontId: 'B08',
      fontFamily: "'Cormorant Garamond', serif",
      stone: 'Azul',
      qty: 2,
      approved: true,
    },
    unitPrice: 7000,
    totalPrice: 14000,
    depositAmount: 7000,
  },
];

export function formatKz(amount: number): string {
  return `${amount.toLocaleString('pt-PT')} Kz`;
}

export function getPiecePrice(piece: PieceType): number | null {
  if (piece === 'colar') return 7000;
  if (piece === 'mascote') return 8000;
  return null;
}

export function getPieceLabel(piece: PieceType): string {
  if (piece === 'colar') return 'Colar com nome';
  if (piece === 'mascote') return 'Mascote de bebé';
  return 'Pulseira';
}
