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

  it('should display the output area with a default value of 0', () => {
    render(<App />);

    expect(screen.getByRole('status')).toHaveTextContent(/0/i);
  });

  it('should display a convert button', () => {
    render(<App />);

    expect(
      screen.getByRole('button', { name: /convert/i }),
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

  describe('should correctly convert binary input to decimal output when clicking the convert button', () => {
    const inputs = ['1001', '11100', '11111111', '1', '0'];
    const outputs = ['9', '28', '255', '1', '0'];

    for (let i = 0; i < inputs.length; i += 1) {
      it(`${inputs[i]} becomes ${outputs[i]}`, async () => {
        const { user } = renderWithUser(<App />);

        await user.type(
          screen.getByRole('spinbutton', { name: /input/i }),
          inputs[i],
        );
        await user.click(screen.getByRole('button', { name: /convert/i }));

        expect(screen.getByRole('status')).toHaveTextContent(
          new RegExp(outputs[i], 'i'),
        );
      });
    }
  });
});
