import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const admin = searchParams.get('admin');

  if (admin === 'true') {
    try {
      await requireAdmin();
    } catch {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }
    const products = await prisma.product.findMany({ orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }] });
    return NextResponse.json(products);
  }

  const products = await prisma.product.findMany({
    where: { active: true },
    orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
  });
  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  const body = await request.json();
  const product = await prisma.product.create({
    data: {
      name: body.name,
      description: body.description,
      category: body.category || 'geral',
      imageUrl: body.imageUrl || null,
      price: Number(body.price) || 0,
      featured: Boolean(body.featured),
      active: body.active !== false,
      sortOrder: Number(body.sortOrder) || 0,
    },
  });

  return NextResponse.json(product, { status: 201 });
}
