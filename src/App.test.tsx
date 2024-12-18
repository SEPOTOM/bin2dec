import { render, screen } from '@testing-library/react';

import App from '@/App';

describe('App', () => {
  it('should display an input field', () => {
    render(<App />);

    expect(
      screen.getByRole('spinbutton', { name: /input/i }),
    ).toBeInTheDocument();
  });
});
