import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany({
    orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
    select: { id: true, name: true, active: true, category: true, price: true },
  });

  console.log(`Total: ${products.length} produtos`);
  for (const product of products) {
    console.log(`  ${product.id}. ${product.name} (${product.category}) - R$ ${product.price} - ${product.active ? 'ativo' : 'inativo'}`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
