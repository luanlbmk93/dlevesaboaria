'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getCategoryLabel } from '@/lib/products';
import { formatPrice } from '@/lib/whatsapp';
import { IconPlus } from '@/components/icons/Icons';

type Product = {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  imageUrl: string | null;
  featured: boolean;
  active: boolean;
  sortOrder: number;
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadProducts() {
    setError('');
    const res = await fetch('/api/products?admin=true');
    const data = await res.json();

    if (!res.ok) {
      setError(data.error || 'Não foi possível carregar os produtos.');
      setProducts([]);
      setLoading(false);
      return;
    }

    setProducts(data);
    setLoading(false);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function handleDelete(id: number, name: string) {
    if (!confirm(`Tem certeza que deseja excluir "${name}"?\n\nEssa ação não pode ser desfeita.`)) return;

    const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      alert('Não foi possível excluir o produto. Tente novamente.');
      return;
    }

    loadProducts();
  }

  return (
    <>
      <div className="admin-header">
        <div>
          <h1>Produtos</h1>
          <p className="admin-header__subtitle">
            {loading ? 'Carregando...' : `${products.length} produto(s) cadastrado(s)`}
          </p>
        </div>
        <Link href="/admin/produtos/novo" className="btn btn--primary btn--icon">
          <IconPlus size={14} />
          Adicionar produto
        </Link>
      </div>

      <div className="admin-card">
        {loading ? (
          <p>Carregando produtos...</p>
        ) : error ? (
          <p className="form-error">{error}</p>
        ) : products.length === 0 ? (
          <div className="admin-empty">
            <p>Nenhum produto cadastrado ainda.</p>
            <Link href="/admin/produtos/novo" className="btn btn--primary">Criar o primeiro produto</Link>
          </div>
        ) : (
          <>
            <div className="admin-product-cards">
              {products.map((product) => (
                <article key={product.id} className="admin-product-card">
                  <div className="admin-product-card__media">
                    {product.imageUrl ? (
                      <Image src={product.imageUrl} alt={product.name} width={72} height={72} unoptimized />
                    ) : (
                      <div className="admin-product-card__placeholder" />
                    )}
                  </div>
                  <div className="admin-product-card__body">
                    <div className="admin-product-card__title">
                      <strong>{product.name}</strong>
                      {product.featured && <span className="badge badge--featured">Tendência</span>}
                    </div>
                    <p className="admin-product-card__meta">
                      {formatPrice(product.price)} · {getCategoryLabel(product.category)} · Ordem {product.sortOrder}
                    </p>
                    <span className={`badge ${product.active ? 'badge--active' : 'badge--inactive'}`}>
                      {product.active ? 'Ativo no site' : 'Oculto'}
                    </span>
                  </div>
                  <div className="admin-product-card__actions">
                    <Link href={`/admin/produtos/${product.id}/editar`} className="btn btn--ghost btn--sm">Editar</Link>
                    <button onClick={() => handleDelete(product.id, product.name)} className="btn btn--danger btn--sm">Excluir</button>
                  </div>
                </article>
              ))}
            </div>

            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Imagem</th>
                    <th>Nome</th>
                    <th>Preço</th>
                    <th>Categoria</th>
                    <th>Ordem</th>
                    <th>Situação</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>
                        {product.imageUrl ? (
                          <Image src={product.imageUrl} alt={product.name} width={48} height={48} style={{ borderRadius: 8, objectFit: 'cover' }} unoptimized />
                        ) : (
                          <div style={{ width: 48, height: 48, background: 'var(--cream-dark)', borderRadius: 8 }} />
                        )}
                      </td>
                      <td>
                        <strong>{product.name}</strong>
                        {product.featured && <span className="badge badge--featured" style={{ marginLeft: 8 }}>Tendência</span>}
                      </td>
                      <td>{formatPrice(product.price)}</td>
                      <td>{getCategoryLabel(product.category)}</td>
                      <td>{product.sortOrder}</td>
                      <td>
                        <span className={`badge ${product.active ? 'badge--active' : 'badge--inactive'}`}>
                          {product.active ? 'Ativo' : 'Inativo'}
                        </span>
                      </td>
                      <td>
                        <div className="admin-actions">
                          <Link href={`/admin/produtos/${product.id}/editar`} className="btn btn--ghost btn--sm">Editar</Link>
                          <button onClick={() => handleDelete(product.id, product.name)} className="btn btn--danger btn--sm">Excluir</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </>
  );
}
