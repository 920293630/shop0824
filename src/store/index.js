import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

/* 导入跟级 mutations actions */
import {
  state,
  mutations,
  getters
} from './mutations';
import actions from './actions';

/* 导入 modules 中模块*/
import menu from './modules/menu';
import role from './modules/role';
import user from './modules/user';
import cate from './modules/cate';
import specs from './modules/specs';
import goods from './modules/goods';
import member from './modules/member';
import banner from './modules/banner';
import seckill from './modules/seckill';

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  modules: {
    menu,
    role,
    user,
    cate,
    specs,
    goods,
    banner,
    member,
    seckill
  }
});
