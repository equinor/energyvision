const Germany = ({ width = 30, height = 30 }: { width: number; height: number }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-de" viewBox="0 0 640 480" width={width} height={height}>
      <path fill="#fc0" d="M0 320h640v160H0z" />
      <path fill="#000001" d="M0 0h640v160H0z" />
      <path fill="red" d="M0 160h640v160H0z" />
    </svg>
  )
}
export default Germany
