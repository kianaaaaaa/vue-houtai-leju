import http from '@/api/http'

function baseInfo(params) {
  return http({
    url: '/api/leju/admin/dashboard/baseInfo', // 相对路径
    method: 'get',
    params
  })
}

export default {
  baseInfo

}
