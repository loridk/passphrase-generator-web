import { describe, expect, test } from "vitest";
import generatePassphrase from "./generatePassphrase.js";

const TEST_WORDS = ["alpha", "bravo", "charlie", "delta"];

const BASE_OPTIONS = {
  wordList: TEST_WORDS,
  minimumWords: 4,
  minimumLength: 0,
  separator: "-",
  capitalize: false,
  includeNumber: false,
  includeSymbol: false,
};

describe("generatePassphrase", () => {
  test("generates the requested minimum number of words", () => {
    const result = generatePassphrase(BASE_OPTIONS);
    const generatedWords = result.passphrase.split("-");

    expect(result.wordCount).toBe(4);
    expect(generatedWords).toHaveLength(4);

    for (const word of generatedWords) {
      expect(TEST_WORDS).toContain(word);
    }
  });

  test("adds words until it reaches the minimum length", () => {
    const result = generatePassphrase({
      ...BASE_OPTIONS,
      wordList: ["alpha"],
      minimumWords: 1,
      minimumLength: 12,
    });

    expect(result.passphrase.length).toBeGreaterThanOrEqual(12);
    expect(result.wordCount).toBeGreaterThanOrEqual(1);
  });

  test("can capitalize words and remove separators", () => {
    const result = generatePassphrase({
      ...BASE_OPTIONS,
      wordList: ["alpha"],
      minimumWords: 2,
      separator: "",
      capitalize: true,
    });

    expect(result.passphrase).toBe("AlphaAlpha");
  });

  test("can append a random digit", () => {
    const result = generatePassphrase({
      ...BASE_OPTIONS,
      wordList: ["alpha"],
      minimumWords: 1,
      includeNumber: true,
    });

    expect(result.passphrase).toMatch(/^alpha\d$/);
  });

  test("can add a random symbol", () => {
    const result = generatePassphrase({
      ...BASE_OPTIONS,
      wordList: ["alpha"],
      minimumWords: 1,
      includeSymbol: true,
    });

    expect(result.passphrase).toMatch(/[!@#$%&*?]/);
    expect(result.passphrase.replace(/[!@#$%&*?]/, "")).toBe("alpha");
  });

  test("rejects an empty word list", () => {
    expect(() => {
      generatePassphrase({
        ...BASE_OPTIONS,
        wordList: [],
      });
    }).toThrow("The word list must be a non-empty array.");
  });

  test("rejects invalid minimum settings", () => {
    expect(() => {
      generatePassphrase({
        ...BASE_OPTIONS,
        minimumWords: 0,
      });
    }).toThrow("Minimum words must be a positive integer.");

    expect(() => {
      generatePassphrase({
        ...BASE_OPTIONS,
        minimumLength: 129,
      });
    }).toThrow("Minimum length must be an integer between 0 and 128.");
  });
});
