'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@kit/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@kit/ui/card';
import { Client, DataItem } from '../../_components/mock-data';

export function TraderDetails({
    trader,
    onClientHover,
}: {
    trader: DataItem;
    onClientHover: (client: Client | null) => void;
}) {
    return (
        <div className="space-y-6">
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-3xl font-bold">{trader.name}</h1>
                    <div className="mt-2 flex space-x-8 text-sm text-muted-foreground">
                        <div>
                            <span className="font-semibold">擅长赛道:</span> {trader.tracks}
                        </div>
                        <div>
                            <span className="font-semibold">业务地区:</span> {trader.areas}
                        </div>
                    </div>
                </div>
                <Button asChild variant="outline">
                    <Link href="/traders">返回 &gt;&gt;</Link>
                </Button>
            </div>

            <p className="text-muted-foreground">{trader.description}</p>

            <Card>
                <CardHeader>
                    <CardTitle>近期课程</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between rounded-lg bg-muted p-4">
                        <div>
                            <p className="font-semibold">全国装企变现交流会 (武汉)</p>
                            <p className="text-sm text-muted-foreground">6.22 - 6.24</p>
                        </div>
                        <Button>报名</Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>优秀案例</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {[1, 2].map((item) => (
                        <div key={item} className="flex space-x-4">
                            <div className="relative h-24 w-24 flex-shrink-0">
                                <Image
                                    src={trader.image}
                                    alt="案例"
                                    fill
                                    className="rounded-lg object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="font-semibold">账号成就</h3>
                                <p className="text-sm text-muted-foreground">
                                    三段内容，可以根据自己的情况自己填写，写多少是多少，大概差不多几十个字吧
                                </p>
                                <h3 className="mt-2 font-semibold">价值数据</h3>
                                <p className="text-sm text-muted-foreground">
                                    三段内容，可以根据自己的情况自己填写，写多少是多少，大概差不多几十个字吧
                                </p>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>已服务客户</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {trader.clients.map((client) => (
                        <div
                            key={client.name}
                            className="flex cursor-pointer flex-col items-center text-center"
                            onMouseEnter={() => onClientHover(client)}
                            onMouseLeave={() => onClientHover(null)}
                        >
                            <div className="relative h-16 w-16 flex-shrink-0">
                                <Image
                                    src={client.avatar}
                                    alt={client.name}
                                    fill
                                    className="rounded-full object-cover"
                                />
                            </div>
                            <h3 className="mt-2 font-semibold">{client.name}</h3>
                            <p className="text-xs text-muted-foreground">{client.city}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>团队操盘手</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4">
                        <div className="relative h-16 w-16 flex-shrink-0">
                            <Image
                                src={`https://img2.baidu.com/it/u=3906212634,2132778619&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500`}
                                alt="李丽萍"
                                fill
                                className="rounded-full object-cover"
                            />
                        </div>
                        <div>
                            <h3 className="font-semibold">李丽萍</h3>
                            <p className="text-sm text-muted-foreground">
                                一段超级牛逼的介绍
                            </p>
                        </div>
                    </div>
                    <Button className="w-full">申请咨询</Button>
                </CardContent>
            </Card>
        </div>
    );
} 