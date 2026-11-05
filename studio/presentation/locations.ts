import { map } from 'rxjs';
import { getDraftId, type PortableTextBlock } from 'sanity';
import type { DocumentLocationResolver } from 'sanity/presentation';
import blocksToText from '@/helpers/blocksToText';
import { capitalizeFirstLetter } from '@/helpers/formatters';
import { defaultLanguage, defaultWebLang } from '@/languages';
import { getIdFromName, getLocaleFromName } from '../src/lib/localization';

type TranslationLocation = {
  lang?: string;
  slug?: string;
  title?: PortableTextBlock[];
};

type LocationDocument = {
  _id: string;
  _type: string;
  lang?: string;
  title?: string | PortableTextBlock[];
  isActive?: boolean;
  slug?: { current?: string };
  slugs?: (string | null)[];
  translationSlugs?: (TranslationLocation | null)[];
};

export const locations: DocumentLocationResolver = (params, context) => {
  let query = null;
  const routePages = ['page', 'event'];
  const pagesWithSlugOnThem = [
    'news',
    'magazine',
    'newsroom',
    'magazineIndex',
    'localNews',
  ];
  const isRoutePage = routePages.includes(params.type);
  const hasOwnSlug = pagesWithSlugOnThem.includes(params.type);

  if (params.type === 'homePage') {
    query = {
      fetch: `*[_id==$id][0]{
      lang,
      "isActive": count(
        *[_type match "route_homepage" && (
          references(
            *[_type == "translation.metadata" && references($id)][0]
              .translations[language == $defaultLang || _key == $defaultLang][0].value._ref
          ) || references($id)
        )]
      ) > 0,
      "translationSlugs": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
      lang,
      },
      ...
      }
      `,
      listen: `*[_id in [$id,$draftId]]`,
    };
  } else if (isRoutePage) {
    query = {
      fetch: `*[_id==$id][0]{
      lang,
      "slugs": *[_type match "route*" && references(^._id)].slug.current,
      "translationSlugs": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
      "slug" : *[_type match "route*" && references(^._id)][0].slug.current, 
      lang,
      title,
      },
      ...
      }
      `,
      listen: `*[_id in [$id,$draftId]]`,
    };
  } else if (hasOwnSlug) {
    //pages with slugs on them
    query = {
      fetch: `*[_id==$id][0]{
      lang,
      "slugs": *[_type match "route*" && references(^._id)][0].slug.current,
    "translationSlugs": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
      "slug": slug.current,
      lang
    },
      ...}
      `,
      listen: `*[_id in [$id,$draftId]]`,
    };
  }

  if (query) {
    const pageParams = {
      id: params.id,
      draftId: getDraftId(params.id),
      publishedId: params.id.replace(/^drafts\./, ''),
      //default language here because we want the language setup for studio, not web
      defaultLang: defaultLanguage?.iso,
    };

    const doc$ = context.documentStore.listenQuery(
      query,
      pageParams,
      { perspective: 'drafts' }, // returns a draft article if it exists
    );

    return doc$.pipe(
      map((doc: LocationDocument | null) => {
        if (!doc || (doc._type === 'homePage' && !doc.isActive)) {
          return null;
        }

        const plainTitle = Array.isArray(doc.title)
          ? blocksToText(doc.title)
          : doc.title;

        if (isRoutePage) {
          const translatedRoutes = (doc.translationSlugs ?? []).filter(
            (translation): translation is TranslationLocation =>
              Boolean(translation?.slug && doc.lang === translation.lang),
          );

          if (translatedRoutes.length > 0) {
            return {
              locations: translatedRoutes.map((translation) => {
                const locale = getLocaleFromName(translation.lang);
                return {
                  title: `${blocksToText(translation.title)}`,
                  href: `${translation.lang !== defaultWebLang?.iso ? locale : ''}${translation.slug}`,
                };
              }),
            };
          }

          const routeSlugs = (doc.slugs ?? []).filter(
            (slug): slug is string => Boolean(slug),
          );
          const locale = getLocaleFromName(doc.lang);

          if (routeSlugs.length > 0) {
            return {
              locations: routeSlugs.map((slug) => ({
                title: `${plainTitle}`,
                href: `${doc.lang !== defaultWebLang?.iso ? locale : ''}${slug}`,
              })),
            };
          }

          return {
            locations: [
              {
                title: doc.title ? `${plainTitle}` : 'Untitled',
                href: `/preview/${doc._id}`,
              },
            ],
          };
        }

        if (doc._type === 'homePage') {
          const translations = doc.translationSlugs ?? [];

          if (translations.length === 0) {
            const localeId = capitalizeFirstLetter(
              getIdFromName(defaultWebLang?.iso),
            );
            return {
              locations: [{ title: `${localeId} homepage`, href: '/' }],
            };
          }

          return {
            locations: translations
              .filter(
                (translation): translation is TranslationLocation =>
                  translation !== null && translation.lang === doc.lang,
              )
              .map((translation) => {
                const locale = getLocaleFromName(translation.lang);
                const localeId = capitalizeFirstLetter(
                  getIdFromName(translation.lang),
                );
                return {
                  title: `${localeId} homepage`,
                  href: translation.lang !== defaultWebLang?.iso ? `/${locale}` : '/',
                };
              }),
          };
        }

        if (hasOwnSlug) {
          const locale = getLocaleFromName(doc.lang);
          return {
            locations: [
              {
                title: doc.title ? (plainTitle ?? 'Untitled') : 'Untitled',
                href: `${doc.lang !== defaultWebLang?.iso ? `${locale}/` : ''}${doc.slug?.current}`,
              },
            ],
          };
        }

        return { locations: [] };
      }),
    );
  }
  return null;
};
