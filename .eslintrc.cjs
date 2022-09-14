module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	plugins: [
		'@typescript-eslint'
	],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended'
	],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2022
	},
	rules: {
		'arrow-spacing': [ 'error', { before: true, after: true }],
		indent: [ 'error', 'tab' ],
		'brace-style': [ 'error', 'allman' ],
		'keyword-spacing': [ 'error', { before: true, after: true }],
		'array-bracket-spacing': [ 'error', 'always', { objectsInArrays: false }],
		'object-curly-spacing': [ 'error', 'always' ],
		'space-in-parens': [ 'error', 'always', { exceptions: [ '{}' ] }],
		// 'padding-line-between-statements': [ 'error', { blankLine: 'always', prev: '*', next: 'return' }],
		camelcase: 'error',
		'comma-dangle': [ 'error', 'never' ],
		curly: [ 'error', 'multi-line' ],
		'eol-last': 'error', // TODO: disable auto addition of new lines automatically in vscode, then disable this
		'no-unused-vars': [ 'error', {
			argsIgnorePattern: '^_',
			varsIgnorePattern: '^_',
			caughtErrorsIgnorePattern: '^_'
		}],
		'no-mixed-spaces-and-tabs': 'error',
		'no-cond-assign': 'error',
		'no-class-assign': 'error',
		'no-const-assign': 'error',
		'no-inner-declarations': 'off',
		'no-this-before-super': 'error',
		'no-var': 'error',
		'no-unreachable': 'error',
		'object-shorthand': [ 'error', 'always' ],
		'one-var': 'off',
		'prefer-arrow-callback': 'error',
		'prefer-const': [ 'error', { destructuring: 'all' }],
		quotes: [ 'error', 'single', { avoidEscape: true }],
		'quote-props': [ 'error', 'as-needed' ],
		'require-atomic-updates': 'warn',
		semi: [ 'error', 'never' ],
		'space-before-blocks': [ 'error', 'always' ],
		'valid-typeof': 'error'
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	}
}
