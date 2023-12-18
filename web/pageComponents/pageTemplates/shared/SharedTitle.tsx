import styled from 'styled-components'
import TitleText from '../../shared/portableText/TitleText'
import type { PortableTextBlock } from '@portabletext/types'
import type { TitleStyles } from '../../../lib/hooks/useSharedTitleStyles'
import type { BackgroundColours } from 'types'
import { getColorOnContainer, getContainerColor } from '@components'

type SharedTitleProps = {
  title: PortableTextBlock[]
  styles?: TitleStyles
}

const TitleWrapper = styled.div<{ styles?: TitleStyles }>`
  padding: var(--space-xLarge) var(--layout-paddingHorizontal-large) 0 var(--layout-paddingHorizontal-large);

  ${({ styles }) => {
    const bottomSpace = styles?.negativeBottomSpace
      ? {
          'margin-bottom': 'calc(-1 * var(--space-large))',
        }
      : {
          'padding-bottom': 'var(--space-xLarge)',
        }

    // Title's background color is defined by its following component
    const bgColor = styles?.backgroundColor && {
      background: `var(${getContainerColor(styles.backgroundColor)})`,
    }
    return { ...bottomSpace, ...bgColor }
  }}
`

const StyledHeading = styled(TitleText)<{ $bgColor?: BackgroundColours }>`
  max-width: 1186px; /* 1920 - (2 * 367) */
  margin-left: auto;
  margin-right: auto;
  color: var(${({ $bgColor }) => getColorOnContainer($bgColor)}) !important;
`

const SharedTitle = ({ title, styles }: SharedTitleProps) => {
  return (
    <TitleWrapper styles={styles}>
      <StyledHeading $bgColor={styles?.backgroundColor} value={title} level="h1" size="3xl" />
    </TitleWrapper>
  )
}

export default SharedTitle
