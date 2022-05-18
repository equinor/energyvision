import { NextSeo } from 'next-seo'
import styled from 'styled-components'
import { toPlainText } from '@portabletext/react'
import { Heading, Text } from '@components'
import RichText from '../shared/portableText/RichText'
import isEmpty from '../shared/portableText/helpers/isEmpty'
import BackgroundImage from '../errorPages/BackgroundImage'
import type { ErrorPageData } from '../../types/types'
import { metaTitleSuffix } from '../../languages'

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
      <NextSeo
        title={`${pageData?.documentTitle} - ${metaTitleSuffix}`}
        description={pageData?.metaDescription}
      ></NextSeo>
      <BodyContainer>
        {backgroundImage && <BackgroundImage backgroundImage={backgroundImage} />}
        <TextWrapper>
          <StyledHeading level="h1" size="2xl">
            <MegaText>404</MegaText>
            {title && <span>{toPlainText(title)}</span>}
          </StyledHeading>
          {text && (
            <TextContainer>
              <RichText
                components={{
                  block: {
                    // Overriding the h2
                    h2: ({ children }) => (
                      <Heading level="h2" size="xl">
                        {children}
                      </Heading>
                    ),
                    normal: ({ children }) => {
                      // eslint-disable-next-line
                      // @ts-ignore: Still struggling with the types here :/
                      if (isEmpty(children)) return null
                      return <Text style={{ fontSize: 'var(--typeScale-3)' }}>{children}</Text>
                    },
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
