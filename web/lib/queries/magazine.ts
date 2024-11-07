import { heroFields } from './common/heroFields'
import pageContentFields from './common/pageContentFields'
import slugsForNewsAndMagazine, { querySuffixForNewsAndMagazine } from './slugsForNewsAndMagazine'
import linkSelectorFields from './common/actions/linkSelectorFields'
import downloadableFileFields from './common/actions/downloadableFileFields'
import downloadableImageFields from './common/actions/downloadableImageFields'
import markDefs from './common/blockEditorMarks'
import { seoAndSomeFields } from './common/seoAndSomeFields'
import { sameLang, fixPreviewForDrafts, noDrafts } from './common/langAndDrafts'
import { publishDateTimeQuery } from './common/publishDateTime'
import background from './common/background'

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

const promotedmagazineTags = /* groq */ `"": *[_type == "magazineIndex" && ${sameLang} && ${noDrafts}][0] {"magazineTags":promotedMagazineTags[]->{
  "id": _id,
  "key": key.current,
  "title":title[$lang],
}}`

export const magazineQuery = /* groq */ `
*[_type == "magazine" && slug.current == $slug && ${fixPreviewForDrafts}] {
    _id, //used for data filtering
    "slug": slug.current,
    "title": title,
    "seoAndSome": ${seoAndSomeFields},
    "hero": ${heroFields},
    "template": _type,
    ${promotedmagazineTags},
    "tags": magazineTags[]->title[$lang],
    "content": content[] {
          ${pageContentFields}
      },
      ${slugsForNewsAndMagazine},
    "footerComponent": *[_type == 'magazineIndex' && ${sameLang} && ${noDrafts}][0]{
      "data": footerComponent{
        ${footerComponentFields}
      }
    },
    hideFooterComponent,
}${querySuffixForNewsAndMagazine}`

export const magazineIndexQuery = /* groq */ `
  *[_type == "magazineIndex" && ${sameLang}] {
    _id,
    "seoAndSome": ${seoAndSomeFields},
    title,
    "hero": ${heroFields},
    "ingress": {
      "content": ingress[]{
        ...,
        ${markDefs},
      },
      "background": coalesce(ingressBackground.title, 'White'),
    },
    "magazineTags": promotedMagazineTags[]->{
      "id": _id,
      "key": key.current,
      "title":title[$lang],
    },
    "footerComponent": footerComponent{
      ${footerComponentFields}
    }
}`

export const allMagazineDocuments = /* groq */ `
*[_type == "magazine" && ${sameLang} && ${noDrafts} ] | order(${publishDateTimeQuery} desc){
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

export const getMagazineArticlesByTag = (hasFirstId = false, hasLastId = false) => /* groq */ `
{
 "tagsParam": *[_type == 'magazineTag'
                && !(_id in path('drafts.**'))
                && key.current == $tag]
                { _id, "key": key.current },
}{
  "articles": *[_type == 'magazine' && ${sameLang} && ${noDrafts}
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
*[_type == "magazineTag" && ${noDrafts}]{
"id": _id,
"key": key.current,
"title":title[$lang],
}`
