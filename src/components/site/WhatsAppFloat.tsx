'use client';

import { usePathname } from 'next/navigation';
import { getWhatsAppContactUrl } from '@/lib/whatsapp';
import { IconWhatsApp } from '@/components/icons/Icons';

export default function WhatsAppFloat() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) return null;

  const url = getWhatsAppContactUrl(
    'Olá! Vim pelo site da D\'Leve e preciso de ajuda.'
  );

  return (
    <div className="whatsapp-float">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float__link"
        aria-label="Falar no WhatsApp — Precisa de ajuda?"
      >
        <span className="whatsapp-float__label">Precisa de ajuda?</span>
        <span className="whatsapp-float__btn">
          <IconWhatsApp size={22} />
        </span>
      </a>
    </div>
  );
}
