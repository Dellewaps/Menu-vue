import Vue from 'vue'
import App from './App.vue'
import ugemenu from './components/ugemenu.vue'
import daily from './components/daily.vue'
import admin from './components/admincomponents/admin.vue'
import login from './components/admincomponents/login.vue'
import createdish from './components/admincomponents/createdish.vue'
import createsidedish from './components/admincomponents/createsidedish.vue'
import setdaily from './components/admincomponents/setdaily.vue'
import setweekmenu from './components/admincomponents/setweekmenu.vue'
import openhours  from './components/admincomponents/openhours.vue'

// eslint-disable-next-line
import style from './css/app.css'
import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

const routes = {
  '/': App,
  '/ugemenu': ugemenu,
  '/daily': daily,
  '/admincomponents/login': login,
  '/admincomponents/admin': admin,
  '/admincomponents/createdish': createdish,
  '/admincomponents/createsidedish': createsidedish,
  '/admincomponents/setdaily': setdaily,
  '/admincomponents/setweekmenu': setweekmenu,
  '/admincomponents/openhours': openhours,
  
}

Vue.config.productionTip = false

new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      return routes[this.currentRoute] //|| NotFound
    }
  },
  render (h) { return h(this.ViewComponent) }
})
