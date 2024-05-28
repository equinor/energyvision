import Image from '../../pageComponents/shared/SanityImage'
import type { FigureData } from '../../types/types'

type GridFigureProps = {
  data: FigureData
  className?: string
}

const GridFigure = ({ data }: GridFigureProps) => {
  const { figure } = data
  const { image } = figure
  return (
    <div className="relative w-full h-full">
      <Image image={image} fill sizes="(max-width: 800px) 100vw, 800px" className="object-cover h-full w-auto" />
    </div>
  )
}

export default GridFigure
