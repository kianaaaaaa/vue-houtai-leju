import http from '@/api/http'

function brandList(params) {
  return http({
    url: '/api/leju/admin/brand/list', // 获取分类数据
    method: 'get',
    params
  })
}
function saveOrUpdate(params) {
  return http({
    url: '/api/leju/admin/brand/saveOrUpdate', // 新增/添加
    method: 'post',
    params
  })
}
function delList(params) {
  return http({
    url: '/api/leju/admin/brand/del', // 新增/添加
    method: 'get',
    params
  })
}
export default {
  brandList,
  saveOrUpdate,
  delList

}
