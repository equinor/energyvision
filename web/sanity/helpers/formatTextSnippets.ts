/* eslint-disable @typescript-eslint/no-explicit-any */

import { languages } from '@/languageConfig';

type TranslationValue = { language?: string; value?: string };

const getFormattedSnippets = (lang: string, snippets: any) => {
  return Object.assign(
    {},
    ...snippets.map((snippet: any) => {
      const key = snippet._id
        .replace('text_snippet_', '')
        .replace('drafts.', '');
      const translation = (
        snippet.translation as TranslationValue[] | undefined
      )?.find((item) => item.language === lang);

      return {
        [key]: translation?.value || '',
      };
    }),
  );
};

const formatTextSnippets = (
  snippets: any,
): Record<string, Record<string, string>> => {
  //@ts-ignore:todo possibly undefined
  const langs = languages.map((e) => e.iso);
  return langs.reduce(
    (o: any, lang: any) => ({
      ...o,
      [lang]: getFormattedSnippets(lang, snippets),
    }),
    {},
  );
};

export default formatTextSnippets;
