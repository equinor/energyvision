import { LogoSecondary } from '@/core/Logo/Logo'

export default function Loading() {
  return (
    <div className='mx-auto flex min-h-screen w-full max-w-fullwidth animate-pulse flex-col'>
      {/* Header skeleton */}
      <div className='flex h-topbar w-full items-center justify-between bg-white-100 px-layout-sm shadow-sm'>
        {/*       <div className='h-8 w-24 rounded bg-grey-40 dark:bg-slate-60' /> */}
        <LogoSecondary className='text-energy-red-100' />
        <div className='flex gap-4'>
          <div className='h-4 w-16 rounded bg-grey-40 dark:bg-slate-60' />
          <div className='h-4 w-16 rounded bg-grey-40 dark:bg-slate-60' />
          <div className='h-4 w-16 rounded bg-grey-40 dark:bg-slate-60' />
        </div>
      </div>

      <main className='flex flex-1 flex-col'>
        {/* fullwidth image hero skeleton */}
        <div className='flex aspect-10/3 w-full flex-col justify-end bg-grey-20 py-12 dark:bg-slate-70'></div>

        {/* Text block skeleton */}
        <div className='mx-layout-sm my-16 flex max-w-text flex-col gap-4 lg:mx-layout-lg'>
          {/* Text block title */}
          <div className='h-8 w-1/3 rounded bg-grey-40 dark:bg-slate-60' />
          {/* Text block ingress */}
          <div className='h-5 w-3/4 rounded bg-grey-30 dark:bg-slate-60' />
          {/* Text block body lines */}
          <div className='mt-2 flex flex-col gap-3'>
            <div className='h-4 w-full rounded bg-grey-20 dark:bg-slate-60' />
            <div className='h-4 w-full rounded bg-grey-20 dark:bg-slate-60' />
            <div className='h-4 w-5/6 rounded bg-grey-20 dark:bg-slate-60' />
            <div className='h-4 w-full rounded bg-grey-20 dark:bg-slate-60' />
            <div className='h-4 w-3/4 rounded bg-grey-20 dark:bg-slate-60' />
          </div>
        </div>
      </main>
    </div>
  )
}
