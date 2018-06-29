import Vue from 'vue'
import Router from 'vue-router'

import MovieManage from '../views/MovieManage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/movie-manage'
    },
    {
      path: '/movie-manage',
      name: 'MovieManage',
      component: MovieManage
    }
  ]
})
