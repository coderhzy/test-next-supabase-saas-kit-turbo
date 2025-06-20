import { useRef } from 'react';

import { BaselimeRum } from '@baselime/react-rum';

import { MonitoringContext } from '@kit/monitoring-core';

import { useBaselime } from '../hooks/use-baselime';

export function BaselimeProvider({
  children,
  apiKey,
  enableWebVitals,
}: React.PropsWithChildren<{
  apiKey?: string;
  enableWebVitals?: boolean;
}>) {
  const key = apiKey ?? process.env.NEXT_PUBLIC_BASELIME_KEY ?? '';

  if (!key) {
    console.warn(
      'You configured Baselime as monitoring provider but did not provide a key. ' +
        'Please provide a key to enable monitoring with Baselime using the variable NEXT_PUBLIC_BASELIME_KEY.',
    );

    return children;
  }

  return (
    <BaselimeRum apiKey={key} enableWebVitals={enableWebVitals}>
      <MonitoringProvider>{children}</MonitoringProvider>
    </BaselimeRum>
  );
}

function MonitoringProvider(props: React.PropsWithChildren) {
  const service = useBaselime();
  const provider = useRef(service);

  return (
    <MonitoringContext.Provider value={provider.current}>
      {props.children}
    </MonitoringContext.Provider>
  );
}
