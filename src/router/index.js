import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '主页', icon: 'dashboard' }
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '商品管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/product/list/index'),
        meta: { title: '商品管理', icon: 'tree' }
      },
      {
        path: 'add',
        name: 'productAdd',
        component: () => import('@/views/product/edit/index'),
        meta: { title: '商品添加', icon: 'table' }
        // hidden: true
      },
      {
        path: 'sort',
        name: 'sort',
        component: () => import('@/views/product/sort/index'),
        meta: { title: '分类管理', icon: 'table' }
      },
      {
        path: 'brand',
        name: 'brand',
        component: () => import('@/views/product/brand/index'),
        meta: { title: '品牌管理', icon: 'tree' }
      },
      {
        path: 'series',
        name: 'series',
        component: () => import('@/views/product/series/index'),
        meta: { title: '系列管理', icon: 'tree' }
      },
      {
        path: 'edit/:id',
        name: 'productEdit',
        component: () => import('@/views/product/edit/index'),
        meta: { title: '商品编辑', icon: 'tree' },
        hidden: true
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    name: 'order',
    meta: { title: '订单管理', icon: 'example' },
    children: [
      {
        path: 'board',
        name: 'board',
        component: () => import('@/views/order/board/index'),
        meta: { title: '订单管理', icon: 'form' }
      },
      {
        path: 'orderBack',
        name: 'orderBack',
        component: () => import('@/views/order/orderBack/index'),
        meta: { title: '退单管理', icon: 'form' }
      },
      {
        path: 'orderBacklist/:id',
        name: 'orderBacklist',
        component: () => import('@/views/order/orderBacklist/index'),
        meta: { title: '退单详情', icon: 'form' },
        hidden: true
      },
      {
        path: 'detail/:id',
        name: 'detail',
        component: () => import('@/views/order/detail/index'),
        meta: { title: '订单详情', icon: 'form' },
        hidden: true
      }

    ]
  },
  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
