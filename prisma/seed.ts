import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { productImages } from '../src/lib/images';

const prisma = new PrismaClient();

const products = [
  {
    name: 'Sabonete Amor Perfeito',
    description: 'Doçura floral que envolve a pele com carinho e hidratação profunda.',
    category: 'geral',
    price: 32,
    imageUrl: productImages.amorPerfeito,
    sortOrder: 1,
  },
  {
    name: 'Sabonete Green Garden',
    description: 'Frescor botânico com ervas do campo para uma limpeza revitalizante.',
    category: 'geral',
    price: 30,
    imageUrl: productImages.greenGarden,
    sortOrder: 2,
  },
  {
    name: 'Sabonete Café e Cacau',
    description: 'Aroma acolhedor com grãos naturais que esfoliam e iluminam.',
    category: 'geral',
    price: 34,
    imageUrl: productImages.cafeCacau,
    sortOrder: 3,
  },
  {
    name: 'Sabonete Carvão Ativado (Hot Process)',
    description: 'Hot Process com carvão ativado para purificar e equilibrar a pele.',
    category: 'hot-process',
    price: 38,
    imageUrl: productImages.carvaoAtivado,
    sortOrder: 4,
  },
  {
    name: 'Sabonete Brisa',
    description: 'Leveza e frescor em uma espuma delicada que acalma os sentidos.',
    category: 'geral',
    price: 28,
    imageUrl: productImages.brisa,
    sortOrder: 5,
  },
  {
    name: 'Sabonete Lavanda e Camomila',
    description: 'Aromas florais que relaxam o corpo e renovam a alma.',
    category: 'rosto',
    price: 32,
    imageUrl: productImages.lavandaCamomila,
    sortOrder: 6,
  },
  {
    name: 'Brisa de Lavanda e Ervas do Campo',
    description: 'Relaxe com o aroma floral da lavanda em uma esfoliação natural que acalma e renova o corpo.',
    category: 'destaque',
    featured: true,
    price: 42,
    imageUrl: productImages.brisaLavanda,
    sortOrder: 1,
  },
  {
    name: 'Abraço de Argila e Flores',
    description: 'Sinta a cremosidade dos minerais na pele com um perfume terroso feito para trazer equilíbrio.',
    category: 'destaque',
    featured: true,
    price: 45,
    imageUrl: productImages.abracoArgila,
    sortOrder: 2,
  },
  {
    name: 'Frescor Silvestre e Renovação',
    description: 'Desperte com o vigor das folhas nativas em uma espuma densa que limpa e restaura sua energia.',
    category: 'destaque',
    featured: true,
    price: 40,
    imageUrl: productImages.frescorSilvestre,
    sortOrder: 3,
  },
  {
    name: 'Doçura de Grãos',
    description: 'Sinta a carícia das sementes naturais em uma barra hidratante que ilumina e amacia cada toque.',
    category: 'destaque',
    featured: true,
    price: 36,
    imageUrl: productImages.docuraGraos,
    sortOrder: 4,
  },
];

async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@dleve.com';
  const password = process.env.ADMIN_PASSWORD || 'admin123';
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.admin.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash },
  });

  await prisma.product.deleteMany();

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log('Seed concluído!');
  console.log(`Admin: ${email}`);
  console.log(`Senha: ${password}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
