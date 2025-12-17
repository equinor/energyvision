import downloadableFileFields from './common/actions/downloadableFileFields'
import downloadableImageFields from './common/actions/downloadableImageFields'
import linkSelectorFields from './common/actions/linkSelectorFields'
import background from './common/background'
import markDefs from './common/blockEditorMarks'
import { functions, pageContentFunctions } from './common/functions'
import { heroFields } from './common/heroFields'
import { sameLang } from './common/langAndDrafts'
import pageContentFields from './common/pageContentFields'
import { publishDateTimeQuery } from './common/publishDateTime'
import { seoAndSomeFields } from './common/seoAndSomeFields'
import { inlineSlugsQuery, singletonsSlugsQuery } from './metaData'

const footerComponentFields = /* groq */ `
  title,
  text[]{
    ...,
    ${markDefs},
  },
  "designOptions": {
    ${background},
    "imagePosition": coalesce(imagePosition, 'left'),
  },
  "image": image{
    ...,
    "extension": asset-> extension
  },
  "actions": [action[0]]{
    ${linkSelectorFields},
    ${downloadableFileFields},
    ${downloadableImageFields},
  },
`

const promotedmagazineTags = /* groq */ `... *[_type == "magazineIndex" && ${sameLang}][0] {"magazineTags":promotedMagazineTags[]->{
  "id": _id,
  "key": key.current,
  "title":title[$lang],
}}`

export const magazineQuery = /* groq */ `
  ${functions}
  ${pageContentFunctions}
*[_type == "magazine" && slug.current == $slug] {
    _id, //used for data filtering
    "slug": slug.current,
    "title": title,
    "seoAndSome": ${seoAndSomeFields},
    "hero": ${heroFields},
    "slugs": {${inlineSlugsQuery}},
    "template": _type,
    ${promotedmagazineTags},
    "tags": magazineTags[]->title[$lang],
    "content": content[] {
          ${pageContentFields}
      },
    "firstPublishedAt": coalesce(firstPublishedAt, _createdAt),
    "footerComponent": *[_type == 'magazineIndex' && ${sameLang}][0]{
      "data": footerComponent{
        ${footerComponentFields}
      }
    },
    hideFooterComponent,
}[0]`

export const magazineIndexQuery = /* groq */ `
 ${functions}
  *[_type == "magazineIndex" && ${sameLang}] {
    _id,
    "seoAndSome": ${seoAndSomeFields},
    title,
    "hero": ${heroFields},
    ingress[]{
        ...,
        ${markDefs},
    },
    "slugs": {${singletonsSlugsQuery}},
    "magazineTags": promotedMagazineTags[]->{
      "id": _id,
      "key": key.current,
      "title":title[$lang],
    },
    "footerComponent": footerComponent{
      ${footerComponentFields}
    }
}[0]`

export const allMagazineDocuments = /* groq */ `
  ${functions}
*[_type == "magazine" && ${sameLang} ] | order(${publishDateTimeQuery} desc){
    "id": _id,
    "slug": slug.current,
    title[]{
    ...,
    ${markDefs},
  },
  "hero": ${heroFields}
}`

//&& (${publishDateTimeQuery} < $lastPublishedAt || (${publishDateTimeQuery} == $lastPublishedAt && _id < $lastId))
const prevDirectionFilter = /* groq */ `
&& (${publishDateTimeQuery} > $lastPublishedAt || (${publishDateTimeQuery} == $lastPublishedAt && _id > $lastId))
`
//&& (${publishDateTimeQuery} > $lastPublishedAt || (${publishDateTimeQuery} == $lastPublishedAt && _id > $lastId))
const nextDirectionFilter = /* groq */ `
&& (${publishDateTimeQuery} < $lastPublishedAt || (${publishDateTimeQuery} == $lastPublishedAt && _id < $lastId))
`

export const getMagazineArticlesByTag = (
  hasFirstId = false,
  hasLastId = false,
) => /* groq */ `
${functions}
{
 "tagsParam": *[_type == 'magazineTag'
                && key.current == $tag]
                { _id, "key": key.current },
}{
  "articles": *[_type == 'magazine' && ${sameLang}
    && references(^.tagsParam[]._id)
  ${hasLastId ? nextDirectionFilter : ''}
  ${hasFirstId ? prevDirectionFilter : ''}
  ] | order(${publishDateTimeQuery} desc){
    "id": _id,
    "slug": slug.current,
    title[]{
      ...,
      ${markDefs},
    },
    "hero": ${heroFields}
  }
}.articles
`

export const allMagazineTags = /* groq */ `
  ${functions}
*[_type == "magazineTag"}]{
"id": _id,
"key": key.current,
"title":title[$lang],
}`
