import { CurrencyCode, CurrencyConfig } from '../types';

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'United States (USD $)',
    country: 'United States',
    flag: '🇺🇸',
    rate: 1.0,
  },
  CAD: {
    code: 'CAD',
    symbol: 'CA$',
    name: 'Canada (CAD $)',
    country: 'Canada',
    flag: '🇨🇦',
    rate: 1.36,
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    name: 'United Kingdom (GBP £)',
    country: 'United Kingdom',
    flag: '🇬🇧',
    rate: 0.79,
  },
  AUD: {
    code: 'AUD',
    symbol: 'AU$',
    name: 'Australia (AUD $)',
    country: 'Australia',
    flag: '🇦🇺',
    rate: 1.52,
  },
};

export function formatPrice(amountInUSD: number, currency: CurrencyConfig): string {
  const converted = amountInUSD * currency.rate;
  // Always format clean 2 decimals or rounded
  return `${currency.symbol}${converted.toFixed(2)}`;
}
