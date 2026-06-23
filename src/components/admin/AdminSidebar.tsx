'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { IconExternalLink } from '@/components/icons/Icons';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/entrar');
    router.refresh();
  }

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar__logo">
        D<span>&apos;</span>Leve <small style={{ fontSize: '0.6em', opacity: 0.6 }}>Painel</small>
      </div>
      <nav className="admin-nav">
        <Link href="/admin" className={pathname === '/admin' ? 'active' : ''}>
          Início
        </Link>
        <Link href="/admin/produtos" className={pathname.startsWith('/admin/produtos') ? 'active' : ''}>
          Produtos
        </Link>
        <Link href="/" target="_blank" className="admin-nav__external">
          Ver site
          <IconExternalLink />
        </Link>
      </nav>
      <button onClick={handleLogout} className="btn btn--ghost btn--sm" style={{ marginTop: 'auto', color: 'rgba(255,255,255,0.7)', borderColor: 'rgba(255,255,255,0.2)' }}>
        Sair
      </button>
    </aside>
  );
}
