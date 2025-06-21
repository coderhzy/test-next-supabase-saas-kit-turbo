'use client';

import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import 'echarts/lib/chart/map';
import type { SeriesOption } from 'echarts';

import { Client } from '../../_components/mock-data';
import { ClientInfoCard } from './ClientInfoCard';

interface EChartsTooltipParams
    extends echarts.DefaultLabelFormatterCallbackParams {
    data: {
        name: string;
        value: number[];
        avatar: string;
        clientData: Client;
    };
}

const geoCoordMap: Record<string, number[]> = {
    上海: [121.4648, 31.2891],
    东莞: [113.8953, 22.901],
    东营: [118.7073, 37.5513],
    中山: [113.4229, 22.478],
    临汾: [111.4783, 36.1615],
    临沂: [118.3118, 35.2936],
    丹东: [124.541, 40.4242],
    丽水: [119.5642, 28.1854],
    乌鲁木齐: [87.9236, 43.5883],
    佛山: [112.8955, 23.1097],
    保定: [115.0488, 39.0948],
    兰州: [103.5901, 36.3043],
    包头: [110.3467, 41.4899],
    北京: [116.4551, 40.2539],
    北海: [109.314, 21.6211],
    南京: [118.8062, 31.9208],
    南宁: [108.479, 23.1152],
    南昌: [116.0046, 28.6633],
    南通: [121.1023, 32.1625],
    厦门: [118.1689, 24.6478],
    台州: [121.1353, 28.6688],
    合肥: [117.29, 32.0581],
    呼和浩特: [111.4124, 40.4901],
    咸阳: [108.4131, 34.8706],
    哈尔滨: [127.9688, 45.368],
    唐山: [118.4766, 39.6826],
    嘉兴: [120.9155, 30.6354],
    大同: [113.7854, 39.8035],
    大连: [122.2229, 39.4409],
    天津: [117.4219, 39.4189],
    太原: [112.3352, 37.9413],
    威海: [121.9482, 37.1393],
    宁波: [121.5967, 29.6466],
    宝鸡: [107.1826, 34.3433],
    宿迁: [118.5535, 33.7775],
    常州: [119.4543, 31.5582],
    广州: [113.5107, 23.2196],
    廊坊: [116.521, 39.0509],
    延安: [109.1052, 36.4252],
    张家口: [115.1477, 40.8527],
    徐州: [117.5208, 34.3268],
    德州: [116.6858, 37.2107],
    惠州: [114.6204, 23.1647],
    成都: [103.9526, 30.7617],
    扬州: [119.4653, 32.8162],
    承德: [117.5757, 41.4075],
    拉萨: [91.1865, 30.1465],
    无锡: [120.3442, 31.5527],
    日照: [119.2786, 35.5023],
    昆明: [102.9199, 25.4663],
    杭州: [119.5313, 29.8773],
    枣庄: [117.323, 34.8926],
    柳州: [109.3799, 24.9774],
    株洲: [113.5327, 27.0319],
    武汉: [114.3896, 30.6628],
    汕头: [117.1692, 23.3405],
    江门: [112.6318, 22.1484],
    沈阳: [123.1238, 42.1216],
    沧州: [116.8286, 38.2104],
    河源: [114.917, 23.9722],
    泉州: [118.3228, 25.1147],
    泰安: [117.0264, 36.0516],
    泰州: [120.0586, 32.5525],
    济南: [117.1582, 36.8701],
    济宁: [116.8286, 35.3375],
    海口: [110.3893, 19.8516],
    淄博: [118.0371, 36.6064],
    淮安: [118.927, 33.4039],
    深圳: [114.5435, 22.5439],
    清远: [112.9175, 24.3292],
    温州: [120.498, 27.8119],
    渭南: [109.7864, 35.0299],
    湖州: [119.8608, 30.7782],
    湘潭: [112.5439, 27.7075],
    滨州: [117.8174, 37.4963],
    潍坊: [119.0918, 36.524],
    烟台: [120.7397, 37.5128],
    玉溪: [101.9312, 23.8898],
    珠海: [113.7305, 22.1155],
    盐城: [120.2234, 33.5577],
    盘锦: [121.9482, 41.0449],
    石家庄: [114.4995, 38.1006],
    福州: [119.4543, 25.9222],
    秦皇岛: [119.2126, 40.0232],
    绍兴: [120.564, 29.7565],
    聊城: [115.9167, 36.4032],
    肇庆: [112.1265, 23.5822],
    舟山: [122.2559, 30.2234],
    苏州: [120.6519, 31.3989],
    莱芜: [117.6526, 36.2714],
    菏泽: [115.6201, 35.2057],
    营口: [122.4316, 40.4297],
    葫芦岛: [120.1575, 40.578],
    衡水: [115.8838, 37.7161],
    衢州: [118.6853, 28.8666],
    西宁: [101.4038, 36.8207],
    西安: [109.1162, 34.2004],
    贵阳: [106.6992, 26.7682],
    连云港: [119.1248, 34.552],
    邢台: [114.8071, 37.2821],
    邯郸: [114.4775, 36.535],
    郑州: [113.4668, 34.6234],
    鄂尔多斯: [108.9734, 39.2487],
    重庆: [107.7539, 30.1904],
    金华: [120.0037, 29.1028],
    铜川: [109.0393, 35.1947],
    银川: [106.3586, 38.1775],
    镇江: [119.4763, 31.9702],
    长春: [125.8154, 44.2584],
    长沙: [113.0823, 28.2568],
    长治: [112.8625, 36.4746],
    阳泉: [113.4778, 38.0951],
    青岛: [120.4651, 36.3373],
    韶关: [113.7964, 24.7028],
};

