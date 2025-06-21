'use client';

import { useState, useMemo, useEffect } from 'react';
import { Search } from 'lucide-react';

import { Card } from '@kit/ui/card';
import { Input } from '@kit/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@kit/ui/select';
import { ScrollArea } from '@kit/ui/scroll-area';

import InteractiveMap from './InteractiveMap';
import { DataItem } from './mock-data';
import { TraderCard } from './TraderCard';

interface TradersPageClientProps {
    traders: DataItem[];
    provinces: string[];
    tracks: string[];
}

function TradersPageClient({
    traders,
    provinces,
    tracks,
}: TradersPageClientProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProvince, setSelectedProvince] = useState<string | 'all'>('all');
    const [selectedTrack, setSelectedTrack] = useState<string | 'all'>('all');
    const [hoveredTrader, setHoveredTrader] = useState<DataItem | null>(null);

    // Debounced filter values
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
    const [debouncedSelectedProvince, setDebouncedSelectedProvince] = useState(selectedProvince);
    const [debouncedSelectedTrack, setDebouncedSelectedTrack] = useState(selectedTrack);

    // Effect to debounce filter changes
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
            setDebouncedSelectedProvince(selectedProvince);
            setDebouncedSelectedTrack(selectedTrack);
        }, 500); // 500ms delay

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm, selectedProvince, selectedTrack]);

    const filteredTraders = useMemo(() => {
        return traders.filter((trader) => {
            const searchMatch =
                trader.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                trader.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
            const provinceMatch =
                debouncedSelectedProvince === 'all' || trader.city === debouncedSelectedProvince;
            const trackMatch =
                debouncedSelectedTrack === 'all' || trader.tracks.includes(debouncedSelectedTrack);

            return searchMatch && provinceMatch && trackMatch;
        });
    }, [
        debouncedSearchTerm,
        debouncedSelectedProvince,
        debouncedSelectedTrack,
        traders,
    ]);

    return (
        <div className="flex flex-1 flex-col lg:flex-row lg:space-x-8">
            {/* Left side: Map */}
            <div className="w-full lg:w-1/2">
                <div className="sticky top-4 h-[calc(100vh-10rem)] rounded-lg bg-muted">
                    <InteractiveMap
                        traders={filteredTraders}
                        allTracks={tracks}
                        hoveredTrader={hoveredTrader}
                    />
                </div>
            </div>

            {/* Right side: Filters and List */}
            <div className="mt-8 w-full lg:mt-0 lg:w-1/2">
                {/* Filters */}
                <Card className="p-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="relative sm:col-span-1">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="搜索服务商名称..."
                                className="pl-10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Select
                            value={selectedProvince}
                            onValueChange={(value) => setSelectedProvince(value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="全国省份" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">全国省份</SelectItem>
                                {provinces.map((province) => (
                                    <SelectItem key={province} value={province}>
                                        {province}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select
                            value={selectedTrack}
                            onValueChange={(value) => setSelectedTrack(value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="承接赛道" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">所有赛道</SelectItem>
                                {tracks.map((track) => (
                                    <SelectItem key={track} value={track}>
                                        {track}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </Card>

                {/* List */}
                <ScrollArea className="mt-4 h-[calc(100vh-16rem)]">
                    <div className="space-y-4 pr-4">
                        {filteredTraders.length > 0 ? (
                            filteredTraders.map((trader) => (
                                <div
                                    key={trader.name}
                                    onMouseEnter={() => setHoveredTrader(trader)}
                                    onMouseLeave={() => setHoveredTrader(null)}
                                >
                                    <TraderCard trader={trader} />
                                </div>
                            ))
                        ) : (
                            <div className="flex h-40 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                                <p>未找到符合条件的服务商</p>
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
}

export default TradersPageClient;
