import http from '@/api/http'

function kindList(params) {
  return http({
    url: '/api/leju/admin/kind/list',
    method: 'get',
    params
  })
}

export default {
  kindList
}
