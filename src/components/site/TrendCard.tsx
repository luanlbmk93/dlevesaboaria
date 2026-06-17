'use client';

import Image from 'next/image';
import { useCart } from '@/lib/cart';
import { formatPrice } from '@/lib/whatsapp';

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string | null;
};

export function TrendCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <article className="site-highlight-card">
      <div className="site-highlight-card__image">
        {product.imageUrl ? (
          <Image src={product.imageUrl} alt={product.name} fill sizes="200px" style={{ objectFit: 'cover' }} unoptimized />
        ) : (
          <div className="site-product-card__placeholder" />
        )}
      </div>
      <div className="site-highlight-card__body">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        {product.price > 0 && (
          <div className="trend-card__footer">
            <span className="trend-card__price">{formatPrice(product.price)}</span>
            <button
              type="button"
              className="btn btn--primary btn--sm"
              onClick={() => addItem({ id: product.id, name: product.name, price: product.price, imageUrl: product.imageUrl })}
            >
              Adicionar
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
