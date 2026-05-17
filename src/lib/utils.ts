export function formatPrice(n: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n);
}

export function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, '');
}
