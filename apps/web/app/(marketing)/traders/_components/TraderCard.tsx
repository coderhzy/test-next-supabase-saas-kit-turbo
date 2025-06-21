import Image from 'next/image';
import Link from 'next/link';

import { Card, CardContent } from '@kit/ui/card';
import { Button } from '@kit/ui/button';

import type { DataItem } from './mock-data';

export function TraderCard({ trader }: { trader: DataItem }) {
    return (
        <Card>
            <CardContent className="flex flex-col space-y-4 p-4 md:flex-row md:space-x-6 md:space-y-0">
                <div className="relative h-40 w-full flex-shrink-0 md:h-32 md:w-32">
                    <Image
                        src={trader.image}
                        alt={trader.name}
                        className="rounded-lg object-cover"
                        fill
                    />
                </div>

                <div className="flex-1">
                    <div className="flex flex-col space-y-1">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">{trader.name}</h3>
                            <p className="text-primary">
                                合作价 ¥ <span className="text-xl font-bold">{trader.price}</span>
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-x-4 pt-1 text-sm">
                            <div>
                                <h4 className="font-medium text-muted-foreground">擅长赛道:</h4>
                                <p>{trader.tracks}</p>
                            </div>
                            <div>
                                <h4 className="font-medium text-muted-foreground">业务地区:</h4>
                                <p>{trader.areas}</p>
                            </div>
                        </div>

                        <p className="pt-2 text-sm text-muted-foreground">
                            {trader.description}
                        </p>
                    </div>
                </div>

                <div className="flex flex-shrink-0 items-end justify-end md:w-32 md:flex-col md:items-center md:justify-center">
                    <Button asChild variant="link">
                        <Link href="#">查看详细信息 &gt;&gt;</Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
} 