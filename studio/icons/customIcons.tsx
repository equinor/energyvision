import React from 'react'

export const IconSuperScript = (): JSX.Element => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24">
      <g>
        <rect fill="none" height="24" width="24" x="0" y="0" />
        <path d="M22,7h-2v1h3v1h-4V7c0-0.55,0.45-1,1-1h2V5h-3V4h3c0.55,0,1,0.45,1,1v1C23,6.55,22.55,7,22,7z M5.88,20h2.66l3.4-5.42h0.12 l3.4,5.42h2.66l-4.65-7.27L17.81,6h-2.68l-3.07,4.99h-0.12L8.85,6H6.19l4.32,6.73L5.88,20z" />
      </g>
    </svg>
  )
}

export const IconSubScript = (): JSX.Element => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24">
      <g>
        <rect fill="none" height="24" width="24" />
        <path d="M22,18h-2v1h3v1h-4v-2c0-0.55,0.45-1,1-1h2v-1h-3v-1h3c0.55,0,1,0.45,1,1v1C23,17.55,22.55,18,22,18z M5.88,18h2.66 l3.4-5.42h0.12l3.4,5.42h2.66l-4.65-7.27L17.81,4h-2.68l-3.07,4.99h-0.12L8.85,4H6.19l4.32,6.73L5.88,18z" />
      </g>
    </svg>
  )
}

export const FullSizeImage = (): JSX.Element => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby="fullSizeTitle"
  >
    <title id="fullSizeTitle">Full size</title>

    <path d="M43 15H27" stroke="#3D3D3D" strokeWidth="2" />
    <path d="M43 21H27" stroke="#3D3D3D" strokeWidth="2" />
    <path d="M43 27H27" stroke="#3D3D3D" strokeWidth="2" />
    <path d="M43 33H27" stroke="#3D3D3D" strokeWidth="2" />
    <path
      d="M23.5 14H4.5C4.22386 14 4 14.4477 4 15V33C4 33.5523 4.22386 34 4.5 34H23.5C23.7761 34 24 33.5523 24 33V15C24 14.4477 23.7761 14 23.5 14Z"
      fill="#3D3D3D"
    />
  </svg>
)

export const SmallSizeImage = (): JSX.Element => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby="smallSizeTitle"
  >
    <title id="smallSizeTitle">Small size</title>
    <path d="M43 15H27" stroke="#3D3D3D" strokeWidth="2" />
    <path d="M43 21H27" stroke="#3D3D3D" strokeWidth="2" />
    <path d="M43 27H27" stroke="#3D3D3D" strokeWidth="2" />
    <path d="M43 33H27" stroke="#3D3D3D" strokeWidth="2" />
    <path
      d="M18.7 18H7.3C7.13432 18 7 18.2686 7 18.6V29.4C7 29.7314 7.13432 30 7.3 30H18.7C18.8657 30 19 29.7314 19 29.4V18.6C19 18.2686 18.8657 18 18.7 18Z"
      fill="#3D3D3D"
    />
  </svg>
)

export const LeftAlignedImage = (): JSX.Element => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    aria-labelledby="leftAlignedTitle"
    fill="#3d3d3d"
    stroke="#3d3d3d"
    strokeWidth="2"
  >
    <title id="leftAlignedTitle">Left aligned</title>
    <path d="M43 15H27" />
    <path d="M43 21H27" />
    <path d="M43 27H27" />
    <path d="M43 33H27" />
    <path d="M23.525 14H5.475C5.21267 14 5 14.4477 5 15V33C5 33.5523 5.21267 34 5.475 34H23.525C23.7873 34 24 33.5523 24 33V15C24 14.4477 23.7873 14 23.525 14Z" />
  </svg>
)

export const RightAlignedImage = (): JSX.Element => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    aria-labelledby="rightAlignedTitle"
    fill="#3d3d3d"
    stroke="#3d3d3d"
    strokeWidth="2"
  >
    <title id="rightAlignedTitle">Right aligned</title>
    <path d="M21 15H5" />
    <path d="M21 21H5" />
    <path d="M21 27H5" />
    <path d="M21 33H5" />
    <path d="M42.525 14H24.475C24.2127 14 24 14.4477 24 15V33C24 33.5523 24.2127 34 24.475 34H42.525C42.7873 34 43 33.5523 43 33V15C43 14.4477 42.7873 14 42.525 14Z" />
  </svg>
)

export const InlineImageFullWidth = (): JSX.Element => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    role="img"
    fill="#3d3d3d"
    stroke="#3d3d3d"
    strokeWidth="2"
    aria-labelledby="fullWidthTitle"
  >
    <title id="fullWidthTitle">Full width</title>
    <path d="M40 9H8" />
    <path d="M40 39H8" />
    <path d="M42.05 14H5.95C5.42533 14 5 14.4477 5 15V33C5 33.5523 5.42533 34 5.95 34H42.05C42.5747 34 43 33.5523 43 33V15C43 14.4477 42.5747 14 42.05 14Z" />
  </svg>
)

export const InlineImageLeftAlign = (): JSX.Element => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="#3d3d3d"
    stroke="#3d3d3d"
    strokeWidth="2"
    aria-labelledby="leftAlignedTitle"
  >
    <title id="leftAlignedTitle">Left aligned</title>
    <path d="M43 9H8" />
    <path d="M43 15H27" />
    <path d="M43 21H27" />
    <path d="M43 27H27" />
    <path d="M43 33H27" />
    <path d="M43 39H8" />
    <path d="M23.525 14H5.475C5.21267 14 5 14.4477 5 15V33C5 33.5523 5.21267 34 5.475 34H23.525C23.7873 34 24 33.5523 24 33V15C24 14.4477 23.7873 14 23.525 14Z" />
  </svg>
)

export const InlineImageRightAlign = (): JSX.Element => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="#3d3d3d"
    stroke="#3d3d3d"
    strokeWidth="2"
    aria-labelledby="rightAlignedTitle"
  >
    <title id="rightAlignedTitle">Right aligned</title>
    <path d="M40 9H5" />
    <path d="M21 15H5" />
    <path d="M21 21H5" />
    <path d="M21 27H5" />
    <path d="M21 33H5" />
    <path d="M40 39H5" />
    <path d="M42.525 14H24.475C24.2127 14 24 14.4477 24 15V33C24 33.5523 24.2127 34 24.475 34H42.525C42.7873 34 43 33.5523 43 33V15C43 14.4477 42.7873 14 42.525 14Z" />
  </svg>
)
