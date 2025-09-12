// eslint.config.cjs
const js = require('@eslint/js')
const tseslint = require('typescript-eslint')

const importPlugin = require('eslint-plugin-import')
const promise = require('eslint-plugin-promise')
const unicorn = require('eslint-plugin-unicorn')
const sonarjs = require('eslint-plugin-sonarjs')
const security = require('eslint-plugin-security')
const nodePlugin = require('eslint-plugin-n')
const unusedImports = require('eslint-plugin-unused-imports')

const { fixupPluginRules } = require('@eslint/compat')
const prettierConfig = require('eslint-config-prettier')

const isCI = process.env.CI === 'true'

module.exports = [
    // Ignora paths
    {
        ignores: [
            'node_modules',
            'dist',
            'coverage',
            '.turbo',
            '.cache',
            '**/*.min.js',
            '**/*config.{js,ts,cjs,mjs}',
            'eslint.config.*',
        ],
    },

    // Base de linguagem
    {
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
    },

    // Regras JS recomendadas
    js.configs.recommended,

    // TypeScript (type-checked)
    ...tseslint.configs.recommendedTypeChecked.map((cfg) => ({
        ...cfg,
        languageOptions: {
            ...cfg.languageOptions,
            parserOptions: {
                ...cfg.languageOptions?.parserOptions,
                project: ['./tsconfig.eslint.json'],
                // __dirname funciona em CJS
                tsconfigRootDir: __dirname,
            },
        },
    })),

    // Plugin Node
    {
        plugins: { n: nodePlugin },
        rules: {
            'n/no-unsupported-features/node-builtins': 'off',
            'n/no-missing-import': 'off',
        },
    },

    // import + unused-imports
    {
        plugins: {
            import: importPlugin,
            'unused-imports': unusedImports,
        },
        settings: {
            'import/resolver': {
                typescript: {
                    alwaysTryTypes: true,
                    project: ['./tsconfig.json'],
                },
            },
        },
        rules: {
            'import/order': [
                'warn',
                {
                    groups: [
                        'builtin',
                        'external',
                        'internal',
                        'parent',
                        'sibling',
                        'index',
                        'object',
                        'type',
                    ],
                    'newlines-between': 'always',
                    alphabetize: { order: 'asc', caseInsensitive: true },
                },
            ],
            'import/newline-after-import': 'warn',
            'import/no-duplicates': 'warn',

            'unused-imports/no-unused-imports': 'warn',
            'unused-imports/no-unused-vars': [
                'warn',
                {
                    args: 'after-used',
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                },
            ],
        },
    },

    // Plugins (com compat para promise)
    {
        plugins: {
            promise: fixupPluginRules(promise),
            unicorn,
            sonarjs,
            security,
        },
        rules: {
            // promise
            'promise/always-return': 'off',
            'promise/no-return-wrap': 'warn',
            'promise/param-names': 'warn',
            'promise/no-nesting': 'off',
            'promise/no-new-statics': 'warn',
            'promise/no-promise-in-callback': 'off',
            'promise/no-callback-in-promise': 'off',
            'promise/valid-params': 'warn',

            // unicorn
            'n/prefer-node-protocol': 'warn',
            'unicorn/no-null': 'off',
            'unicorn/filename-case': 'off',
            'unicorn/prefer-module': 'off',
            'unicorn/no-array-reduce': 'off',

            // sonarjs
            'sonarjs/no-all-duplicated-branches': 'warn',
            'sonarjs/no-identical-functions': isCI ? 'warn' : 'off',
            'sonarjs/cognitive-complexity': ['warn', 20],

            // security
            'security/detect-object-injection': 'off',
        },
    },

    // Regras TS adicionais
    {
        rules: {
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/no-floating-promises': 'error',
            '@typescript-eslint/no-misused-promises': [
                'error',
                { checksVoidReturn: { attributes: false } },
            ],
            '@typescript-eslint/consistent-type-imports': [
                'warn',
                { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
            ],
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/require-await': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            '@typescript-eslint/no-unsafe-return': 'off',
            '@typescript-eslint/no-unsafe-call': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',
            '@typescript-eslint/no-unsafe-argument': 'off',
        },
    },

    // Prettier por último
    prettierConfig,
]
