
import http from '@/api/http'

function orderBack(params) {
  return http({
    url: '/api/leju/admin/orderBack/list',
    method: 'get',
    params
  })
}
function detail(params) {
  return http({
    url: '/api/leju/admin/orderBack/detail',
    method: 'get',
    params
  })
}
function rejectBack(params) { // 拒绝退单
  return http({
    url: '/api/leju/admin/orderBack/rejectBack',
    method: 'post',
    params
  })
}
function backDone(params) { // 退单完成
  return http({
    url: '/api/leju/admin/orderBack/backDone',
    method: 'get',
    params
  })
}
function agreeBack(params) { // 同意退单
  return http({
    url: '/api/leju/admin/orderBack/agreeBack',
    method: 'post',
    params
  })
}
export default {
  orderBack,
  detail,
  rejectBack,
  backDone,
  agreeBack

}
