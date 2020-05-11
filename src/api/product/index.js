import http from '@/api/http'

function productList(params) {
  return http({
    url: '/api/leju/admin/product/list', // 相对路径
    method: 'get',
    params
  })
}
function saveOrUpdate(params) {
  return http({
    url: '/api/leju/admin/product/saveOrUpdate', // 相对路径
    method: 'post',
    params
  })
}

function detail(params) {
  return http({
    url: '/api/leju/admin/product/detail', // 商品明细
    method: 'get',
    params
  })
}
export default {
  productList,
  saveOrUpdate,
  detail
}
