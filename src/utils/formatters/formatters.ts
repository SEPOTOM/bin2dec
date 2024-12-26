export const formatNumber = (num: number): string => {
  const numStr = String(num);

  if (numStr.length < 4) {
    return numStr;
  }

  const startIndex = numStr.length % 3;

  let result = numStr.slice(0, startIndex);

  for (let i = startIndex; i < numStr.length; i += 1) {
    if (i % 3 === startIndex && i !== 0) {
      result += ` ${numStr[i]}`;
    } else {
      result += numStr[i];
    }
  }

  return result;
};
