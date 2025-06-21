import Image from 'next/image';
import { Card, CardContent } from '@kit/ui/card';

import { Client } from '../../_components/mock-data';

export function ClientInfoCard({ client }: { client: Client }) {
    return (
        <Card className="w-full max-w-2xl">
            <CardContent className="flex flex-col p-6 sm:flex-row">
                <div className="mb-4 w-full flex-shrink-0 sm:mb-0 sm:mr-6 sm:w-1/3">
                    <div className="relative aspect-[3/4] w-full">
                        <Image
                            src={`https://picsum.photos/seed/${client.name}/300/400`}
                            alt={client.name}
                            fill
                            className="rounded-lg object-cover"
                        />
                    </div>
                </div>
                <div className="flex-grow space-y-4">
                    <div>
                        <h3 className="text-lg font-semibold text-primary">账号成就</h3>
                        <p className="text-sm text-muted-foreground">
                            {client.achievements}
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-primary">价值数据</h3>
                        <p className="text-sm text-muted-foreground">{client.valueData}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
} 