import { ChangeEvent, useState } from 'react';

const App = () => {
  const [binaryNumber, setBinaryNumber] = useState('0');
  const isBinary = binaryNumber
    .split('')
    .every((digit) => digit === '0' || digit === '1');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (newValue.length <= 8) {
      setBinaryNumber(newValue);
    }
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
    </>
  );
};

export default App;
