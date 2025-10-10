import {StringInputProps, set} from 'sanity'
import {Button, Label, Flex} from '@sanity/ui'
import {createElement, useCallback} from 'react'

type RadioIconSelectorOption = {
  value: string
  icon: () => JSX.Element
}

type RadioInputProps = {
  options: RadioIconSelectorOption[]
} & StringInputProps

export function RadioInput(props: RadioInputProps) {
  const {options, value, onChange} = props

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const nextValue = event.currentTarget.value
      onChange(set(nextValue))
    },
    [onChange],
  )

  return (
    <Flex gap={3}>
      {options.map((option) => (
        <Button
          key={option.value}
          value={option.value}
          mode={value === option.value ? `default` : `ghost`}
          tone={value === option.value ? `primary` : `default`}
          padding={[2, 2, 3]}
          onClick={handleClick}
        >
          <Flex gap={2} align="center">
            {createElement(option.icon)}
            <Label>{option.value}</Label>
          </Flex>
        </Button>
      ))}
    </Flex>
  )
}
