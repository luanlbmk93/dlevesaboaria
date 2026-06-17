'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/lib/cart';
import { buildWhatsAppOrderUrl, formatPrice } from '@/lib/whatsapp';
import { IconClose, IconMinus, IconPlus, IconWhatsApp } from '@/components/icons/Icons';

export default function CartDrawer() {
  const { items, isOpen, closeCart, itemCount, total, updateQuantity, removeItem, clearCart } = useCart();
  const [customerName, setCustomerName] = useState('');

  function handleWhatsApp() {
    if (items.length === 0) return;
    const url = buildWhatsAppOrderUrl(items, customerName.trim() || undefined);
    window.open(url, '_blank');
    clearCart();
    closeCart();
    setCustomerName('');
  }

  if (!isOpen) return null;

  return (
    <>
      <div className="cart-overlay" onClick={closeCart} aria-hidden="true" />
      <aside className="cart-drawer" role="dialog" aria-label="Carrinho de compras">
        <div className="cart-drawer__header">
          <h2>Seu carrinho {itemCount > 0 && <span className="cart-drawer__count">({itemCount})</span>}</h2>
          <button type="button" className="cart-drawer__close" onClick={closeCart} aria-label="Fechar carrinho">
            <IconClose />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-drawer__empty">
            <p>Seu carrinho está vazio.</p>
            <p className="cart-drawer__empty-hint">Adicione sabonetes na loja para montar seu pedido.</p>
          </div>
        ) : (
          <>
            <ul className="cart-drawer__list">
              {items.map((item) => (
                <li key={item.id} className="cart-item">
                  <div className="cart-item__image">
                    {item.imageUrl ? (
                      <Image src={item.imageUrl} alt={item.name} fill style={{ objectFit: 'cover' }} unoptimized />
                    ) : (
                      <div className="cart-item__placeholder" />
                    )}
                  </div>
                  <div className="cart-item__info">
                    <h3>{item.name}</h3>
                    <p className="cart-item__price">{formatPrice(item.price)}</p>
                    <div className="cart-item__qty">
                      <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Diminuir quantidade">
                        <IconMinus size={14} />
                      </button>
                      <span>{item.quantity}</span>
                      <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Aumentar quantidade">
                        <IconPlus size={14} />
                      </button>
                    </div>
                  </div>
                  <button type="button" className="cart-item__remove" onClick={() => removeItem(item.id)} aria-label="Remover item">
                    <IconClose size={16} />
                  </button>
                </li>
              ))}
            </ul>

            <div className="cart-drawer__footer">
              <div className="form-group">
                <label htmlFor="cart-name">Seu nome (opcional)</label>
                <input
                  id="cart-name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Como podemos te chamar?"
                />
              </div>

              <div className="cart-drawer__total">
                <span>Total</span>
                <strong>{formatPrice(total)}</strong>
              </div>

              <button type="button" className="btn btn--whatsapp btn--full" onClick={handleWhatsApp}>
                <IconWhatsApp />
                Enviar pedido pelo WhatsApp
              </button>

              <button type="button" className="btn btn--ghost btn--full" onClick={clearCart}>
                Limpar carrinho
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
