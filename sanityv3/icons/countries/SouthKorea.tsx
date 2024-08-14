const SouthKorea = ({ width = 30, height = 30 }: { width: number; height: number }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      id="flag-icons-kr"
      viewBox="0 0 640 480"
      width={width}
      height={height}
    >
      <defs>
        <clipPath id="kr-a">
          <path fillOpacity=".7" d="M-95.8-.4h682.7v512H-95.8z" />
        </clipPath>
      </defs>
      <g fillRule="evenodd" clipPath="url(#kr-a)" transform="translate(89.8 .4)scale(.9375)">
        <path fill="#fff" d="M-95.8-.4H587v512H-95.8Z" />
        <g transform="rotate(-56.3 361.6 -101.3)scale(10.66667)">
          <g id="kr-c">
            <path id="kr-b" fill="#000001" d="M-6-26H6v2H-6Zm0 3H6v2H-6Zm0 3H6v2H-6Z" />
            <use xlinkHref="#kr-b" width="100%" height="100%" y="44" />
          </g>
          <path stroke="#fff" d="M0 17v10" />
          <path fill="#cd2e3a" d="M0-12a12 12 0 0 1 0 24Z" />
          <path fill="#0047a0" d="M0-12a12 12 0 0 0 0 24A6 6 0 0 0 0 0Z" />
          <circle cy="-6" r="6" fill="#cd2e3a" />
        </g>
        <g transform="rotate(-123.7 191.2 62.2)scale(10.66667)">
          <use xlinkHref="#kr-c" width="100%" height="100%" />
          <path stroke="#fff" d="M0-23.5v3M0 17v3.5m0 3v3" />
        </g>
      </g>
    </svg>
  )
}
export default SouthKorea
