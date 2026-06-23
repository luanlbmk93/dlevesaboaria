import { NextRequest, NextResponse } from 'next/server';
import { createSession } from '@/lib/auth';
import { verifyAdmin } from '@/lib/products';

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'E-mail e senha são obrigatórios' }, { status: 400 });
  }

  const valid = await verifyAdmin(email, password);
  if (!valid) {
    return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 });
  }

  await createSession(email);
  return NextResponse.json({ ok: true });
}
