import slugify from '@sindresorhus/slugify'

import type { FIXME, SlugSchemaType, SlugSourceContext } from 'sanity'

// Fallback slugify function if not defined in field options
const defaultSlugify = (value: FIXME, type: SlugSchemaType): string => {
  const maxLength = type.options?.maxLength // look in to this later if needed no limitation of 200 chars as before
  return value ? slugify(value) : ''
}

// eslint-disable-next-line require-await
export async function slugifyLocal(
  sourceValue: FIXME,
  type: SlugSchemaType,
  context: SlugSourceContext,
): Promise<string> {
  if (!sourceValue) {
    return sourceValue
  }

  const slugifier = type.options?.slugify || defaultSlugify
  return slugifier(sourceValue, type, context)
}
