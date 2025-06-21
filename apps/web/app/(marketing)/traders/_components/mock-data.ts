export interface DataItem {
  name: string;
  city: string;
  value: number[];
  image: string;
  price: number;
  tracks: string;
  areas: string;
  description: string;
}

export const BJData: DataItem[] = [
  {
    name: '喜爱科技',
    city: '北京',
    value: [200],
    image: '/test.png',
    price: 3999,
    tracks: '新媒体、短视频',
    areas: '全国',
    description:
      '一些基础的介绍，可以根据自己的选择自己填写，写多少是多少，大概差不多额200-300字吧',
  },
  {
    name: '游戏推广专家',
    city: '成都',
    value: [100],
    image: '/test.png',
    price: 1999,
    tracks: '手游、页游',
    areas: '西南地区',
    description: '专注于游戏领域的推广服务，拥有丰富的渠道资源。',
  },
];

export const SHData: DataItem[] = [
  {
    name: '猛男团',
    city: '上海',
    value: [180],
    image: '/test.png',
    price: 4999,
    tracks: '直播电商、品牌孵化',
    areas: '华东地区',
    description: '从0到1打造品牌，提供全方位电商直播解决方案。',
  },
  {
    name: '杭派女装',
    city: '杭州',
    value: [120],
    image: '/test.png',
    price: 2999,
    tracks: '服装、美妆',
    areas: '江浙沪',
    description: '深耕女装供应链，提供高质量的直播带货服务。',
  },
];

export const SZData: DataItem[] = [
  {
    name: '华南电商联盟',
    city: '深圳',
    value: [190],
    image: '/test.png',
    price: 5999,
    tracks: '3C数码、智能家居',
    areas: '珠三角',
    description: '专注于3C数码产品，提供专业的推广和销售策略。',
  },
  {
    name: '广府风物',
    city: '广州',
    value: [150],
    image: '/test.png',
    price: 2599,
    tracks: '食品、地方特产',
    areas: '华南地区',
    description: '挖掘地方特色，打造爆款农产品和食品品牌。',
  },
];
