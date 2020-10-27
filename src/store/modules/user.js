import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import md5 from 'js-md5'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    userInfo: []
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
    },
    SET_USER_INFOT: (state, userInfo) => {
      state.userInfo = userInfo
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      const password = md5(md5(userInfo.password) + 'asset') // 密码加密
      return new Promise((resolve, reject) => {
        login(username, password).then(response => {
          // const data = response
          // if (data.code !== 1) { // 不等于失败状态
          //   reject(data.message)
          // } else {
          //   // 暂无token
          //   commit('SET_TOKEN', data.data.role)
          //   commit('SET_NAME', data.data.userName)
          //   commit('SET_USER_INFOT', data.data)
           
          //   resolve()
          // }
          // console.log(response, 'response');
          if (response.code) {
            commit('SET_TOKEN', response.token)
            commit('SET_NAME', response.data[0].userName)
            commit('SET_USER_INFOT', response.data)
            setToken(response.token)
            resolve()
          } else {
            reject(response.msg)
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

        getInfo({ roleId: state.userInfo[0].roleId }).then(response => {

          console.log(response, 'response');

          commit('SET_ROLES', response.data.perms.split(','))

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
