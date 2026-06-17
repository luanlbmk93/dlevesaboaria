'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/lib/cart';
import { formatPrice } from '@/lib/whatsapp';
import { getCategoryLabel } from '@/lib/products';
import { IconCheck, IconMinus, IconPlus } from '@/components/icons/Icons';

type Product = {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  imageUrl: string | null;
};

export default function ShopProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
      },
      qty
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <article className="shop-card">
      <div className="shop-card__image">
        {product.imageUrl ? (
          <Image src={product.imageUrl} alt={product.name} fill sizes="(max-width: 640px) 100vw, 25vw" style={{ objectFit: 'cover' }} unoptimized />
        ) : (
          <div className="shop-card__placeholder" />
        )}
        <span className="shop-card__category">{getCategoryLabel(product.category)}</span>
      </div>

      <div className="shop-card__body">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p className="shop-card__price">{formatPrice(product.price)}</p>

        <div className="shop-card__actions">
          <div className="shop-card__qty">
            <button type="button" onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Diminuir">
              <IconMinus size={14} />
            </button>
            <span>{qty}</span>
            <button type="button" onClick={() => setQty(qty + 1)} aria-label="Aumentar">
              <IconPlus size={14} />
            </button>
          </div>
          <button type="button" className={`btn btn--primary shop-card__add ${added ? 'shop-card__add--done' : ''}`} onClick={handleAdd}>
            {added ? (
              <>
                <IconCheck />
                Adicionado
              </>
            ) : (
              'Adicionar'
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
