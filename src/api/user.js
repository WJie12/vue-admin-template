import request from '@/utils/request'

export function login(data) {
  // return request({
  //   url: '/user/login',
  //   method: 'post',
  //   data
  // })
  const res = [{ 'code': 20000,
    'data': { 'token': 'admin-token' }}]
  return res
}

export function getInfo(token) {
  // return request({
  //   url: '/user/info',
  //   method: 'get',
  //   params: { token }
  // })
  const res = [{ 'code': 20000, 'data': { 'roles': ['admin'],
    'introduction': 'I am a super administrator',
    'avatar': 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    'name': 'Super Admin' }}]
  return res
}

export function logout() {
  // return request({
  //   url: '/user/logout',
  //   method: 'post'
  // })
  const res = [{ 'code': 20000, 'data': 'success' }]
  return res
}
