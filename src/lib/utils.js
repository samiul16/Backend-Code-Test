import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function loadData(filename) {
  const data = readFileSync(join(__dirname, "../../data", filename), "utf8");
  return JSON.parse(data);
}
