export function discoCipher(input: string): string {
  return input
    .split(' ')
    .map(word => sortCharactersInWord(word))
    .join(' ');
}

function sortCharactersInWord(word: string): string {
  if (word.length <= 1) {
    return word;
  }

  const letters: string[] = [];
  const nonLetters: { char: string; index: number }[] = [];
  
  for (let i = 0; i < word.length; i++) {
    const char = word[i];
    if (/[a-zA-Z]/.test(char)) {
      letters.push(char);
    } else {
      nonLetters.push({ char, index: i });
    }
  }
  
  letters.sort((a, b) => {
    const lowerA = a.toLowerCase();
    const lowerB = b.toLowerCase();
    if (lowerA === lowerB) {
      return a < b ? -1 : a > b ? 1 : 0;
    }
    return lowerA.localeCompare(lowerB);
  });
  
  const result: string[] = new Array(word.length);
  let letterIndex = 0;
  
  for (let i = 0; i < word.length; i++) {
    const nonLetter = nonLetters.find(nl => nl.index === i);
    if (nonLetter) {
      result[i] = nonLetter.char;
    } else {
      result[i] = letters[letterIndex++];
    }
  }
  
  return result.join('');
}