import { useState } from "react";
import generatePassphrase from "./core/generatePassphrase.js";
import words from "./data/words.js";
import "./App.css";
import copyToClipboard from "./platform/copyToClipboard.js";

const DEFAULT_WORD_COUNT = 4;
const DEFAULT_SEPARATOR = "-";
const DEFAULT_CAPITALIZE = true;
const DEFAULT_INCLUDE_NUMBER = true;
const DEFAULT_INCLUDE_SYMBOL = false;

function createPassphrase({
  wordCount,
  separator,
  capitalize,
  includeNumber,
  includeSymbol,
}) {
  return generatePassphrase({
    wordList: words,
    wordCount,
    separator,
    capitalize,
    includeNumber,
    includeSymbol,
  });
}

const initialPassphrase = createPassphrase({
  wordCount: DEFAULT_WORD_COUNT,
  separator: DEFAULT_SEPARATOR,
  capitalize: DEFAULT_CAPITALIZE,
  includeNumber: DEFAULT_INCLUDE_NUMBER,
  includeSymbol: DEFAULT_INCLUDE_SYMBOL,
});

function App() {
  const [wordCount, setWordCount] = useState(DEFAULT_WORD_COUNT);
  const [separator, setSeparator] = useState(DEFAULT_SEPARATOR);
  const [capitalize, setCapitalize] = useState(DEFAULT_CAPITALIZE);
  const [includeNumber, setIncludeNumber] = useState(DEFAULT_INCLUDE_NUMBER);
  const [includeSymbol, setIncludeSymbol] = useState(DEFAULT_INCLUDE_SYMBOL);
  const [passphrase, setPassphrase] = useState(initialPassphrase);
  const [copyStatus, setCopyStatus] = useState("");

  function handleGenerate() {
    const newPassphrase = createPassphrase({
      wordCount,
      separator,
      capitalize,
      includeNumber,
      includeSymbol,
    });

    setPassphrase(newPassphrase);
    setCopyStatus("");
  }

  function handleWordCountChange(event) {
    const newWordCount = Number(event.target.value);

    setWordCount(newWordCount);
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
          <label htmlFor="word-count">Words</label>

          <select
            id="word-count"
            value={wordCount}
            onChange={handleWordCountChange}
          >
            <option value="4">4 words</option>
            <option value="5">5 words</option>
            <option value="6">6 words</option>
          </select>
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
