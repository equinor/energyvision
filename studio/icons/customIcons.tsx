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

export const RouteDocuments = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-labelledby="routeTitle">
    <title id="routeTitle">Route</title>
    <path
      d="M16.675 4H4.325C4.14553 4 4 4.17908 4 4.4V11.6C4 11.8209 4.14553 12 4.325 12H16.675C16.8545 12 17 11.8209 17 11.6V4.4C17 4.17908 16.8545 4 16.675 4Z"
      fill="#007079"
    />
    <path
      d="M43.375 7H19.625C19.2799 7 19 7.02239 19 7.05V7.95C19 7.97761 19.2799 8 19.625 8H43.375C43.7201 8 44 7.97761 44 7.95V7.05C44 7.02239 43.7201 7 43.375 7Z"
      fill="#3D3D3D"
    />
    <path
      d="M23.975 10H23.025C23.0112 10 23 10.1791 23 10.4V17.6C23 17.8209 23.0112 18 23.025 18H23.975C23.9888 18 24 17.8209 24 17.6V10.4C24 10.1791 23.9888 10 23.975 10Z"
      fill="#3D3D3D"
    />
    <path
      d="M42.675 36H30.325C30.1455 36 30 36.1791 30 36.4V43.6C30 43.8209 30.1455 44 30.325 44H42.675C42.8545 44 43 43.8209 43 43.6V36.4C43 36.1791 42.8545 36 42.675 36Z"
      fill="#3D3D3D"
    />
    <path
      d="M29.675 20H17.325C17.1455 20 17 20.1791 17 20.4V27.6C17 27.8209 17.1455 28 17.325 28H29.675C29.8545 28 30 27.8209 30 27.6V20.4C30 20.1791 29.8545 20 29.675 20Z"
      fill="#3D3D3D"
    />
    <path
      d="M36.975 10H36.025C36.0112 10 36 10.5372 36 11.2V32.8C36 33.4628 36.0112 34 36.025 34H36.975C36.9888 34 37 33.4628 37 32.8V11.2C37 10.5372 36.9888 10 36.975 10Z"
      fill="#3D3D3D"
    />
  </svg>
)
export const NewsDocuments = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-labelledby="newsTitle">
    <title id="newsTitle">News</title>
    <path
      d="M16.7 14H5.3C5.13434 14 5 14.2686 5 14.6V25.4C5 25.7314 5.13434 26 5.3 26H16.7C16.8657 26 17 25.7314 17 25.4V14.6C17 14.2686 16.8657 14 16.7 14Z"
      fill="#007079"
    />
    <path
      d="M42.05 9H5.95C5.4254 9 5 9.04477 5 9.1V10.9C5 10.9552 5.4254 11 5.95 11H42.05C42.5746 11 43 10.9552 43 10.9V9.1C43 9.04477 42.5746 9 42.05 9Z"
      fill="#3D3D3D"
    />
    <path
      d="M42.4 13H19.6C19.2687 13 19 13.0448 19 13.1V14.9C19 14.9552 19.2687 15 19.6 15H42.4C42.7313 15 43 14.9552 43 14.9V13.1C43 13.0448 42.7313 13 42.4 13Z"
      fill="#3D3D3D"
    />
    <path
      d="M42.4 17H19.6C19.2687 17 19 17.0448 19 17.1V18.9C19 18.9552 19.2687 19 19.6 19H42.4C42.7313 19 43 18.9552 43 18.9V17.1C43 17.0448 42.7313 17 42.4 17Z"
      fill="#3D3D3D"
    />
    <path
      d="M42.4 21H19.6C19.2687 21 19 21.0448 19 21.1V22.9C19 22.9552 19.2687 23 19.6 23H42.4C42.7313 23 43 22.9552 43 22.9V21.1C43 21.0448 42.7313 21 42.4 21Z"
      fill="#3D3D3D"
    />
    <path
      d="M42.05 29H5.95C5.4254 29 5 29.0448 5 29.1V30.9C5 30.9552 5.4254 31 5.95 31H42.05C42.5746 31 43 30.9552 43 30.9V29.1C43 29.0448 42.5746 29 42.05 29Z"
      fill="#3D3D3D"
    />
    <path
      d="M42.05 33H5.95C5.4254 33 5 33.0448 5 33.1V34.9C5 34.9552 5.4254 35 5.95 35H42.05C42.5746 35 43 34.9552 43 34.9V33.1C43 33.0448 42.5746 33 42.05 33Z"
      fill="#3D3D3D"
    />
    <path
      d="M42.05 37H5.95C5.4254 37 5 37.0448 5 37.1V38.9C5 38.9552 5.4254 39 5.95 39H42.05C42.5746 39 43 38.9552 43 38.9V37.1C43 37.0448 42.5746 37 42.05 37Z"
      fill="#3D3D3D"
    />
  </svg>
)
export const TopicDocuments = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-labelledby="topicTitle">
    <title id="topicTitle">Topic pages</title>
    <path
      d="M42.05 8H5.95C5.4254 8 5 8.31339 5 8.7V21.3C5 21.6866 5.4254 22 5.95 22H42.05C42.5746 22 43 21.6866 43 21.3V8.7C43 8.31339 42.5746 8 42.05 8Z"
      fill="#007079"
    />
    <path
      d="M21.575 26H5.425C5.19031 26 5 26.3134 5 26.7V39.3C5 39.6866 5.19031 40 5.425 40H21.575C21.8097 40 22 39.6866 22 39.3V26.7C22 26.3134 21.8097 26 21.575 26Z"
      fill="#3D3D3D"
    />
    <path
      d="M42.575 26H26.425C26.1903 26 26 26.3134 26 26.7V39.3C26 39.6866 26.1903 40 26.425 40H42.575C42.8097 40 43 39.6866 43 39.3V26.7C43 26.3134 42.8097 26 42.575 26Z"
      fill="#3D3D3D"
    />
  </svg>
)
