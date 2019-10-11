// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueQuillEditor from 'vue-quill-editor'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(ElementUI)
axios.defaults.withCredentials = true
Vue.use(VueQuillEditor)
// 获取cookie
function getCookie(name) {
  var arr,
    reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return null;
}
// 跳转拦截
router.beforeEach((to, from, next) => {
  if (getCookie('isAdmin') === 'true') { //如果有cookie就畅通无阻
    next();
  } else {
    if (to.path == '/' || to.path == '/detail') { //如果是首页和详情页面就直接next()
      next();
    } else { //不然就跳转到登录；
      console.log('没有cookie:' + getCookie("isAdmin"))
      next('/');
    }
  }
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
