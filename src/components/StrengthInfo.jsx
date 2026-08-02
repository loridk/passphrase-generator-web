function StrengthInfo({ strength, wordCount }) {
  return (
    <section className="strength" aria-labelledby="strength-heading">
      <h2 id="strength-heading">Strength guidance</h2>

      <p>
        <strong>{strength.label}</strong>
      </p>

      <p>{strength.description}</p>

      <p>Based on {wordCount} randomly selected words.</p>
    </section>
  );
}

export default StrengthInfo;
