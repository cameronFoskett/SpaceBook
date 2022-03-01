module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
     "rules": {
        "react/prop-types": ["error", { "ignore": ["navigation"] }],
        "no-undef": "off",
        "react/no-unescaped-entities":"off"
    }
}
