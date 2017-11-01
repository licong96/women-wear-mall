import Vue from 'vue'
import Router from 'vue-router'
import ListDetail from '@/views/ListDetail'
import ListDetailComment from '@/views/ListDetailComment'
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
      meta: {
        title: '首页'
      },
      component: resolve => require(['@/views/List'], resolve),
      children: [
        {
          path: 'detail/:id',
          name: 'listdetail',
          meta: {
            title: '商品详情'
          },
          component: ListDetail,
          children: [
            {
              path: 'comment',
              name: 'Listdetailcomment',
              meta: {
                title: '更多评论'
              },
              component: ListDetailComment
            },
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
