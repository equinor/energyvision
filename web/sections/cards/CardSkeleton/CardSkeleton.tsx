import { forwardRef } from 'react'

type CardSkeletonProps = {
  hideEyebrow?: boolean
  hideIngress?: boolean
} & React.ComponentProps<'div'>

const CardSkeleton = forwardRef<HTMLDivElement, CardSkeletonProps>(function CardSkeleton(
  { hideEyebrow = false, hideIngress = false },
  ref,
) {
  return (
    <div ref={ref} className="animate-pulse duration-1000 flex flex-col gap-2 pb-12">
      <div className="w-full h-auto bg-grey-40 rounded aspect-video max-h-[324px] mb-2" />
      <div className="w-2/3 flex flex-col gap-4">
        {!hideEyebrow && <div className="h-3 w-2/3 bg-grey-40 rounded" />}
        <div className="h-4 w-full bg-grey-40 rounded" />
        {!hideIngress && <div className="h-10 w-full bg-grey-40 rounded" />}
      </div>
    </div>
  )
})

export default CardSkeleton
