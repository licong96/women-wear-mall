import Mock from 'mockjs'

var Random = Mock.Random

Mock.mock('/api/list', {  // 首页列表数据
  'sliderImg|3-4': [  // 轮播图
    {
      'src': 'http://image1.suning.cn/uimg/cms/img/150885774582734168.jpg',
      'id|+1': 0
    }
  ],
  'screens': [  // 筛选
    {
      'text': '全部',
      'id': 0
    },
    {
      'text': '上衣',
      'id': 1
    },
    {
      'text': '裤子',
      'id': 2
    },
    {
      'text': '裙子',
      'id': 3
    },
    {
      'text': '鞋子',
      'id': 4
    }
  ],
  'commodity|20-30': [
    {
      'src': 'https://s2.mogucdn.com/mlcdn/c45406/171019_45i2j10h7e27554a5hi1d942i63ll_640x960.jpg',
      'id|+1': 0
    }
  ]
})
Mock.mock('/api/listDetail', {  // 详细页数据
  'swiper|3-4': [  // 轮播图
    {
      'src': 'https://s2.mogucdn.com/mlcdn/c45406/171019_45i2j10h7e27554a5hi1d942i63ll_640x960.jpg',
      'id|+1': 0
    }
  ],
  'parameterData|10-12': [
    {
      'title': Random.cword(2, 3),
      'desc': Random.cword(3, 5)
    }
  ],
  'particularsData|4-5': [
    {
      'src': 'http://gw.alicdn.com/imgextra/i1/50454948/TB2EptuaHT8F1Jjy0FgXXX3fpXa_!!50454948.jpg_970x970q50s150.jpg'
    }
  ],
  'commentData': [
    {
      'username': '张三',
      'userportrait': 'https://img30.360buyimg.com/mobile/s60x60_jfs/t493/15/557644423/10532/62d3112/5473e62aNdb4251d8.png',
      'times': '2017-10-31',
      'start': '5',
      'content': '我特意买大一码，看评论说会缩水，关注左很久了，太贵一直没下手，挺舒服的，也很漂亮，是我喜欢的款式',
      'minisrc': [
        {
          'src': 'http://img.alicdn.com/imgextra/i1/0/TB2Sr08kPoIL1JjSZFyXXbFBpXa_!!0-rate.jpg'
        },
        {
          'src': 'http://img.alicdn.com/imgextra/i1/0/TB2Sr08kPoIL1JjSZFyXXbFBpXa_!!0-rate.jpg'
        },
        {
          'src': 'http://img.alicdn.com/imgextra/i1/0/TB2Sr08kPoIL1JjSZFyXXbFBpXa_!!0-rate.jpg'
        }
      ]
    },
    {
      'username': '李四',
      'userportrait': 'https://img30.360buyimg.com/mobile/s60x60_jfs/t493/15/557644423/10532/62d3112/5473e62aNdb4251d8.png',
      'times': '2017-10-31',
      'start': '4',
      'content': '我特意买大一码，看评论说会缩水，关注左很久了，太贵一直没下手，挺舒服的，也很漂亮，是我喜欢的款式',
      'minisrc': [
        {
          'src': 'http://img.alicdn.com/imgextra/i1/0/TB2Sr08kPoIL1JjSZFyXXbFBpXa_!!0-rate.jpg'
        },
        {
          'src': 'http://img.alicdn.com/imgextra/i1/0/TB2Sr08kPoIL1JjSZFyXXbFBpXa_!!0-rate.jpg'
        },
        {
          'src': 'http://img.alicdn.com/imgextra/i1/0/TB2Sr08kPoIL1JjSZFyXXbFBpXa_!!0-rate.jpg'
        },
        {
          'src': 'http://img.alicdn.com/imgextra/i1/0/TB2Sr08kPoIL1JjSZFyXXbFBpXa_!!0-rate.jpg'
        }
      ]
    },
    {
      'username': '王五',
      'userportrait': 'https://img30.360buyimg.com/mobile/s60x60_jfs/t493/15/557644423/10532/62d3112/5473e62aNdb4251d8.png',
      'times': '2017-10-31',
      'start': '3',
      'content': '我特意买大一码，看评论说会缩水，关注左很久了，太贵一直没下手，挺舒服的，也很漂亮，是我喜欢的款式',
      'minisrc': [
        {
          'src': 'http://img.alicdn.com/imgextra/i1/0/TB2Sr08kPoIL1JjSZFyXXbFBpXa_!!0-rate.jpg'
        },
        {
          'src': 'http://img.alicdn.com/imgextra/i1/0/TB2Sr08kPoIL1JjSZFyXXbFBpXa_!!0-rate.jpg'
        }
      ]
    }
  ]
})
