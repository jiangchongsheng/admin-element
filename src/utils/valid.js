import store from '@/store'

export function hasPermission(menu) {
  return menu ? store.getters.permissions.indexOf(menu) >= 0 : true
}
