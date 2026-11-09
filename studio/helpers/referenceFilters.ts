import type { SanityDocument } from 'sanity';
import { defaultLanguage } from '../languages';

export const langOrDefault = (lang: string | unknown) =>
  lang || defaultLanguage.iso;

const ROUTE_FILTER = /* groq */ `(string::startsWith(_type, "route_") && _type != "route_homepage")`;

export const filterByLang = ({ document }: { document: SanityDocument }) => ({
  filter: `lang == $lang`,
  params: { lang: langOrDefault(document.lang) },
});

export const filterByRoute = ({ document }: { document: SanityDocument }) => ({
  filter: `${ROUTE_FILTER} && lang == $lang`,
  params: { lang: langOrDefault(document.lang) },
});

export const filterByRouteWithPersonList = ({
  document,
}: {
  document: SanityDocument;
}) => ({
  filter: `${ROUTE_FILTER} && lang == $lang && count(content->content[_type == "personList"]) > 0`,
  params: { lang: langOrDefault(document.lang) },
});
export const filterByPages = ({ document }: { document: SanityDocument }) => {
  const lang = langOrDefault(document.lang);
  return {
    filter: /* groq */ `(${ROUTE_FILTER} || _type in ['news', 'newsroom', 'localNews', 'magazine', 'magazineIndex']) && lang == $lang`,
    params: {
      lang: lang,
    },
  };
};

export const filterByPagesInOtherLanguages = ({
  document,
}: {
  document: SanityDocument;
}) => {
  const lang = langOrDefault(document.lang);

  return {
    filter: /* groq */ `(${ROUTE_FILTER} || _type in ['news', 'newsroom', 'localNews', 'magazine', 'magazineIndex']) && defined(lang) && lang != $lang`,
    params: {
      lang: lang,
    },
  };
};

export const filterByRouteNewsMagazineAndTitle = ({
  document,
}: {
  document: SanityDocument;
}) => {
  const lang = langOrDefault(document.lang);
  const title = document.title || '';
  return {
    filter: `title != $title && (${ROUTE_FILTER} || _type in ['news', 'magazine']) && lang == $lang`,
    params: {
      title: title,
      lang: lang,
    },
  };
};

export const filterByRouteEvents = ({
  document,
}: {
  document: SanityDocument;
}) => {
  return {
    filter: `${ROUTE_FILTER} && lang == $lang && content->_type == "event"`,
    params: { lang: langOrDefault(document.lang) },
  };
};

export const filterMagazineByLang = ({
  document,
}: {
  document: SanityDocument;
}) => {
  return {
    filter: `lang == $lang`,
    params: { lang: langOrDefault(document.lang) },
  };
};

export const topicPromotionFilter = ({
  document,
}: {
  document: SanityDocument;
}) => {
  const lang = langOrDefault(document.lang);

  return {
    filter: `((${ROUTE_FILTER} && content->_type == "page") || _type == 'magazine') && lang == $lang`,
    params: {
      lang: lang,
    },
  };
};
