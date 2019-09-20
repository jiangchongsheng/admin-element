import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

/* Layout */
import Layout from '@/views/layout/Layout'

Vue.use(Router)

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  // 概要信息
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'dashboard',
      meta: {
        title: 'dashboard',
        icon: 'example'
      }
    }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  // 用户管理
  {
    path: '/user',
    component: Layout,
    redirect: 'user/index',
    meta: {
      roles: ['admin', 'input'],
      title: 'user',
      icon: 'users'
    },
    children: [
      {
        path: 'user',
        component: () => import('@/views/user/index'),
        name: 'index',
        meta: {
          roles: ['admin', 'input'],
          title: 'user',
          icon: 'users'
        }
      }
    ]
  },

  // 表格管理
  {
    path: '/table',
    component: Layout,
    redirect: 'table/index',
    meta: {
      roles: ['admin', 'input'],
      title: 'table',
      icon: 'table'
    },
    children: [
      {
        path: 'table',
        component: () => import('@/views/table/index'),
        name: 'index',
        meta: {
          roles: ['admin', 'input'],
          title: 'table',
          icon: 'table'
        }
      }
    ]
  },

  // 图表控件
  {
    path: '/chart',
    component: Layout,
    redirect: 'chart/index',
    meta: {
      roles: ['role'],
      title: 'chart',
      icon: 'tree'
    },
    children: [
      {
        path: 'chart',
        component: () => import('@/views/chart/index'),
        name: 'index',
        meta: {
          roles: ['admin', 'input'],
          title: 'chart',
          icon: 'tree'
        }
      }
    ]
  },

  // 表单控件
  {
    path: '/form',
    component: Layout,
    redirect: 'form/index',
    meta: {
      roles: ['role'],
      title: 'form',
      icon: 'tree'
    },
    children: [
      {
        path: 'form',
        component: () => import('@/views/form/index'),
        name: 'index',
        meta: {
          roles: ['admin', 'input'],
          title: 'form',
          icon: 'tree'
        }
      }
    ]
  },

  // 测试菜单==============
  {
    path: '/test',
    component: Layout,
    redirect: 'test/testOne',
    meta: {
      roles: ['admin', 'input'], // 角色admin
      title: 'test',
      icon: 'jiaose'
    },
    children: [
      {
        path: 'testOne',
        name: 'testOne',
        component: () => import('@/views/test/testOne'),
        meta: {
          title: 'testOne',
          icon: 'ku',
          roles: ['admin', 'input'] // 角色admin
        }
      },
      {
        path: 'testTwo',
        name: 'testTwo',
        component: () => import('@/views/test/testTwo'),
        meta: {
          title: 'testTwo',
          icon: 'xiao',
          roles: ['admin'] // 角色admin
        }
      }

    ]
  },

  // 404 页面一定要最后加载，如果放在constantRouterMap一同声明了404，后面的所以页面都会被拦截到404
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]
