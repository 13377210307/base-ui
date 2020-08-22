import storage from 'store'
import { login, getInfo } from '@/api/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { welcome } from '@/utils/util'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          if (response.code && response.code === '401') {
            reject(response)
          } else {
            storage.set(ACCESS_TOKEN, response.access_token, response.expires_in)
            commit('SET_TOKEN', response.access_token)
            resolve()
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
     GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const data = response.data
          const result = {
            userName: data.userName,
            phoneNumber: data.phoneNumber,
            role: {
              permissionList: [],
              permissions: []
            }
          }
          if (data.permissionList.length > 0) {
            result.role.permissionList = (data.permissionList.filter(d => d.level !== 3)).map(d => d.permissionKey)
            console.log(result)
            const permissions = []
            data.permissionList.forEach(d => {
              if (d.level === 2) {
                permissions.push({
                  id: d.id,
                  permissionId: d.permissionKey
                })
              }
            })
            permissions.forEach(d => {
              const actionList = []
              data.permissionList.forEach(d2 => {
                if (d.id === d2.pid) {
                  actionList.push(d2.permissionKey)
                }
              })
              d['actionList'] = actionList
            })
            result.role.permissions = permissions
            commit('SET_ROLES', result.role)
            commit('SET_INFO', result)
          } else {
            reject(new Error('getInfo: roles must be a non-null array !'))
          }
          commit('SET_NAME', { name: result.userName, welcome: welcome() })
          commit('SET_AVATAR', '')
          resolve(result)
        }).catch(error => {
          reject(error)
        })
      })
    }

    // 登出
    /* Logout ({ commit, state }) {
      return new Promise((resolve) => {
        logout(state.token).then(() => {
          resolve()
        }).catch(() => {
          resolve()
        }).finally(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          storage.remove(ACCESS_TOKEN)
        })
      })
    } */

  }
}

export default user
