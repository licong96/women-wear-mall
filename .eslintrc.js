// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    'arrow-parens': 0,
    // 数组和对象键值对最后一个逗号， never参数：不能带末尾的逗号, always参数：必须带末尾的逗号，
    // always-multiline：多行模式必须带逗号，单行模式不能带逗号
    "comma-dangle": 0,
    // 禁止把全局对象 (Math 和 JSON) 作为函数调用 错误：var math = Math();
    "no-obj-calls": 0,
    // 要求或禁止使用分号而不是 ASI（这个才是控制行尾部分号的，）
    "semi": 0,
    // 强制分号之前和之后使用一致的空格
    "semi-spacing": 0,
		// allow debugger during development
		'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
		'indent': 0,
		'space-before-function-paren': 0,
		'eol-last': 0
  }
}
