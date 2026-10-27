import { at, defineMigration, set } from 'sanity/migrate'

/**
 * Migrates all documents' `lang` field from underscore format (e.g. "en_GB")
 * to ISO hyphen format (e.g. "en-GB").
 *
 * Also updates the `language` field inside `translation.metadata` translations
 * arrays, which was added by the i18n-doc-v6 migration.
 *
 * Steps:
 *  1. Backup:  pnpm sanity dataset export <dataset>
 *  2. Dry run: pnpm sanity migration run lang-underscore-to-hyphen --project=<PROJECT_ID> --dataset=<DATASET>
 *  3. Migrate: pnpm sanity migration run lang-underscore-to-hyphen --project=<PROJECT_ID> --dataset=<DATASET> --no-dry-run
 *
 * Run against every dataset:
 *   global, global-development, brazil, germany, argentina, poland,
 *   japan, southkorea, celticsea, sponsorship, equinorfunds, storage, secret
 */

const LANG_REGEX = /^[a-z]{2}_[A-Z]{2}$/

const toIso = (lang: string) => lang.replace('_', '-')

export default defineMigration({
  title: 'lang underscore → hyphen (en_GB → en-GB)',

  migrate: {
    document(doc, _context) {
      const patches = []

      // 1. Update top-level `lang` field on any document that has it
      if (typeof doc.lang === 'string' && LANG_REGEX.test(doc.lang)) {
        patches.push(at('lang', set(toIso(doc.lang))))
      }

      // 2. Update `language` field inside translation.metadata translations array
      if (doc._type === 'translation.metadata' && Array.isArray(doc.translations)) {
        ;(doc.translations as Array<{ _key: string; language?: string }>).forEach((item, index) => {
          if (typeof item.language === 'string' && LANG_REGEX.test(item.language)) {
            patches.push(at(`translations[${index}].language`, set(toIso(item.language))))
          }
          // Also update _key if it matches the old format
          if (typeof item._key === 'string' && LANG_REGEX.test(item._key)) {
            patches.push(at(`translations[${index}]._key`, set(toIso(item._key))))
          }
        })
      }

      return patches.length > 0 ? patches : undefined
    },
  },
})
