//import * as A from 'fp-ts/lib/Array'
import { nonEmptyArray as A } from 'fp-ts'
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { SanityClient } from '@sanity/client'
import { BlockNode, Language } from '../../common'

/*
const defaults = { nonTextBehavior: 'remove' };
const blocksToArray = (blocks, opts = {}) => {
  const options = Object.assign({}, defaults, opts);
  if (blocks.length === 0) return undefined;
  return blocks
    .map(block => {
      if (block._type !== 'block' || !block.children) {
        return options.nonTextBehavior === 'remove' ? '' : `[${block._type} block]`;
      }
      return block.children.map(child => child.text).join('');
    })
    .filter(block => {
      return !!block.trim();
    });
};
*/

// Move to mapper or create decoder
const getBlockText = (blocks: NonEmptyArray<BlockNode>) =>
  pipe(
    blocks,
    A.map((block) =>
      pipe(
        block,
        E.fromPredicate(
          (block) => block.children.length > 0,
          () => block,
        ),
        E.fold(
          () => '',
          (nodeWithChildren) => nodeWithChildren.children.map((child) => child.text).join(' '),
        ),
      ),
    ),
  )

export const query = /* groq */ `*content->_type == "news"] {
  "slug": slug.current,
  _id,
  "title": pt::text(content->title),
  "type": content->_type,
  "textBlocks": content->content[_type == "block"]{
    "_key": _key,
    "title": pt::text(title),
    "ingress": pt::text(ingress),
    "text": ${getBlockText}
  },
}
`

const getQueryParams = (language: Language) => ({
  lang: language.internalCode,
})

export type NewsArticle = {
  slug: string
  title: string
  textBlocks: {
    _key: string
    title: string
    ingress: string
    text: string
  }[]
  _id: string
}

type FetchDataType = (
  query: string,
) => (
  getQueryparams: (language: Language) => Readonly<Record<string, string>>,
) => (sanityClient: SanityClient) => (language: Language) => TE.TaskEither<Error, NewsArticle[]>

const fetch: FetchDataType = (query) => (getQueryParams) => (sanityClient) => (language) =>
  pipe(TE.tryCatch(() => sanityClient.fetch(query, getQueryParams(language)), E.toError))

export const fetchData = fetch(query)(getQueryParams)
