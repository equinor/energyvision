import { Children, isValidElement } from 'react'
import { Text } from './Text'
import styled from 'styled-components'

type ContainerProps = {
  hasImage?: boolean
  dynamicHeight?: boolean
  hasColumns?: boolean
}

export const Container = styled.div<ContainerProps>`
  background-color: var(--background);
  padding: ${({ hasColumns, hasImage }) => 
    hasColumns || hasImage ? 'var(--spacing-large) var(--spacing-large);' : 'var(--spacing-large) var(--layout-paddingHorizontal-large);'
  }

  ul, ol {
    padding-left: 1rem;
  }

  li {
    margin-bottom: var(--space-small);

    &::marker {
      color: var(--moss-green-100);
    }
  }

  margin: 0 calc(var(--spacer-vertical-xxxLarge)*-1);
  grid-area: content;

  ${({ hasImage }) =>
    hasImage && {
      overflowY: 'auto',
      maxHeight: '800px',
    }
  }

  @media (min-width: 800px) {
    ${({ hasImage, dynamicHeight }) => 
      hasImage && !dynamicHeight && {
        height: '800px',
        display: 'flex',
        flexDirection: 'column',
      }
    }
  }
`

// Needed for vertical centering, flex aligmnets don't work well with overflow
const InnerWrapper = styled.div<{ dynamicHeight: boolean }>`
  @media (min-width: 800px) {
    ${({ dynamicHeight }) => 
      !dynamicHeight && {
        margin: 'auto 0'
      }
    }
  }
`

type ContentProps = {
  hasImage?: boolean
  dynamicHeight?: boolean
}

export const Content: React.FC<ContentProps> = ({ hasImage = false, dynamicHeight = false, children }) => {
  const FactText = Children.map(children, child => {
    if (isValidElement(child) && child.type === Text) return child
  })

  if (hasImage) {
    return (
      <Container hasImage dynamicHeight={dynamicHeight}>
        <InnerWrapper dynamicHeight={dynamicHeight}>
          {children}
        </InnerWrapper>
      </Container>
    )
  }

  return <Container hasColumns={FactText && FactText[0].props.hasColumns} hasImage={hasImage} dynamicHeight={dynamicHeight}>{children}</Container>
}
