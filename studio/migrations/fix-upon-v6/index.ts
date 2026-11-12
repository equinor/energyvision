import { at, defineMigration, set } from 'sanity/migrate';

// Fallback for translation.metadata documents the official helper skips.
//
// migrateToLanguageField() (sanity-plugin-internationalized-array/migrations)
// only converts items whose `_type` matches `internationalizedArray*Value`.
// Metadata docs that were never re-saved after the old plugin versions still
// have the legacy shape: items with NO `_type`, language in `_key`, and a plain
// weak `reference` in `value`. This migration handles both shapes in one pass:
//
//   legacy / v4:  {_key: 'en_GB', value: {...}}  (or with _type already set)
//   v5/v6:        {_key: '<random>', _type: 'internationalizedArrayReferenceValue',
//                  language: 'en_GB', value: {...}}
//
// Items that already have a `language` field are left untouched, so it is safe
// to run on a dataset where the official helper has already been applied.
//
// Run order: backup -> dry run -> --no-dry-run, as with the official helper.

const ITEM_TYPE = 'internationalizedArrayReferenceValue';

function newKey(): string {
  return crypto.randomUUID().replace(/-/g, '').slice(0, 12);
}

type Item = {
  _key?: string;
  _type?: string;
  language?: string;
  value?: Record<string, unknown>;
  [k: string]: unknown;
};

export function convertTranslations(items: unknown): Item[] | undefined {
  if (!Array.isArray(items)) return undefined;
  let changed = false;

  const next = (items as Item[]).map((item) => {
    if (!item || typeof item !== 'object') return item;
    if (item.language) return item; // already v5/v6 shape
    if (!item._key || !item.value) return item; // nothing to derive language from

    changed = true;
    const { _key, _type, value, ...rest } = item;
    return {
      ...rest,
      _key: newKey(),
      _type: ITEM_TYPE,
      language: _key,
      value,
    };
  });

  return changed ? next : undefined;
}

export default defineMigration({
  title: 'translation.metadata: legacy items -> language field (v6)',
  documentTypes: ['translation.metadata'],
  migrate: {
    document(doc) {
      const next = convertTranslations(
        (doc as { translations?: unknown }).translations,
      );
      if (!next) return;
      return at('translations', set(next));
    },
  },
});
