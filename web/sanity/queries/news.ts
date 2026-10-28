import { Flags } from '../helpers/datasetHelpers';
import { functions } from './common/functions';
import { notDraft, sameLang } from './common/langAndDrafts';
import {
  contentForNewsQuery,
  iframeForNewsQuery,
  ingressForNewsQuery,
  relatedLinksForNewsQuery,
} from './common/newsSubqueries';
import {
  lastUpdatedTimeQuery,
  publishDateTimeQuery,
} from './common/publishDateTime';
import { inlineSlugsQuery } from './metaData';

export const excludeCrudeOilAssays =
  Flags.IS_DEV || Flags.IS_GLOBAL_PROD
    ? /* groq */ `!('crude-oil-assays' in tags[]->key.current) &&`
    : '';

const latestNewsFields = /* groq */ `
  "id": _id,
  "updatedAt": ${lastUpdatedTimeQuery},
  title,
  heroImage,
  "slugs":{${inlineSlugsQuery}},
  ${ingressForNewsQuery},
  "publishDateTime": ${publishDateTimeQuery},
  "slug": slug.current,
  "iframe": ${iframeForNewsQuery},
`;

export const newsQuery = /* groq */ `
  ${functions}
  *[_type == "news" && slug.current == $slug && ${sameLang}] | order(${publishDateTimeQuery} desc) {
    _id, //used for data filtering
    "id": _id,
    "updatedAt": ${lastUpdatedTimeQuery},
    title,
    heroImage,
    "publishDateTime": ${publishDateTimeQuery},
    "slug": slug.current,
    "slugs": {${inlineSlugsQuery}},
    "documentTitle": seo.documentTitle,
    "metaDescription": seo.metaDescription,
    "template": _type,
    openGraphImage,
    ${ingressForNewsQuery},
    "iframe": ${iframeForNewsQuery},
    "content": ${contentForNewsQuery},
    "relatedLinks": ${relatedLinksForNewsQuery},
    relations{
      title,
      "persons": persons[defined(person->) || defined(@->)]{
        "id": _key,
        title,
        "person": coalesce(person->, @->){
          "id": _id,
          name,
          title,
          image,
          mobileNumber,
          linkedinProfileUrl,
          employmentDate,
          metadata
        }
      }
    },
    "latestNews": *[
      _type == "news" &&
      slug.current != $slug &&
      heroImage.image.asset != null &&
      ${excludeCrudeOilAssays}
      ${sameLang}
      && ${notDraft}] | order(${publishDateTimeQuery} desc)[0...3] {
        ${latestNewsFields}
      }
  }[0]
`;

export const newsPromotionQuery = /* groq */ `
  *[(_type == "news" || _type == "localNews")
    && (
      count(tags[_ref in $tags[].id]) > 0
      ||
      count(countryTags[_ref in $countryTags[].id]) > 0
      ||
      localNewsTag._ref in $localNewsTags[].id
      ||
      (
        count(coalesce($tags, [])) == 0
        && count(coalesce($countryTags, [])) == 0
        && count(coalesce($localNewsTags, [])) == 0
      )
    )
    && ${sameLang}
    && ${notDraft})
  ] | order(${publishDateTimeQuery} desc)[0...3]{
    "type": _type,
    "id": _id,
    "updatedAt":  ${lastUpdatedTimeQuery},
    title,
    heroImage,
    "publishDateTime": ${publishDateTimeQuery},
    "slug": slug.current,
    ${ingressForNewsQuery},
  }
`;
