# Passphrase Generator

An accessible, privacy-focused passphrase generator inspired by the
[Correct Horse Battery Staple XKCD comic](https://xkcd.com/936/).

It creates memorable passphrases from a local word list using
cryptographically secure randomness. Everything runs in the browser—generated
passphrases are never sent to a server or saved.

## Features

- Generates passphrases containing four to six words
- Supports a configurable minimum length
- Offers custom, random, or no separators
- Optionally capitalizes words
- Optionally adds a number or symbol
- Provides password-strength guidance
- Copies passphrases to the clipboard
- Saves generator settings locally
- Includes accessible dark and light themes
- Works responsively across screen sizes

## Security and Privacy

- Random selections use the browser's Web Crypto API
- Words come from a bundled local word list
- No external requests are needed to generate a passphrase
- Generated passphrases are not placed in URLs or local storage
- Only generator preferences and theme choice are saved locally

This is an educational project and has not received a professional security
audit. Users should follow the password requirements and security guidance of
the service they are using.

## Accessibility

The interface was built with WCAG 2.2 AA practices in mind, including:

- Explicitly connected labels and instructions
- Semantic forms, fieldsets, legends, buttons, and output elements
- Keyboard-accessible controls
- Visible focus indicators
- Status messages that do not announce the generated password
- High-contrast dark and light color palettes
- Touch targets of at least 44 pixels
- Responsive layouts that support browser zoom
- Reduced-motion preferences

Automated testing supports—but does not replace—manual accessibility testing.

## Technology

- React
- JavaScript
- Vite
- Sass
- Vitest
- Web Crypto API
- Clipboard API

## Run Locally

Install the dependencies:

```bash
npm install
```
