import { pipe } from 'fp-ts/lib/function'
import * as A from 'fp-ts/lib/Array'
import * as O from 'fp-ts/lib/Option'
import { ImageWithAlt, MagazineArticle } from './sanity'
import { AccordionIndex, MagazineIndex, TextBlockIndex } from '../../common'
import { mappedAccordions, mappedTextBlocks } from '../common/mappers'

const getHeroImage = (article: MagazineArticle): ImageWithAlt | null => {
  if (article?.heroFigure?.image?.asset) {
    return article.heroFigure.image
  }

  if (article?.openGraphImage?.asset) {
    return article.openGraphImage
  }

  return null
}

type MapDataType = (article: MagazineArticle) => MagazineIndex[]
type ContentsDataType = (page: MagazineArticle) => AccordionIndex[] | TextBlockIndex[]

const contents: ContentsDataType = (page) => pipe(page, mappedAccordions, A.concat(mappedTextBlocks(page)))
export const mapData: MapDataType = (article: MagazineArticle) =>
  pipe(
    article,
    contents,
    O.fromNullable,
    O.map((items) => {
      return items.map((it) => {
        return {
          slug: article.slug,
          documentID: article._id,
          type: 'magazine',
          pageTitle: article.title,
          magazineTags: article.magazineTags,
          heroImage: getHeroImage(article),
          publishDateTime: article.publishDateTime,
          ...it,
        } as unknown as MagazineIndex
      })
    }),
    O.getOrElse(() => [] as MagazineIndex[]),
  )
