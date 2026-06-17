import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import ProductForm from '@/components/admin/ProductForm';

type Props = { params: Promise<{ id: string }> };

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id: Number(id) } });
  if (!product) notFound();

  return (
    <>
      <div className="admin-header">
        <h1>Editar produto</h1>
      </div>
      <ProductForm
        productId={product.id}
        initial={{
          name: product.name,
          description: product.description,
          category: product.category,
          price: product.price,
          imageUrl: product.imageUrl || '',
          featured: product.featured,
          active: product.active,
          sortOrder: product.sortOrder,
        }}
      />
    </>
  );
}