interface ClientMapProps {
    clients: Client[];
    activeClient: Client | null;
    setActiveClient: (client: Client | null) => void;
}

const ClientMap = ({ clients, activeClient, setActiveClient }: ClientMapProps) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const chartInstance = useRef<echarts.ECharts | null>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const [cardPosition, setCardPosition] = useState<{
        top: number;
        left: number;
    } | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                chartRef.current &&
                !chartRef.current.contains(event.target as Node) &&
                tooltipRef.current &&
                !tooltipRef.current.contains(event.target as Node)
            ) {
                setActiveClient(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setActiveClient]);

    useEffect(() => {
        if (activeClient && chartInstance.current) {
            const coords = geoCoordMap[activeClient.city];
            if (coords) {
                const pixelCoords = chartInstance.current.convertToPixel('geo', coords);
                setCardPosition({
                    top: pixelCoords[1] + 15,
                    left: pixelCoords[0] + 15,
                });
            }
        } else {
            setCardPosition(null);
        }
    }, [activeClient]);

    useEffect(() => {
        const initializeChart = async () => {
            if (!chartRef.current) return;

            try {
                let chart: echarts.ECharts;

                if (!chartInstance.current) {
                    const response = await fetch(
                        'https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json',
                    );
                    const chinaJson = await response.json();
                    echarts.registerMap('china', chinaJson);
                    chart = echarts.init(chartRef.current);
                    chartInstance.current = chart;

                    chart.on('click', (params) => {
                        if (
                            params.componentType === 'series' &&
                            params.seriesType === 'scatter'
                        ) {
                            const clientData = (params.data as EChartsTooltipParams['data'])
                                .clientData;
                            if (clientData) {
                                setActiveClient(clientData);
                            }
                        } else {
                            setActiveClient(null);
                        }
                    });

                    window.addEventListener('resize', () => chart.resize());
                } else {
                    chart = chartInstance.current;
                }

                const mapColors = {
                    area: 'hsl(222.2 47.4% 11.2%)',
                    border: 'hsl(217.2 32.6% 17.5%)',
                    text: 'hsl(210 40% 98%)',
                    hoverArea: 'hsl(217.2 32.6% 22.5%)',
                };

                const processedClients = await Promise.all(
                    clients.map(
                        (client) =>
                            new Promise<{
                                name: string;
                                city: string;
                                avatar: string;
                                circularAvatar: string;
                                clientData: Client;
                            }>((resolve) => {
                                const img = new Image();
                                img.crossOrigin = 'Anonymous';
                                img.src = client.avatar;
                                img.onload = () => {
                                    const canvas = document.createElement('canvas');
                                    const ctx = canvas.getContext('2d')!;
                                    const size = 64;
                                    canvas.width = size;
                                    canvas.height = size;
                                    ctx.beginPath();
                                    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
                                    ctx.closePath();
                                    ctx.clip();
                                    ctx.drawImage(img, 0, 0, size, size);
                                    resolve({
                                        ...client,
                                        circularAvatar: canvas.toDataURL(),
                                        clientData: client,
                                    });
                                };
                                img.onerror = () => {
                                    resolve({
                                        ...client,
                                        circularAvatar: '',
                                        clientData: client,
                                    });
                                };
                            }),
                    ),
                );

                const series = processedClients.reduce((acc, client) => {
                    const coords = geoCoordMap[client.city];
                    if (!coords || !client.circularAvatar) return acc;

                    const clientSeries = {
                        name: client.name,
                        type: 'scatter' as const,
                        coordinateSystem: 'geo',
                        zlevel: 3,
                        symbol: `image://${client.circularAvatar}`,
                        symbolSize: 30,
                        label: { show: false },
                        data: [
                            {
                                name: client.name,
                                value: coords,
                                avatar: client.circularAvatar,
                                clientData: client.clientData,
                            },
                        ],
                    };

                    acc.push(clientSeries);
                    return acc;
                }, [] as SeriesOption[]);

                chart.setOption(
                    {
                        tooltip: {
                            trigger: 'item',
                            formatter: (
                                params: echarts.DefaultLabelFormatterCallbackParams,
                            ) => {
                                const { name, data } = params as EChartsTooltipParams;
                                return `<div class="flex items-center space-x-2 p-1">
                  <img src="${data.avatar}" class="h-8 w-8 rounded-full" />
                  <span class="font-semibold">${name}</span>
                </div>`;
                            },
                        },
                        geo: {
                            map: 'china',
                            roam: true,
                            layoutCenter: ['50%', '50%'],
                            layoutSize: '100%',
                            itemStyle: {
                                areaColor: mapColors.area,
                                borderColor: mapColors.border,
                            },
                            emphasis: {
                                itemStyle: { areaColor: mapColors.hoverArea },
                                label: { show: true, color: mapColors.text },
                            },
                        },
                        series,
                    },
                    { notMerge: true },
                );
            } catch (error) {
                console.error('Failed to initialize or update chart:', error);
            }
        };

        initializeChart();

        return () => {
            if (chartInstance.current) {
                window.removeEventListener('resize', () =>
                    chartInstance.current?.resize(),
                );
                chartInstance.current.dispose();
                chartInstance.current = null;
            }
        };
    }, [clients, setActiveClient]);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
            {activeClient && cardPosition && (
                <div
                    ref={tooltipRef}
                    style={{
                        position: 'absolute',
                        top: cardPosition.top,
                        left: cardPosition.left,
                        zIndex: 999,
                    }}
                >
                    <ClientInfoCard client={activeClient} />
                </div>
            )}
        </div>
    );
};

export default ClientMap;