import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Logo } from './Logo';

describe('Logo component', () => {
	it('renders the logo with default props', () => {
		const { container } = render(<Logo size={100} />);
		const svg = container.querySelector('svg');
		expect(svg).toBeInTheDocument();
		expect(svg).toHaveClass('logo');
	});

	it('applies custom size', () => {
		const { container } = render(<Logo size={50} />);
		const box = container.querySelector('div');
		expect(box).toHaveStyle({ width: '50px', height: '50px' });
	});

	it('applies custom color', () => {
		const { container } = render(<Logo size={100} color="red" />);
		const group = container.querySelector('g');
		expect(group).toHaveAttribute('fill', 'red');
	});

	it('uses white as default color', () => {
		const { container } = render(<Logo size={100} />);
		const group = container.querySelector('g');
		expect(group).toHaveAttribute('fill', 'white');
	});
});
