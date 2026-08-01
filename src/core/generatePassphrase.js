import getSecureRandomInteger from "./getSecureRandomInteger.js";

const SYMBOLS = "!@#$%&*?";

function capitalizeFirstLetter(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function generatePassphrase({
  wordList,
  minimumWords = 4,
  minimumLength = 20,
  separator = "-",
  capitalize = true,
  includeNumber = true,
  includeSymbol = false,
}) {
  if (!Array.isArray(wordList) || wordList.length === 0) {
    throw new TypeError("The word list must be a non-empty array.");
  }

  if (!Number.isInteger(minimumWords) || minimumWords < 1) {
    throw new RangeError("Minimum words must be a positive integer.");
  }

  if (
    !Number.isInteger(minimumLength) ||
    minimumLength < 0 ||
    minimumLength > 128
  ) {
    throw new RangeError(
      "Minimum length must be an integer between 0 and 128.",
    );
  }

  if (typeof separator !== "string") {
    throw new TypeError("The separator must be a string.");
  }

  const selectedWords = [];
  let estimatedLength = 0;

  if (includeNumber) {
    estimatedLength += 1;
  }

  if (includeSymbol) {
    estimatedLength += 1;
  }

  while (
    selectedWords.length < minimumWords ||
    estimatedLength < minimumLength
  ) {
    const randomIndex = getSecureRandomInteger(wordList.length);
    const selectedWord = wordList[randomIndex];
    const formattedWord = capitalize
      ? capitalizeFirstLetter(selectedWord)
      : selectedWord;

    selectedWords.push(formattedWord);
    estimatedLength += formattedWord.length;

    if (selectedWords.length > 1 && separator.length > 0) {
      estimatedLength += 1;
    }
  }

  if (includeSymbol) {
    const symbolIndex = getSecureRandomInteger(SYMBOLS.length);
    const selectedSymbol = SYMBOLS[symbolIndex];
    const insertionPoint = getSecureRandomInteger(selectedWords.length + 1);

    if (insertionPoint === selectedWords.length) {
      const lastWordIndex = selectedWords.length - 1;

      selectedWords[lastWordIndex] =
        `${selectedWords[lastWordIndex]}${selectedSymbol}`;
    } else {
      selectedWords[insertionPoint] =
        `${selectedSymbol}${selectedWords[insertionPoint]}`;
    }
  }

  let passphrase = selectedWords[0];

  for (let index = 1; index < selectedWords.length; index += 1) {
    let selectedSeparator = "";

    if (separator.length > 0) {
      const separatorIndex = getSecureRandomInteger(separator.length);

      selectedSeparator = separator[separatorIndex];
    }

    passphrase += selectedSeparator + selectedWords[index];
  }

  if (includeNumber) {
    const randomDigit = getSecureRandomInteger(10);

    passphrase = `${passphrase}${randomDigit}`;
  }

  return {
    passphrase,
    wordCount: selectedWords.length,
  };
}

export default generatePassphrase;
