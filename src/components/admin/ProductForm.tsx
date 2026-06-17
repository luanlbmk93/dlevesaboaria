'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { CATEGORIES } from '@/lib/products';

type ProductFormData = {
  name: string;
  description: string;
  category: string;
  price: number;
  imageUrl: string;
  featured: boolean;
  active: boolean;
  sortOrder: number;
};

type Props = {
  initial?: Partial<ProductFormData>;
  productId?: number;
};

const defaults: ProductFormData = {
  name: '',
  description: '',
  category: 'geral',
  price: 0,
  imageUrl: '',
  featured: false,
  active: true,
  sortOrder: 0,
};

export default function ProductForm({ initial, productId }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<ProductFormData>({ ...defaults, ...initial });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  function update(field: keyof ProductFormData, value: string | boolean | number) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error || 'Erro ao enviar imagem');
      setUploading(false);
      return;
    }

    update('imageUrl', data.url);
    setUploading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const url = productId ? `/api/products/${productId}` : '/api/products';
    const method = productId ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || 'Erro ao salvar produto');
      setLoading(false);
      return;
    }

    setSuccess('Produto salvo com sucesso!');
    setLoading(false);
    setTimeout(() => router.push('/admin/products'), 800);
  }

  return (
    <form onSubmit={handleSubmit} className="admin-card" style={{ maxWidth: 640 }}>
      <div className="form-group">
        <label htmlFor="name">Nome do produto *</label>
        <input id="name" value={form.name} onChange={(e) => update('name', e.target.value)} required />
      </div>

      <div className="form-group">
        <label htmlFor="description">Descrição *</label>
        <textarea id="description" value={form.description} onChange={(e) => update('description', e.target.value)} required rows={4} />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="category">Categoria</label>
          <select id="category" value={form.category} onChange={(e) => update('category', e.target.value)}>
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="price">Preço (R$)</label>
          <input id="price" type="number" min="0" step="0.01" value={form.price} onChange={(e) => update('price', Number(e.target.value))} />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="sortOrder">Ordem de exibição</label>
        <input id="sortOrder" type="number" value={form.sortOrder} onChange={(e) => update('sortOrder', Number(e.target.value))} />
      </div>

      <div className="form-group">
        <label htmlFor="imageUrl">URL da imagem</label>
        <input id="imageUrl" value={form.imageUrl} onChange={(e) => update('imageUrl', e.target.value)} placeholder="https://... ou /uploads/..." />
      </div>

      <div className="form-group">
        <label htmlFor="file">Ou envie uma imagem</label>
        <input id="file" type="file" accept="image/*" onChange={handleUpload} disabled={uploading} />
        {uploading && <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>Enviando...</p>}
        {form.imageUrl && (
          <Image src={form.imageUrl} alt="Preview" width={120} height={120} className="image-preview" unoptimized />
        )}
      </div>

      <div className="form-row">
        <label className="form-check">
          <input type="checkbox" checked={form.featured} onChange={(e) => update('featured', e.target.checked)} />
          Produto em destaque
        </label>
        <label className="form-check">
          <input type="checkbox" checked={form.active} onChange={(e) => update('active', e.target.checked)} />
          Ativo no site
        </label>
      </div>

      {error && <p className="form-error">{error}</p>}
      {success && <p className="form-success">{success}</p>}

      <div className="admin-actions" style={{ marginTop: '1.5rem' }}>
        <button type="submit" className="btn btn--primary" disabled={loading}>
          {loading ? 'Salvando...' : productId ? 'Atualizar produto' : 'Criar produto'}
        </button>
        <button type="button" className="btn btn--ghost" onClick={() => router.push('/admin/products')}>
          Cancelar
        </button>
      </div>
    </form>
  );
}
