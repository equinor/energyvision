import { FeatureFlags } from '@energyvision/shared/featureFlags';
import {
  type DatasetsKeys,
  getLanguages,
} from '@energyvision/shared/satelliteConfig';
import { customAlphabet } from 'nanoid';
import { at, defineMigration, set } from 'sanity/migrate';

/**
 * Copies tag and text snippet locale properties into an internationalized string
 * array in `translation`, converting locale names such as en_GB to en-GB.
 * Tags use `title`, except localNewsTag and textSnippet which use root fields.
 * Respects each document type's feature flag and the dataset's languages.
 * Preserves source fields and skips documents with existing translations.
 *
 * Also sets `lang` on route documents from their type, e.g. route_en_GB gets
 * en-GB, for route types matching the dataset's supported languages.
 *
 * Steps:
 *  1. Backup:  pnpm sanity dataset export <dataset>
 *  2. Dry run: pnpm sanity migration run tags-locale --project=<PROJECT_ID> --dataset=<DATASET>
 *  3. Migrate: pnpm sanity migration run tags-locale --project=<PROJECT_ID> --dataset=<DATASET> --no-dry-run
 *
 * Run once per dataset using --dataset. Eligibility and supported languages
 * follow the shared feature flags and satellite configuration.
 */

const nanoid = customAlphabet('1234567890abcdef', 32);

const TRANSLATION_DOCUMENT_TYPES = [
  'magazineTag',
  'tag',
  'countryTag',
  'eventTag',
  'textSnippet',
  'localNewsTag',
];

// Every language used across the datasets in satelliteConfig.
const ROUTE_LANGUAGES: Record<string, string> = {
  route_en_GB: 'en-GB',
  route_nb_NO: 'nb-NO',
  route_pt_BR: 'pt-BR',
  route_de_DE: 'de-DE',
  route_es_AR: 'es-AR',
  route_pl_PL: 'pl-PL',
  route_ja_JP: 'ja-JP',
  route_cy_CY: 'cy-CY',
};

export default defineMigration({
  title:
    'Copy tag and text snippet locales to internationalized translations and set route lang',
  documentTypes: [
    ...TRANSLATION_DOCUMENT_TYPES,
    ...Object.keys(ROUTE_LANGUAGES),
  ],

  migrate: {
    document(doc, context) {
      const dataset = context.client.config().dataset;
      if (!dataset) {
        throw new Error('The tags-locale migration requires a dataset.');
      }

      const datasetKey = dataset as DatasetsKeys;
      const languages = getLanguages(datasetKey);

      const routeLanguage = ROUTE_LANGUAGES[doc._type];
      if (routeLanguage) {
        const isSupported = languages.some(({ iso }) => iso === routeLanguage);
        return isSupported && doc.lang !== routeLanguage
          ? [at('lang', set(routeLanguage))]
          : undefined;
      }

      const flags = FeatureFlags(datasetKey);
      let enabled: boolean;
      switch (doc._type) {
        case 'magazineTag':
          enabled = flags.HAS_MAGAZINE;
          break;
        case 'tag':
        case 'countryTag':
          enabled = flags.HAS_NEWS;
          break;
        case 'eventTag':
          enabled = flags.HAS_EVENT;
          break;
        case 'localNewsTag':
          enabled = flags.HAS_LOCAL_NEWS;
          break;
        case 'textSnippet':
          enabled = true;
          break;
        default:
          return;
      }

      if (!enabled) {
        return;
      }

      const source =
        doc._type === 'textSnippet' || doc._type === 'localNewsTag'
          ? doc
          : doc.title;
      if (
        (doc.translation != null &&
          (!Array.isArray(doc.translation) || doc.translation.length > 0)) ||
        !source ||
        typeof source !== 'object' ||
        Array.isArray(source)
      ) {
        return;
      }

      const localizedValues = new Map(Object.entries(source));
      const translations = languages.flatMap(({ iso }) => {
        const value =
          localizedValues.get(iso.replaceAll('-', '_')) ??
          localizedValues.get(iso);
        if (typeof value !== 'string') {
          return [];
        }

        return [
          {
            _key: nanoid(),
            language: iso,
            _type: 'internationalizedArrayStringValue',
            value,
          },
        ];
      });

      return translations.length > 0
        ? [at('translation', set(translations))]
        : undefined;
    },
  },
});
