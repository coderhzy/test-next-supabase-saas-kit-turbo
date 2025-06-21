export interface DataItem {
  name: string;
  city: string;
  value: number[];
  image: string;
  price: number;
  tracks: string;
  areas: string;
  description: string;
  clients: Client[];
}

export interface Client {
  name: string;
  city: string;
  avatar: string;
  achievements: string;
  valueData: string;
}

export const BJData: DataItem[] = [
  {
    name: '喜爱科技',
    city: '北京',
    value: [200],
    image:
      'https://img2.baidu.com/it/u=3906212634,2132778619&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
    price: 3999,
    tracks: '新媒体、短视频',
    areas: '全国',
    description:
      '北京喜爱科技是一家专注于新媒体内容营销的领先机构，拥有丰富的行业经验和成功案例。',
    clients: [
      {
        name: '客户A',
        city: '北京',
        avatar: 'https://picsum.photos/seed/clientA/150/150',
        achievements: '粉丝从0到10万，只用了3个月。',
        valueData: '通过内容营销，年销售额提升30%。',
      },
      {
        name: '客户B',
        city: '天津',
        avatar: 'https://picsum.photos/seed/clientB/150/150',
        achievements: '打造爆款视频，单条播放量超500万。',
        valueData: '品牌知名度提升，线上咨询量增加120%。',
      },
      {
        name: '客户C',
        city: '石家庄',
        avatar: 'https://picsum.photos/seed/clientC/150/150',
        achievements: '签约达人矩阵，覆盖百万粉丝。',
        valueData: '直播带货单场销售额突破50万。',
      },
    ],
  },
  {
    name: '游戏推广专家',
    city: '成都',
    value: [100],
    image: 'https://wx3.sinaimg.cn/mw690/a1ac48b7ly1hthawuktxwj20m80m87fs.jpg',
    price: 1999,
    tracks: '手游、页游',
    areas: '西南地区',
    description: '专注于游戏领域的推广服务，拥有丰富的渠道资源。',
    clients: [
      {
        name: '游戏客户A',
        city: '重庆',
        avatar: 'https://picsum.photos/seed/gameClientA/150/150',
        achievements: '新游戏上线首月，新增用户50万。',
        valueData: '社区活跃度提升80%，付费转化率提升15%。',
      },
    ],
  },
  {
    name: '风行传媒',
    city: '北京',
    value: [100],
    image:
      'https://miaobi-lite.bj.bcebos.com/miaobi/5mao/b%276Jyh56yU5bCP5paw5oOF5L6j5aS05YOPXzE3Mjg5NDgyODguMjQ1MjcyMg%3D%3D%27/0.png',
    price: 1999,
    tracks: '新媒体、短视频',
    areas: '全国',
    description: '风行传媒，您值得信赖的品牌增长伙伴。',
    clients: [
      {
        name: '客户D',
        city: '太原',
        avatar: 'https://picsum.photos/seed/clientD/150/150',
        achievements: '地方品牌走向全国，实现线上销售。',
        valueData: '3个月内完成年度销售KPI。',
      },
      {
        name: '客户E',
        city: '保定',
        avatar: 'https://picsum.photos/seed/clientE/150/150',
        achievements: '传统企业数字化转型成功案例。',
        valueData: '线上渠道销售占比从10%提升至40%。',
      },
    ],
  },
];

export const SHData: DataItem[] = [
  {
    name: '猛男团',
    city: '上海',
    value: [180],
    image:
      'https://img2.baidu.com/it/u=3906212634,2132778619&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
    price: 4999,
    tracks: '直播电商、品牌孵化',
    areas: '华东地区',
    description: '从0到1打造品牌，提供全方位电商直播解决方案。',
    clients: [
      {
        name: '客户F',
        city: '上海',
        avatar: 'https://picsum.photos/seed/clientF/150/150',
        achievements: '高端品牌形象树立，精准吸引目标客户。',
        valueData: '客单价提升50%，复购率提升25%。',
      },
      {
        name: '客户G',
        city: '杭州',
        avatar: 'https://picsum.photos/seed/clientG/150/150',
        achievements: '网红店铺打造，成为行业标杆。',
        valueData: '月均销售额稳定在百万级别。',
      },
      {
        name: '客户H',
        city: '苏州',
        avatar: 'https://picsum.photos/seed/clientH/150/150',
        achievements: '新品上市即引爆，迅速占领市场。',
        valueData: '新品首发日销售量10万+。',
      },
      {
        name: '客户I',
        city: '南京',
        avatar: 'https://picsum.photos/seed/clientI/150/150',
        achievements: '内容电商模式探索，实现品效合一。',
        valueData: '内容转化率行业领先，达到8%。',
      },
    ],
  },
  {
    name: '杭派女装',
    city: '杭州',
    value: [120],
    image: 'https://wx3.sinaimg.cn/mw690/a1ac48b7ly1hthawuktxwj20m80m87fs.jpg',
    price: 2999,
    tracks: '服装、美妆',
    areas: '江浙沪',
    description: '深耕女装供应链，提供高质量的直播带货服务。',
    clients: [
      {
        name: '女装客户A',
        city: '温州',
        avatar: 'https://picsum.photos/seed/clothingClientA/150/150',
        achievements: '打造设计师品牌，实现品牌溢价。',
        valueData: '服装单品平均售价提升60%。',
      },
    ],
  },
];

export const SZData: DataItem[] = [
  {
    name: '华南电商联盟',
    city: '深圳',
    value: [190],
    image:
      'https://miaobi-lite.bj.bcebos.com/miaobi/5mao/b%276Jyh56yU5bCP5paw5oOF5L6j5aS05YOPXzE3Mjg5NDgyODguMjQ1MjcyMg%3D%3D%27/0.png',
    price: 5999,
    tracks: '3C数码、智能家居',
    areas: '珠三角',
    description: '专注于3C数码产品，提供专业的推广和销售策略。',
    clients: [
      {
        name: '客户J',
        city: '深圳',
        avatar: 'https://picsum.photos/seed/clientJ/150/150',
        achievements: '科技产品出海，成功打入北美市场。',
        valueData: '海外销售额年增长200%。',
      },
      {
        name: '客户K',
        city: '广州',
        avatar: 'https://picsum.photos/seed/clientK/150/150',
        achievements: '众筹项目成功，超额完成目标300%。',
        valueData: '项目获得百万级投资。',
      },
      {
        name: '客户L',
        city: '东莞',
        avatar: 'https://picsum.photos/seed/clientL/150/150',
        achievements: '传统制造工厂转型，打造自主品牌。',
        valueData: '品牌价值估值过亿。',
      },
    ],
  },
  {
    name: '广府风物',
    city: '广州',
    value: [150],
    image:
      'https://img2.baidu.com/it/u=3906212634,2132778619&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
    price: 2599,
    tracks: '食品、地方特产',
    areas: '华南地区',
    description: '挖掘地方特色，打造爆款农产品和食品品牌。',
    clients: [
      {
        name: '食品客户A',
        city: '佛山',
        avatar: 'https://picsum.photos/seed/foodClientA/150/150',
        achievements: '地方特产成为网红爆款，销量增长10倍。',
        valueData: '单品月销100万+。',
      },
    ],
  },
];
