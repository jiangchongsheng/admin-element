import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          console.log(response)
          const data = response
          if (data.code !== 1) { // 不等于失败状态
            reject(data.message)
          } else {
            // 暂无token
            commit('SET_TOKEN', data.data.role)
            commit('SET_NAME', data.data.userName)
            setToken(data.data.role)
            resolve()
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        // 假值============ 默认给权限 admin==============
        // const arr = ['admin']
        // commit('SET_ROLES', arr)
        // resolve(arr)
        // 假值============ 默认给权限 admin==============

        getInfo({ roleName: state.token }).then(response => {
          const data = response.data

          commit('SET_ROLES', data.perms.split(','))

          // localStorage.setItem('userId', data.userId)
          // localStorage.setItem('roleName', data.roleName)
          // switch (data.role) {
          //   case 0:
          //     commit('SET_ROLES', ['admin'])
          //     break
          //   case 1:
          //     commit('SET_ROLES', ['input'])
          //     break
          //   case 2:
          //     commit('SET_ROLES', ['manage'])
          //     break
          //   case 3:
          //     commit('SET_ROLES', ['base'])
          //     break
          //   case 4:
          //     commit('SET_ROLES', ['detail'])
          //     break
          //   case 5:
          //     commit('SET_ROLES', ['none'])
          //     break
          // }
          // commit('SET_ROLES', data.perms)
          // commit('SET_NAME', data.name)
          // commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        // logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resolve()
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
