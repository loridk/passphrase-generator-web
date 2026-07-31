import rawWordList from "./eff_large_wordlist.txt?raw";

const words = rawWordList
  .trim()
  .split("\n")
  .map((line) => line.trim().split(/\s+/)[1]);

export default words;
