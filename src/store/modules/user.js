import {
  LoginByEmail,
  logout,
  getUserInfo
} from '@/api/login'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'
const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    },
    stempRolse: ['editor']
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
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
    SET_STMP_ROLE: (state, roles) => {
      state.stempRolse = roles
    }
  },

  actions: {
    // 用户名登录
    LoginByEmail({
      commit
    }, userInfo) {
      const email = userInfo.email.trim()
      return new Promise((resolve, reject) => {
        LoginByEmail(email, userInfo.password).then(response => {
          const data = response.data
          if (data.success) {
            commit('SET_TOKEN', data.token)
            setToken(data.token)
            commit('SET_STMP_ROLE', data.roles)
            commit('SET_NAME', data.name)
            commit('SET_AVATAR', data.avatar)
            commit('SET_INTRODUCTION', data.introduction || '')
            localStorage.setItem('userInfo', JSON.stringify(data))
            resolve(data)
          } else {
            reject(data)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
        if (userInfo != {}) {
          commit('SET_TOKEN', userInfo.token)
          setToken(userInfo.token)
          commit('SET_STMP_ROLE', userInfo.roles)
          commit('SET_NAME', userInfo.name)
          commit('SET_AVATAR', userInfo.avatar)
          commit('SET_INTRODUCTION', userInfo.introduction || '')
          commit('SET_ROLES', state.stempRolse)
          const data = {
            roles: state.roles
          }
          resolve(data)
        }
      }).catch(error => {
        reject(error)
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({
      commit
    }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({
      commit,
      dispatch
    }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          dispatch('GenerateRoutes', data) // 动态修改权限后 重绘侧边菜单
          resolve()
        })
      })
    }
  }
}

export default user
