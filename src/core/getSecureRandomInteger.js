const UINT32_RANGE = 2 ** 32;

function getSecureRandomInteger(maximum) {
  if (
    !Number.isSafeInteger(maximum) ||
    maximum <= 0 ||
    maximum > UINT32_RANGE
  ) {
    throw new RangeError(
      `Maximum must be a positive integer no greater than ${UINT32_RANGE}.`,
    );
  }

  const randomValues = new Uint32Array(1);
  const unbiasedLimit = UINT32_RANGE - (UINT32_RANGE % maximum);

  do {
    globalThis.crypto.getRandomValues(randomValues);
  } while (randomValues[0] >= unbiasedLimit);

  return randomValues[0] % maximum;
}

export default getSecureRandomInteger;
