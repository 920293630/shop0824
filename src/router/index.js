import Vue from 'vue'
import Router from 'vue-router'
import store from '../store';

Vue.use(Router);

function routeGuard(url) {
  return store.state.userInfo ? store.state.userInfo.menus_url.some(i => i == url) : false
}

export default new Router({
  routes: [{
    path: '/login',
    component: () => import('../pages/login/login.vue')
  }, {
    path: '/',
    component: () => import('../pages/index'),
    alas: '/index',
    children: [{
        path: 'home',
        name: '首页',
        component: () => import('../pages/home/home.vue'),
        beforeEnter(to, from, next) {
          store.state.userInfo ? next() : next('/login');
        }
      },
      {
        path: 'menu',
        name: '菜单管理',
        component: () => import('../pages/menu/menu.vue'),
        beforeEnter(to, from, next) {
          routeGuard('menu') ? next() : next('/');
        }
      },
      {
        path: 'role',
        name: '角色管理',
        component: () => import('../pages/role/role.vue'),
        beforeEnter(to, from, next) {
          routeGuard('role') ? next() : next('/');
        }
      },
      {
        path: 'user',
        name: '管理员管理',
        component: () => import('../pages/user/user.vue'),
        beforeEnter(to, from, next) {
          routeGuard('user') ? next() : next('/');
        }
      },
      {
        path: 'category',
        name: '商品分类',
        component: () => import('../pages/category/category.vue'),
        beforeEnter(to, from, next) {
          routeGuard('category') ? next() : next('/');
        }
      },
      {
        path: 'specs',
        name: '商品规格',
        component: () => import('../pages/specs/specs.vue'),
        beforeEnter(to, from, next) {
          routeGuard('specs') ? next() : next('/');
        }
      },
      {
        path: 'goods',
        name: '商品管理',
        component: () => import('../pages/goods/goods.vue'),
        beforeEnter(to, from, next) {
          routeGuard('goods') ? next() : next('/');
        }
      },
      {
        path: 'member',
        name: '会员管理',
        component: () => import('../pages/member/member.vue'),
        beforeEnter(to, from, next) {
          routeGuard('member') ? next() : next('/');
        }
      },
      {
        path: 'banner',
        name: '轮播图管理',
        component: () => import('../pages/banner/banner.vue'),
        beforeEnter(to, from, next) {
          routeGuard('banner') ? next() : next('/');
        }
      },
      {
        path: 'seckill',
        name: '秒杀活动',
        component: () => import('../pages/seckill/seckill.vue'),
        beforeEnter(to, from, next) {
          routeGuard('seckill') ? next() : next('/');
        }
      },
      {
        path: '',
        redirect: 'home',
      },
    ]
  }, {
    path: '*',
    redirect: '/home'
  }]
})
