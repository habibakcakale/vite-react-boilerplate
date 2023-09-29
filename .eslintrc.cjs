const correctnessRules = {
    '@typescript-eslint/require-await': 'off', // use default eslint require-await
    '@typescript-eslint/await-thenable': 'error',
    'require-await': 'error',
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-misused-promises': [
        'error',
        {
            checksVoidReturn: false,
        },
    ],
    '@typescript-eslint/strict-boolean-expressions': [
        'error',
        {allowNullableObject: true},
    ],
    eqeqeq: ['error', 'always', {null: 'ignore'}],
    '@typescript-eslint/no-useless-constructor': 'error',
    '@typescript-eslint/no-unused-expressions': 'error',
    '@typescript-eslint/no-empty-interface': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
    'prefer-const': 'error',
    'unicorn/no-new-buffer': 'error',
    // Accept a performance drawback for proper stack traces. This also prevents
    // subtle bugs such as try { return b() } catch (e) {}
    '@typescript-eslint/return-await': ['error', 'always'],
    '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
            allowNumber: true,
            allowNullish: true,
        },
    ],
}

const styleRules = {
    // Consistently defining functions as async makes it easier to spot them
    '@typescript-eslint/promise-function-async': 'error',
    // Prevents accidental changes to the API of a function
    '@typescript-eslint/explicit-function-return-type': [
        'error',
        {allowExpressions: true},
    ],
    // That's really complicated - better refactor
    complexity: [
        'error',
        {
            max: 20,
        },
    ],
    // Use internal logger instead
    'no-console': 'error',
    // Easier to read
    'unicorn/better-regex': 'error',
    // Be specific on what gets disabled
    'unicorn/no-abusive-eslint-disable': 'error',
    // Make returns obvious
    'padding-line-between-statements': [
        'error',
        {
            blankLine: 'always',
            prev: '*',
            next: 'return',
        },
    ],
    // This probably should be a map or an Object.fromEntries
    'unicorn/no-array-reduce': 'error',
    // Performance
    'unicorn/prefer-array-flat-map': 'error',
    // Much easier to understand than indexOf
    'unicorn/prefer-includes': 'error',
    // Much easier to understand than indexOf
    'unicorn/prefer-string-starts-ends-with': 'error',
    'import/order': [
        'error',
        {
            groups: [
                ['external', 'builtin'],
                'internal',
                'parent',
                ['sibling', 'index'],
            ],
            'newlines-between': 'always',
            pathGroups: [
                {
                    pattern: '@freighthub/**',
                    group: 'external',
                    position: 'after',
                },
                {
                    pattern: '@forto-dev/**',
                    group: 'external',
                    position: 'after',
                },
            ],
            pathGroupsExcludedImportTypes: [''],
        },
    ],
    // Exclude a and b for sort comparison and _ for when it is not used and
    // properties because we sometimes cannot influence those and practically
    // it doesn't happen
    'id-length': [
        'error',
        {exceptions: ['a', 'b', '_'], properties: 'never'},
    ],
}
module.exports = {
    settings: {
        react: {
            version: 'detect'
        },
    },
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json', './tsconfig.node.json'],
        tsconfigRootDir: __dirname,
    },
    root: true,
    env: {browser: true, es2020: true},
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:@typescript-eslint/strict-type-checked',
        'plugin:@typescript-eslint/stylistic-type-checked',
        'plugin:react-hooks/recommended',
        'prettier'
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh', 'import', 'unicorn', '@typescript-eslint'],
    rules: {
        'react-refresh/only-export-components': [
            'warn',
            {allowConstantExport: true},
        ],
        ...correctnessRules,
        ...styleRules,
    },
}
