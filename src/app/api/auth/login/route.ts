import { NextRequest, NextResponse } from 'next/server';
import { createSession } from '@/lib/auth';
import { verifyAdmin } from '@/lib/products';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'E-mail e senha são obrigatórios' }, { status: 400 });
    }

    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: 'Banco de dados não configurado na Netlify (DATABASE_URL).' },
        { status: 503 }
      );
    }

    if (!process.env.JWT_SECRET) {
      return NextResponse.json(
        { error: 'Painel não configurado na Netlify (JWT_SECRET).' },
        { status: 503 }
      );
    }

    const valid = await verifyAdmin(email, password);
    if (!valid) {
      return NextResponse.json({ error: 'E-mail ou senha incorretos' }, { status: 401 });
    }

    await createSession(email);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Erro no login:', error);
    return NextResponse.json(
      { error: 'Erro ao conectar com o banco. Confira DATABASE_URL na Netlify.' },
      { status: 500 }
    );
  }
}
