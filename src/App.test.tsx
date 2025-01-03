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

  it('should notify the user if anything other than a 0 or 1 was entered', async () => {
    const { user } = renderWithUser(<App />);

    await user.type(screen.getByRole('spinbutton', { name: /input/i }), '5');

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  describe('should allow the user to delete entered digits', () => {
    it('using Backspace', async () => {
      const { user } = renderWithUser(<App />);
      await user.type(
        screen.getByRole('spinbutton', { name: /input/i }),
        '111',
      );

      await user.keyboard('{Backspace}');

      expect(
        screen.getByRole('spinbutton', { name: /input/i }),
      ).toHaveDisplayValue('11');
    });

    it('using Delete', async () => {
      const { user } = renderWithUser(<App />);
      await user.type(
        screen.getByRole('spinbutton', { name: /input/i }),
        '101',
      );

      await user.keyboard('{ArrowLeft}{Delete}');

      expect(
        screen.getByRole('spinbutton', { name: /input/i }),
      ).toHaveDisplayValue('10');
    });
  });

  it('should disable the convert button if anything other than a 0 or 1 was entered', async () => {
    const { user } = renderWithUser(<App />);

    await user.type(screen.getByRole('spinbutton', { name: /input/i }), '5');

    expect(screen.getByRole('button', { name: /convert/i })).toBeDisabled();
  });

  it('should format the output if it is too long', async () => {
    const { user } = renderWithUser(<App />);

    await user.type(
      screen.getByRole('spinbutton', { name: /input/i }),
      '1'.repeat(10),
    );
    await user.click(screen.getByRole('button', { name: /convert/i }));

    expect(screen.getByRole('status')).toHaveTextContent(/1 023/i);
  });

  describe('should allow the user to enter only digits', () => {
    const forbiddenSymbols = ['.', ',', '+', '-', 'e'];

    for (const symbol of forbiddenSymbols) {
      it(`ignores ${symbol}`, async () => {
        const { user } = renderWithUser(<App />);

        await user.type(
          screen.getByRole('spinbutton', { name: /input/i }),
          symbol,
        );

        expect(
          screen.getByRole('spinbutton', { name: /input/i }),
        ).toHaveDisplayValue('0');
      });
    }

    const forbiddenSymbolsWithNums = ['.2', ',2', '+2', '-2', 'e2'];

    for (const symbol of forbiddenSymbolsWithNums) {
      it(`ignores ${symbol[0]} in ${symbol}`, async () => {
        const { user } = renderWithUser(<App />);

        await user.type(
          screen.getByRole('spinbutton', { name: /input/i }),
          symbol,
        );

        expect(
          screen.getByRole('spinbutton', { name: /input/i }),
        ).toHaveDisplayValue('2');
      });
    }
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
