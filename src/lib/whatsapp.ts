import type { CartItem } from './cart';

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5541988931260';

function normalizeWhatsAppNumber(raw: string) {
  const digits = raw.replace(/\D/g, '');
  if (digits.startsWith('55')) return digits;
  if (digits.length === 10 || digits.length === 11) return `55${digits}`;
  return digits;
}

export function formatPrice(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function buildWhatsAppOrderUrl(items: CartItem[], customerName?: string) {
  const lines = items.map((item, index) => {
    const subtotal = formatPrice(item.price * item.quantity);
    const unitPrice = item.quantity > 1 ? ` (${formatPrice(item.price)} cada)` : '';
    return `${index + 1}. ${item.name} — Qtd: ${item.quantity}${unitPrice} — Subtotal: ${subtotal}`;
  });

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const message = [
    'Olá! Gostaria de fazer um pedido na D\'Leve Saboaria.',
    '',
    customerName ? `Nome: ${customerName}` : null,
    '',
    '*Itens escolhidos:*',
    ...lines,
    '',
    `*Total do pedido: ${formatPrice(total)}*`,
    '',
    'Aguardo retorno com carinho!',
  ]
    .filter((line) => line !== null && line !== undefined)
    .join('\n');

  const phone = normalizeWhatsAppNumber(WHATSAPP_NUMBER);
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppContactUrl(message?: string) {
  const phone = normalizeWhatsAppNumber(WHATSAPP_NUMBER);
  if (!message) return `https://wa.me/${phone}`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
