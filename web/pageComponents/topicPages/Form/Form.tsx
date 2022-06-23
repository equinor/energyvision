import styled from 'styled-components'
import TitleText from '../../shared/portableText/TitleText'
import IngressText from '../../shared/portableText/IngressText'
import ContactEquinorForm from './ContactEquinorForm'
import SubscribeForm from './SubscribeForm'
import CareerFairForm from './CareerFairForm'
import OrderReportsForm from './OrderReportsForm'
import { Link, BackgroundContainer } from '@components'
import CareersContactForm from './CareersContactForm'

import type { LinkData, FormData } from '../../../types/types'

const StyledHeading = styled(TitleText)`
  padding: 0 0 var(--space-large) 0;
`
const Container = styled.div`
  padding: var(--space-3xLarge) var(--layout-paddingHorizontal-large);
  max-width: var(--maxViewportWidth);
  margin: auto;
`
const ListStyled = styled.div`
  padding-bottom: var(--space-3xLarge);
  font-size: var(--typeScale-1);
`

const Form = ({ data, anchor }: { data: FormData; anchor?: string }) => {
  const { title, ingress, downloads } = data
  const variant = data.form
  const renderForm = (variant: string | undefined) => {
    switch (variant) {
      case 'subscribeForm':
        return <SubscribeForm />
      case 'contactEquinorForm':
        return <ContactEquinorForm />
      case 'careerFairAndVisitsForm':
        return <CareerFairForm />
      case 'careersContactForm':
        return <CareersContactForm />
      case 'orderReportsForm':
        return (
          <>
            <>
              {downloads && (
                <ListStyled>
                  {downloads.length > 0 &&
                    downloads.map((item: LinkData) => {
                      const { id, label, type, extension, ariaLabel } = item
                      const url = item.href + '?' + item.fileName?.replace(/ /g, '-')
                      if (!url) {
                        console.warn(`Missing URL on 'Download' link with type: '${type}' and label: '${label}'`)
                        return null
                      }

                      return (
                        <Link key={id} variant="contentLink" type={type} href={url} aria-label={ariaLabel}>
                          {label} {extension && `(${extension.toUpperCase()})`}
                        </Link>
                      )
                    })}
                </ListStyled>
              )}
            </>
            <OrderReportsForm />
          </>
        )
    }
  }
  return (
    <BackgroundContainer background="White" id={anchor}>
      <Container>
        {title && <StyledHeading value={title} />}
        {ingress && <IngressText value={ingress}></IngressText>}

        {renderForm(variant)}
      </Container>
    </BackgroundContainer>
  )
}
export default Form
