import http from '@/api/http'

function seriesList(params) {
  return http({
    url: '/api/leju/admin/series/allList', // 获取分类数据
    method: 'get',
    params
  })
}
function saveOrUpdate(params) {
  return http({
    url: '/api/leju/admin/series/saveOrUpdate', // 跟新数据
    method: 'post',
    params
  })
}
function del(params) {
  return http({
    url: '/api/leju/admin/series/del', // 跟新数据
    method: 'get',
    params
  })
}

export default {
  seriesList,
  saveOrUpdate,
  del

}
