import styled from 'styled-components'

type ContainerProps = {
  hasImage?: boolean
  dynamicHeight?: boolean
  hasColumns?: boolean
}

export const Container = styled.div<ContainerProps>`
  background-color: var(--background);
  padding: var(--space-large) var(--space-large);
  h2,
  h3 {
    margin: var(--space-small) 0;
  }
  ul,
  ol {
    padding-left: var(--space-medium);
  }

  li {
    margin-bottom: var(--space-small);

    &::marker {
      color: var(--moss-green-100);
    }
  }

  margin: 0 calc(var(--spacer-vertical-xxxLarge) * -1);
  grid-area: content;

  ${({ hasImage }) =>
    hasImage && {
      overflowY: 'auto',
      maxHeight: '800px',
    }}

  @media (min-width: 800px) {
    ${({ hasImage, dynamicHeight }) =>
      hasImage &&
      !dynamicHeight && {
        height: '800px',
        display: 'flex',
        flexDirection: 'column',
      }}
  }
`

// Needed for vertical centering, flex aligmnets don't work well with overflow
const InnerWrapper = styled.div<{ dynamicHeight: boolean }>`
  @media (min-width: 800px) {
    ${({ dynamicHeight }) =>
      !dynamicHeight && {
        margin: 'auto 0',
      }}
  }
`

type ContentProps = {
  hasImage?: boolean
  dynamicHeight?: boolean
}

export const Content: React.FC<ContentProps> = ({ hasImage = false, dynamicHeight = false, children, ...rest }) => {
  if (hasImage) {
    return (
      <Container hasImage dynamicHeight={dynamicHeight} {...rest}>
        <InnerWrapper dynamicHeight={dynamicHeight}>{children}</InnerWrapper>
      </Container>
    )
  }

  return (
    <Container hasImage={hasImage} dynamicHeight={dynamicHeight} {...rest}>
      {children}
    </Container>
  )
}
