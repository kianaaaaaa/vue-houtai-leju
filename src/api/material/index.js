import http from '@/api/http'

function materialList(params) {
  return http({
    url: '/api/leju/admin/material/list',
    method: 'get',
    params
  })
}
function del(params) {
  return http({
    url: '/api/leju/admin/material/del',
    method: 'get',
    params
  })
}
export default {
  materialList,
  del
}
