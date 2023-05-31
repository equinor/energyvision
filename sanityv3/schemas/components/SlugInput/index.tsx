import { Box, Button, Card, Flex, Stack, TextInput } from '@sanity/ui'
import React, { useCallback, useMemo } from 'react'
import {
  getValueAtPath,
  ObjectInputProps,
  PatchEvent,
  Path,
  SanityDocument,
  set,
  setIfMissing,
  SlugParent,
  SlugSchemaType,
  SlugSourceContext,
  SlugSourceFn,
  SlugValue,
  unset,
  useFormBuilder,
} from 'sanity'
import { useAsync } from './utils/useAsync'
import { SlugContext, useSlugContext } from './utils/useSlugContext'
import { slugify as sanitySlugify } from './utils/slugify'

/**
 * @beta
 */
export type SlugInputProps = ObjectInputProps<SlugValue, SlugSchemaType>

function getSlugSourceContext(valuePath: Path, document: SanityDocument, context: SlugContext): SlugSourceContext {
  const parentPath = valuePath.slice(0, -1)
  const parent = getValueAtPath(document, parentPath) as SlugParent
  return { parentPath, parent, ...context }
}

// eslint-disable-next-line require-await
async function getNewFromSource(
  source: string | Path | SlugSourceFn,
  document: SanityDocument,
  context: SlugSourceContext,
): Promise<string | undefined> {
  return typeof source === 'function'
    ? source(document, context)
    : (getValueAtPath(document, source as Path) as string | undefined)
}

/**
 * @beta
 */
export function SlugInput(props: SlugInputProps & { prefix: string }) {
  const { getDocument } = useFormBuilder().__internal
  const { path, value, schemaType, validation, onChange, readOnly, elementProps } = props
  const sourceField = schemaType.options?.source
  const errors = useMemo(() => validation.filter((item) => item.level === 'error'), [validation])
  const slugContext = useSlugContext()

  const updateSlug = useCallback(
    async (nextSlug: any) => {
      if (!nextSlug) {
        onChange(PatchEvent.from(unset([])))
        return
      }
      const newSlug = nextSlug
      onChange(PatchEvent.from([setIfMissing({ _type: schemaType.name }), set(newSlug, ['current'])]))
    },
    [onChange, schemaType.name],
  )

  const [generateState, handleGenerateSlug] = useAsync(() => {
    if (!sourceField) {
      return Promise.reject(new Error(`Source is missing. Check source on type "${schemaType.name}" in schema`))
    }

    const doc = getDocument() || ({ _type: schemaType.name } as SanityDocument)
    const sourceContext = getSlugSourceContext(path, doc, slugContext)
    return getNewFromSource(sourceField, doc, sourceContext)
      .then((newFromSource) => sanitySlugify(newFromSource || '', schemaType, sourceContext))
      .then((newSlug) => updateSlug(newSlug))
  }, [path, updateSlug, getDocument, schemaType, slugContext])

  const isUpdating = generateState?.status === 'pending'

  const handleChange = React.useCallback((event: any) => updateSlug(event.currentTarget.value), [updateSlug])

  return (
    <Stack space={3}>
      <Flex>
        <Box flex={1}>
          <TextInput
            customValidity={errors.length > 0 ? errors[0].message : ''}
            disabled={isUpdating}
            onChange={handleChange}
            value={value?.current || ''}
            readOnly={true}
            {...elementProps}
          />

          {generateState?.status === 'error' && (
            <Card padding={2} tone="critical">
              {generateState.error.message}
            </Card>
          )}
        </Box>
        {sourceField && (
          <Box marginLeft={1}>
            <Button
              mode="ghost"
              type="button"
              disabled={readOnly || isUpdating}
              onClick={handleGenerateSlug}
              text={generateState?.status === 'pending' ? 'Generating…' : 'Generate'}
            />
          </Box>
        )}
      </Flex>
    </Stack>
  )
}

export default SlugInput
