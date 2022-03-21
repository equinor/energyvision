import { NextSeo } from 'next-seo'
import styled from 'styled-components'
import { toPlainText } from '@portabletext/react'
import { Heading, Text } from '@components'
import SimpleBlockContent from '../../common/portableText/SimpleBlockContent'
import BackgroundImage from '../errorPages/BackgroundImage'
import type { ErrorPageData } from '../../types/types'

const TextWrapper = styled.div`
  position: relative;
  padding: 4rem var(--layout-paddingHorizontal-medium) var(--space-xLarge) var(--layout-paddingHorizontal-medium);
`
const TextContainer = styled.div``

const MegaText = styled.span`
  font-size: 5rem;
  display: block;
  font-weight: var(--fontWeight-medium);
  color: var(--slate-blue-80);
`
const StyledHeading = styled(Heading)`
  margin-bottom: var(--space-xLarge);
`

const BodyContainer = styled.div`
  position: relative;
`

const ErrorPage = ({ pageData }: { pageData: ErrorPageData }) => {
  if (!pageData) return null
  const { title = '', text = '', backgroundImage } = pageData

  return (
    <>
      <NextSeo title={pageData?.documentTitle} description={pageData?.metaDescription}></NextSeo>
      <BodyContainer>
        {backgroundImage && <BackgroundImage backgroundImage={backgroundImage} />}
        <TextWrapper>
          <StyledHeading level="h1" size="2xl">
            <MegaText>404</MegaText>
            {title && <span>{toPlainText(title)}</span>}
          </StyledHeading>
          {text && (
            <TextContainer>
              <SimpleBlockContent
                components={{
                  block: {
                    // Overriding the h2
                    h2: ({ children }) => (
                      <Heading level="h2" size="xl">
                        {children}
                      </Heading>
                    ),
                    normal: ({ children }) => <Text style={{ fontSize: 'var(--typeScale-3)' }}>{children}</Text>,
                  },
                }}
                value={text}
              />
            </TextContainer>
          )}
        </TextWrapper>
      </BodyContainer>
    </>
  )
}
export default ErrorPage
