import { migrateToLanguageField } from 'sanity-plugin-internationalized-array/migrations'

// Migrates translation.metadata documents from the old format where language
// was stored in `_key` to the new format with a dedicated `language` field.
// Required for @sanity/document-internationalization v6 compatibility.
//
// Steps:
//  1. Backup:  pnpm sanity dataset export <dataset>
//  2. Dry run: pnpm sanity migration run i18n-doc-v6 --project=<PROJECT_ID> --dataset=<DATASET>
//  3. Migrate: pnpm sanity migration run i18n-doc-v6 --project=<PROJECT_ID> --dataset=<DATASET> --no-dry-run
//  4. After confirming data is correct, simplify GROQ queries:
//     Remove `|| _key == $lang` fallbacks from translations[] filters.

const DOCUMENT_TYPES: string[] = ['translation.metadata']

export default migrateToLanguageField(DOCUMENT_TYPES)
