import http from '@/api/http'

function brandList(params) {
  return http({
    url: '/api/leju/admin/brand/list', // 相对路径
    method: 'get',
    params
  })
}

function brandListAll(params) {
  return http({
    url: '/api/leju/admin/brand/listAll', // 相对路径
    method: 'get',
    params
  })
}
export default {
  brandList,
  brandListAll
}
