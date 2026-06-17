'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/lib/cart';
import { IconCart } from '@/components/icons/Icons';

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();
  const isHome = pathname === '/';

  const navLink = (href: string, label: string) => (
    <li>
      <Link href={href} onClick={() => setOpen(false)}>{label}</Link>
    </li>
  );

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link href="/" className="site-logo">
          <span className="site-logo__mark">D&apos;</span>
          <span>Leve</span>
        </Link>

        <div className="site-header__right">
          <nav className={`site-nav ${open ? 'site-nav--open' : ''}`}>
            <ul>
              {navLink('/produtos', 'Produtos')}
              {isHome ? navLink('#tendencias', 'Tendências') : navLink('/#tendencias', 'Tendências')}
              {isHome ? navLink('#sobre', 'Nossa História') : navLink('/#sobre', 'Nossa História')}
              {isHome ? navLink('#contato', 'Contato') : navLink('/#contato', 'Contato')}
            </ul>
          </nav>

          <button
            type="button"
            className="site-cart-btn"
            onClick={openCart}
            aria-label={`Abrir carrinho${itemCount > 0 ? `, ${itemCount} itens` : ''}`}
          >
            <IconCart />
            {itemCount > 0 && <span className="site-cart-btn__badge">{itemCount}</span>}
          </button>

          <button
            className={`site-nav-toggle ${open ? 'site-nav-toggle--active' : ''}`}
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
