/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from '../../pageComponents/shared/SanityImage'
import type { FigureData } from '../../types/types'

type GridFigureProps = {
  data: FigureData
  className?: string
}

const GridFigure = ({ data }: GridFigureProps) => {
  console.log('data', data)
  const { figure, designOptions } = data
  const { image, caption, attribution } = figure
  return (
    <div className="relative w-full h-full">
      <Image image={image} fill className="object-cover h-full w-auto" />
    </div>
  )
}

export default GridFigure
