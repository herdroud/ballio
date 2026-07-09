import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "docs/**",
    "content/**",
  ]),
  {
    rules: {
      // Contenu rédactionnel en français : les apostrophes/guillemets bruts en JSX
      // sont voulus et sans risque (React échappe le texte). La règle générait
      // ~180 faux positifs qui noyaient les vraies erreurs.
      "react/no-unescaped-entities": "off",
      // Convention : un underscore en préfixe marque un paramètre volontairement inutilisé.
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
]);

export default eslintConfig;
