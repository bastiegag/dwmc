import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useContextWrapper } from './useContextWrapper';
import { createContext } from 'react';

describe('useContextWrapper', () => {
	it('returns context value when context is provided', () => {
		const TestContext = createContext<string>('test value');
		const { result } = renderHook(() =>
			useContextWrapper(TestContext, {
				contextName: 'TestContext',
				providerName: 'TestProvider'
			})
		);
		expect(result.current).toBe('test value');
	});

	it('throws error when context is not provided', () => {
		const TestContext = createContext<string | null>(null);
		expect(() =>
			renderHook(() =>
				useContextWrapper(TestContext, {
					contextName: 'TestContext',
					providerName: 'TestProvider'
				})
			)
		).toThrow('TestContext must be used within a TestProvider');
	});
});
