import jsonp from '@/common/js/jsonp'

// jsonp第三个参数是 callback

// 首页轮播图数据，蘑菇街
export function getHome() {
  const url = 'https://mce.mogucdn.com/jsonp/multiget/3'

  const data = {
    appPlat: 'm',
    pids: '51822,51836'
    // callback: jsonp51822
  }
  return jsonp(url, data)
}

export function getList() {
  const url = 'https://list.mogujie.com/search'

  const data = {
    cKey: 'h5-shopping',
    pid: '9750',
    sort: 'pop',
    page: '1',
    _version: '61',
    _: '1510880618982'
  }

  return jsonp(url, data, 'jsonp1')     // 累加
}

// 首页列表数据，天猫
// export function getList(pageNo) {
//   const url = 'https://ald.taobao.com/recommend.htm'
//
//   const data = {
//     cache: +new Date(),     // 时间戳
//     appId: '03309',
//     pageNo: pageNo,
//     pageSize: '20',
//     catId: 'catlevel1_16',
//     typeId: 'nvzhuang',
//     auctionTag: '41666',
//     name: '全部'
//   }
//
//   return jsonp(url, data, 'jsonp')
// }
