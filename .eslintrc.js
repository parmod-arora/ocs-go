module.exports = {
  "parser": "babel-eslint",
  "extends": ["standard", "standard-react", "plugin:jest/recommended"],
  "plugins": ["jest"],
  "env": {
    "browser": true,
    "node": true,
    "es6": true,
    "jest/globals": true
  },
  "rules": {
    "react/prop-types": "off",
    "react/no-unused-prop-types": "off",
    "template-curly-spacing": "off",
    indent: "off"
  },
  "globals": {
    "axios": true
  },
  "overrides": [
    {
      "files": ["*.test.js"],
      "rules": {
        "no-unused-vars": "off",
        "no-global-assign": "off"
      }
    }
  ]
};
