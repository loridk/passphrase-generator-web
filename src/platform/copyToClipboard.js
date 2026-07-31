async function copyToClipboard(text) {
  await globalThis.navigator.clipboard.writeText(text);
}

export default copyToClipboard;
