'use client';

import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import 'echarts/lib/chart/map';

import { MapTooltip } from './MapTooltip';
import type { DataItem } from './mock-data';

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

interface InteractiveMapProps {
    traders: DataItem[];
    allTracks: string[];
}

const InteractiveMap = ({ traders, allTracks }: InteractiveMapProps) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const [selectedData, setSelectedData] = useState<DataItem | null>(null);
    const [cardPosition, setCardPosition] = useState<{
        top: number;
        left: number;
    } | null>(null);
    const chartInstance = useRef<echarts.ECharts | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                chartRef.current &&
                !chartRef.current.contains(event.target as Node) &&
                tooltipRef.current &&
                !tooltipRef.current.contains(event.target as Node)
            ) {
                setSelectedData(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const initializeChart = async () => {
            if (!chartRef.current) return;

            try {
                // Initialize chart instance if it doesn't exist
                if (!chartInstance.current) {
                    const response = await fetch(
                        'https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json',
                    );
                    const chinaJson = await response.json();
                    echarts.registerMap('china', chinaJson);

                    const chart = echarts.init(chartRef.current);
                    chartInstance.current = chart;

                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    chart.on('click', (params: any) => {
                        if (
                            params.componentType === 'series' &&
                            params.data?.tooltipData
                        ) {
                            setSelectedData(params.data.tooltipData);

                            const rect = chartRef.current!.getBoundingClientRect();
                            setCardPosition({
                                top: params.event.event.clientY - rect.top + 15,
                                left: params.event.event.clientX - rect.left + 15,
                            });
                        } else {
                            setSelectedData(null);
                        }
                    });

                    const handleResize = () => chart.resize();
                    window.addEventListener('resize', handleResize);
                }

                // Now, set/update the options
                const chart = chartInstance.current;
                const styles = getComputedStyle(chartRef.current!);
                const primaryColorValue = styles.getPropertyValue('--primary').trim();
                const primaryColor = primaryColorValue ? `hsl(${primaryColorValue})` : '#38B2AC'; // Provide a fallback color

                const mapColors = {
                    area: 'hsl(222.2 47.4% 11.2%)', // primary-foreground equivalent
                    border: 'hsl(217.2 32.6% 17.5%)', // border equivalent
                    text: 'hsl(210 40% 98%)', // text equivalent
                    hoverArea: 'hsl(217.2 32.6% 22.5%)',
                };

                const seriesColors = [primaryColor, '#38B2AC', '#805AD5', '#D53F8C', '#ECC94B'];
                const trackColorMap = new Map<string, string>();
                allTracks.forEach((track, index) => {
                    trackColorMap.set(track, seriesColors[index % seriesColors.length] ?? '#38B2AC');
                });

                const series = traders.reduce((acc, trader) => {
                    const coords = geoCoordMap[trader.city];
                    if (!coords) return acc;

                    const primaryTrack = trader.tracks.split('、')[0];
                    const color = trackColorMap.get(primaryTrack ?? '') ?? '#38B2AC'; // Use hardcoded fallback

                    const mappedData = {
                        name: trader.name,
                        value: coords.concat(trader.value),
                        tooltipData: trader,
                    };

                    const visibleSeries = {
                        name: trader.name,
                        type: 'effectScatter' as const,
                        coordinateSystem: 'geo',
                        zlevel: 3,
                        rippleEffect: { brushType: 'stroke' as const },
                        label: { show: false },
                        symbolSize: (val: number[]) => (val && val[2] ? val[2] / 8 : 0),
                        itemStyle: { color },
                        data: [mappedData],
                    };

                    const clickableSeries = {
                        name: `Clickable-${trader.name}`,
                        type: 'scatter' as const,
                        coordinateSystem: 'geo',
                        zlevel: 2,
                        symbolSize: 40,
                        itemStyle: { opacity: 0 },
                        tooltip: { show: false },
                        data: [mappedData],
                    };

                    acc.push(visibleSeries, clickableSeries);
                    return acc;
                }, [] as echarts.SeriesOption[]);

                chart.setOption({
                    tooltip: {
                        trigger: 'item',
                        formatter: '{b}',
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
                            itemStyle: {
                                areaColor: mapColors.hoverArea,
                            },
                            label: {
                                show: true,
                                color: mapColors.text,
                            },
                        },
                        select: {
                            itemStyle: {
                                areaColor: mapColors.hoverArea,
                            },
                            label: {
                                show: true,
                                color: mapColors.text,
                            },
                        }
                    },
                    series,
                }, { notMerge: true });

            } catch (error) {
                console.error('Failed to initialize or update chart:', error);
            }
        };

        initializeChart();

        // Cleanup on component unmount
        return () => {
            if (chartInstance.current) {
                const handleResize = () => chartInstance.current?.resize();
                window.removeEventListener('resize', handleResize);
                chartInstance.current.dispose();
                chartInstance.current = null;
            }
        };
    }, [traders, allTracks]);


    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
            {selectedData && cardPosition && (
                <div
                    ref={tooltipRef}
                    style={{
                        position: 'absolute',
                        top: cardPosition.top,
                        left: cardPosition.left,
                        zIndex: 999,
                    }}
                >
                    <MapTooltip data={selectedData} />
                </div>
            )}
        </div>
    );
};

export default InteractiveMap; 