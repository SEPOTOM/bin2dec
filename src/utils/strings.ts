export const isBinaryStr = (str: string): boolean => {
  for (const char of str) {
    if (char !== '0' && char !== '1') {
      return false;
    }
  }

  return true;
};
