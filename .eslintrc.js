module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    "plugin:import/typescript",
    "plugin:prettier/recommended"
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      typescript: {}
    }
  },
  plugins: [
    '@typescript-eslint',
    "prettier"
  ],
  rules: {
    "lines-between-class-members": "off",
    "no-underscore-dangle": "off",
    "consistent-return": "off",
    "no-empty-function": [ "error", {
      allow: ["constructors"]
    }], 
    "linebreak-style": "off",
    "no-useless-constructor": "off",
    "prettier/prettier": "error",
    "class-methods-use-this": "off",
    "@typescript-eslint/no-unused-vars": ["error", {
      "argsIgnorePattern": "_"
    }],
    "@typescript-eslint/naming-convention": [ 
      "error", { 
        "selector": "interface", 
        "prefix": ["I"], 
        "format": ["PascalCase"] 
      }
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "ts": "never"
      }
    ]
  },
  overrides: [
    {
      files: ["*.spec.ts"],
      rules: {
        "jest/valid-expect": 0
      }
    }
  ]
};
