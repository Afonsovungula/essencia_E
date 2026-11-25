import { OrderConfig } from '../types';
import { STONE_OPTIONS } from '../data/catalog';

interface JewelrySketchProps {
  config: OrderConfig;
  compact?: boolean;
  idSuffix?: string;
}

export function JewelrySketch({ config, compact = false, idSuffix = 'main' }: JewelrySketchProps) {
  const goldId = `metal-gold-${idSuffix}`;
  const silverId = `metal-silver-${idSuffix}`;
  const metalUrl = config.finish === 'Dourado' ? `url(#${goldId})` : `url(#${silverId})`;
  const strokeAccent = config.finish === 'Dourado' ? '#8C5A00' : '#5E666E';
  const showStone = config.piece === 'mascote' || config.size === 'Criança';
  const stoneObj = STONE_OPTIONS.find((s) => s.name === config.stone) || STONE_OPTIONS[0];
  const displayName = config.name.trim() || 'O teu nome';

  // Auto-scale font size smoothly for longer names so engraving always fits inside the plate/necklace
  const baseFontSize = config.fontId === 'B20' ? 24 : config.fontId === 'B03' ? 25 : 30;
  const charLen = displayName.length;
  const fontSize =
    charLen > 18
      ? Math.max(15, baseFontSize - 9)
      : charLen > 13
        ? Math.max(18, baseFontSize - 5)
        : baseFontSize;

  const isItalic = config.fontId === 'B08';
  const isBold = config.fontId === 'B20';

  if (config.piece === 'colar') {
    return (
      <svg
        viewBox="0 0 360 150"
        className={`w-full ${compact ? 'max-w-[300px]' : 'max-w-[340px]'} h-auto`}
        aria-label="Pré-visualização do colar personalizado"
      >
        <defs>
          <linearGradient id={goldId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E7C873" />
            <stop offset="50%" stopColor="#B8893B" />
            <stop offset="100%" stopColor="#DFB963" />
          </linearGradient>
          <linearGradient id={silverId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ECEFF2" />
            <stop offset="50%" stopColor="#B9C0C7" />
            <stop offset="100%" stopColor="#DFE3E7" />
          </linearGradient>
        </defs>

        {/* Delicate necklace chain sweeping down to the name pendant */}
        <path
          d="M36 16 C64 72, 80 82, 102 82"
          fill="none"
          stroke={metalUrl}
          strokeWidth="2.8"
          strokeDasharray="5 3.5"
          strokeLinecap="round"
        />
        <path
          d="M324 16 C296 72, 280 82, 258 82"
          fill="none"
          stroke={metalUrl}
          strokeWidth="2.8"
          strokeDasharray="5 3.5"
          strokeLinecap="round"
        />

        {/* Jump rings */}
        <circle cx="102" cy="82" r="4" fill="none" stroke={metalUrl} strokeWidth="2.2" />
        <circle cx="258" cy="82" r="4" fill="none" stroke={metalUrl} strokeWidth="2.2" />

        {/* Subtle underline flourish */}
        <path
          d="M112 104 Q180 112 248 104"
          fill="none"
          stroke={metalUrl}
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* Cutout engraved name */}
        <text
          x="180"
          y="91"
          textAnchor="middle"
          fill={metalUrl}
          stroke={strokeAccent}
          strokeWidth="0.45"
          style={{
            fontFamily: config.fontFamily,
            fontSize: `${fontSize + 4}px`,
            fontStyle: isItalic ? 'italic' : 'normal',
            fontWeight: isBold ? 600 : 400,
          }}
        >
          {displayName}
        </text>

        {showStone && (
          <g>
            <circle cx="268" cy="100" r="9.5" fill={stoneObj.hex} stroke={strokeAccent} strokeWidth="1.4" />
            <circle cx="265.5" cy="97.5" r="2.6" fill="#FFFFFF" fillOpacity="0.65" />
          </g>
        )}
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 360 150"
      className={`w-full ${compact ? 'max-w-[300px]' : 'max-w-[340px]'} h-auto`}
      aria-label="Pré-visualização da peça personalizada"
    >
      <defs>
        <linearGradient id={goldId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E7C873" />
          <stop offset="50%" stopColor="#B8893B" />
          <stop offset="100%" stopColor="#DFB963" />
        </linearGradient>
        <linearGradient id={silverId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ECEFF2" />
          <stop offset="50%" stopColor="#B9C0C7" />
          <stop offset="100%" stopColor="#DFE3E7" />
        </linearGradient>
      </defs>

      <path
        d="M18 75 C42 75, 58 75, 78 75"
        stroke={metalUrl}
        strokeWidth="3.5"
        strokeDasharray="6 4"
        strokeLinecap="round"
      />
      <path
        d="M282 75 C302 75, 318 75, 342 75"
        stroke={metalUrl}
        strokeWidth="3.5"
        strokeDasharray="6 4"
        strokeLinecap="round"
      />

      <rect
        x="78"
        y="48"
        width="204"
        height="54"
        rx="14"
        fill={metalUrl}
        stroke={strokeAccent}
        strokeOpacity="0.35"
        strokeWidth="1.2"
      />
      <rect
        x="85"
        y="54"
        width="190"
        height="42"
        rx="10"
        fill="none"
        stroke="#FFFFFF"
        strokeOpacity="0.45"
        strokeWidth="1"
      />

      {showStone && (
        <g>
          <circle cx="294" cy="96" r="11" fill={stoneObj.hex} stroke={strokeAccent} strokeWidth="1.5" />
          <circle cx="291" cy="93" r="3" fill="#FFFFFF" fillOpacity="0.65" />
        </g>
      )}

      <text
        x="180"
        y="83"
        textAnchor="middle"
        fill="#2B2622"
        style={{
          fontFamily: config.fontFamily,
          fontSize: `${fontSize}px`,
          fontStyle: isItalic ? 'italic' : 'normal',
          fontWeight: isBold ? 600 : 400,
        }}
      >
        {displayName}
      </text>
    </svg>
  );
}
