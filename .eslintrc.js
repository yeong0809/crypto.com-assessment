module.exports = {
  root: true,
  extends: [`@react-native`],
  rules: {
    'prettier/prettier': [
      `error`,
      { singleQuote: true, 'no-inline-styles': false },
    ],
    'react-native/no-inline-styles': 0,
    'comma-dangle': [`error`, `always-multiline`],
    quotes: [2, `backtick`, { allowTemplateLiterals: true, avoidEscape: true }],
    'no-var': [`error`],
    curly: [`error`],
    'eol-last': [`error`, `always`],
    eqeqeq: [`error`],
    'keyword-spacing': [
      `error`,
      {
        before: true,
        after: true,
        overrides: {
          return: { after: true },
          throw: { after: true },
          case: { after: true },
        },
      },
    ],
    'max-len': [
      `error`,
      {
        code: 1000,
        tabWidth: 2,
      },
    ],
    'no-cond-assign': [`error`, `always`],
    'no-return-assign': [`error`, `always`],
    'prefer-const': [`error`],
    semi: [`error`, `always`],
    'no-new-object': [`error`],
    'object-shorthand': [`error`],
    'no-prototype-builtins': [`error`],
    'prefer-object-spread': [`error`],
    'no-array-constructor': [`error`],
    'prefer-destructuring': [`error`],
    'no-eval': [`error`],
    'no-useless-escape': [`error`],
    'func-style': [`error`, `expression`, { allowArrowFunctions: true }],
    'space-before-blocks': [`error`],
    'no-param-reassign': [`error`],
    'prefer-spread': [`error`],
    'prefer-arrow-callback': [`error`],
    'arrow-spacing': [`error`, { before: true, after: true }],
    'arrow-parens': [`error`, `always`],
    'arrow-body-style': [`error`, `always`],
    'no-confusing-arrow': [`error`],
    'implicit-arrow-linebreak': [`error`],
    'no-duplicate-imports': [`error`],
    'object-curly-newline': [`error`],
    'no-iterator': `error`,
    'no-restricted-syntax': [
      `error`,
      `WithStatement`,
      `BinaryExpression[operator='in']`,
      `DoWhileStatement`,
      `WhileStatement`,
    ],
    'dot-notation': [`error`],
    'no-restricted-properties': [`error`],
    'no-undef': [`error`],
    'no-multi-assign': [`error`],
    'no-unused-vars': [`error`],
    'no-case-declarations': [`error`],
    'no-nested-ternary': [`error`],
    'no-unneeded-ternary': [`error`],
    'no-mixed-operators': [`warn`],
    'nonblock-statement-body-position': [`error`],
    'brace-style': [`error`, `1tbs`, { allowSingleLine: false }],
    'no-else-return': [`error`],
    'spaced-comment': [`error`],
    'space-infix-ops': [`error`],
    'newline-per-chained-call': [`error`],
    'no-whitespace-before-property': [`error`],
    'padded-blocks': [`error`, `never`],
    'no-multiple-empty-lines': [`error`, { max: 2, maxEOF: 0 }],
    'space-in-parens': [`error`],
    'array-bracket-spacing': [`error`],
    'object-curly-spacing': [`error`, `always`],
    'block-spacing': [`error`, `always`],
    'computed-property-spacing': [`error`],
    'func-call-spacing': [`error`],
    'key-spacing': [`error`],
    'no-trailing-spaces': [`error`],
    'comma-style': [`error`, `last`],
    'no-new-wrappers': [`error`],
    radix: [`error`],
    'new-cap': [`error`],
    'no-underscore-dangle': [`error`],
    'no-restricted-globals': [`error`, `isNaN`, `isFinite`],
  },
};
