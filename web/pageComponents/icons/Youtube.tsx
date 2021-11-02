const Youtube = ({ width = 51, height = 32 }: { width?: number; height?: number }) => {
  return (
    <svg viewBox="0 0 51 32" xmlns="http://www.w3.org/2000/svg" width={width} height={height}>
      <g clipPath="url(#clip0_2639:72508)">
        <path d="M44.6 0H6.2C2.8 0 0 2.8 0 6.2V25.4C0 28.8 2.8 31.6 6.2 31.6H44.6C48 31.6 50.8 28.8 50.8 25.4V6.2C50.8 2.8 48 0 44.6 0ZM31 16.3L22.5 21.2C22.4 21.3 21.2 21.3 21.1 21.3C21 21.3 21.9 21.3 21.8 21.2C21.6 21.1 21.4 20.8 21.4 20.5V10.7C21.4 10.4 21.5 10.2 21.8 10C22 9.9 22.3 9.9 22.6 10L31.1 14.9C31.3 15 31.5 15.3 31.5 15.6C31.3 15.9 31.2 16.1 31 16.3Z" />
      </g>
      <defs>
        <clipPath id="clip0_2639:72508">
          <rect width="50.8" height="31.7" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default Youtube
