// Sanity studio chrashed without this React import. :/
// And it wasn't satisfied with the React 17 way of importing either :/
// eslint-disable-next-line import/default
import React from 'react'
import type { IconData } from '@equinor/eds-icons'

type IconProps = {
  icon: IconData
  width?: string
  height?: string
}

const SvgIcon = ({ icon, width = '24', height = '24' }: IconProps): JSX.Element => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24">
      <path d={icon.svgPathData} fillRule="evenodd" clipRule="evenodd" />
    </svg>
  )
}

export default SvgIcon
