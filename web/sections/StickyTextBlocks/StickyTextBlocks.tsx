import { BackgroundContainer } from '@components/Backgrounds'
import { Typography } from '@core/Typography'
import Blocks from '../../pageComponents/shared/portableText/Blocks'
import { twMerge } from 'tailwind-merge'
import { PortableTextBlock } from '@portabletext/types'
import { StickyTextBlocksData } from '../../types/types'

export type StickyTextBlocksProps = {
  data: StickyTextBlocksData
  anchor?: string
  className?: string
}
const StickyTextBlocks = ({ data, anchor, className }: StickyTextBlocksProps) => {
  const { group, designOptions } = data
  return (
    <BackgroundContainer {...designOptions} className={twMerge(`pb-page-content px-layout-sm`, className)} id={anchor}>
      {group?.length > 0 &&
        group?.map((textBlock: { id: string; title?: string; content: PortableTextBlock[] }) => {
          return (
            <section
              key={textBlock?.id}
              className="lg:grid lg:grid-cols-[30%_70%] gap-24 py-12 border-y-2 border-energy-red-100"
            >
              {textBlock?.title && (
                <Typography variant="h2" className="h-max lg:sticky top-32 text-pretty">
                  {textBlock.title}
                </Typography>
              )}
              <div className="max-w-text">
                {textBlock?.content && <Blocks value={textBlock.content} className="flex flex-col" />}
              </div>
            </section>
          )
        })}
    </BackgroundContainer>
  )
}

export default StickyTextBlocks
