import { Card, Flex, Select } from '@sanity/ui'
import { useCallback, useMemo } from 'react'
import { set, useFormValue } from 'sanity'

export const PageAnchorInput = (props: any) => {
  const { onChange, value = '' } = props
  const document = useFormValue([])

  const anchorLinkComponentReferences = useMemo(() => {
    return document
      ? document?.content
          .filter((item: any) => item?.anchor || item?.anchorReference)
          .map((item: any) => item.anchor || item.anchorReference)
      : []
  }, [document])

  const handleChange = useCallback(
    (event: any) => {
      const nextValue = event.currentTarget.value
      onChange(set(nextValue))
    },
    [onChange],
  )

  return (
    <Card padding={3}>
      <Flex direction='column' justify='center'>
        <label htmlFor='anchorReferenceList' className='text-base'>
          Select from Anchor Link components in this document
        </label>
        <Select id='anchorReferenceList' value={value} onChange={handleChange}>
          {anchorLinkComponentReferences.map((referenceString: any) => (
            <option key={referenceString} value={referenceString}>
              {referenceString}
            </option>
          ))}
        </Select>
      </Flex>
    </Card>
  )
}
