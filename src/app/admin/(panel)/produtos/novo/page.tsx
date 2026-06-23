import ProductForm from '@/components/admin/ProductForm';

export default function NewProductPage() {
  return (
    <>
      <div className="admin-header">
        <div>
          <h1>Novo produto</h1>
          <p className="admin-header__subtitle">Primeiro escolha a foto, depois preencha nome e preço</p>
        </div>
      </div>
      <ProductForm />
    </>
  );
}
