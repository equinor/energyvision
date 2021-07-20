/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */

// custom implementation of @sanity/form-builder/src/inputs/ArrayInput/ArrayFunctions.tsx

import React from 'react'
import DropDownButton from 'part:@sanity/components/buttons/dropdown'
import Button from 'part:@sanity/components/buttons/default'
import ButtonGrid from 'part:@sanity/components/buttons/button-grid'

type ArrayType = any
type ItemValue = any
type PatchEvent = any

type Props = {
  type: ArrayType
  children: Node | null
  value: Array<ItemValue>
  readOnly: boolean | null
  onAppendItem: (itemValue: ItemValue) => void
  onPrependItem: (itemValue: ItemValue) => void
  onFocusItem: (item: ItemValue) => void
  onCreateValue: (type: any) => ItemValue
  onChange: (event: PatchEvent) => void
}

const ArrayFunctions = (props: Props) => {
  const { type, readOnly, children, value, onCreateValue, onAppendItem } = props

  if (readOnly) return null

  const maxLength = type.validation[0]._rules.find((rule: any) => rule.flag === 'max')

  if (maxLength && value && value.length >= maxLength.constraint) {
    return null
  }

  const handleInsertItem = (type: any) => {
    const item = onCreateValue(type)
    onAppendItem(item)
  }

  const handleDropDownAction = (menuItem: any) => {
    handleInsertItem(menuItem.type)
  }

  const handleAddBtnClick = () => {
    handleInsertItem(props.type.of[0])
  }

  const renderSelectType = () => {
    const items = type.of.map((memberDef: any) => ({
      title: memberDef.title || memberDef.type.name,
      type: memberDef,
    }))
    return (
      <DropDownButton inverted items={items} onAction={handleDropDownAction}>
        Add
      </DropDownButton>
    )
  }

  return (
    <div>
      <ButtonGrid align="start">
        {type.of.length === 1 ? (
          <Button inverted onClick={handleAddBtnClick}>
            Add
          </Button>
        ) : (
          renderSelectType()
        )}

        {children || null}
      </ButtonGrid>
    </div>
  )
}

export default ArrayFunctions
