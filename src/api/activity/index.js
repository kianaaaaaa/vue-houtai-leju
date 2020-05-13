import http from '@/api/http'

function List(params) {
  return http({
    url: '/api/leju/admin/home/banners', // 首页轮播api
    method: 'get',
    params
  })
}
function bannerSave(params) {
  return http({
    url: '/api/leju/admin/home/bannerSave', // 轮播添加
    method: 'post',
    params
  })
}
function bannerDelete(params) {
  return http({
    url: '/api/leju/admin/home/bannerDelete', // 轮播删除
    method: 'get',
    params
  })
}

export default {
  List,
  bannerSave,
  bannerDelete

}
