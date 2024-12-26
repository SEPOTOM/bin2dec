import { formatNumber } from './formatters';

describe('formatNumber should work properly', () => {
  const inputs = [1000, 1000000, 1000000000, 12345, 654321];
  const expectedOutputs = [
    '1 000',
    '1 000 000',
    '1 000 000 000',
    '12 345',
    '654 321',
  ];

  for (let i = 0; i < inputs.length; i += 1) {
    it(`${inputs[i]} becomes "${expectedOutputs[i]}"`, () => {
      const result = formatNumber(inputs[i]);

      expect(result).toBe(expectedOutputs[i]);
    });
  }
});
