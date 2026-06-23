import bcrypt from 'bcryptjs';
import { prisma } from './db';

export const CATEGORIES = [
  { value: 'geral', label: 'Geral', hint: 'Aparece na loja de produtos' },
  { value: 'hot-process', label: 'Processo quente', hint: 'Sabonetes feitos pelo processo a quente' },
  { value: 'rosto', label: 'Cuidados com o rosto', hint: 'Produtos para o rosto' },
  { value: 'destaque', label: 'Tendência', hint: 'Aparece na seção Tendências da página inicial' },
] as const;

export type CategoryValue = (typeof CATEGORIES)[number]['value'];

export function getCategoryLabel(value: string) {
  return CATEGORIES.find((c) => c.value === value)?.label ?? value;
}

export async function verifyAdmin(email: string, password: string) {
  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin) return false;
  return bcrypt.compare(password, admin.passwordHash);
}
