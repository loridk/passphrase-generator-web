function PassphraseResult({ result, strength, statusMessage, onCopy }) {
  return (
    <>
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
          onClick={onCopy}
        >
          Copy passphrase
        </button>
      </div>

      <p className="status-message" role="status">
        {statusMessage}
      </p>
    </>
  );
}

export default PassphraseResult;
