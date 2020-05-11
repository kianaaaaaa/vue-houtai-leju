import http from '@/api/http'

function seriesList(params) {
  return http({
    url: '/api/leju/admin/series/allList', // 相对路径
    method: 'get',
    params
  })
}

export default {
  seriesList
}
