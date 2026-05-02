import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

export function formatDateShort(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
}

export function formatDateTime(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  }).format(new Date(date));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}

export const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
  'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
  'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
  'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
  'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
  'West Virginia', 'Wisconsin', 'Wyoming', 'Washington DC'
];

export const GRADUATION_YEARS = () => {
  const years = [];
  for (let y = new Date().getFullYear(); y >= 1950; y--) {
    years.push(y);
  }
  return years;
};

export const STATUS_COLORS: Record<string, string> = {
  ACTIVE: 'badge-active',
  PENDING: 'badge-pending',
  EXPIRED: 'badge-expired',
  SUSPENDED: 'badge-suspended',
  REJECTED: 'badge-rejected',
};

export const PAYMENT_METHOD_LABELS: Record<string, string> = {
  STRIPE: 'Credit/Debit Card',
  PAYPAL: 'PayPal',
  ZELLE: 'Zelle',
  CASHAPP: 'CashApp',
};

export const PAYMENT_STATUS_COLORS: Record<string, string> = {
  PENDING: 'badge-pending',
  PENDING_VERIFICATION: 'badge-pending',
  COMPLETED: 'badge-active',
  REFUNDED: 'badge-suspended',
};

export const getImageUrl = (path: string) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) return path;

  const parts = path.split('/');
  if (parts.length < 2) return path;

  const bucket = parts[0];
  const filePath = parts.slice(1).join('/');
  
  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${filePath}`;
};
