import { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}

export function SmartImage({ src, alt, className = '', fallbackLabel }: SmartImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-surface-container-low via-gold-tint/50 to-surface-container-high text-on-surface-variant p-6 text-center ${className}`}
      >
        <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-primary text-gold-light border border-gold/50">
          <Sparkles className="w-5 h-5" aria-hidden="true" />
        </span>
        <span className="font-headline text-sm font-semibold text-on-surface">
          {fallbackLabel || 'Essência Eterna'}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
