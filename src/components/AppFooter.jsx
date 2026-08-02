function AppFooter() {
  return (
    <footer className="app-footer">
      <p>
        <a href="./privacy.html" target="_blank" rel="noopener noreferrer">
          Privacy policy
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
      </p>
      <p>Generated locally. Passphrases are never stored or sent anywhere.</p>
      <p>
        Built with <span aria-hidden="true">¯\_(ツ)_/¯</span>
        <span className="visually-hidden">a shrug</span> by{" "}
        <a href="https://loridunford.com/">Lori DK</a>.
      </p>
    </footer>
  );
}

export default AppFooter;
