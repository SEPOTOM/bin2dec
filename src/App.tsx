import { ChangeEvent, useState } from 'react';

import { convertBinaryToDecimal, isBinaryStr } from '@/utils';

const App = () => {
  const [binaryNumber, setBinaryNumber] = useState('0');
  const [decimalNumber, setDecimalNumber] = useState(0);
  const isBinary = isBinaryStr(binaryNumber);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (newValue.length <= 8) {
      setBinaryNumber(newValue);
    }
  };

  const handleButtonClick = () => {
    setDecimalNumber(convertBinaryToDecimal(binaryNumber));
  };

  return (
    <>
      <label>
        Input (a binary number):{' '}
        <input
          type="number"
          value={binaryNumber}
          onChange={handleInputChange}
        />
      </label>
      {!isBinary && <div role="alert">! Please enter only 0 or 1 !</div>}
      <button type="button" onClick={handleButtonClick}>
        Convert
      </button>
      <div role="status">The decimal alternative is: {decimalNumber}</div>
    </>
  );
};

export default App;
