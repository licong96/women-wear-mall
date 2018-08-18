import jsonp from '@/common/js/jsonp'

export function getListClassify(page = 1, fcid = 0, acm = '') {
  const url = 'https://list.mogujie.com/search'

  const data = {
    page,
    fcid,
    acm,
    _: new Date().getTime(),
  }

  return jsonp(url, data, 'jsonp1')     // 累加
}
