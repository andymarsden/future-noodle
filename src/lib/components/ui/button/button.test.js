import { render, screen } from '@testing-library/svelte';
import Button from './button.svelte';

describe('Button', () => {
  test('renders the button with the correct text', () => {
    render(Button, { props: { children: () => 'Click me' } });
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });
});