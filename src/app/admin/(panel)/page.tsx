import Link from 'next/link';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { IconPlus } from '@/components/icons/Icons';

export default async function AdminDashboard() {
  const session = await getSession();
  const [total, active, featured] = await Promise.all([
    prisma.product.count(),
    prisma.product.count({ where: { active: true } }),
    prisma.product.count({ where: { featured: true } }),
  ]);

  return (
    <>
      <div className="admin-header">
        <div>
          <h1>Dashboard</h1>
          <p style={{ color: 'var(--charcoal-soft)', marginTop: '0.25rem' }}>
            Olá, {session?.email}
          </p>
        </div>
        <Link href="/admin/products/new" className="btn btn--primary btn--icon">
          <IconPlus size={14} />
          Novo produto
        </Link>      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <div className="admin-card">
          <p style={{ fontSize: '0.85rem', color: 'var(--charcoal-soft)' }}>Total de produtos</p>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--charcoal)' }}>{total}</p>
        </div>
        <div className="admin-card">
          <p style={{ fontSize: '0.85rem', color: 'var(--charcoal-soft)' }}>Ativos no site</p>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--sage-dark)' }}>{active}</p>
        </div>
        <div className="admin-card">
          <p style={{ fontSize: '0.85rem', color: 'var(--charcoal-soft)' }}>Em destaque</p>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--lavender)' }}>{featured}</p>
        </div>
      </div>

      <div className="admin-card" style={{ marginTop: '2rem' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Como usar o painel</h2>
        <p style={{ color: 'var(--charcoal-soft)', marginBottom: '1rem', fontSize: '0.95rem' }}>
          Para adicionar, editar ou remover produtos, clique em <strong>Gerenciar produtos</strong>. É simples: escolha a imagem, preencha nome, preço e salve.
        </p>
        <div className="admin-actions">
          <Link href="/admin/products" className="btn btn--ghost">Gerenciar produtos</Link>
          <Link href="/admin/products/new" className="btn btn--primary btn--icon">Adicionar produto</Link>
          <Link href="/" target="_blank" className="btn btn--ghost">Ver site público</Link>
        </div>
      </div>
    </>
  );
}
