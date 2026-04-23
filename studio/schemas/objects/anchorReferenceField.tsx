/* eslint-disable @typescript-eslint/ban-ts-comment */

import { Card, Flex, Select } from '@sanity/ui'
import { useCallback, useMemo } from 'react'
import { type Rule, set, useFormValue } from 'sanity'
import { validateAnchorReference } from '../validations/validateAnchorReference'

export const AnchorReferenceFieldInput = (props: any) => {
  const { onChange, value = '' } = props
  const document = useFormValue([])

  const anchorLinkComponentReferences = useMemo(() => {
    return document
      ? //@ts-ignore: typing
        document?.content
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
          Select from anchor links in this document
        </label>
        <Select id='anchorReferenceList' value={value} onChange={handleChange}>
          <option key='' value=''>
            Select an anchor link
          </option>
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

export default {
  name: 'anchorReferenceField',
  title: 'Anchor reference',
  type: 'string',
  components: {
    input: AnchorReferenceFieldInput,
  },
  // @ts-ignore - possible error in sanity with CustomValidatorResult
  validation: (Rule: Rule) =>
    //@ts-ignore
    Rule.custom((value: string) => validateAnchorReference(value)),
}
