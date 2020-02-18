import Vue from 'vue'
import App from './App.vue'
import router from './router';
import vuetify from './plugins/vuetify';
import VueFirestore from "vue-firestore";
import Vuex from 'vuex';
import store from './store';


Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(VueFirestore, {
  key: "id",
  enumerable: true
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
