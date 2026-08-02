import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(currentDirectory, "..");

const sourcePath = path.join(projectRoot, "public", "favicon.svg");

const outputDirectory = path.join(projectRoot, "public", "icons");

const iconSizes = [16, 32, 48, 128];

await mkdir(outputDirectory, { recursive: true });

await Promise.all(
  iconSizes.map((size) =>
    sharp(sourcePath)
      .resize(size, size)
      .png()
      .toFile(path.join(outputDirectory, `icon-${size}.png`)),
  ),
);

console.log("Extension icons generated.");
