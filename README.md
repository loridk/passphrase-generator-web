# CyberPhrase

An accessible, privacy-focused passphrase generator inspired by the
[Correct Horse Battery Staple XKCD comic](https://xkcd.com/936/).

CyberPhrase creates memorable passphrases using a local word list and
cryptographically secure randomness. Generation happens entirely on the
user's device: passphrases are never sent to a server, placed in a URL, or
saved locally.

CyberPhrase is available as both a responsive React web app and a Chrome
Manifest V3 extension.

## Install

### Chrome Extension

The recommended way to install the extension will be through the Chrome Web
Store so that updates are delivered automatically.

> Chrome Web Store link coming soon.

### Web App

Use CyberPhrase directly in your browser:

[Open the CyberPhrase web app](https://cyberphrase.loridunford.com/)

## Features

- Configurable minimum word count from four to six words
- Optional minimum character length
- Additional words when needed to satisfy the minimum length
- Custom, randomized, or no separator characters
- Optional capitalization
- Optional random digit
- Optional random symbol placed at a word boundary
- Passphrase length and strength guidance
- One-button clipboard copying
- Automatically saved generator preferences
- Dark and light cyberpunk themes
- Responsive website and Chrome extension layouts
- No external requests during passphrase generation
- No unnecessary Chrome extension permissions

## Security and Privacy

CyberPhrase is designed to generate passphrases without exposing them to an
external service.

- Random selections use the browser's Web Crypto API
- Modulo bias is avoided when selecting random values
- Words come from a bundled local word list
- Passphrases are generated entirely on the user's device
- Generated passphrases are not stored in local storage
- Generated passphrases are not placed in URLs
- Only generator preferences and theme choice are saved locally
- The Chrome extension does not request access to websites, tabs, browsing
  history, or other sensitive browser data

CyberPhrase provides practical strength guidance based primarily on the number
of randomly selected words. It does not claim that a passphrase will satisfy
every website's requirements or remain secure under every circumstance.

This is an educational open-source project and has not received a professional
security audit. Users should follow the password requirements and security
guidance of the service they are using.

Read the full [CyberPhrase privacy policy](https://cyberphrase.loridunford.com/privacy.html).

## Accessibility

CyberPhrase was built with WCAG 2.2 AA practices in mind, including:

- Explicitly connected labels and instructions
- Semantic forms, fieldsets, legends, buttons, and output elements
- Native keyboard behavior
- Visible keyboard-focus indicators
- Status messages that do not announce the generated passphrase
- High-contrast dark and light color palettes
- Touch targets of at least 44 pixels
- Responsive layouts that support browser zoom and reflow
- Support for reduced-motion preferences
- Supplemental text for visual symbols and new-tab behavior

The interface received a 100 accessibility score in Chrome Lighthouse during
development. Automated testing can identify some problems, but it does not
replace manual accessibility testing or testing with disabled users.

## Technology

- React
- JavaScript
- Vite
- Sass
- Vitest
- Web Crypto API
- Clipboard API
- Chrome Extensions Manifest V3
- Sharp

## Development

The following instructions are intended for developers and contributors. Most
users should install CyberPhrase from the Chrome Web Store after it becomes
available.

### Requirements

- Node.js
- npm
- Google Chrome for extension testing

### Install Dependencies

Clone the repository, enter its directory, and install the dependencies:

```bash
npm install
```

### Run the Web App Locally

Start the Vite development server:

```bash
npm run dev
```

Open the local URL displayed in the terminal.

### Run the Linter

```bash
npm run lint
```

### Run the Tests

Run the test suite once:

```bash
npm run test:run
```

Run the tests in watch mode during development:

```bash
npm test
```

### Create a Production Build

```bash
npm run build
```

Vite creates the optimized website and extension files in the `dist`
directory.

### Preview the Production Build

```bash
npm run preview
```

### Generate Extension Icons

Chrome-compatible PNG icons are generated from the source SVG:

```bash
npm run icons
```

This creates 16, 32, 48, and 128-pixel icons in `public/icons`.

## Test the Chrome Extension Locally

Installing the unpacked extension is intended for development and source-code
review. Most users should install CyberPhrase from the Chrome Web Store to
receive verified, automatic updates.

1. Create a production build:

   ```bash
   npm run build
   ```

2. Open `chrome://extensions` in Chrome.
3. Enable **Developer mode**.
4. Select **Load unpacked**.
5. Choose the generated `dist` directory.
6. Pin CyberPhrase from Chrome's Extensions menu.

After making source changes, run `npm run build` again and select **Reload** on
the CyberPhrase extension card.

## Web Deployment

The production-ready website files are created in `dist` after running:

```bash
npm run build
```

Upload the contents of `dist`—not the directory itself—to the document root of
a static web host, cPanel subdomain, or subdirectory.

HTTPS is required for reliable Clipboard API access.

## Word List

CyberPhrase uses the
[EFF Large Wordlist for Passphrases](https://www.eff.org/deeplinks/2016/07/new-wordlists-random-passphrases).

The word list is bundled with the application so generating a passphrase does
not require an API or network request.

## Roadmap

- Additional themed word lists
- Chrome Web Store release
- Mobile application
- Additional browser-extension support
- Further accessibility and usability testing

## License

CyberPhrase is free and open-source software licensed under the
[GNU General Public License v3.0](LICENSE).

## Author

Built with ¯\\_(ツ)_/¯ by [Lori DK](https://loridunford.com/).
