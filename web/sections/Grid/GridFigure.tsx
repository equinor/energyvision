import { forwardRef } from 'react'
import Image from '../../pageComponents/shared/SanityImage'
import type { FigureData } from '../../types/index'

type GridFigureProps = {
  data: FigureData
  className?: string
}

const GridFigure = forwardRef<HTMLDivElement, GridFigureProps>(function GridFigure({ data }, ref) {
  const { figure } = data
  const { image } = figure
  return (
    <div ref={ref} className="relative w-full h-full">
      <Image image={image} fill sizes="(max-width: 800px) 100vw, 800px" className="object-cover h-full w-auto" />
    </div>
  )
})

export default GridFigure
