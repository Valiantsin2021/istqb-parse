import prettier from 'eslint-config-prettier'
import jsdoc from 'eslint-plugin-jsdoc'
import playwright from 'eslint-plugin-playwright'
import globals from 'globals'

export default [
  {
    plugins: { prettier, playwright, jsdoc },
    ignores: ['**/node_modules/*', '**/test-results/*', '**/playwright-report/*', '**/allure-results/*', '**/allure-report/*'],
    files: ['projects/**/*.test.js', 'fixtures/**/*.js', 'pages/*.js', 'utils/**/*.js', 'utils/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.jest,
        __ENV: 'readonly'
      }
    },
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      'jsdoc/require-description': 'warn',
      'jsdoc/check-values': 'error',
      'jsdoc/check-alignment': 'warn',
      'jsdoc/check-indentation': 'warn',
      'playwright/no-conditional-in-test': 'off',
      'playwright/expect-expect': 'off',
      'playwright/no-focused-test': 'error',
      'playwright/require-soft-assertions': 'warn',
      'no-console': 'warn',
      'no-useless-escape': 'off',
      'no-empty-pattern': 'off',
      complexity: ['error', { max: 12 }],
      'max-depth': ['error', { max: 4 }],
      'max-nested-callbacks': ['error', { max: 2 }],
      'max-params': ['error', { max: 5 }],
      'max-statements': ['error', { max: 20 }, { ignoreTopLevelFunctions: true }],
      'max-lines': ['error', { max: 250, skipComments: true, skipBlankLines: true }],
      'max-len': ['off', { code: 150, ignoreComments: true, ignoreUrls: true }],
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'space-before-function-paren': ['error', { anonymous: 'always', named: 'never', asyncArrow: 'always' }],
      'no-eval': 'error',
      'no-multi-spaces': 'error',
      'no-new': 'warn',
      'no-return-assign': 'warn',
      'comma-dangle': ['error', 'never'],
      strict: ['error', 'global'],
      'func-style': ['warn', 'expression'],
      'no-new-func': 'error',
      'no-param-reassign': 'error',
      'prefer-arrow-callback': 'error',
      'arrow-body-style': ['error', 'as-needed'],
      'no-invalid-this': 'error',
      'prefer-destructuring': ['warn', { array: true, object: true }, { enforceForRenamedProperties: true }],
      'no-implied-eval': 'error',
      eqeqeq: 'error',
      'no-with': 'error',
      'func-call-spacing': ['error', 'never'],
      'new-cap': ['error', { newIsCap: true }],
      'new-parens': 'error',
      quotes: ['warn', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-var': 'warn',
      'no-unused-vars': ['warn', { vars: 'local' }],
      'import/no-unresolved': 'off', // k6 is actually golang, can't really import it
      'no-restricted-globals': 'off', // required by k6, e.g. "init" context
      'import/extensions': 'off', // .js ending is ok
      'no-prototype-builtins': 'off'
    }
  }
]
