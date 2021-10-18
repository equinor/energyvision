import styled, { css } from 'styled-components'

const ExpandedStyle = css`
  span:nth-child(1) {
    transform: rotate(45deg);
    top: 2px;
    left: 3px;
  }
  span:nth-child(2) {
    transform: rotate(-45deg);
    top: 16px;
    left: 3px;
  }
`

const Icon = styled.span<{ expanded: boolean }>`
  width: 20px;
  height: 20px;
  position: relative;
  overflow: hidden;

  span {
    display: block;
    position: absolute;
    height: 3px;
    width: 100%;
    background: var(--default-text);
    border-radius: 3px;
    left: 0;
    transition: 0.25s ease-in-out;
  }

  span:nth-child(1) {
    top: 5px;
    transform-origin: left center;
  }
  span:nth-child(2) {
    top: 12px;
    transform-origin: left center;
  }

  ${({ expanded }) => expanded && ExpandedStyle}
`

export const MenuIcon = ({ expanded }: { expanded: boolean }) => (
  <Icon className="menuIcon" expanded={expanded} aria-hidden="true">
    <span></span>
    <span></span>
  </Icon>
)
