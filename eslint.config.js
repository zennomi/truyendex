// const js = require('@eslint/js');
const _unusedImports = require("eslint-plugin-unused-imports");
const _import = require("eslint-plugin-import");
const _tsParser = require("@typescript-eslint/parser");
const _eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");

module.exports = [
    // js.configs.recommended,
    {
        plugins: {
            "unused-imports": _unusedImports,
            import: _import,
            ...(_eslintPluginPrettierRecommended.plugins || []),
        },
        ignores: [
            "node_modules/**/*",
            ".next/**/*",
            "eslint.config.js",
            ...(_eslintPluginPrettierRecommended.ignores || []),
        ],
        rules: {
            "no-unused-vars": "off", // or "warn" if you prefer
            "unused-imports/no-unused-imports": "error",
            "unused-imports/no-unused-vars": [
                "warn",
                {
                    vars: "all",
                    varsIgnorePattern: "^_",
                    args: "after-used",
                    argsIgnorePattern: "^_",
                },
            ],
            ...(_eslintPluginPrettierRecommended.rules || []),
            "prettier/prettier": ["error", { endOfLine: "auto" }],
        },
        files: [
            "**/*.js",
            "**/*.ts",
            "**/*.tsx",
            "**/*.jsx",
            ...(_eslintPluginPrettierRecommended.files || []),
        ],
        languageOptions: {
            parser: _tsParser,
            ...(_eslintPluginPrettierRecommended.languageOptions || []),
        },
    },
];
