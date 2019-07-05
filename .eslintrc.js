module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es6: true,
		node: true
	},
	extends: ["prettier"],
	parserOptions: {
		ecmaVersion: 2017
	},
	rules: {
		indent: ["error", "tab"],
		"linebreak-style": ["error", "windows"],
		quotes: ["error", "single"],
		semi: ["error", "always"],
		"no-console": "off",
		"no-unused-vars": "off",
		"array-bracket-spacing": ["error", "always"]
	}
};
