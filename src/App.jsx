import { useEffect, useState } from "react";
import generatePassphrase from "./core/generatePassphrase.js";
import getStrengthGuidance from "./core/getStrengthGuidance.js";
import words from "./data/words.js";
import copyToClipboard from "./platform/copyToClipboard.js";
import "./App.scss";

const DEFAULT_MINIMUM_WORDS = 4;
const DEFAULT_MINIMUM_LENGTH = 20;
const DEFAULT_SEPARATOR = "-";
const DEFAULT_CAPITALIZE = true;
const DEFAULT_INCLUDE_NUMBER = true;
const DEFAULT_INCLUDE_SYMBOL = false;

const THEME_STORAGE_KEY = "passphrase-generator:theme";
const SETTINGS_STORAGE_KEY = "passphrase-generator:settings";

const DEFAULT_SETTINGS = {
  minimumWords: DEFAULT_MINIMUM_WORDS,
  minimumLength: DEFAULT_MINIMUM_LENGTH,
  separator: DEFAULT_SEPARATOR,
  capitalize: DEFAULT_CAPITALIZE,
  includeNumber: DEFAULT_INCLUDE_NUMBER,
  includeSymbol: DEFAULT_INCLUDE_SYMBOL,
};

const ALLOWED_MINIMUM_LENGTHS = [0, 16, 20, 24, 32, 40];

function getInitialTheme() {
  const savedTheme = globalThis.localStorage.getItem(THEME_STORAGE_KEY);

  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme;
  }

  const prefersLight = globalThis.matchMedia(
    "(prefers-color-scheme: light)",
  ).matches;

  return prefersLight ? "light" : "dark";
}

function getInitialSettings() {
  try {
    const savedValue = globalThis.localStorage.getItem(SETTINGS_STORAGE_KEY);

    if (!savedValue) {
      return DEFAULT_SETTINGS;
    }

    const savedSettings = JSON.parse(savedValue);

    return {
      minimumWords: [4, 5, 6].includes(savedSettings.minimumWords)
        ? savedSettings.minimumWords
        : DEFAULT_SETTINGS.minimumWords,

      minimumLength: ALLOWED_MINIMUM_LENGTHS.includes(
        savedSettings.minimumLength,
      )
        ? savedSettings.minimumLength
        : DEFAULT_SETTINGS.minimumLength,

      separator:
        typeof savedSettings.separator === "string" &&
        savedSettings.separator.length <= 10
          ? savedSettings.separator
          : DEFAULT_SETTINGS.separator,

      capitalize:
        typeof savedSettings.capitalize === "boolean"
          ? savedSettings.capitalize
          : DEFAULT_SETTINGS.capitalize,

      includeNumber:
        typeof savedSettings.includeNumber === "boolean"
          ? savedSettings.includeNumber
          : DEFAULT_SETTINGS.includeNumber,

      includeSymbol:
        typeof savedSettings.includeSymbol === "boolean"
          ? savedSettings.includeSymbol
          : DEFAULT_SETTINGS.includeSymbol,
    };
  } catch (error) {
    console.warn("Saved settings could not be loaded.", error);

    return DEFAULT_SETTINGS;
  }
}

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

const initialSettings = getInitialSettings();

const initialResult = createPassphrase(initialSettings);

