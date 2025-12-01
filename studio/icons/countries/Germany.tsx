import type { CSSProperties } from 'react'

const Germany = ({
  width = 30,
  height = 22,
  style,
}: {
  width: number
  height: number
  style?: CSSProperties
}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      id='flag-icons-de'
      viewBox='0 0 640 480'
      width={width}
      height={height}
      style={style}
      preserveAspectRatio='true'
    >
      <path fill='#fc0' d='M0 320h640v160H0z' />
      <path fill='#000001' d='M0 0h640v160H0z' />
      <path fill='red' d='M0 160h640v160H0z' />
    </svg>
  )
}
export default Germany
