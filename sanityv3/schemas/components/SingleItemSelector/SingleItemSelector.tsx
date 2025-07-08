import { Flex, Button } from '@sanity/ui'
import { ArrayOfObjectsInputProps, set } from 'sanity'
import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('1234567890abcdef', 12)

type SingleItemSelectorProps = {
  value?: [{ _key: string; _type: string }]
} & ArrayOfObjectsInputProps

export const SingleItemSelectorInput = (props: SingleItemSelectorProps) => {
  const { renderDefault, value, schemaType, onChange } = props

  const objectTypes = schemaType.of

  return (
    <>
      {objectTypes.length > 1 && (
        <Flex align="center" wrap="wrap">
          {objectTypes.map((it) => {
            const { icon: Icon } = it
            return (
              <Button
                selected={value && value[0]._type === it.name}
                fontSize={[2, 2, 3]}
                iconRight={Icon}
                padding={[3, 3, 4]}
                text=""
                mode="ghost"
                tone="default"
                onClick={() => onChange(set([{ _type: it.name, _key: nanoid() }], []))}
              />
            )
          })}
        </Flex>
      )}
      {renderDefault(props)}
    </>
  )
}
