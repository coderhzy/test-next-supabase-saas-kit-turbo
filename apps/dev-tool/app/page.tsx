import { EnvMode } from '@/app/variables/lib/types';
import { EnvModeSelector } from '@/components/env-mode-selector';
import { ServiceCard } from '@/components/status-tile';

import { Page, PageBody, PageHeader } from '@kit/ui/page';

import { createConnectivityService } from './lib/connectivity-service';

type DashboardPageProps = React.PropsWithChildren<{
  searchParams: Promise<{ mode?: EnvMode }>;
}>;

export default async function DashboardPage(props: DashboardPageProps) {
  const mode = (await props.searchParams).mode ?? 'development';
  const connectivityService = createConnectivityService(mode);

  const [supabaseStatus, supabaseAdminStatus] = await Promise.all([
    connectivityService.checkSupabaseConnectivity(),
    connectivityService.checkSupabaseAdminConnectivity(),
  ]);

  return (
    <Page style={'custom'}>
      <PageHeader
        displaySidebarTrigger={false}
        title={'Dev Tool'}
        description={'Check the status of your Supabase services'}
      >
        <EnvModeSelector mode={mode} />
      </PageHeader>

      <PageBody className={'py-2'}>
        <div className={'grid grid-cols-1 gap-4 lg:grid-cols-3'}>
          <ServiceCard name={'Supabase API'} status={supabaseStatus} />
          <ServiceCard name={'Supabase Admin'} status={supabaseAdminStatus} />
        </div>
      </PageBody>
    </Page>
  );
}
