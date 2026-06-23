'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { CATEGORIES } from '@/lib/products';
import ImagePicker from './ImagePicker';

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

  const selectedCategory = CATEGORIES.find((category) => category.value === form.category);

  function update(field: keyof ProductFormData, value: string | boolean | number) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!form.name.trim() || !form.description.trim()) {
      setError('Preencha o nome e a descrição do produto.');
      setLoading(false);
      return;
    }

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

    setSuccess(productId ? 'Produto atualizado com sucesso!' : 'Produto criado com sucesso!');
    setLoading(false);
    setTimeout(() => router.push('/admin/products'), 800);
  }

  return (
    <form onSubmit={handleSubmit} className="admin-card admin-form">
      <p className="admin-form__intro">
        Preencha os campos abaixo. Depois de salvar, o produto aparece automaticamente no site (se estiver marcado como ativo).
      </p>

      <div className="form-group">
        <label htmlFor="name">Nome do produto *</label>
        <input
          id="name"
          value={form.name}
          onChange={(e) => update('name', e.target.value)}
          placeholder="Ex: Sabonete Lavanda e Camomila"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Descrição *</label>
        <textarea
          id="description"
          value={form.description}
          onChange={(e) => update('description', e.target.value)}
          placeholder="Descreva aromas, benefícios e sensações do produto"
          required
          rows={4}
        />
        <p className="form-hint">Texto que aparece na loja, abaixo do nome do produto.</p>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="category">Onde aparece no site</label>
          <select id="category" value={form.category} onChange={(e) => update('category', e.target.value)}>
            {CATEGORIES.map((category) => (
              <option key={category.value} value={category.value}>{category.label}</option>
            ))}
          </select>
          {selectedCategory && <p className="form-hint">{selectedCategory.hint}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="price">Preço (R$)</label>
          <input
            id="price"
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={(e) => update('price', Number(e.target.value))}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="sortOrder">Ordem na loja</label>
        <input
          id="sortOrder"
          type="number"
          value={form.sortOrder}
          onChange={(e) => update('sortOrder', Number(e.target.value))}
        />
        <p className="form-hint">Número menor aparece primeiro. Use 1, 2, 3...</p>
      </div>

      <div className="form-group">
        <label>Imagem do produto</label>
        <ImagePicker value={form.imageUrl} onChange={(url) => update('imageUrl', url)} />
      </div>

      {form.imageUrl && (
        <div className="form-group">
          <label>Pré-visualização</label>
          <Image src={form.imageUrl} alt="Pré-visualização" width={140} height={140} className="image-preview" unoptimized />
        </div>
      )}

      <div className="form-toggles">
        <label className="form-check form-check--card">
          <input type="checkbox" checked={form.active} onChange={(e) => update('active', e.target.checked)} />
          <span>
            <strong>Ativo no site</strong>
            <small>Desmarque para esconder sem excluir</small>
          </span>
        </label>
        <label className="form-check form-check--card">
          <input type="checkbox" checked={form.featured} onChange={(e) => update('featured', e.target.checked)} />
          <span>
            <strong>Destaque extra</strong>
            <small>Marca o produto como especial no painel</small>
          </span>
        </label>
      </div>

      {error && <p className="form-error">{error}</p>}
      {success && <p className="form-success">{success}</p>}

      <div className="admin-actions admin-actions--form">
        <button type="submit" className="btn btn--primary btn--full-mobile" disabled={loading}>
          {loading ? 'Salvando...' : productId ? 'Salvar alterações' : 'Criar produto'}
        </button>
        <button type="button" className="btn btn--ghost btn--full-mobile" onClick={() => router.push('/admin/products')}>
          Voltar
        </button>
      </div>
    </form>
  );
}
