import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home'
import Stemp1 from '@/pages/stemp1'
import Cropper from '@/pages/cropper'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/stemp1',
      name: 'Stemp1',
      component: Stemp1
    },
    {
      path: '/cropper',
      name: 'Cropper',
      component: Cropper
    }
  ]
})
