export const convertBinaryToDecimal = (binaryStr: string): number => {
  let result = 0;

  for (let i = 0; i < binaryStr.length; i += 1) {
    if (binaryStr[i] === '0') {
      continue;
    }

    result += 2 ** (binaryStr.length - i - 1);
  }

  return result;
};
