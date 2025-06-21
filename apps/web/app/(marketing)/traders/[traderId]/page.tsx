import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
    BJData,
    SHData,
    SZData,
} from '../_components/mock-data';
import { TraderClientView } from './_components/TraderClientView';

const allTraders = [...BJData, ...SHData, ...SZData];

async function getTrader(traderId: string) {
    return allTraders.find((item) => encodeURIComponent(item.name) === traderId);
}

export async function generateStaticParams() {
    return allTraders.map((trader) => ({
        traderId: encodeURIComponent(trader.name),
    }));
}

type TraderPageProps = {
    params: {
        traderId: string;
    };
};

export default async function TraderPage({
    params: paramsPromise,
}: {
    params: Promise<TraderPageProps['params']>;
}) {
    const { traderId } = await paramsPromise;
    const trader = await getTrader(traderId);

    if (!trader) {
        notFound();
    }

    return (
        <div>
            <div className="mb-4 text-sm text-muted-foreground">
                <Link href="/traders" className="hover:underline">
                    操盘手地图
                </Link>
                <span className="mx-2">&gt;</span>
                <span>{trader.name}</span>
            </div>

            <TraderClientView trader={trader} />
        </div>
    );
} 