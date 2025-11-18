import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

type NewsSectionsSkeletonProps = React.ComponentProps<'div'>

const NewsSectionsSkeleton = forwardRef<HTMLDivElement, NewsSectionsSkeletonProps>(function NewsSectionsSkeleton(
  { className = '' },
  ref,
) {
  return (
    <div ref={ref} className={twMerge(`flex flex-col gap-4`, className)}>
      <div className="flex animate-pulse flex-col gap-2 pb-12 duration-1000">
        <div className="bg-grey-40 mb-2 aspect-video h-auto max-h-[324px] w-full rounded" />
        <div className="flex w-2/3 flex-col gap-4">
          <div className="bg-grey-40 h-3 w-2/3 rounded" />
          <div className="bg-grey-40 h-4 w-full rounded" />
          <div className="bg-grey-40 h-10 w-full rounded" />
        </div>
      </div>
      {Array.from({ length: 5 }, (_v, i) => i).map((item) => (
        <div key={item} className="flex animate-pulse justify-between gap-4 duration-1000 lg:gap-6">
          <div className="flex w-2/3 flex-col gap-4">
            <div className="bg-grey-40 h-3 w-1/3 rounded" />
            <div className="bg-grey-40 h-4 w-[70%] rounded" />
          </div>
          <div className="bg-grey-40 aspect-5/4 w-[30%] rounded lg:aspect-video lg:h-full" />
        </div>
      ))}
    </div>
  )
})

export default NewsSectionsSkeleton
