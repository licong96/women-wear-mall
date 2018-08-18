import jsonp from '@/common/js/jsonp'

/**
 * 首页轮播图数据，蘑菇街
 */
export function getSlide() {
  const url = 'https://mce.mogucdn.com/jsonp/multiget/3'

  const data = {
    appPlat: 'm',
    pids: '122207',
    _: new Date().getTime(),
  }
  return jsonp(url, data)
}

/**
 * 获取推荐列表数据
 * @params { String } page 页数
 */
export function getList(page = 1) {
  const url = 'https://list.mogujie.com/search'

  const data = {
    page,
    pageSize: 24,
    sort: 'pop',
    ratio: '3:4',
    cKey: 'shouq-wall-v1',
    minPrice: '0',
    maxPrice: '999',
    fcid: '20002631',
    mlf: 'qmall',
    _: new Date().getTime(),
  }

  return jsonp(url, data, 'jsonp' + page)     // 累加
}

/**
 * 获取分类
 */
export function getClassify() {
  const url = 'https://mce.mogucdn.com/jsonp/get/3?pid=3627&appPlat=m&_=1534410999965'

  const data = {}

  return jsonp(url, data, 'jsonp')     // 累加
}

/**
 * 根据分类获取二级分类
 * @params { String } q 搜索内容
 */
export function search(q) {
  const url = 'https://list.mogujie.com/search'

  const data = {
    q,
    ratio: '3:4',
    _version: '8253',
    cKey: '46',
    pid: '9750',
    sort: 'pop',
    page: '1',
    _: new Date().getTime(),
  }

  return jsonp(url, data, 'jsonp1')     // 累加
}
