import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc"
import standard from "eslint-config-standard"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  standard,
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
