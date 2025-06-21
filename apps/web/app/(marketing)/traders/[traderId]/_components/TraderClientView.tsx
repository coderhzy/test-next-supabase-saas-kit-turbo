'use client';

import { useState } from 'react';
import { Client, DataItem } from '../../_components/mock-data';
import ClientMap from './ClientMap';
import { TraderDetails } from './TraderDetails';

export function TraderClientView({ trader }: { trader: DataItem }) {
    const [activeClient, setActiveClient] = useState<Client | null>(null);

    return (
        <div className="flex flex-1 flex-col lg:flex-row lg:space-x-8">
            <div className="w-full lg:w-1/2">
                <div className="sticky top-4 h-[calc(100vh-12rem)] rounded-lg bg-muted">
                    <ClientMap
                        clients={trader.clients}
                        activeClient={activeClient}
                        setActiveClient={setActiveClient}
                    />
                </div>
            </div>
            <div className="mt-8 w-full lg:mt-0 lg:w-1/2">
                <TraderDetails
                    trader={trader}
                    onClientHover={setActiveClient}
                />
            </div>
        </div>
    );
} 