import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@kit/ui/badge';
import {
    Card,
    CardDescription,
    CardTitle,
} from '@kit/ui/card';
import { DataItem } from './mock-data';

export function TraderCard({ trader }: { trader: DataItem }) {
    return (
        <Link href={`/traders/${encodeURIComponent(trader.name)}`}>
            <Card className="flex flex-row items-stretch transition-all hover:shadow-lg w-full">
                <div className="relative h-32 w-32 flex-shrink-0">
                    <Image
                        src={trader.image}
                        alt={trader.name}
                        fill
                        className="rounded-l-lg object-cover"
                    />
                </div>
                <div className="flex flex-1 flex-col justify-between p-4">
                    <div>
                        <CardTitle className="mb-2 text-lg">{trader.name}</CardTitle>
                        <CardDescription className="line-clamp-2 text-sm">
                            {trader.description}
                        </CardDescription>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                            {trader.tracks.split('、').map((track) => (
                                <Badge key={track} variant="secondary">
                                    {track}
                                </Badge>
                            ))}
                        </div>
                        <span className="text-sm font-semibold text-primary">
                            查看详情 &rarr;
                        </span>
                    </div>
                </div>
            </Card>
        </Link>
    );
} 