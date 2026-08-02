import { useEffect, useState } from "react";
import generatePassphrase from "./core/generatePassphrase.js";
import getStrengthGuidance from "./core/getStrengthGuidance.js";
import words from "./data/words.js";
import copyToClipboard from "./platform/copyToClipboard.js";
import ThemeSwitch from "./components/ThemeSwitch.jsx";
import StrengthInfo from "./components/StrengthInfo.jsx";
import PassphraseResult from "./components/PassphraseResult.jsx";
import GeneratorSettings from "./components/GeneratorSettings.jsx";
import AppFooter from "./components/AppFooter.jsx";
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
        <ThemeSwitch theme={theme} onThemeChange={handleThemeChange} />
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
        <PassphraseResult
          result={result}
          strength={strength}
          statusMessage={statusMessage}
          onCopy={handleCopy}
        />

        <GeneratorSettings
          minimumWords={minimumWords}
          minimumLength={minimumLength}
          separator={separator}
          capitalize={capitalize}
          includeNumber={includeNumber}
          includeSymbol={includeSymbol}
          onMinimumWordsChange={handleMinimumWordsChange}
          onMinimumLengthChange={handleMinimumLengthChange}
          onSeparatorChange={handleSeparatorChange}
          onCapitalizeChange={handleCapitalizeChange}
          onIncludeNumberChange={handleIncludeNumberChange}
          onIncludeSymbolChange={handleIncludeSymbolChange}
          onSubmit={handleGenerate}
        />

        <StrengthInfo strength={strength} wordCount={result.wordCount} />
        <AppFooter />
      </div>
    </main>
  );
}

export default App;
