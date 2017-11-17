import jsonp from '@/common/js/jsonp'

export function getListClassify(fcid, acm = '') {
  const url = 'https://list.mogujie.com/search'

  const data = {
    fcid: fcid,
    acm: acm,
    _version: '61',
    ratio: '3:4',
    ad: '0',
    _mgjuuid: 'a1e321ab-2083-4160-bab7-751ed494f4cd',
    sort: 'pop',
    ptp: 'm1._mf1_1239_4537._keyword_51836.0.dhO7vje',
    cKey: '16',
    width: '330',
    action: 'shopping',
    page: '1',
    height: '440',
    _: '1510889677647'
  }

  return jsonp(url, data, 'jsonp1')     // 累加
}
