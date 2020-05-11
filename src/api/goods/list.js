import http from '@/api/http'

function goodsList(params) {
  return http({
    url: '/api/leju/admin/product/list',
    method: 'get',
    params
  })
}
function updateProduct(params) {
  return http({
    url: '/api/leju/admin/product/updateProduct',
    method: 'get',
    params
  })
}

export default {
  goodsList,
  updateProduct
}
