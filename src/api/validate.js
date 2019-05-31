// 手机号验证
export function isvalidPhone(str) {
  const reg = /^1[2|3|4|5|6|7|8|9][0-9]\d{8}$/
  return reg.test(str)
}

// 只能输入数字和英文
export function isNumOrLetter(str) {
  const reg = /^[0-9a-zA-Z]*$/g
  return reg.test(str)
}

// 只能输入数字
export function isNumber(str) {
  const reg = /^[0-9]*$/
  return reg.test(str)
}

// 只能输入数字 且开头不可为0
export function isZeroNum(str) {
  const reg = /^[1-9]\d*$/
  return reg.test(str)
}

// 只能为数字并且内容不可为0
export function isNoZeroNum(str) {
  const reg = /^[1-9]*$/
  return reg.test(str)
}

// 非空验证（ 不能有空格
export function isHave(str) {
  const reg = /^\S+$/
  return reg.test(str)
}

// 只能为8位数字或10位数字
export function isNumEightTen(str) {
  const reg = /^(\d{8}|\d{10})$/
  return reg.test(str)
}

// 不能输入表情
export function istextarea(str) {
  const reg = /[^\u0020-\u007E\u00A0-\u00BE\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF\u0080-\u009F\u2000-\u201f\u2026\u2022\u20ac\r\n]/g
  return reg.test(str)
}

// 邮箱验证
export function isEmail(str) {
  var regEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
  return regEmail.test(str)
}

// 校验密码：只能输入6-12个字母、数字、下划线
export function isPasswd(s) {
  var patrn = /^(\w){6,12}$/
  if (!patrn.exec(s)) return false
  return true
}

// 只能汉字（繁简）
export function isChinese(str) {
  const reg = /^[\u4e00-\u9fa5]+$/
  return reg.test(str)
}

// 只能汉字（繁简）+ 字母
export function isChineseE(str) {
  const reg = /^[a-zA-Z\u4e00-\u9fa5]+$/
  return reg.test(str)
}

// 只能汉字（繁简）+ 字母 + 数字
export function isChineseEngN(str) {
  const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+$/
  return reg.test(str)
}

// 数字 + 英文逗号
export function isNumComma(str) {
  const reg = /^[0-9,]+$/
  return reg.test(str)
}

// 正则表达式校验金额最多两位小数的实数
export function isMoney(str) {
  const reg = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
  return reg.test(str)
}
