import http from '@/api/http'

function skuList(params) {
  return http({
    url: '/api/leju/admin/productSku/skuList',
    method: 'get',
    params
  })
}
function saveOrUpdate(params) {
  return http({
    url: '/api/leju/admin/productSku/saveOrUpdate', // 相对路径
    method: 'post',
    params
  })
}

export default {
  skuList,
  saveOrUpdate
}
