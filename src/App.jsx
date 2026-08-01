import { useState } from "react";
import generatePassphrase from "./core/generatePassphrase.js";
import words from "./data/words.js";
import "./App.css";
import copyToClipboard from "./platform/copyToClipboard.js";

const DEFAULT_MINIMUM_WORDS = 4;
const DEFAULT_MINIMUM_LENGTH = 20;
const DEFAULT_SEPARATOR = "-";
const DEFAULT_CAPITALIZE = true;
const DEFAULT_INCLUDE_NUMBER = true;
const DEFAULT_INCLUDE_SYMBOL = false;

function createPassphrase({
  minimumWords,
  minimumLength,
  separator,
  capitalize,
  includeNumber,
  includeSymbol,
}) {
  return generatePassphrase({
    wordList: words,
    minimumWords,
    minimumLength,
    separator,
    capitalize,
    includeNumber,
    includeSymbol,
  });
}

const initialPassphrase = createPassphrase({
  minimumWords: DEFAULT_MINIMUM_WORDS,
  minimumLength: DEFAULT_MINIMUM_LENGTH,
  separator: DEFAULT_SEPARATOR,
  capitalize: DEFAULT_CAPITALIZE,
  includeNumber: DEFAULT_INCLUDE_NUMBER,
  includeSymbol: DEFAULT_INCLUDE_SYMBOL,
});

function App() {
  const [minimumWords, setMinimumWords] = useState(DEFAULT_MINIMUM_WORDS);
  const [minimumLength, setMinimumLength] = useState(DEFAULT_MINIMUM_LENGTH);
  const [separator, setSeparator] = useState(DEFAULT_SEPARATOR);
  const [capitalize, setCapitalize] = useState(DEFAULT_CAPITALIZE);
  const [includeNumber, setIncludeNumber] = useState(DEFAULT_INCLUDE_NUMBER);
  const [includeSymbol, setIncludeSymbol] = useState(DEFAULT_INCLUDE_SYMBOL);
  const [passphrase, setPassphrase] = useState(initialPassphrase);
  const [copyStatus, setCopyStatus] = useState("");

  function handleGenerate() {
    const newPassphrase = createPassphrase({
      minimumWords,
      minimumLength,
      separator,
      capitalize,
      includeNumber,
      includeSymbol,
    });

    setPassphrase(newPassphrase);
    setCopyStatus("");
  }

  function handleMinimumWordsChange(event) {
    const newMinimumWords = Number(event.target.value);

    setMinimumWords(newMinimumWords);
  }

  function handleMinimumLengthChange(event) {
    setMinimumLength(Number(event.target.value));
  }

  function handleSeparatorChange(event) {
    setSeparator(event.target.value);
  }

  function handleCapitalizeChange(event) {
    setCapitalize(event.target.checked);
  }

  function handleIncludeNumberChange(event) {
    setIncludeNumber(event.target.checked);
  }

  function handleIncludeSymbolChange(event) {
    setIncludeSymbol(event.target.checked);
  }

  async function handleCopy() {
    try {
      await copyToClipboard(passphrase);

      setCopyStatus("Passphrase copied to clipboard.");
    } catch (error) {
      console.error(error);

      setCopyStatus(
        "The passphrase could not be copied. Select it and copy it manually.",
      );
    }
  }

  return (
    <main className="app">
      <h1>Passphrase Generator</h1>

      <p>
        Create a strong passphrase that is easier to remember. Based on the{" "}
        <a
          href="https://xkcd.com/936/"
          target="_blank"
          rel="noopener noreferrer"
        >
          XKCD comic #936.
        </a>
      </p>

      <section className="generator">
        <div className="field">
          <label htmlFor="minimum-words">Minimum words</label>

          <select
            id="minimum-words"
            value={minimumWords}
            onChange={handleMinimumWordsChange}
          >
            <option value="4">4 words</option>
            <option value="5">5 words</option>
            <option value="6">6 words</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="minimum-length">Minimum characters</label>

          <select
            id="minimum-length"
            value={minimumLength}
            aria-describedby="minimum-length-help"
            onChange={handleMinimumLengthChange}
          >
            <option value="0">No minimum</option>
            <option value="16">16 characters</option>
            <option value="20">20 characters</option>
            <option value="24">24 characters</option>
            <option value="32">32 characters</option>
            <option value="40">40 characters</option>
          </select>

          <p id="minimum-length-help">
            Additional words may be added to reach this length.
          </p>
        </div>

        <div className="field">
          <label htmlFor="separator">Separator characters</label>

          <input
            id="separator"
            type="text"
            value={separator}
            maxLength="10"
            aria-describedby="separator-help"
            onChange={handleSeparatorChange}
          />

          <p id="separator-help">
            Enter one or more characters to use randomly. <br />
            Leave blank for none.
          </p>
        </div>

        <div className="field">
          <label className="checkbox-field" htmlFor="capitalize">
            <input
              type="checkbox"
              id="capitalize"
              checked={capitalize}
              onChange={handleCapitalizeChange}
            />

            <span>Capitalize each word</span>
          </label>
        </div>

        <div className="field">
          <label className="checkbox-field" htmlFor="include-number">
            <input
              id="include-number"
              type="checkbox"
              checked={includeNumber}
              onChange={handleIncludeNumberChange}
            />

            <span>Append a random digit (0–9)</span>
          </label>
        </div>

        <div className="field">
          <label className="checkbox-field" htmlFor="include-symbol">
            <input
              id="include-symbol"
              type="checkbox"
              checked={includeSymbol}
              aria-describedby="symbol-help"
              onChange={handleIncludeSymbolChange}
            />

            <span>Add a random symbol</span>
          </label>

          <p id="symbol-help">
            Uses an exclamation point, at sign, number sign, dollar sign,
            percent sign, ampersand, asterisk, or question mark at a word
            boundary.
          </p>
        </div>

        <output
          className="passphrase-output"
          aria-label="Generated passphrase"
          aria-describedby="passphrase-length"
        >
          {passphrase}
        </output>

        <p id="passphrase-length">{passphrase.length} characters</p>

        <button type="button" onClick={handleCopy}>
          Copy passphrase
        </button>

        <p className="copy-status" role="status">
          {copyStatus}
        </p>

        <button type="button" onClick={handleGenerate}>
          Generate new passphrase
        </button>
      </section>
    </main>
  );
}

export default App;
