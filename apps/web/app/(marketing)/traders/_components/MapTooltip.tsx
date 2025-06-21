import React from 'react';
import Image from 'next/image';

import { Button } from '@kit/ui/button';

interface MapTooltipProps {
    data: {
        name: string;
        image: string;
        price: number;
        tracks: string;
        areas: string;
        description: string;
    };
}

export const MapTooltip: React.FC<MapTooltipProps> = ({ data }) => {
    const { name, image, price, tracks, areas, description } = data;

    return (
        <div className="flex w-80 flex-col space-y-2 rounded-lg border bg-popover p-4 text-sm text-popover-foreground shadow-lg">
            <div className="relative h-40 w-full overflow-hidden rounded-md">
                <Image src={image} alt={name} layout="fill" objectFit="cover" />
            </div>

            <div className="flex items-center justify-between font-semibold">
                <h3 className="text-base">{name}</h3>
                <p className="text-primary">
                    合作价 ¥ <span className="text-lg font-bold">{price}</span>
                </p>
            </div>

            <div className="grid grid-cols-2 gap-x-4 border-t border-border pt-2 text-xs">
                <div>
                    <h4 className="font-semibold">擅长赛道:</h4>
                    <p className="text-muted-foreground">{tracks}</p>
                </div>
                <div>
                    <h4 className="font-semibold">业务地区:</h4>
                    <p className="text-muted-foreground">{areas}</p>
                </div>
            </div>

            <p className="text-xs text-muted-foreground">{description}</p>

            <div className="flex justify-end pt-1">
                <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                    查看详细信息 &gt;&gt;
                </Button>
            </div>
        </div>
    );
}; 