function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [minimumWords, setMinimumWords] = useState(
    initialSettings.minimumWords,
  );
  const [minimumLength, setMinimumLength] = useState(
    initialSettings.minimumLength,
  );
  const [separator, setSeparator] = useState(initialSettings.separator);
  const [capitalize, setCapitalize] = useState(initialSettings.capitalize);
  const [includeNumber, setIncludeNumber] = useState(
    initialSettings.includeNumber,
  );
  const [includeSymbol, setIncludeSymbol] = useState(
    initialSettings.includeSymbol,
  );
  const [result, setResult] = useState(initialResult);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    globalThis.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    const settings = {
      minimumWords,
      minimumLength,
      separator,
      capitalize,
      includeNumber,
      includeSymbol,
    };

    try {
      globalThis.localStorage.setItem(
        SETTINGS_STORAGE_KEY,
        JSON.stringify(settings),
      );
    } catch (error) {
      console.warn("Settings could not be saved.", error);
    }
  }, [
    minimumWords,
    minimumLength,
    separator,
    capitalize,
    includeNumber,
    includeSymbol,
  ]);

  const strength = getStrengthGuidance(result.wordCount);

  function handleThemeChange(event) {
    setTheme(event.target.checked ? "light" : "dark");
  }

  function handleGenerate(event) {
    event.preventDefault();

    const newResult = createPassphrase({
      minimumWords,
      minimumLength,
      separator,
      capitalize,
      includeNumber,
      includeSymbol,
    });

    setResult(newResult);

    setStatusMessage(
      `New passphrase generated. ${newResult.wordCount} words and ${newResult.passphrase.length} characters.`,
    );
  }

  function handleMinimumWordsChange(event) {
    setMinimumWords(Number(event.target.value));
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
      await copyToClipboard(result.passphrase);

      setStatusMessage("Passphrase copied to clipboard.");
    } catch (error) {
      console.error(error);

      setStatusMessage(
        "The passphrase could not be copied. Select it and copy it manually.",
      );
    }
  }

  return (
    <main className="app">
      <header className="app-header">
        <h1>Passphrase Generator</h1>

        <label
          className="theme-switch"
          data-tooltip={
            theme === "dark"
              ? "Fine. Turn on the big light."
              : "Return to the void."
          }
        >
          <input
            type="checkbox"
            role="switch"
            checked={theme === "light"}
            aria-label="Light mode"
            onChange={handleThemeChange}
          />

          <span className="theme-switch__track" aria-hidden="true">
            <span>☾</span>
            <span>☀</span>
            <span className="theme-switch__thumb"></span>
          </span>
        </label>
      </header>

      <p className="app-intro">
        Create a strong passphrase that is easier to remember. Based on the{" "}
        <a
          href="https://xkcd.com/936/"
          target="_blank"
          rel="noopener noreferrer"
        >
          XKCD comic #936 (opens in a new tab).
        </a>
      </p>

      <div className="generator">
        <div className="result">
          <label htmlFor="generated-passphrase">Generated passphrase</label>

          <output
            id="generated-passphrase"
            className="passphrase-output"
            aria-describedby="passphrase-length strength-summary"
          >
            {result.passphrase}
          </output>

          <div className="result-meta">
            <p id="passphrase-length">{result.passphrase.length} characters</p>

            <p id="strength-summary">
              <strong>{strength.label}</strong>
              {" · "}
              {result.wordCount} randomly selected words
            </p>
          </div>
        </div>

        <div className="action-group">
          <button
            className="button button--primary"
            type="submit"
            form="passphrase-settings"
          >
            Generate new passphrase
          </button>

          <button
            className="button button--secondary"
            type="button"
            onClick={handleCopy}
          >
            Copy passphrase
          </button>
        </div>

        <p className="status-message" role="status">
          {statusMessage}
        </p>

        <details className="settings-panel">
          <summary>Customize passphrase</summary>

          <form
            id="passphrase-settings"
            className="settings-form"
            onSubmit={handleGenerate}
          >
            <fieldset>
              <legend>Passphrase settings</legend>

              <p className="settings-note">
                Settings save automatically on this device.
              </p>

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
                  maxLength={10}
                  aria-describedby="separator-help"
                  onChange={handleSeparatorChange}
                />

                <p id="separator-help">
                  Enter one or more characters to use randomly. Leave blank for
                  none.
                </p>
              </div>

              <div className="field">
                <label className="checkbox-field" htmlFor="capitalize">
                  <input
                    id="capitalize"
                    type="checkbox"
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
            </fieldset>

            <button className="button button--primary" type="submit">
              Generate with these settings
            </button>
          </form>
        </details>

        <section className="strength" aria-labelledby="strength-heading">
          <h2 id="strength-heading">Strength guidance</h2>

          <p>
            <strong>{strength.label}</strong>
          </p>

          <p>{strength.description}</p>

          <p>Based on {result.wordCount} randomly selected words.</p>
        </section>
      </div>
    </main>
  );
}

export default App;
