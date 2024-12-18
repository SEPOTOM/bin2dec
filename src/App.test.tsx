import { render, screen } from '@testing-library/react';

import App from '@/App';
import { renderWithUser } from '@/tests';

describe('App', () => {
  it('should display an input field', () => {
    render(<App />);

    expect(
      screen.getByRole('spinbutton', { name: /input/i }),
    ).toBeInTheDocument();
  });

  it('should prohibit the user from entering more than 8 digits', async () => {
    const { user } = renderWithUser(<App />);

    await user.type(
      screen.getByRole('spinbutton', { name: /input/i }),
      '1'.repeat(9),
    );

    expect(
      screen.getByRole('spinbutton', { name: /input/i }),
    ).toHaveDisplayValue('1'.repeat(8));
  });

  it('should notify the user if anything other than a 0 or 1 was entered', async () => {
    const { user } = renderWithUser(<App />);

    await user.type(screen.getByRole('spinbutton', { name: /input/i }), '5');

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
});
