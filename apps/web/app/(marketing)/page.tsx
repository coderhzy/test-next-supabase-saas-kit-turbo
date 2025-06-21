import Link from 'next/link';

import { Hero } from '@kit/ui/marketing';

import { withI18n } from '~/lib/i18n/with-i18n';

function Home() {
  return (
    <div className={'mt-4 flex flex-col space-y-24 py-14 flex-1'}>
      <div className={'container mx-auto flex flex-col items-center justify-center h-[300px]'}>
        <Hero
          title={
            <div className="flex flex-col items-center">
              <span className="text-10xl font-bold tracking-tight">
                全国优秀操盘手
              </span>
              <span className="text-10xl font-bold tracking-tight">
                尽在喜爱云
              </span>
            </div>
          }
        />
      </div>

      <div className={'container mx-auto flex flex-col items-center space-y-8'}>
        <h2 className="animate-in fade-in slide-in-from-top-8 fill-mode-both delay-500 duration-1000 text-3xl font-bold tracking-tight">
          新媒体培训课
        </h2>

        <div
          className={
            'animate-in fade-in slide-in-from-top-8 fill-mode-both delay-700 duration-1000 flex items-center space-x-12 text-xl'
          }
        >
          <span>8月武汉</span>
          <Link
            href={'#'}
            className={
              'rounded-md bg-primary px-4 py-2 text-primary-foreground'
            }
          >
            报名链接
          </Link>
        </div>

        <div
          className={
            'animate-in fade-in slide-in-from-top-8 fill-mode-both delay-900 duration-1000 flex items-center space-x-12 text-xl'
          }
        >
          <span>6月杭州</span>
          <Link
            href={'#'}
            className={
              'rounded-md bg-primary px-4 py-2 text-primary-foreground'
            }
          >
            报名链接
          </Link>
        </div>
      </div>
    </div>
  );
}

export default withI18n(Home);
