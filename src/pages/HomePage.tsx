import {
  ArrowRight,
  Baby,
  Cake,
  CreditCard,
  Gift,
  Heart,
  Palette,
  PenLine,
  ShieldCheck,
} from 'lucide-react';
import { STITCH_IMAGES } from '../data/catalog';
import { OrderConfig, PageId } from '../types';
import { SmartImage } from '../components/SmartImage';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onStartCustomize: (preset: Partial<OrderConfig>) => void;
}

export function HomePage({ onNavigate, onStartCustomize }: HomePageProps) {
  const occasions: Array<{
    title: string;
    description: string;
    icon: typeof Heart;
    tint: 'gold' | 'silver';
    preset: Partial<OrderConfig>;
  }> = [
    {
      title: 'Para mim',
      description: 'Um colar com o teu nome em prateado ou aço inox dourado para usar todos os dias.',
      icon: Heart,
      tint: 'gold',
      preset: { piece: 'colar', size: 'Adulto', gender: 'Feminino', finish: 'Dourado', occasion: 'Para mim' },
    },
    {
      title: 'Para o meu bebé',
      description: 'Mascote com placa gravada e pedra colorida à tua escolha.',
      icon: Baby,
      tint: 'silver',
      preset: { piece: 'mascote', size: 'Criança', finish: 'Dourado', occasion: 'Para o meu bebé' },
    },
    {
      title: 'Presente especial',
      description: 'Uma lembrança com significado para a mãe, irmã ou melhor amiga.',
      icon: Gift,
      tint: 'gold',
      preset: { piece: 'colar', size: 'Adulto', gender: 'Feminino', finish: 'Prateado', occasion: 'Presente especial' },
    },
    {
      title: 'Aniversário',
      description: 'Com 1 ou 2 nomes num colar delicado que não escurece.',
      icon: Cake,
      tint: 'silver',
      preset: { piece: 'colar', size: 'Adulto', finish: 'Dourado', occasion: 'Aniversário' },
    },
  ];

  const steps = [
    {
      step: 'Passo 1',
      title: 'Personaliza',
      mobileTitle: 'Personaliza a tua peça e aprova o esboço',
      description: 'Escreve o nome, escolhe a letra e aprova logo o teu esboço digital.',
    },
    {
      step: 'Passo 2',
      title: '1.ª prestação',
      mobileTitle: 'Paga a 1.ª prestação (50%) e envia o comprovativo',
      description: '50% por transferência (IBAN) ou Multicaixa Express com comprovativo.',
    },
    {
      step: 'Passo 3',
      title: 'Número único',
      mobileTitle: 'Recebe o teu número de pedido na hora',
      description: 'Recebes logo o teu código (ex.: EE-2026-0001) para acompanhar tudo.',
    },
    {
      step: 'Passo 4',
      title: 'Fecho do lote',
      mobileTitle: 'Aguarda o fecho do lote',
      description: 'Fechamos o lote manualmente assim que reúne as peças e avisamos-te.',
    },
    {
      step: 'Passo 5',
      title: 'Entrega (~2 sem.)',
      mobileTitle: 'Recebe a peça em cerca de 2 semanas',
      description: 'Produção manual em cerca de 2 semanas. Pagas os outros 50% na entrega.',
    },
  ];

  return (
    <div id="inicio" className="flex-1">
      {/* Hero Section */}
      <section className="max-w-[1200px] mx-auto px-4 lg:px-6 pt-6 lg:pt-8 pb-12 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Copy */}
          <div className="lg:col-span-6 flex flex-col items-start gap-4 lg:gap-6">
            <span
              role="status"
              className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary text-gold-light border border-gold/60"
            >
              <span className="w-2 h-2 rounded-full bg-gold-light" aria-hidden="true" />
              <span className="font-label text-[12px] font-medium tracking-[0.3px]">
                Lote aberto agora
              </span>
            </span>

            <h1 className="font-display text-[32px] leading-[38px] tracking-[-0.25px] lg:text-[48px] lg:leading-[56px] lg:tracking-[-0.5px] font-semibold text-on-surface text-balance">
              Uma peça com o teu nome, feita com carinho
            </h1>

            <p className="font-body text-[16px] leading-[24px] lg:text-[18px] lg:leading-[28px] text-on-surface-variant max-w-prose text-pretty">
              Colares com nome e mascotes de bebé em aço inox, gravados à mão em Luanda. Vês o esboço na hora e pagas em duas prestações.
            </p>

            <div className="flex flex-col sm:flex-row sm:flex-wrap w-full sm:w-auto items-stretch sm:items-center gap-3 lg:gap-4 pt-1">
              <button
                type="button"
                onClick={() => onNavigate('personalizar')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-primary text-on-primary border border-gold/50 hover:bg-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold transition-colors duration-150 shadow-sm whitespace-nowrap"
              >
                <span className="font-label text-[15px] font-semibold">Criar a minha peça</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('pecas')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-transparent text-on-surface border border-primary/30 hover:border-primary hover:bg-secondary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold transition-colors duration-150 whitespace-nowrap"
              >
                <span className="font-label text-[15px] font-semibold">Ver peças</span>
              </button>
            </div>
          </div>

          {/* Right Signature Animation + Photo */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-[20px] overflow-hidden border border-outline-variant bg-surface-container p-2.5 lg:p-3 shadow-sm">
              <div
                className="hero-aurora pointer-events-none absolute -inset-6 rounded-[28px] bg-gradient-to-tr from-gold-light/30 via-gold-tint/40 to-gold/20 blur-2xl"
                aria-hidden="true"
              />

              <div className="relative rounded-[12px] overflow-hidden aspect-[4/3]">
                <SmartImage
                  src={STITCH_IMAGES.heroJewelry}
                  alt="Colar dourado personalizado em aço inox sobre linho claro à luz natural"
                  className="w-full h-full object-cover"
                  fallbackLabel="Colar dourado em aço inox"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-footer/95 via-footer/60 to-transparent" />

                <span
                  className="hero-sparkle-1 pointer-events-none absolute bottom-14 left-10 w-2 h-2 rounded-full bg-gold-light"
                  aria-hidden="true"
                />
                <span
                  className="hero-sparkle-2 pointer-events-none absolute bottom-20 right-16 w-1.5 h-1.5 rounded-full bg-gold-light"
                  aria-hidden="true"
                />
                <span
                  className="hero-sparkle-3 pointer-events-none absolute bottom-12 left-1/2 w-2 h-2 rounded-full bg-surface"
                  aria-hidden="true"
                />

                <div className="absolute inset-x-4 lg:inset-x-6 bottom-4 lg:bottom-6 flex flex-col items-start gap-1">
                  <span className="font-label text-[12px] font-medium text-gold-light">
                    Esboço gravado à mão
                  </span>
                  <div className="hero-write-text">
                    <span className="font-script text-[32px] leading-[40px] lg:text-[40px] lg:leading-[48px] text-on-primary">
                      Rael Manuel
                    </span>
                  </div>
                  <svg viewBox="0 0 240 12" className="w-40 lg:w-48 h-3" fill="none" aria-hidden="true">
                    <path
                      d="M2 8C58 2 142 10 238 4"
                      stroke="#E7C873"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      className="hero-write-stroke"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip (Soft Sand) */}
      <section className="bg-surface-container-low border-y border-outline-variant py-6 lg:py-8">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-6 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <div className="flex items-center gap-2.5 lg:gap-3">
            <ShieldCheck className="w-6 h-6 text-gold shrink-0" aria-hidden="true" />
            <span className="font-body text-[14px] lg:text-[16px] font-semibold text-on-surface">
              Aço inox
            </span>
          </div>
          <div className="flex items-center gap-2.5 lg:gap-3">
            <Palette className="w-6 h-6 text-gold shrink-0" aria-hidden="true" />
            <span className="font-body text-[14px] lg:text-[16px] font-semibold text-on-surface">
              Prateado ou dourado
            </span>
          </div>
          <div className="flex items-center gap-2.5 lg:gap-3">
            <CreditCard className="w-6 h-6 text-gold shrink-0" aria-hidden="true" />
            <span className="font-body text-[14px] lg:text-[16px] font-semibold text-on-surface">
              Pagamento em 2 prestações
            </span>
          </div>
          <div className="flex items-center gap-2.5 lg:gap-3">
            <PenLine className="w-6 h-6 text-gold shrink-0" aria-hidden="true" />
            <span className="font-body text-[14px] lg:text-[16px] font-semibold text-on-surface">
              Feito com o teu nome
            </span>
          </div>
        </div>
      </section>

      {/* Para quem é a peça? */}
      <section className="max-w-[1200px] mx-auto px-4 lg:px-6 py-12 lg:py-20">
        <div className="flex flex-col gap-2 mb-6 lg:mb-8">
          <h2 className="font-headline text-[26px] leading-[32px] lg:text-[36px] lg:leading-[44px] font-semibold text-on-surface text-balance">
            Para quem é a peça?
          </h2>
          <p className="font-body text-[15px] lg:text-[16px] text-on-surface-variant max-w-prose">
            Escolhe a ocasião e começa logo a personalizar com o nome que queres guardar.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 items-stretch">
          {occasions.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.title}
                type="button"
                onClick={() => onStartCustomize(item.preset)}
                className="group h-full text-left bg-surface-container rounded-[20px] border border-outline-variant p-4 lg:p-6 shadow-sm hover:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold transition-colors duration-150 flex flex-col justify-between gap-4"
              >
                <div className="flex flex-col gap-2">
                  <span
                    className={`inline-flex items-center justify-center w-10 h-10 lg:w-11 lg:h-11 rounded-full border ${
                      item.tint === 'gold'
                        ? 'bg-gold-tint text-on-gold-tint border-gold/40'
                        : 'bg-silver-tint text-on-silver-tint border-silver/40'
                    }`}
                  >
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <h3 className="font-title text-[16px] lg:text-[20px] font-semibold text-on-surface">
                    {item.title}
                  </h3>
                  <p className="hidden md:block font-body text-[14px] leading-[20px] text-on-surface-variant">
                    {item.description}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 text-[13px] font-label font-medium text-on-surface group-hover:text-on-gold-tint transition-colors duration-150">
                  <span>Personalizar</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Peças em Destaque (Soft Sand) */}
      <section id="pecas" className="bg-surface-container-low py-12 lg:py-20 border-y border-outline-variant">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 lg:mb-8">
            <div className="flex flex-col gap-2">
              <h2 className="font-headline text-[26px] leading-[32px] lg:text-[36px] lg:leading-[44px] font-semibold text-on-surface text-balance">
                As nossas peças em destaque
              </h2>
              <p className="font-body text-[15px] lg:text-[16px] text-on-surface-variant max-w-prose text-pretty">
                Produzidas em aço inox prateado ou aço inox dourado, com entrada de 50% para o lote.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('pecas')}
              className="self-start md:self-auto inline-flex items-center gap-1.5 font-label text-[14px] font-semibold text-on-surface hover:text-gold transition-colors"
            >
              <span>Ver catálogo completo</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            <article className="h-full bg-surface-container rounded-[20px] border border-outline-variant p-4 lg:p-6 shadow-sm flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-4">
                <div className="rounded-[12px] overflow-hidden aspect-[4/3] bg-surface-container-low">
                  <SmartImage
                    src={STITCH_IMAGES.colarPrateado}
                    alt="Colar personalizado com nome em aço inox prateado segurado na mão"
                    className="w-full h-full object-cover"
                    fallbackLabel="Colar com nome"
                  />
                </div>
                <header className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-title text-[20px] font-semibold text-on-surface">
                      Colar com nome
                    </h3>
                    <p className="font-body text-[14px] text-on-surface-variant">
                      Com 1 ou 2 nomes · Prateado ou aço inox dourado
                    </p>
                  </div>
                  <span className="font-title text-[18px] lg:text-[20px] font-semibold bg-gold-tint text-on-gold-tint border border-gold/50 px-3 py-1 rounded-[12px] tabular-nums shrink-0">
                    7.000 Kz
                  </span>
                </header>
                <p className="font-body text-[15px] lg:text-[16px] text-on-surface-variant">
                  Podes escolher o estilo de letra e aprovar o esboço digital antes de entrares no lote.
                </p>
              </div>
              <footer>
                <button
                  type="button"
                  onClick={() =>
                    onStartCustomize({ piece: 'colar', finish: 'Prateado', size: 'Adulto' })
                  }
                  className="inline-flex items-center justify-center w-full px-6 py-3.5 rounded-full bg-primary text-on-primary border border-gold/50 hover:bg-on-surface transition-colors duration-150"
                >
                  <span className="font-label text-[15px] font-semibold">Personalizar colar</span>
                </button>
              </footer>
            </article>

            <article className="h-full bg-surface-container rounded-[20px] border border-outline-variant p-4 lg:p-6 shadow-sm flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-4">
                <div className="rounded-[12px] overflow-hidden aspect-[4/3] bg-surface-container-low">
                  <SmartImage
                    src={STITCH_IMAGES.mascoteBebe}
                    alt="Mascote personalizada para bebé em aço inox dourado com placa gravada e pedra colorida"
                    className="w-full h-full object-cover"
                    fallbackLabel="Mascote para bebé"
                  />
                </div>
                <header className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-title text-[20px] font-semibold text-on-surface">
                      Mascote para bebé
                    </h3>
                    <p className="font-body text-[14px] text-on-surface-variant">
                      Placa gravada + pedra colorida à escolha
                    </p>
                  </div>
                  <span className="font-title text-[18px] lg:text-[20px] font-semibold bg-gold-tint text-on-gold-tint border border-gold/50 px-3 py-1 rounded-[12px] tabular-nums shrink-0">
                    8.000 Kz
                  </span>
                </header>
                <p className="font-body text-[15px] lg:text-[16px] text-on-surface-variant">
                  Pensada para o pulso dos pequeninos, com fecho seguro e pedra rosa, azul, branca, vermelha, verde ou roxa.
                </p>
              </div>
              <footer>
                <button
                  type="button"
                  onClick={() =>
                    onStartCustomize({ piece: 'mascote', finish: 'Dourado', size: 'Criança' })
                  }
                  className="inline-flex items-center justify-center w-full px-6 py-3.5 rounded-full bg-primary text-on-primary border border-gold/50 hover:bg-on-surface transition-colors duration-150"
                >
                  <span className="font-label text-[15px] font-semibold">Personalizar mascote</span>
                </button>
              </footer>
            </article>
          </div>
        </div>
      </section>

      {/* Momentos Essência Eterna (Photo Mosaic Gallery) */}
      <section className="max-w-[1200px] mx-auto px-4 lg:px-6 py-12 lg:py-20">
        <div className="flex flex-col gap-2 mb-6 lg:mb-8">
          <h2 className="font-headline text-[26px] leading-[32px] lg:text-[36px] lg:leading-[44px] font-semibold text-on-surface text-balance">
            Momentos Essência Eterna
          </h2>
          <p className="font-body text-[15px] lg:text-[16px] text-on-surface-variant max-w-prose">
            Peças entregues em Luanda, pulsos de bebés, caixinhas preparadas com cuidado e o trabalho manual na nossa bancada.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          <figure className="lg:col-span-2 lg:row-span-2 rounded-[20px] overflow-hidden border border-outline-variant bg-surface-container aspect-square lg:aspect-auto">
            <SmartImage
              src={STITCH_IMAGES.galleryBabyWrist}
              alt="Pulso de bebé com mascote personalizada dourada e pedra rosa"
              className="w-full h-full object-cover lg:min-h-[280px]"
              fallbackLabel="Pulso de bebé"
            />
          </figure>
          <figure className="rounded-[20px] overflow-hidden border border-outline-variant bg-surface-container aspect-square">
            <SmartImage
              src={STITCH_IMAGES.galleryGiftBox}
              alt="Caixa de presente creme com fita dourada e colar personalizado"
              className="w-full h-full object-cover"
              fallbackLabel="Caixa de presente"
            />
          </figure>
          <figure className="rounded-[20px] overflow-hidden border border-outline-variant bg-surface-container aspect-square">
            <SmartImage
              src={STITCH_IMAGES.galleryWorkshop}
              alt="Mãos da artesã a polir placa em aço inox na bancada"
              className="w-full h-full object-cover"
              fallbackLabel="Bancada artesanal"
            />
          </figure>
          <figure className="rounded-[20px] overflow-hidden border border-outline-variant bg-surface-container aspect-square lg:aspect-[4/3]">
            <SmartImage
              src={STITCH_IMAGES.galleryDelivery}
              alt="Cliente em Luanda a sorrir com o seu saco de entrega Essência Eterna"
              className="w-full h-full object-cover"
              fallbackLabel="Entrega em Luanda"
            />
          </figure>
          <figure className="hidden lg:block rounded-[20px] overflow-hidden border border-outline-variant bg-surface-container aspect-[4/3]">
            <SmartImage
              src={STITCH_IMAGES.heroJewelry}
              alt="Colar em aço inox dourado em luz natural da manhã"
              className="w-full h-full object-cover"
              fallbackLabel="Aço inox dourado"
            />
          </figure>
        </div>
      </section>

      {/* Como funciona (5 friendly steps, Soft Sand) */}
      <section
        id="como-funciona"
        className="bg-surface-container-low py-12 lg:py-20 border-y border-outline-variant"
      >
        <div className="max-w-[1200px] mx-auto px-4 lg:px-6">
          <div className="flex flex-col gap-2 mb-6 lg:mb-8">
            <h2 className="font-headline text-[26px] leading-[32px] lg:text-[36px] lg:leading-[44px] font-semibold text-on-surface">
              Como funciona
            </h2>
            <p className="font-body text-[15px] lg:text-[16px] text-on-surface-variant max-w-prose">
              Trabalhamos por lotes manuais. Tudo é claro desde o primeiro minuto para não precisares de esperar por respostas no WhatsApp.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4 items-stretch">
            {steps.map((item) => (
              <article
                key={item.step}
                className="h-full bg-surface-container rounded-[20px] border border-outline-variant p-4 lg:p-6 flex flex-col gap-2"
              >
                <span className="font-label text-[12px] font-medium bg-primary text-gold-light px-2.5 py-0.5 rounded-full self-start">
                  {item.step}
                </span>
                <h3 className="font-title text-[16px] font-semibold text-on-surface">
                  <span className="hidden lg:inline">{item.title}</span>
                  <span className="lg:hidden">{item.mobileTitle}</span>
                </h3>
                <p className="hidden lg:block font-body text-[14px] leading-[20px] text-on-surface-variant">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Quem somos */}
      <section className="max-w-[1200px] mx-auto px-4 lg:px-6 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          <div className="lg:col-span-5 rounded-[20px] overflow-hidden border border-outline-variant bg-surface-container">
            <SmartImage
              src={STITCH_IMAGES.aboutMaker}
              alt="Fundadora da Essência Eterna no ateliê em Tala Hadi, Luanda"
              className="w-full h-full object-cover aspect-[4/3]"
              fallbackLabel="Ateliê em Tala Hadi"
            />
          </div>
          <div className="lg:col-span-7 flex flex-col gap-4">
            <h2 className="font-headline text-[26px] leading-[32px] lg:text-[36px] lg:leading-[44px] font-semibold text-on-surface">
              Quem somos
            </h2>
            <p className="font-body text-[16px] lg:text-[18px] lg:leading-[28px] text-on-surface-variant max-w-prose">
              Nascemos em Tala Hadi, Luanda, com uma ideia simples: transformar nomes que amas em jóias duradouras que acompanham o dia a dia sem perder o brilho.
            </p>
            <p className="font-body text-[15px] lg:text-[16px] text-on-surface-variant max-w-prose">
              Cada colar e cada mascote é feita por encomenda, com atenção aos acentos, ao corte da letra e ao acabamento em aço inox.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="max-w-[1200px] mx-auto px-4 lg:px-6 pb-12 lg:pb-20">
        <div className="rounded-[20px] bg-footer text-on-footer border border-gold/50 p-6 lg:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
          <div className="flex flex-col gap-1">
            <h2 className="font-headline text-[26px] leading-[32px] lg:text-[36px] lg:leading-[44px] font-semibold text-gold-light text-balance">
              O lote atual está aberto
            </h2>
            <p className="font-body text-[14px] lg:text-[16px] text-on-footer/85 text-pretty">
              Cria o teu esboço digital em menos de dois minutos e garante o teu lugar.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('personalizar')}
            className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3.5 rounded-full bg-gold-light text-primary border border-gold hover:bg-gold transition-colors duration-150 shrink-0"
          >
            <span className="font-label text-[15px] font-semibold">Criar a minha peça</span>
          </button>
        </div>
      </section>
    </div>
  );
}
