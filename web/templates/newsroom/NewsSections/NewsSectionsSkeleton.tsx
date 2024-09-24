import { forwardRef } from 'react'

import envisTwMerge from '../../../twMerge'

type NewsSectionsSkeletonProps = React.ComponentProps<'div'>

const NewsSectionsSkeleton = forwardRef<HTMLDivElement, NewsSectionsSkeletonProps>(function NewsSectionsSkeleton(
  { className = '' },
  ref,
) {
  return (
    <div ref={ref} className={envisTwMerge(`flex flex-col gap-4`, className)}>
      <div className="animate-pulse duration-1000 flex flex-col gap-2 pb-12">
        <div className="w-full h-auto bg-grey-40 rounded aspect-video max-h-[324px] mb-2" />
        <div className="w-2/3 flex flex-col gap-4">
          <div className="h-3 w-2/3 bg-grey-40 rounded" />
          <div className="h-4 w-full bg-grey-40 rounded" />
          <div className="h-10 w-full bg-grey-40 rounded" />
        </div>
      </div>
      {Array.from({ length: 5 }, (v, i) => i).map((item) => (
        <div key={item} className="animate-pulse duration-1000 flex justify-between gap-4 lg:gap-6">
          <div className="w-2/3 flex flex-col gap-4">
            <div className="h-3 w-1/3 bg-grey-40 rounded" />
            <div className="h-4 w-[70%] bg-grey-40 rounded" />
          </div>
          <div className="bg-grey-40 rounded w-[30%] lg:h-full aspect-5/4 lg:aspect-video " />
        </div>
      ))}
    </div>
  )
})

export default NewsSectionsSkeleton
