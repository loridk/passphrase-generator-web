function GeneratorSettings({
  minimumWords,
  minimumLength,
  separator,
  capitalize,
  includeNumber,
  includeSymbol,
  onMinimumWordsChange,
  onMinimumLengthChange,
  onSeparatorChange,
  onCapitalizeChange,
  onIncludeNumberChange,
  onIncludeSymbolChange,
  onSubmit,
}) {
  return (
    <details className="settings-panel">
      <summary>Customize passphrase</summary>

      <form
        id="passphrase-settings"
        className="settings-form"
        onSubmit={onSubmit}
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
              onChange={onMinimumWordsChange}
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
              onChange={onMinimumLengthChange}
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
              onChange={onSeparatorChange}
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
                onChange={onCapitalizeChange}
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
                onChange={onIncludeNumberChange}
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
                onChange={onIncludeSymbolChange}
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
  );
}

export default GeneratorSettings;
