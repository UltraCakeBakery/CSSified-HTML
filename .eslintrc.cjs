module.exports = {
	root: true,
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2022
	},
	settings: {
		'import/ignore': '/template/'
	},
	rules: {
		'max-len': [ 'error', { code: 6969 }],
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
		'import/no-unresolved': 'off',
		'no-unused-vars': 'error',
		'no-mixed-spaces-and-tabs': 'error',
		'no-cond-assign': 'error',
		'no-class-assign': 'error',
		'no-const-assign': 'error',
		'no-import-assign': 'error',
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
		'require-atomic-updates': 'off', // TODO: refactor codebase so we can set this to 'warn'
		semi: [ 'error', 'never' ],
		'space-before-blocks': [ 'error', 'always' ],
		'valid-typeof': 'error'
	},
	globals: {
		globalThis: false
	},
	env: {
		es6: true,
		browser: true,
		node: true,
		mocha: true
	},
	extends: [
		'eslint:recommended',
		'plugin:import/errors',
		'plugin:import/warnings'
	],
	plugins: [ 'svelte3' ],
	overrides: [
		{
			files: [ '*.svelte' ],
			processor: 'svelte3/svelte3'
		}
	]
}
