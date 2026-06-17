import bcrypt from 'bcryptjs';
import { prisma } from './db';

export const CATEGORIES = [
  { value: 'hot-process', label: 'Hot Process' },
  { value: 'rosto', label: 'Cuidados com o rosto' },
  { value: 'geral', label: 'Geral' },
  { value: 'destaque', label: 'Tendência' },
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
