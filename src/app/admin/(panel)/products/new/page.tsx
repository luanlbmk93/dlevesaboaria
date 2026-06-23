import ProductForm from '@/components/admin/ProductForm';

export default function NewProductPage() {
  return (
    <>
      <div className="admin-header">
        <div>
          <h1>Novo produto</h1>
          <p className="admin-header__subtitle">Preencha os campos e toque em Criar produto</p>
        </div>
      </div>
      <ProductForm />
    </>
  );
}
