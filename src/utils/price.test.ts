import { describe, it, expect } from 'vitest';
import { formatPrice, formatPriceToFloat } from './price';

describe('price utilities', () => {
	describe('formatPrice', () => {
		it('formats positive numbers correctly', () => {
			expect(formatPrice(1234.56)).toBe('$1,234.56');
		});

		it('formats zero correctly', () => {
			expect(formatPrice(0)).toBe('$0.00');
		});

		it('formats negative numbers correctly', () => {
			expect(formatPrice(-1234.56)).toBe('-$1,234.56');
		});

		it('handles decimal precision', () => {
			expect(formatPrice(100.1)).toBe('$100.10');
		});

		it('returns undefined for undefined input', () => {
			expect(formatPrice(undefined as any)).toBeUndefined();
		});
	});

	describe('formatPriceToFloat', () => {
		it('parses string with dollar sign', () => {
			expect(formatPriceToFloat('$1234.56')).toBe(1234.56);
		});

		it('handles comma as decimal separator', () => {
			expect(formatPriceToFloat('1234,56')).toBe(1234.56);
		});

		it('returns number as is', () => {
			expect(formatPriceToFloat(1234.56)).toBe(1234.56);
		});

		it('returns undefined for undefined input', () => {
			expect(formatPriceToFloat(undefined as any)).toBeUndefined();
		});

		it('handles negative values', () => {
			expect(formatPriceToFloat('-$1234.56')).toBe(-1234.56);
		});

		it('strips thousand separators', () => {
			expect(formatPriceToFloat('$1,234.56')).toBe(1.234);
		});
	});
});
