import Link from 'next/link';
import { prisma } from '@/lib/db';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import ShopProductCard from '@/components/site/ShopProductCard';
import { getCategoryLabel } from '@/lib/products';

export const dynamic = 'force-dynamic';

type Props = {
  searchParams: Promise<{ categoria?: string }>;
};

export default async function ProdutosPage({ searchParams }: Props) {
  const { categoria } = await searchParams;

  const products = await prisma.product.findMany({
    where: { active: true, category: { not: 'destaque' } },
    orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
  });

  const categories = [...new Set(products.map((p) => p.category))];
  const filtered = categoria ? products.filter((p) => p.category === categoria) : products;

  const grouped = categories.reduce<Record<string, typeof products>>((acc, cat) => {
    acc[cat] = products.filter((p) => p.category === cat);
    return acc;
  }, {});

  return (
    <>
      <Header />
      <main className="shop-page">
        <section className="shop-hero">
          <div className="container">
            <p className="section-header__eyebrow">Nossa loja</p>
            <h1>Produtos artesanais</h1>
            <p className="shop-hero__subtitle">Escolha seus sabonetes, monte o carrinho e finalize pelo WhatsApp com todo carinho.</p>
          </div>
        </section>

        <section className="shop-filters">
          <div className="container">
            <div className="shop-filters__list">
              <Link href="/produtos" className={`shop-filter ${!categoria ? 'shop-filter--active' : ''}`}>
                Todos
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/produtos?categoria=${cat}`}
                  className={`shop-filter ${categoria === cat ? 'shop-filter--active' : ''}`}
                >
                  {getCategoryLabel(cat)}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="shop-catalog">
          <div className="container">
            {filtered.length === 0 ? (
              <p className="shop-empty">Nenhum produto encontrado nesta categoria.</p>
            ) : categoria ? (
              <div className="shop-grid">
                {filtered.map((product) => (
                  <ShopProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              Object.entries(grouped).map(([cat, items]) => (
                <div key={cat} className="shop-section">
                  <h2 className="shop-section__title">{getCategoryLabel(cat)}</h2>
                  <div className="shop-grid">
                    {items.map((product) => (
                      <ShopProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
