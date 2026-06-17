import ProductForm from '@/components/admin/ProductForm';

export default function NewProductPage() {
  return (
    <>
      <div className="admin-header">
        <h1>Novo produto</h1>
      </div>
      <ProductForm />
    </>
  );
}
