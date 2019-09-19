// 开单公用方法
import moment from 'moment'
import NP from 'number-precision'
// eslint-disable-next-line require-jsdoc
export function intToChinese(money) { // 金额
  // 汉字的数字
  var cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  // 基本单位
  var cnIntRadice = ['', '拾', '佰', '仟']
  // 对应整数部分扩展单位
  var cnIntUnits = ['', '万', '亿', '兆']
  // 对应小数部分单位
  var cnDecUnits = ['角', '分', '毫', '厘']
  // 整数金额时后面跟的字符
  var cnInteger = '整'
  // 整型完以后的单位
  var cnIntLast = '元'
  // 最大处理的数字
  var maxNum = 999999999999999.9999
  // 金额整数部分
  var integerNum
  // 金额小数部分
  var decimalNum
  // 输出的中文金额字符串
  var chineseStr = ''
  // 分离金额后用的数组，预定义
  var parts
  if (money === '') {
    return ''
  }
  let money1 = parseFloat(money)
  if (money1 >= maxNum) {
    // 超出最大处理数字
    return ''
  }
  if (money1 === 0) {
    chineseStr = cnNums[0] + cnIntLast + cnInteger
    return chineseStr
  }
  // 转换为字符串
  money1 = money1.toString()
  if (money1.indexOf('.') === -1) {
    integerNum = money1
    decimalNum = ''
  } else {
    parts = money1.split('.')
    integerNum = parts[0]
    decimalNum = parts[1].substr(0, 4)
  }
  // 获取整型部分转换
  if (parseInt(integerNum, 10) > 0) {
    let zeroCount = 0
    const IntLen = integerNum.length
    for (let i = 0; i < IntLen; i++) {
      const n = integerNum.substr(i, 1)
      const p = IntLen - i - 1
      const q = p / 4
      const m = p % 4
      if (n === '0') {
        zeroCount++
      } else {
        if (zeroCount > 0) {
          chineseStr += cnNums[0]
        }
        // 归零
        zeroCount = 0
        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m]
      }
      if (m === 0 && zeroCount < 4) {
        chineseStr += cnIntUnits[q]
      }
    }
    chineseStr += cnIntLast
  }
  // 小数部分
  if (decimalNum !== '') {
    const decLen = decimalNum.length
    for (let i = 0; i < decLen; i++) {
      const n = decimalNum.substr(i, 1)
      if (n !== '0') {
        chineseStr += cnNums[Number(n)] + cnDecUnits[i]
      }
    }
  }
  if (chineseStr === '') {
    chineseStr += cnNums[0] + cnIntLast + cnInteger
  } else if (decimalNum === '') {
    chineseStr += cnInteger
  }
  return chineseStr
}
// eslint-disable-next-line require-jsdoc
export function dateDiffIncludeToday(startDateString, endDateString) { // 相差时间
  const separator = '-' // 日期分隔符
  const startDates = moment(startDateString).format('YYYY-MM-DD').split(separator)
  const endDates = moment(endDateString).format('YYYY-MM-DD').split(separator)
  const startDate = new Date(startDates[0], startDates[1] - 1, startDates[2])
  const endDate = new Date(endDates[0], endDates[1] - 1, endDates[2])
  return parseInt(Math.abs(endDate - startDate) / 1000 / 60 / 60 / 24) + 1// 把相差的毫秒数转换为天数
}
// eslint-disable-next-line require-jsdoc
export function roleAdmin() { // 角色（判断是否为 现场开单管理员）
  const roles = this.$store.getters.userInfo.role || []
  if (roles.length !== 0) {
    const isAdmin = roles.some(function(item) {
      return item.roleName === '现场开单管理员'
    })
    return isAdmin
  } else {
    return false
  }
}
// eslint-disable-next-line require-jsdoc
export function simpleAlgorithm(val1, val2, is) { // +-避免丢失精度计算
  // let max = 0;  // 小数个数
  // var x1 = String(val1).indexOf('.') + 1; //小数点的位置
  // var y1 = String(val1).length - x1;  // 几位小树

  // var x2 = String(val2).indexOf('.') + 1; //小数点的位置
  // var y2 = String(val2).length - x2;  // 几位小树
  // if (y1 > y2) {
  //   max = y1;
  // } else {
  //   max = y2;
  // }
  // if (is === "+") {
  //   return (val1 * Math.pow(10, max) + val2 * Math.pow(10, max)) / Math.pow(10, max);
  // } else if (is === "-") {
  //   return (val1 * Math.pow(10, max) - val2 * Math.pow(10, max)) / Math.pow(10, max);
  // } else if (is === "*") {
  //   return (val1 * 10000 * val2) / 10000;
  // }

  if (is === '+') {
    return NP.plus(val1, val2)
  } else if (is === '-') {
    return NP.minus(val1, val2)
  } else if (is === '*') {
    return NP.times(val1, val2)
  }
}

