const Norway = ({ width = 30, height = 30 }: { width: number; height: number }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 22 16" width={width} height={height}>
      <title>Flag of Norway</title>
      <rect width="22" height="16" fill="#ba0c2f" />
      <path d="M0,8h22M8,0v16" stroke="#fff" strokeWidth="4" />
      <path d="M0,8h22M8,0v16" stroke="#00205b" strokeWidth="2" />
    </svg>
  )
}

export default Norway
