import { forwardRef } from 'react'
import Image from '../../core/SanityImage/SanityImage'
import { FigureData } from '../Figure/Figure'

type GridFigureProps = {
  data: FigureData
  className?: string
}

const GridFigure = forwardRef<HTMLDivElement, GridFigureProps>(function GridFigure({ data }, ref) {
  const { figure } = data
  const { image } = figure
  return (
    <div ref={ref} className="relative h-full w-full">
      <Image image={image} fill className="h-full w-auto object-cover" />
    </div>
  )
})

export default GridFigure
