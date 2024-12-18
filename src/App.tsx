import { ChangeEvent, useState } from 'react';

const App = () => {
  const [binaryNumber, setBinaryNumber] = useState('0');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (newValue.length <= 8) {
      setBinaryNumber(newValue);
    }
  };

  return (
    <label>
      Input (a binary number):{' '}
      <input type="number" value={binaryNumber} onChange={handleInputChange} />
    </label>
  );
};

export default App;
