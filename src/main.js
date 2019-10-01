import Vue from 'vue'
import App from './App.vue'
import home from './components/home.vue'
import ugemenu from './components/ugemenu.vue'
import daily from './components/daily.vue'
import admin from './components/admincomponents/admin.vue'
import login from './components/admincomponents/login.vue'
import registere from './components/admincomponents/registere.vue'
import createdish from './components/admincomponents/createdish.vue'
import createsidedish from './components/admincomponents/createsidedish.vue'
import setdaily from './components/admincomponents/setdaily.vue'
import setweekmenu from './components/admincomponents/setweekmenu.vue'
import openhours  from './components/admincomponents/openhours.vue'
import VueRouter from 'vue-router'
// eslint-disable-next-line
import style from './css/app.css'
import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '/', component: home },
    { path: '/ugemenu', component: ugemenu },
    { path: '/daily', component: daily },
    { path: '/admincomponents/login', component: login },
    { path: '/admincomponents/registere', component: registere },
    { path: '/admincomponents/admin', component: admin },
    { path: '/admincomponents/createdish', component: createdish },
    { path: '/admincomponents/createsidedish', component: createsidedish },
    { path: '/admincomponents/setdaily', component: setdaily },
    { path: '/admincomponents/setweekmenu', component: setweekmenu },
    { path: '/admincomponents/openhours', component: openhours }
  ]
});


Vue.config.productionTip = false

 new Vue({
  el:"#app",
  router,
  render: h => h(App)
}).$mount('#app')