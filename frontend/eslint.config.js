import globals from "globals";
import js from "@eslint/js";
import solid from "eslint-plugin-solid";

export default [
    // Global ignores. Must be a standalone object: ignores combined with any
    // other key only narrows that one config block instead of the whole run.
    {
        ignores: [
            "**/node_modules/",
            "**/dist/",
            "**/build/",
            "**/coverage/",
        ],
    },

    js.configs.recommended,

    {
        files: ["**/*.{js,jsx}"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.browser,
            },
            parserOptions: {
                ecmaFeatures: { jsx: true },
            },
        },
        plugins: { solid },
        rules: {
            "no-undef": "error",
            "no-unused-vars": "warn",
            "no-empty": "warn",
            "no-cond-assign": "error",
            "no-prototype-builtins": "warn",
            "no-constant-condition": "warn",
            // Marks JSX-referenced identifiers as used. Core no-unused-vars
            // cannot see into JSX, so without this every JSX-only import
            // (Show, For, Icon, ...) is falsely reported as unused.
            "solid/jsx-uses-vars": "error",
            // Catches JSX elements that resolve to nothing in scope.
            "solid/jsx-no-undef": "error",
        },
    },

    // Patterns below are anchored with **/ so this config behaves the same
    // whether ESLint runs from frontend/ or from the repository root.
    // Vitest runs with globals: true (see vitest.config.js); the suite also
    // touches Node's `global` when stubbing browser APIs.
    {
        files: ["**/*.test.{js,jsx}", "**/src/test/**/*.{js,jsx}"],
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.vitest,
            },
        },
    },

    // Build/tooling configs execute in Node.
    {
        files: ["**/*.config.js"],
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
    },
];
