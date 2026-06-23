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
  const [uploading, setUploading] = useState(false);

  const selectedCategory = CATEGORIES.find((category) => category.value === form.category);

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

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      let data: { error?: string; url?: string } = {};
      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (!res.ok) {
        setError(data.error || 'Não foi possível enviar a imagem');
        setUploading(false);
        return;
      }

      if (data.url) {
        update('imageUrl', data.url);
      }
    } catch {
      setError('Não foi possível enviar a imagem. Tente novamente.');
    }

    setUploading(false);
    e.target.value = '';
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
    setTimeout(() => router.push('/admin/produtos'), 800);
  }

  return (
    <form onSubmit={handleSubmit} className="admin-card admin-form">
      <p className="admin-form__intro">
        Preencha os campos abaixo. Depois de salvar, o produto aparece automaticamente no site (se estiver marcado como ativo).
      </p>

      <section className="upload-box">
        <h2 className="upload-box__title">Foto do produto</h2>
        <p className="upload-box__text">Toque no botão verde para enviar uma foto do celular ou computador.</p>

        <label htmlFor="file" className="upload-box__button">
          {uploading ? 'Enviando foto...' : form.imageUrl ? 'Trocar foto' : 'Escolher foto'}
        </label>
        <input
          id="file"
          className="upload-box__input"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
          onChange={handleUpload}
          disabled={uploading || loading}
        />

        {form.imageUrl && (
          <div className="upload-box__preview">
            <Image src={form.imageUrl} alt="Pré-visualização" width={160} height={160} className="image-preview" unoptimized />
            <p className="form-hint">Foto selecionada. Pode salvar o produto.</p>
          </div>
        )}

        <details className="upload-box__more">
          <summary>Ou use link / imagem pronta</summary>
          <div className="form-group" style={{ marginTop: '1rem' }}>
            <label htmlFor="imageUrl">Link da imagem</label>
            <input
              id="imageUrl"
              value={form.imageUrl}
              onChange={(e) => update('imageUrl', e.target.value)}
              placeholder="/imagens/nome.avif ou https://..."
            />
          </div>
          <div className="form-group">
            <label>Imagens prontas do site</label>
            <ImagePicker value={form.imageUrl} onChange={(url) => update('imageUrl', url)} />
          </div>
        </details>
      </section>

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
        <button type="button" className="btn btn--ghost btn--full-mobile" onClick={() => router.push('/admin/produtos')}>
          Voltar
        </button>
      </div>
    </form>
  );
}
