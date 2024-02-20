import { pipe } from 'fp-ts/lib/function'
import { TextBlockIndex, AccordionIndex } from '../../common'
import { TopicPage } from '../topic/sanity'
import { MagazineArticle } from '../magazine/sanity'
import { option } from 'fp-ts'

type PageType = TopicPage | MagazineArticle

export type Mappable = {
  _key: string
  title: string
  ingress: string
}
export type MappableTextBlockType = Mappable & {
  text: string
}

export type MappableAccordionType = Mappable & {
  accordionItems: {
    _key: string
    title: string
    content: string
  }[]
}

// map textblocks
export const mappedTextBlocks = (page: PageType) =>
  pipe(
    option.fromNullable(page.textBlocks as MappableTextBlockType[]),
    option.map((textBlocks) =>
      textBlocks.map((textBlock) => {
        return {
          title: textBlock.title,
          ingress: textBlock.ingress,
          objectID: `${page._id}-${textBlock._key}`,
          text: textBlock.text,
        }
      }),
    ),
    option.getOrElse(() => [] as TextBlockIndex[]),
  )

// Map accordions
export const mappedAccordions = (page: PageType) =>
  pipe(
    option.fromNullable(page.accordions as MappableAccordionType[]),
    option.map((accordions) =>
      accordions.map((accordion) => {
        return {
          title: accordion.title,
          ingress: accordion.ingress,
          objectID: `${page._id}-${accordion._key}`,
          text: accordion.accordionItems?.map((item) => item.title + ': ' + item.content).join(' '),
        }
      }),
    ),
    option.getOrElse(() => [] as AccordionIndex[]),
  )
