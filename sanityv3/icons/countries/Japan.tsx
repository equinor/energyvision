const Japan = ({ width = 30, height = 31 }: { width: number; height: number }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-jp" viewBox="0 0 640 480" width={width} height={height}>
      <defs>
        <clipPath id="jp-a">
          <path fillOpacity=".7" d="M-88 32h640v480H-88z" />
        </clipPath>
      </defs>
      <g fillRule="evenodd" strokeWidth="1pt" clipPath="url(#jp-a)" transform="translate(88 -32)">
        <path fill="#fff" d="M-128 32h720v480h-720z" />
        <circle cx="523.1" cy="344.1" r="194.9" fill="#bc002d" transform="translate(-168.4 8.6)scale(.76554)" />
      </g>
    </svg>
  )
}
export default Japan
