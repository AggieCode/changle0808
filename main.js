import Vue from 'vue'
import App from './App'
import request from 'util/request.js'
import urls from 'util/urls.js'
import { showToast, throttle} from 'util/tools.js'
import uView from 'uview-ui';

Vue.config.productionTip = false
Vue.prototype.$request = request
Vue.prototype.$urls = urls;
Vue.prototype.$showToast = showToast;
Vue.prototype.$throttle = throttle;
Vue.use(uView);
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
