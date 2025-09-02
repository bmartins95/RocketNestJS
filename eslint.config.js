import js from "@eslint/js";
import tseslint from "typescript-eslint";

import importPlugin from "eslint-plugin-import";
import promise from "eslint-plugin-promise";
import unicorn from "eslint-plugin-unicorn";
import sonarjs from "eslint-plugin-sonarjs";
import security from "eslint-plugin-security";
import nodePlugin from "eslint-plugin-n";
import unusedImports from "eslint-plugin-unused-imports";

import prettierConfig from "eslint-config-prettier";

const isCI = process.env.CI === "true";

export default [
    {
        ignores: [
            "node_modules",
            "dist",
            "coverage",
            ".turbo",
            ".cache",
            "**/*.min.js",
            "**/*config.{js,ts,cjs,mjs}",
            "eslint.config.js",
        ],
    },

    js.configs.recommended,

    ...tseslint.configs.recommendedTypeChecked.map((cfg) => ({
        ...cfg,
        languageOptions: {
            ...cfg.languageOptions,
            parserOptions: {
                ...cfg.languageOptions?.parserOptions,
                project: ["./tsconfig.eslint.json"],
                tsconfigRootDir: import.meta.dirname,
            },
        },
    })),

    {
        plugins: { n: nodePlugin },
        rules: {
            "n/no-unsupported-features/node-builtins": "off",
            "n/no-missing-import": "off",
        },
    },

    {
        plugins: { import: importPlugin, "unused-imports": unusedImports },
        settings: {
            "import/resolver": {
                typescript: {
                    alwaysTryTypes: true,
                    project: ["./tsconfig.json"],
                },
            },
        },
        rules: {
            "import/order": ["warn", {
                "groups": ["builtin", "external", "internal", "parent", "sibling", "index", "object", "type"],
                "newlines-between": "always",
                "alphabetize": { "order": "asc", "caseInsensitive": true }
            }],
            "import/newline-after-import": "warn",
            "import/no-duplicates": "warn",

            "unused-imports/no-unused-imports": "warn",
            "unused-imports/no-unused-vars": ["warn", {
                args: "after-used",
                argsIgnorePattern: "^_",
                varsIgnorePattern: "^_"
            }],
        },
    },

    {
        plugins: { promise, unicorn, sonarjs, security },
        rules: {
            "promise/always-return": "off",
            "promise/no-return-wrap": "warn",
            "promise/param-names": "warn",
            "promise/no-nesting": "off",
            "promise/no-new-statics": "warn",
            "promise/no-promise-in-callback": "off",
            "promise/no-callback-in-promise": "off",
            "promise/valid-params": "warn",

            "unicorn/prefer-node-protocol": "warn",
            "unicorn/no-null": "off",
            "unicorn/filename-case": "off",
            "unicorn/prefer-module": "off",
            "unicorn/no-array-reduce": "off",

            "sonarjs/no-all-duplicated-branches": "warn",
            "sonarjs/no-identical-functions": isCI ? "warn" : "off",
            "sonarjs/cognitive-complexity": ["warn", 20],

            "security/detect-object-injection": "off",
        },
    },

    {
        rules: {
            "@typescript-eslint/explicit-function-return-type": "off",
            "@typescript-eslint/no-floating-promises": "error",
            "@typescript-eslint/no-misused-promises": ["error", { checksVoidReturn: { attributes: false } }],
            "@typescript-eslint/consistent-type-imports": ["warn", { prefer: "type-imports", fixStyle: "separate-type-imports" }],
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/require-await": "off",
            "@typescript-eslint/no-unused-vars": "off",
            "@typescript-eslint/no-unsafe-return": "off",
            "@typescript-eslint/no-unsafe-call": "off",
            "@typescript-eslint/no-unsafe-member-access": "off",
            "@typescript-eslint/no-unsafe-argument": "off",
        },
    },

    prettierConfig,
];
