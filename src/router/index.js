import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home'
import Step1 from '@/pages/step1'
import Cropper from '@/pages/cropper'
import Step2 from '@/pages/step2'
import Model from '@/pages/model'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },

    {
      path: '/cropper',
      name: 'Cropper',
      component: Cropper
    },
    {
      path: '/step1',
      name: 'Step1',
      component: Step1
    },
    {
      path: '/step2',
      name: 'Step2',
      component: Step2
    },
    {
      path: '/model',
      name: 'Model',
      component: Model
    }
  ]
})
