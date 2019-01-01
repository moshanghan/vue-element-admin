import request from '@/utils/request'

export function LoginByEmail(email, password) {
  const data = {
    email,
    password
  }
  return request({
    url: '/users/login',
    method: 'POST',
    data
  })
}
export function qqq() {
  return request({
    url: '/users/index',
    method: 'get'
  })
}
export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: {
      token
    }
  })
}
