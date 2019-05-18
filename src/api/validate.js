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

// 非空验证（ 不能有空格
export function isHave(str) {
  const reg = /^\S+$/
  return reg.test(str)
}

// 邮箱验证
export function isEmail(str) {
  var regEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
  return regEmail.test(str)
}

// 邮箱验证????????
export function istotal(str) {
  var regEmail = /^\+?[1-9][0-9]*$/
  return regEmail.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}
