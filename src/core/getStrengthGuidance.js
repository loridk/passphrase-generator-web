function getStrengthGuidance(wordCount) {
  if (wordCount >= 6) {
    return {
      label: "Very strong",
      description:
        "Six or more randomly selected words are suitable for high-value uses, including password-manager master passwords.",
    };
  }

  if (wordCount === 5) {
    return {
      label: "Strong",
      description:
        "Five randomly selected words provide additional protection while remaining reasonably memorable.",
    };
  }

  return {
    label: "Good",
    description:
      "Four randomly selected words are practical for many online accounts. Use multi-factor authentication when available.",
  };
}

export default getStrengthGuidance;
