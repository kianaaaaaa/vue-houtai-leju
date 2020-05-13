import http from '@/api/http'

function list(params) {
  return http({
    url: '/api/leju/admin/article/list',
    method: 'get',
    params
  })
}
function detail(params) {
  return http({
    url: '/api/leju/admin/article/detail',
    method: 'get',
    params
  })
}
function saveOrUpdate(params) {
  return http({
    url: '/api/leju/admin/article/saveOrUpdate',
    method: 'post',
    params
  })
}
function del(params) {
  return http({
    url: '/api/leju/admin/article/del',
    method: 'get',
    params
  })
}
export default {
  list,
  detail,
  saveOrUpdate,
  del
}
