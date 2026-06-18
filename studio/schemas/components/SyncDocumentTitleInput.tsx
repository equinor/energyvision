import {
  type DatasetsKeys,
  getMetaTitleSuffix,
} from '@energyvision/shared/satelliteConfig'
import { useEffect } from 'react'
import {
  type PortableTextBlock,
  type StringInputProps,
  set,
  useFormValue,
} from 'sanity'
import blocksToText from '../../helpers/blocksToText'

type ParentTitleValue = PortableTextBlock[] | string | undefined

const toPlainText = (title: ParentTitleValue) => {
  if (Array.isArray(title)) {
    const value = blocksToText(title)
    return typeof value === 'string' ? value.trim() : ''
  }

  if (typeof title === 'string') {
    return title.trim()
  }

  return ''
}

export const SyncDocumentTitleInput = (props: StringInputProps) => {
  const { onChange, path } = props
  const parentTitle = useFormValue(['title']) as ParentTitleValue
  const currentValue = useFormValue(path) as string | undefined
  const dataset =
    (process.env.SANITY_STUDIO_API_DATASET as DatasetsKeys) ||
    ('global' as DatasetsKeys)
  const titlePrefix = getMetaTitleSuffix(dataset)

  useEffect(() => {
    const nextValue = toPlainText(parentTitle)
    const prefixedValue = `${titlePrefix} - ${nextValue}`

    if (!nextValue || prefixedValue === currentValue) {
      return
    }

    onChange(set(prefixedValue))
  }, [currentValue, onChange, parentTitle, titlePrefix])

  return props.renderDefault(props)
}
