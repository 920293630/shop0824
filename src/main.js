// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

/* 导入 store */
import store from './store';

/* 引入静态资源 */
// 重置样式 reset.css
import './assets/css/reset.css';

/* 引入组件 */
// 全局公共组件
import commonComponents from './components/index';
for (let key in commonComponents) {
  Vue.component(key, commonComponents[key]);
}

/* 引入过滤器 */
// 全局公共过滤器
import filters from './filters/index';
for (let key in filters) {
  Vue.filter(key, filters[key]);
}

/* 导入 ElementUI */
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

/* 声明一个全局变量存储 localhost:3000 */
Vue.prototype.$api = "http://localhost:3000";

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
