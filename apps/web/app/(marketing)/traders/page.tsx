import { createI18nServerInstance } from '~/lib/i18n/i18n.server';
import TradersPageClient from './_components/TradersPageClient';
import { BJData, SHData, SZData } from './_components/mock-data';

export async function generateMetadata() {
    const i18n = await createI18nServerInstance();
    const title = i18n.t('marketing:traders');

    return {
        title,
    };
}

const allTraders = [...BJData, ...SHData, ...SZData];

// Get unique provinces and tracks for filter options
const provinces = [...new Set(allTraders.map((trader) => trader.city))];
const tracks = [
    ...new Set(allTraders.flatMap((trader) => trader.tracks.split('、'))),
];

function TradersPage() {
    return (
        <TradersPageClient
            traders={allTraders}
            provinces={provinces}
            tracks={tracks}
        />
    );
}

export default TradersPage; 