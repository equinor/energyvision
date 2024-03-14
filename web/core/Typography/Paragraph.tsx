import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import { Typography, TypographyProps } from './Typography'
import isEmpty from '../../pageComponents/shared/portableText/helpers/isEmpty'
import { Highlight } from '../../pageComponents/shared/portableText/components'
import { twMerge } from 'tailwind-merge'

const defaultComponents = ({ className }: TypographyProps) => {
  return {
    block: {
      normal: ({ children }: PortableTextBlock) => {
        if (isEmpty(children)) return null
        return (
          <Typography variant="body" className={className}>
            <>{children}</>
          </Typography>
        )
      },
    },
    marks: { highlight: Highlight },
  }
}

export type ParagraphProps = {
  value: PortableTextBlock[]
  className?: string
  componentsClassName?: string
  dark?: boolean
}

/**
 * Component to use with portabletext paragraphs
 */
const Paragraph = ({ value, className, componentsClassName }: ParagraphProps) => {
  let div: PortableTextBlock[] = []
  return (
    <>
      {value.map((block, i, blocks) => {
        // Normal text blocks (p, etc.) — these are grouped so we can wrap them in a prose div
        if (block._type === 'block') {
          div.push(block)

          // If the next block is also text, group it with this one
          if (blocks[i + 1]?._type === 'block') return null

          // Otherwise, render the group of text blocks we have
          const value = div
          div = []

          return (
            <div key={block._key} className={twMerge(`prose dark:prose-invert`, className)}>
              <PortableText
                value={value}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                components={{
                  ...defaultComponents({ className: componentsClassName }),
                }}
              />
            </div>
          )
        } else {
          // other than block type — note that these can recursively render text
          // blocks again
          return <PortableText key={block._key} value={block} />
        }
      })}
    </>
  )
}

export { Paragraph }
