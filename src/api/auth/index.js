import http from '@/api/http'

function userDetail(params) {
  return http({
    url: '/api/leju/admin/client/userDetail', // 删除用户
    method: 'get',
    params
  })
}
function userList(params) {
  return http({
    url: '/api/leju/admin/client/userList', // 用户明细
    method: 'get',
    params
  })
}
export default {
  userDetail,
  userList
}
