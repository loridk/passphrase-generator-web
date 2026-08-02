function ThemeSwitch({ theme, onThemeChange }) {
  const isLightMode = theme === "light";

  const tooltipText = isLightMode
    ? "Return to the void."
    : "Fine. Turn on the big light.";

  return (
    <label className="theme-switch" data-tooltip={tooltipText}>
      <input
        type="checkbox"
        role="switch"
        checked={isLightMode}
        aria-label="Light mode"
        onChange={onThemeChange}
      />

      <span className="theme-switch__track" aria-hidden="true">
        <span className="theme-switch__icon-light">☾</span>
        <span className="theme-switch__icon-dark">☀</span>
        <span className="theme-switch__thumb"></span>
      </span>
    </label>
  );
}

export default ThemeSwitch;
