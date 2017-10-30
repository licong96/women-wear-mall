import Vue from 'vue'
import Router from 'vue-router'
import ListDetail from '@/views/ListDetail'
import ListDetailForm from '@/views/ListDetailForm'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/list'   // 重定向 和 别名
    },
    {
      path: '/list',
      name: 'list',
      component: resolve => require(['@/views/List'], resolve),
      children: [
        {
          path: 'detail/:id',
          name: 'listdetail',
          component: ListDetail,
          children: [
            {
              path: 'form',
              name: 'listdetailform',
              component: ListDetailForm
            }
          ]
        }
      ]
    },
    {
      path: '/shopping',
      component: resolve => require(['@/views/Shopping'], resolve)
    },
    {
      path: '/mycenter',
      component: resolve => require(['@/views/MyCenter'], resolve)
    }
  ]
})
