import { ChangeEvent, KeyboardEvent, useState } from 'react';

import { convertBinaryToDecimal, formatNumber, isBinaryStr } from '@/utils';

const App = () => {
  const [binaryNumber, setBinaryNumber] = useState('0');
  const [decimalNumber, setDecimalNumber] = useState(0);
  const isBinary = isBinaryStr(binaryNumber);

  const formattedDecimalNumber = formatNumber(decimalNumber);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBinaryNumber(e.target.value);
  };

  const handleInputKeyDown = (e: KeyboardEvent) => {
    const FORBIDDEN_KEYS = ['+', '-', '.', ',', 'e', 'E'];

    if (FORBIDDEN_KEYS.includes(e.key)) {
      e.preventDefault();
    }
  };

  const handleButtonClick = () => {
    setDecimalNumber(convertBinaryToDecimal(binaryNumber));
  };

  return (
    <div className="mx-auto flex h-full max-w-5xl flex-col justify-center gap-y-3 p-3">
      <label className="flex flex-col gap-y-2 text-xl font-bold text-main">
        Input (a binary number):{' '}
        <input
          type="number"
          value={binaryNumber}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          className="outline-focus w-full bg-main p-2 text-3xl tracking-wider text-secondary"
        />
      </label>
      {!isBinary && (
        <div role="alert" className="text-md text-center font-bold text-error">
          ! Please enter only 0 or 1 !
        </div>
      )}
      <button
        type="button"
        onClick={handleButtonClick}
        disabled={!isBinary}
        className="rounded-md border-4 border-main p-2 text-xl font-black uppercase text-main transition-colors hover:bg-main hover:text-secondary active:border-main-dark active:bg-main-dark active:text-secondary active:transition-none disabled:border-disabled disabled:bg-disabled disabled:text-secondary"
      >
        Convert
      </button>
      <div
        role="status"
        className="flex flex-col items-center gap-y-1 text-xl font-bold text-main md:gap-y-3"
      >
        The decimal alternative is:{' '}
        <span className="text-center text-3xl md:text-5xl">
          {formattedDecimalNumber}
        </span>
      </div>
    </div>
  );
};

export default App;
