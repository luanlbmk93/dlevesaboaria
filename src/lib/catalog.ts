import type { Product } from '@prisma/client';
import { productImages } from './images';
import { prisma } from './db';

const now = new Date(0);

const staticCatalog: Product[] = [
  { id: 1, name: 'Sabonete Amor Perfeito', description: 'Doçura floral que envolve a pele com carinho e hidratação profunda.', category: 'geral', price: 32, imageUrl: productImages.amorPerfeito, featured: false, active: true, sortOrder: 1, createdAt: now, updatedAt: now },
  { id: 2, name: 'Sabonete Green Garden', description: 'Frescor botânico com ervas do campo para uma limpeza revitalizante.', category: 'geral', price: 30, imageUrl: productImages.greenGarden, featured: false, active: true, sortOrder: 2, createdAt: now, updatedAt: now },
  { id: 3, name: 'Sabonete Café e Cacau', description: 'Aroma acolhedor com grãos naturais que esfoliam e iluminam.', category: 'geral', price: 34, imageUrl: productImages.cafeCacau, featured: false, active: true, sortOrder: 3, createdAt: now, updatedAt: now },
  { id: 4, name: 'Sabonete Carvão Ativado (Hot Process)', description: 'Hot Process com carvão ativado para purificar e equilibrar a pele.', category: 'hot-process', price: 38, imageUrl: productImages.carvaoAtivado, featured: false, active: true, sortOrder: 4, createdAt: now, updatedAt: now },
  { id: 5, name: 'Sabonete Brisa', description: 'Leveza e frescor em uma espuma delicada que acalma os sentidos.', category: 'geral', price: 28, imageUrl: productImages.brisa, featured: false, active: true, sortOrder: 5, createdAt: now, updatedAt: now },
  { id: 6, name: 'Sabonete Lavanda e Camomila', description: 'Aromas florais que relaxam o corpo e renovam a alma.', category: 'rosto', price: 32, imageUrl: productImages.lavandaCamomila, featured: false, active: true, sortOrder: 6, createdAt: now, updatedAt: now },
  { id: 7, name: 'Brisa de Lavanda e Ervas do Campo', description: 'Relaxe com o aroma floral da lavanda em uma esfoliação natural que acalma e renova o corpo.', category: 'destaque', price: 42, imageUrl: productImages.brisaLavanda, featured: true, active: true, sortOrder: 1, createdAt: now, updatedAt: now },
  { id: 8, name: 'Abraço de Argila e Flores', description: 'Sinta a cremosidade dos minerais na pele com um perfume terroso feito para trazer equilíbrio.', category: 'destaque', price: 45, imageUrl: productImages.abracoArgila, featured: true, active: true, sortOrder: 2, createdAt: now, updatedAt: now },
  { id: 9, name: 'Frescor Silvestre e Renovação', description: 'Desperte com o vigor das folhas nativas em uma espuma densa que limpa e restaura sua energia.', category: 'destaque', price: 40, imageUrl: productImages.frescorSilvestre, featured: true, active: true, sortOrder: 3, createdAt: now, updatedAt: now },
  { id: 10, name: 'Doçura de Grãos', description: 'Sinta a carícia das sementes naturais em uma barra hidratante que ilumina e amacia cada toque.', category: 'destaque', price: 36, imageUrl: productImages.docuraGraos, featured: true, active: true, sortOrder: 4, createdAt: now, updatedAt: now },
];

function hasLiveDatabase() {
  const url = process.env.DATABASE_URL?.trim();
  return Boolean(url && !url.includes('/tmp/build.db'));
}

function sortProducts(products: Product[]) {
  return [...products].sort((a, b) => a.sortOrder - b.sortOrder || a.id - b.id);
}

function filterStaticProducts(options?: { excludeCategories?: string[] }) {
  let products = staticCatalog.filter((product) => product.active);

  if (options?.excludeCategories?.length) {
    products = products.filter((product) => !options.excludeCategories!.includes(product.category));
  }

  return sortProducts(products);
}

export async function getPublicProducts(options?: { excludeCategories?: string[] }) {
  if (!hasLiveDatabase()) {
    return filterStaticProducts(options);
  }

  try {
    const products = await prisma.product.findMany({
      where: {
        active: true,
        ...(options?.excludeCategories?.length
          ? { category: { notIn: options.excludeCategories } }
          : {}),
      },
      orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
    });

    return products.length > 0 ? products : filterStaticProducts(options);
  } catch {
    return filterStaticProducts(options);
  }
}
