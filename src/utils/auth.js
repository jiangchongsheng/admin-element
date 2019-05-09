import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

// 获取
export function getToken() {
  return Cookies.get(TokenKey)
}

// 存值
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

// 删除
export function removeToken() {
  return Cookies.remove(TokenKey)
}
