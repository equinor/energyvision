import styled from 'styled-components'
import TitleText from '../../shared/portableText/TitleText'
import IngressText from '../../shared/portableText/IngressText'
import ContactEquinorForm from './ContactEquinorForm'
import SubscribeForm from './SubscribeForm'
import CareerFairForm from './CareerFairForm'
import OrderReportsForm from './OrderReportsForm'
import { BackgroundContainer } from '@components'
import CareersContactForm from './CareersContactForm'
import ReadMoreLink from '../../shared/ReadMoreLink'

import type { LinkData, FormData } from '../../../types/types'
import { twMerge } from 'tailwind-merge'

const StyledHeading = styled(TitleText)`
  padding: 0 0 var(--space-large) 0;
`

const ListStyled = styled.div`
  padding-bottom: var(--space-3xLarge);
  font-size: var(--typeScale-1);
`

const Form = ({ data, anchor, className }: { data: FormData; anchor?: string; className?: string }) => {
  const { title, ingress, downloads } = data
  const variant = data.form
  const renderForm = (variant: string | undefined) => {
    switch (variant) {
      case 'subscribeForm':
        return <SubscribeForm />
      case 'contactEquinorForm':
        return <ContactEquinorForm isHumanRightsRequest={data.isHumanRightsRequest} />
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
                      return <ReadMoreLink key={item.id} action={item} variant="contentLink" />
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
    <div className={twMerge(`pb-page-content px-layout-lg max-w-viewport mx-auto`, className)} id={anchor}>
      {title && <StyledHeading value={title} />}
      {ingress && <IngressText value={ingress}></IngressText>}

      {renderForm(variant)}
    </div>
  )
}
export default Form
