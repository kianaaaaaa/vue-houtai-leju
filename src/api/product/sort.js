import http from '@/api/http'

function sortList(params) {
  return http({
    url: '/api/leju/admin/kind/list', // 获取分类数据
    method: 'get',
    params
  })
}
function delList(params) {
  return http({
    url: '/api/leju/admin/kind/del', // 删除数据分类
    method: 'get',
    params
  })
}

function saveOrUpdate(params) {
  return http({
    url: '/api/leju/admin/kind/saveOrUpdate', // 新增或者更新
    method: 'post',
    params
  })
}
export default {
  sortList,
  delList,
  saveOrUpdate
}
