import { pipe } from 'fp-ts/lib/function'
import { AccordionIndex, TextBlockIndex, TopicIndex } from '../../common'
import { TopicPage } from './sanity'
import * as A from 'fp-ts/lib/Array'
import * as O from 'fp-ts/lib/Option'
import { mappedAccordions, mappedTextBlocks } from '../common/mappers'

type ContentsDataType = (page: TopicPage) => AccordionIndex[] | TextBlockIndex[]

type MapDataType = (page: TopicPage) => TopicIndex[]

const contents: ContentsDataType = (page) => pipe(page, mappedAccordions, A.concat(mappedTextBlocks(page)))

export const mapData: MapDataType = (page: TopicPage) =>
  pipe(
    page,
    contents,
    O.fromNullable,
    O.map((items) => {
      return items.map((it) => {
        return {
          slug: page.slug,
          type: 'page',
          pageTitle: page.title,
          ...it,
        } as unknown as TopicIndex
      })
    }),
    O.getOrElse(() => [] as TopicIndex[]),
  )
