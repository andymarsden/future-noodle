import { render, screen } from '@testing-library/svelte';
import Button from './button.svelte';
import {describe, it, expect} from 'vitest';
import '@testing-library/jest-dom/vitest';


describe('Button', () => {
	it('renders a button', () => {
		render(Button);

		expect(screen.getByRole('button')).toBeInTheDocument();
	});
});