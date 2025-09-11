import { BackgroundContainer } from '@/core/Backgrounds'
import type { TextWithIconArrayData, TextWithIconItem } from '../../types/index'
import { twMerge } from 'tailwind-merge'
import { TextWithIcon } from '@/core/TextWithIcon/TextWithIcon'
import Blocks from '@/portableText/Blocks'

type TextWithIconArrayProps = {
  data: TextWithIconArrayData
  anchor?: string
  className?: string
  listClassName?: string
}

const TextWithIconArray = ({ data, anchor, className = '', listClassName = '' }: TextWithIconArrayProps) => {
  const { designOptions, group, title, hideTitle } = data

  if (!group) return null

  let gridCols = `${group.length % 2 === 0 ? 'lg:grid-cols-2' : 'lg:grid-cols-3'}`
  if (group.length === 4) {
    gridCols = `lg:grid-cols-4`
  }

  return (
    <BackgroundContainer
      {...designOptions}
      id={anchor}
      backgroundStyle="wide"
      className={twMerge(`flex flex-col gap-6`, className)}
    >
      {title && <Blocks value={title} variant="h2" blockClassName={`${hideTitle ? 'sr-only' : 'px-layout-lg'}`} />}
      <ul className={twMerge(`flex w-full flex-col gap-12 px-layout-sm lg:grid ${gridCols}`, listClassName)}>
        {group.map((item: TextWithIconItem) => {
          const { icon, title, text, id } = item
          return (
            <li key={id}>
              {/*@ts-ignore: TODO check why  content?: PortableTextBlock[] does not match text: PortableTextBlock[]  */}
              <TextWithIcon image={icon} title={title} content={text} />
            </li>
          )
        })}
      </ul>
    </BackgroundContainer>
  )
}

export default TextWithIconArray
