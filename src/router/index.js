import Vue from 'vue';
import Router from 'vue-router';
import ListDetail from '@/views/ListDetail';
import ListDetailComment from '@/views/ListDetailComment';
// import ListDetailSubmit from '@/views/ListDetailSubmit'
import ListDetailInfo from '@/views/ListDetailInfo'

Vue.use(Router);

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
        title: '首页',
        keepAlive: true // 需要被缓存
      },
      component: resolve => require(['@/views/List'], resolve),
      children: [
        {
          path: 'classify',
          name: 'classify',
          meta: {
            title: '分类',
            keepAlive: true // 需要被缓存
          },
          components: {
            detail: resolve => require(['@/views/ListClassify'], resolve)
          },
          children: [
            {
              path: 'detail/:id',
              name: 'classdetail',
              meta: {
                title: '商品详情',
                keepAlive: true // 需要被缓存
              },
              component: ListDetail
            }
          ]
        },
        {
          path: 'detail/:id',
          name: 'listdetail',
          meta: {
            title: '商品详情',
            keepAlive: true // 需要被缓存
          },
          components: {
            detail: ListDetail
          },
          children: [
            {
              path: 'comment',
              name: 'Listdetailcomment',
              meta: {
                title: '更多评论',
                keepAlive: true
              },
              component: ListDetailComment
            },
            {
              path: 'info',
              meta: {
                title: '客服',
                keepAlive: true
              },
              component: ListDetailInfo
            },
            {
              path: 'submit',
              name: 'submit',
              meta: {
                keepAlive: true,
                title: '确认订单'
              },
              component: resolve => require(['@/views/ListDetailSubmit'], resolve),
              children: [
                {
                  path: 'info',
                  meta: {
                    title: '客服',
                    keepAlive: true
                  },
                  component: ListDetailInfo
                },
                {
                  path: 'submitorder',
                  name: 'submitorder',
                  meta: {
                    keepAlive: true,
                    title: '订单已提交'
                  },
                  component: resolve => require(['@/views/state/Order'], resolve)
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: '/store',
      name: 'store',
      meta: {
        title: '店铺',
        keepAlive: true
      },
      component: resolve => require(['@/views/ListDetailStore'], resolve),
      children: [
        {
          path: 'info',
          meta: {
            title: '客服',
            keepAlive: true
          },
          component: ListDetailInfo
        }
      ]
    },
    {
      path: '/shopping',
      name: 'shopping',
      meta: {
        title: '购物车',
        keepAlive: true // 需要被缓存
      },
      component: resolve => require(['@/views/Shopping'], resolve)
    },
    {
      path: '/mycenter',
      name: 'mycenter',
      meta: {
        title: '个人中心',
        keepAlive: true // 需要被缓存
      },
      component: resolve => require(['@/views/MyCenter'], resolve),
      children: [
        {
          path: 'cash',
          meta: {
            title: '我的余额',
            keepAlive: true // 需要被缓存
          },
          component: resolve => require(['@/views/my/Cash'], resolve)
        },
        {
          path: 'collect',
          meta: {
            title: '我的收藏',
            keepAlive: true // 需要被缓存
          },
          component: resolve => require(['@/views/my/Collect'], resolve)
        },
        {
          path: 'message',
          meta: {
            title: '我的信息',
            keepAlive: true // 需要被缓存
          },
          component: resolve => require(['@/views/my/Message'], resolve)
        },
        {
          path: 'friend',
          meta: {
            title: '我的好友',
            keepAlive: true // 需要被缓存
          },
          component: resolve => require(['@/views/my/Friend'], resolve)
        },
        {
          path: 'location',
          meta: {
            title: '收货地址',
            keepAlive: true // 需要被缓存
          },
          component: resolve => require(['@/views/my/Location'], resolve),
          children: [
            {
              path: 'form',
              meta: {
                title: '收货地址',
                keepAlive: true // 需要被缓存
              },
              component: resolve => require(['@/views/my/LocationForm'], resolve)
            }
          ]
        },
        {
          path: 'orderbox',   // 我的订单
          meta: {
            title: '我的订单',
            keepAlive: true // 需要被缓存
          },
          component: resolve => require(['@/views/order/OrderBox'], resolve),
          children: [
            {
              path: 'all',
              name: 'all',
              meta: {
                title: '全部订单',
                keepAlive: true // 需要被缓存
              },
              components: {   // 命名视图
                main: resolve => require(['@/views/order/All'], resolve)
              }
            },
            {
              path: 'deliver',
              name: 'deliver',
              meta: {
                title: '待发货',
                keepAlive: true // 需要被缓存
              },
              components: {
                main: resolve => require(['@/views/order/Deliver'], resolve)
              }
            },
            {
              path: 'take',
              name: 'take',
              meta: {
                title: '待收货',
                keepAlive: true // 需要被缓存
              },
              components: {
                main: resolve => require(['@/views/order/Take'], resolve)
              }
            },
            {
              path: 'remain',
              name: 'remain',
              meta: {
                title: '待评价',
                keepAlive: true // 需要被缓存
              },
              components: {
                main: resolve => require(['@/views/order/Remain'], resolve)
              }
            },
            {
              path: 'after',
              name: 'after',
              meta: {
                title: '售后',
                keepAlive: true // 需要被缓存
              },
              components: {
                main: resolve => require(['@/views/order/After'], resolve)
              }
            },
            {
              path: 'return',
              name: 'return',
              meta: {
                title: '退货',
                keepAlive: true // 需要被缓存
              },
              components: {
                else: resolve => require(['@/views/order/OrderReturn'], resolve)
              },
              children: [
                {
                  path: 'audit',
                  meta: {
                    title: '等待审核',
                    keepAlive: true // 需要被缓存
                  },
                  component: resolve => require(['@/views/state/Audit'], resolve),
                  children: [
                    {
                      path: 'afterdetails',
                      meta: {
                        title: '退货详情',
                        keepAlive: true // 需要被缓存
                      },
                      component: resolve => require(['@/views/order/AfterDetails'], resolve)
                    }
                  ]
                }
              ]
            },
            {
              path: 'succeed',    // 确认收货
              meta: {
                title: '交易成功',
                keepAlive: true // 需要被缓存
              },
              components: {
                else: resolve => require(['@/views/state/Succeed'], resolve)
              },
              children: [
                {
                  path: 'evaluate',
                  meta: {
                    title: '评价',
                    keepAlive: true // 需要被缓存
                  },
                  component: resolve => require(['@/views/order/RemainEvaluate'], resolve),
                  children: [
                    {
                      path: 'stateevaluate',
                      meta: {
                        title: '评分完成',
                        keepAlive: true // 需要被缓存
                      },
                      component: resolve => require(['@/views/state/Evaluate'], resolve)
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
})
