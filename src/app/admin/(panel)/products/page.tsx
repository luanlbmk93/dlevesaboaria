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

  async function loadProducts() {
    const res = await fetch('/api/products?admin=true');
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  }

  useEffect(() => { loadProducts(); }, []);

  async function handleDelete(id: number, name: string) {
    if (!confirm(`Excluir "${name}"?`)) return;
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    loadProducts();
  }

  return (
    <>
      <div className="admin-header">
        <h1>Produtos</h1>
        <Link href="/admin/products/new" className="btn btn--primary btn--icon">
          <IconPlus size={14} />
          Novo produto
        </Link>
      </div>

      <div className="admin-card">
        {loading ? (
          <p>Carregando...</p>
        ) : products.length === 0 ? (
          <p>Nenhum produto cadastrado. <Link href="/admin/products/new" style={{ color: 'var(--sage-dark)' }}>Criar o primeiro</Link></p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Imagem</th>
                <th>Nome</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Ordem</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>
                    {p.imageUrl ? (
                      <Image src={p.imageUrl} alt={p.name} width={48} height={48} style={{ borderRadius: 8, objectFit: 'cover' }} unoptimized />
                    ) : (
                      <div style={{ width: 48, height: 48, background: 'var(--cream-dark)', borderRadius: 8 }} />
                    )}
                  </td>
                  <td>
                    <strong>{p.name}</strong>
                    {p.featured && <span className="badge badge--featured" style={{ marginLeft: 8 }}>Tendência</span>}
                  </td>
                  <td>{formatPrice(p.price)}</td>
                  <td>{getCategoryLabel(p.category)}</td>
                  <td>{p.sortOrder}</td>
                  <td>
                    <span className={`badge ${p.active ? 'badge--active' : 'badge--inactive'}`}>
                      {p.active ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td>
                    <div className="admin-actions">
                      <Link href={`/admin/products/${p.id}/edit`} className="btn btn--ghost btn--sm">Editar</Link>
                      <button onClick={() => handleDelete(p.id, p.name)} className="btn btn--danger btn--sm">Excluir</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
