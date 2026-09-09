import { LogoSecondary } from '@/core/Logo/Logo';

type LoadingPageProps = {
  homepage?: boolean;
};

export default function LoadingPage({ homepage = false }: LoadingPageProps) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-fullwidth animate-pulse flex-col">
      {/* Header skeleton */}
      <div className="flex h-topbar w-full items-center justify-between bg-white-100 px-layout-sm shadow-sm">
        {/*       <div className='h-8 w-24 rounded bg-grey-40 dark:bg-slate-60' /> */}
        <LogoSecondary className="text-energy-red-100" />
        <div className="flex gap-4">
          <div className="h-4 w-16 rounded bg-grey-40 dark:bg-slate-60" />
          <div className="h-4 w-16 rounded bg-grey-40 dark:bg-slate-60" />
          <div className="h-4 w-16 rounded bg-grey-40 dark:bg-slate-60" />
        </div>
      </div>

      <main className="flex flex-1 flex-col">
        {/* fullwidth image hero skeleton */}
        <div className="aspect-10/3 w-full bg-grey-20 dark:bg-slate-70" />
        <div className="flex flex-col gap-2 px-layout-sm pt-2 pb-4 text-xs lg:px-layout-lg">
          <div className="h-4 w-32 rounded bg-grey-30 dark:bg-slate-60" />
          <div className="h-3 w-24 rounded bg-grey-30 dark:bg-slate-60" />
        </div>

        {/* Text block skeleton */}
        <div className="mx-layout-sm my-16 flex max-w-text flex-col gap-4 lg:mx-layout-lg">
          {/* Text block title */}
          <div className="flex flex-col gap-2">
            {homepage ? (
              <>
                <div className="h-8 w-full rounded bg-grey-40 dark:bg-slate-60" />
                <div className="h-8 w-5/6 rounded bg-grey-40 dark:bg-slate-60" />
                <div className="h-8 w-2/3 rounded bg-grey-40 dark:bg-slate-60" />
              </>
            ) : (
              <div className="h-8 w-full rounded bg-grey-40 dark:bg-slate-60" />
            )}
          </div>
          {/* Text block ingress */}
          <div className="flex flex-col gap-2">
            <div className="h-5 w-3/4 rounded bg-grey-30 dark:bg-slate-60" />
            <div className="h-5 w-2/3 rounded bg-grey-30 dark:bg-slate-60" />
          </div>
          {/* Text block body lines */}
          <div className="mt-2 flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <div className="h-4 w-full rounded bg-grey-20 dark:bg-slate-60" />
              <div className="h-4 w-5/6 rounded bg-grey-20 dark:bg-slate-60" />
              <div className="h-4 w-3/4 rounded bg-grey-20 dark:bg-slate-60" />
            </div>
            <div className="flex flex-col gap-3">
              <div className="h-4 w-full rounded bg-grey-20 dark:bg-slate-60" />
              <div className="h-4 w-5/6 rounded bg-grey-20 dark:bg-slate-60" />
              <div className="h-4 w-2/3 rounded bg-grey-20 dark:bg-slate-60" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
