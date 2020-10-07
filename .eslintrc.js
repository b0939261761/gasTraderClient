module.exports = {
  root: true,
  env: {
    node: true,
    es2020: true
  },
  extends: [
    '@vue/eslint-config-airbnb',
    'plugin:vue/vue3-recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'comma-dangle': ['error', 'never'],
    'no-extra-parens': ['error', 'all'],
    'arrow-parens': ['error', 'as-needed'],
    'no-empty': 'off',

    // ---------------------

    'vue/html-quotes': ['error', 'single'],
    'vue/no-spaces-around-equal-signs-in-attribute': 'off',

    // Uncategorized -----------------------------

    'vue/component-name-in-template-casing': ['error', 'PascalCase', {
      registeredComponentsOnly: false,
      ignores: [
        'router-view',
        'router-link',
        'transition',
        'transition-group',
        'component',
        'teleport'
      ]
    }],

    'vue/html-comment-content-newline': 'error',
    'vue/html-comment-content-spacing': ['error', 'always'],
    'vue/html-comment-indent': ['error', 2],

    'vue/match-component-file-name': ['error', {
      extensions: ['vue'],
      shouldMatchCase: false
    }],

    'vue/no-bare-strings-in-template': 'off',
    'vue/no-boolean-default': ['error', 'default-false'],
    'vue/no-duplicate-attr-inheritance': 'error',
    'vue/no-empty-component-block': 'error',
    'vue/no-multiple-objects-in-class': 'error',
    'vue/no-potential-component-option-typo': 'error',
    'vue/no-reserved-component-names': ['error', { disallowVue3BuiltInComponents: false }],
    'vue/no-restricted-component-options': 'off',
    'vue/no-restricted-static-attribute': 'off',

    'vue/no-restricted-v-bind': ['error', {
      argument: '/^v-/',
      message: 'Using `:v-xxx` is not allowed. Instead, remove `:` and use it as directive.'
    }],

    'vue/no-static-inline-styles': ['error', { allowBinding: false }],

    'vue/no-template-target-blank': ['error', {
      allowReferrer: true,
      enforceDynamicLinks: 'always'
    }],

    'vue/no-unregistered-components': [
      'error',
      { ignorePatterns: ['router-view', 'router-link'] }
    ],

    'vue/no-unused-properties': ['error', {
      groups: ['props', 'setup']
    }],

    'vue/no-useless-mustaches': 'error',
    'vue/no-useless-v-bind': 'error',
    'vue/padding-line-between-blocks': 'error',
    'vue/require-direct-export': 'error',
    'vue/require-name-property': 'error',
    'vue/script-indent': 'off',
    'vue/sort-keys': 'off',
    'vue/static-class-names-order': 'error',
    'vue/v-for-delimiter-style': ['error', 'in'],
    'vue/v-on-function-call': ['error', 'never',
      { ignoreIncludesComment: false }
    ],

    // Extension Rules ---------------

    'vue/array-bracket-spacing': ['error', 'never'],
    'vue/arrow-spacing': ['error', { before: true, after: true }],
    'vue/block-spacing': ['error', 'always'],
    'vue/brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'vue/camelcase': ['error', { properties: 'never', ignoreDestructuring: false }],
    'vue/comma-dangle': ['error', 'never'],
    'vue/comma-spacing': ['error', { before: false, after: true }],

    'vue/comma-style': ['error', 'last', {
      exceptions: {
        ArrayExpression: false,
        ArrayPattern: false,
        ArrowFunctionExpression: false,
        CallExpression: false,
        FunctionDeclaration: false,
        FunctionExpression: false,
        ImportDeclaration: false,
        ObjectExpression: false,
        ObjectPattern: false,
        VariableDeclaration: false,
        NewExpression: false
      }
    }],

    'vue/dot-location': ['error', 'property'],
    'vue/dot-notation': ['error', { allowKeywords: true }],
    'vue/eqeqeq': ['error', 'always', { null: 'ignore' }],
    'vue/func-call-spacing': ['error', 'never'],
    'vue/key-spacing': ['error', { beforeColon: false, afterColon: true }],

    'vue/keyword-spacing': ['error', {
      before: true,
      after: true,
      overrides: {
        return: { after: true },
        throw: { after: true },
        case: { after: true }
      }
    }],

    'vue/max-len': ['error', {
      code: 100,
      template: 100,
      tabWidth: 2,
      comments: 100,
      ignorePattern: '',
      ignoreComments: false,
      ignoreTrailingComments: false,
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreRegExpLiterals: true,
      ignoreHTMLAttributeValues: false,
      ignoreHTMLTextContents: false
    }],

    'vue/no-empty-pattern': 'error',
    'vue/no-extra-parens': ['error', 'all'],

    'vue/no-irregular-whitespace': ['error', {
      skipStrings: false,
      skipComments: false,
      skipRegExps: false,
      skipTemplates: false,
      skipHTMLAttributeValues: false,
      skipHTMLTextContents: false
    }],

    'vue/no-restricted-syntax': ['error', {
      selector: 'VElement > VExpressionContainer CallExpression',
      message: 'Call expressions are not allowed.'
    }],

    'vue/no-sparse-arrays': 'error',
    'vue/no-useless-concat': 'error',

    'vue/object-curly-newline': ['error', {
      ObjectExpression: { minProperties: 4, multiline: true, consistent: true },
      ObjectPattern: { minProperties: 4, multiline: true, consistent: true },
      ImportDeclaration: { minProperties: 4, multiline: true, consistent: true },
      ExportDeclaration: { minProperties: 4, multiline: true, consistent: true }
    }],

    'vue/object-curly-spacing': ['error', 'always'],
    'vue/object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
    'vue/operator-linebreak': ['error', 'before', { overrides: { '=': 'none' } }],
    'vue/prefer-template': 'error',
    'vue/space-in-parens': ['error', 'never'],
    'vue/space-infix-ops': 'error',

    'vue/space-unary-ops': ['error', {
      words: true,
      nonwords: false
    }],

    'vue/template-curly-spacing': 'error'
  }
};
