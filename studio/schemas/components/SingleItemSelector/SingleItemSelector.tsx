import { AddCircleIcon } from '@sanity/icons'
import { Button, Flex, Radio, Text, Tooltip } from '@sanity/ui'
import { customAlphabet } from 'nanoid'
import { useCallback } from 'react'
import { type ArrayOfObjectsInputProps, set } from 'sanity'

const nanoid = customAlphabet('1234567890abcdef', 12)

type SingleItemSelectorProps = {
  value?: [{ _key: string; _type: string }]
} & ArrayOfObjectsInputProps

export const SingleItemSelectorInput = (props: SingleItemSelectorProps) => {
  const { renderDefault, value, schemaType, onChange, members } = props
  const objectTypes = schemaType.of
  const handleClick = useCallback(
    (it: any) => {
      onChange(set([{ _type: it.name, _key: nanoid() }], []))
    },
    [onChange],
  )

  return (
    <>
      {objectTypes.length > 1 ? (
        <Flex align='center' wrap='wrap' gap={3}>
          {objectTypes.map(it => {
            const { icon: Icon } = it
            return Icon ? (
              <Tooltip
                key={it.name}
                content={
                  <Text muted size={1}>
                    {it.title}
                  </Text>
                }
                animate
                fallbackPlacements={['right', 'left']}
                placement='bottom'
                portal
              >
                <Button
                  selected={value && value[0]._type === it.name}
                  fontSize={[2, 2, 3]}
                  iconRight={Icon}
                  padding={[3, 3, 4]}
                  mode='ghost'
                  tone='default'
                  onClick={() => handleClick(it)}
                />
              </Tooltip>
            ) : (
              <div key={`container_${it.name}`}>
                <Radio
                  checked={value && value[0]._type === it.name}
                  onChange={() => handleClick(it)}
                  name={it.name}
                  value={it.name}
                  id={`id_${it.name}`}
                />
                <label htmlFor={`id_${it.name}`}> {it.title} </label>
              </div>
            )
          })}
        </Flex>
      ) : (
        members.length === 0 && (
          <Button
            mode='ghost'
            padding={4}
            icon={AddCircleIcon}
            title={`Add ${objectTypes[0]?.title}`}
            onClick={() => handleClick(objectTypes[0])}
            text={`Add ${objectTypes[0]?.title}`}
          />
        )
      )}

      {renderDefault(props)}
    </>
  )
}
