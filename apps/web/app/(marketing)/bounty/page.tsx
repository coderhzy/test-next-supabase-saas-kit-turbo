import { PageBody, PageHeader } from '@kit/ui/page';

import { createI18nServerInstance } from '~/lib/i18n/i18n.server';
import { withI18n } from '~/lib/i18n/with-i18n';

export async function generateMetadata() {
    const i18n = await createI18nServerInstance();
    const title = i18n.t('marketing:bounty');

    return {
        title,
    };
}

function BountyPage() {
    return (
        <div className={'flex flex-col items-center space-y-8 text-center'}>
            <PageHeader
                title={'悬赏榜'}
                description={'这里是悬赏任务列表'}
            />

            <PageBody>
                <div>
                    {/* Content for bounty page */}
                    <p>此页面正在建设中。</p>
                </div>
            </PageBody>
        </div>
    );
}

export default withI18n(BountyPage); 