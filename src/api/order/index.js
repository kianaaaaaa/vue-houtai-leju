
import http from '@/api/http'

function orderList(params) {
  return http({
    url: '/api/leju/admin/order/list',
    method: 'get',
    params
  })
}

function detail(params) {
  return http({
    url: '/api/leju/admin/order/detail',
    method: 'get',
    params
  })
}
function orderUserInfo(params) {
  return http({
    url: '/api/leju/admin/order/orderUserInfo',
    method: 'get',
    params
  })
}
function sendDone(params) { // 提交发货按钮
  return http({
    url: '/api/leju/admin/order/sendDone',
    method: 'post',
    params
  })
}

export default {
  orderList,
  detail,
  orderUserInfo,
  sendDone
}
