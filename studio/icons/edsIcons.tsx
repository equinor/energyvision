import React from 'react'
import { list, IconData } from '@equinor/eds-icons'

import SvgIcon from './SvgIcon'

export const EdsList = (): JSX.Element => {
  return <SvgIcon icon={list} />
}

export const EdsIcon = (icon: IconData): JSX.Element => {
  return <SvgIcon icon={icon} />
}
