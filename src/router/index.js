import Vue from 'vue'
import Router from 'vue-router'
import ListDetail from '@/views/ListDetail'
import ListDetailComment from '@/views/ListDetailComment'
// import ListDetailSubmit from '@/views/ListDetailSubmit'

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
          // component: ListDetail,
          components: {
            detail: ListDetail
          },
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
              path: 'info',
              meta: {
                title: '客服'
              },
              component: resolve => require(['@/views/ListDetailInfo'], resolve)
            },
            {
              path: 'submit',
              name: 'submit',
              meta: {
                title: '确认订单'
              },
              component: resolve => require(['@/views/ListDetailSubmit'], resolve),
              children: [
                {
                  path: 'info',
                  meta: {
                    title: '商家'
                  },
                  component: resolve => require(['@/views/ListDetailInfo'], resolve)
                },
                {
                  path: 'submitorder',
                  meta: {
                    title: '订单已提交'
                  },
                  component: resolve => require(['@/views/state/Order'], resolve)
                }
              ]
            }
          ]
        },
        {
          path: 'store',
          meta: {
            title: '店铺'
          },
          components: {
            store: resolve => require(['@/views/ListDetailStore'], resolve)
          }
        }
      ]
    },
    {
      path: '/shopping',
      name: 'shopping',
      meta: {
        title: '购物车'
      },
      component: resolve => require(['@/views/Shopping'], resolve)
    },
    {
      path: '/mycenter',
      name: 'mycenter',
      meta: {
        title: '个人中心'
      },
      component: resolve => require(['@/views/MyCenter'], resolve),
      children: [
        {
          path: 'cash',
          meta: {
            title: '我的余额'
          },
          component: resolve => require(['@/views/my/Cash'], resolve)
        },
        {
          path: 'collect',
          meta: {
            title: '我的收藏'
          },
          component: resolve => require(['@/views/my/Collect'], resolve)
        },
        {
          path: 'message',
          meta: {
            title: '我的信息'
          },
          component: resolve => require(['@/views/my/Message'], resolve)
        },
        {
          path: 'friend',
          meta: {
            title: '我的好友'
          },
          component: resolve => require(['@/views/my/Friend'], resolve)
        },
        {
          path: 'location',
          meta: {
            title: '收货地址'
          },
          component: resolve => require(['@/views/my/Location'], resolve),
          children: [
            {
              path: 'form',
              meta: {
                title: '收货地址'
              },
              component: resolve => require(['@/views/my/LocationForm'], resolve)
            }
          ]
        },
        {
          path: 'orderbox',   // 我的订单
          meta: {
            title: '我的订单'
          },
          component: resolve => require(['@/views/order/OrderBox'], resolve),
          children: [
            {
              path: 'all',
              name: 'all',
              meta: {
                title: '全部订单'
              },
              components: {   // 命名视图
                main: resolve => require(['@/views/order/All'], resolve)
              }
            },
            {
              path: 'deliver',
              name: 'deliver',
              meta: {
                title: '待发货'
              },
              components: {
                main: resolve => require(['@/views/order/Deliver'], resolve)
              }
            },
            {
              path: 'take',
              name: 'take',
              meta: {
                title: '待收货'
              },
              components: {
                main: resolve => require(['@/views/order/Take'], resolve)
              }
            },
            {
              path: 'remain',
              name: 'remain',
              meta: {
                title: '待评价'
              },
              components: {
                main: resolve => require(['@/views/order/Remain'], resolve)
              }
            },
            {
              path: 'after',
              name: 'after',
              meta: {
                title: '售后'
              },
              components: {
                main: resolve => require(['@/views/order/After'], resolve)
              }
            },
            {
              path: 'return',
              name: 'return',
              meta: {
                title: '退货'
              },
              components: {
                else: resolve => require(['@/views/order/OrderReturn'], resolve)
              },
              children: [
                {
                  path: 'audit',
                  meta: {
                    title: '等待审核'
                  },
                  component: resolve => require(['@/views/state/Audit'], resolve),
                  children: [
                    {
                      path: 'afterdetails',
                      meta: {
                        title: '退货详情'
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
                title: '交易成功'
              },
              components: {
                else: resolve => require(['@/views/state/Succeed'], resolve)
              },
              children: [
                {
                  path: 'evaluate',
                  meta: {
                    title: '评价'
                  },
                  component: resolve => require(['@/views/order/RemainEvaluate'], resolve),
                  children: [
                    {
                      path: 'stateevaluate',
                      meta: {
                        title: '评分完成'
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
