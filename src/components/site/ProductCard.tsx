import Image from 'next/image';

type Product = {
  id: number;
  name: string;
  description: string;
  imageUrl: string | null;
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="site-product-card">
      <div className="site-product-card__image">
        {product.imageUrl ? (
          <Image src={product.imageUrl} alt={product.name} fill sizes="(max-width: 640px) 100vw, 33vw" style={{ objectFit: 'cover' }} unoptimized />
        ) : (
          <div className="site-product-card__placeholder" />
        )}
      </div>
      <div className="site-product-card__body">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
      </div>
    </article>
  );
}

export function HighlightCard({ product }: { product: Product }) {
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
      </div>
    </article>
  );
}
