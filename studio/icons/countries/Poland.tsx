import type { CSSProperties } from 'react'

const Poland = ({
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
      id='flag-icons-pl'
      viewBox='0 0 640 480'
      width={width}
      height={height}
      style={style}
      preserveAspectRatio='true'
    >
      <g fillRule='evenodd'>
        <path fill='#fff' d='M640 480H0V0h640z' />
        <path fill='#dc143c' d='M640 480H0V240h640z' />
      </g>
    </svg>
  )
}
export default Poland
