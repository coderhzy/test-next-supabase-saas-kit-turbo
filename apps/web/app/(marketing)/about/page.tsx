import { PageBody, PageHeader } from '@kit/ui/page';

import { createI18nServerInstance } from '~/lib/i18n/i18n.server';
import { withI18n } from '~/lib/i18n/with-i18n';

export async function generateMetadata() {
    const i18n = await createI18nServerInstance();
    const title = i18n.t('marketing:about');

    return {
        title,
    };
}

function AboutPage() {
    return (
        <div className={'flex flex-col items-center space-y-8 text-center'}>
            <PageHeader
                title={'关于我们'}
                description={'这里是关于我们的介绍'}
            />

            <PageBody>
                <div>
                    {/* Content for about page */}
                    <p>此页面正在建设中。</p>
                </div>
            </PageBody>
        </div>
    );
}

export default withI18n(AboutPage); 