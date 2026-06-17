'use client';

import { CartProvider } from '@/lib/cart';
import CartDrawer from './CartDrawer';
import WhatsAppFloat from './WhatsAppFloat';

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartDrawer />
      <WhatsAppFloat />
    </CartProvider>
  );
}
