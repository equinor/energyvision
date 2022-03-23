import type { FormData } from '../../../types/types'
import styled from 'styled-components'
import SimpleBlockContent from '../../../common/SimpleBlockContent'
import { TitleBlockRenderer, IngressBlockRenderer } from '../../../common/serializers'
import ContactEquinorForm from './ContactEquinorForm'
import SubscribeForm from './SubscribeForm'
import CareerFairForm from './CareerFairForm'
import OrderReportsForm from './OrderReportsForm'
import { Link } from '@components'
import { LinkData } from '../../../types/types'
import CareersContactForm from './CareersContactForm'

const StyledHeading = styled(TitleBlockRenderer)`
  padding: 0 0 var(--space-large) 0;
`
const Container = styled.div`
  padding: var(--space-3xLarge) var(--layout-paddingHorizontal-large);
  max-width: var(--maxViewportWidth);
  margin: auto;
`
const ListStyled = styled.div`
  padding-bottom: var(--space-3xLarge);
`

const Form = ({ data }: { data: FormData }) => {
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
    <>
      <Container>
        {title && (
          <SimpleBlockContent
            blocks={title}
            serializers={{
              types: {
                block: (props) => <StyledHeading {...props} />,
              },
            }}
          />
        )}
        {ingress && (
          <SimpleBlockContent
            blocks={ingress}
            serializers={{
              types: {
                block: (props) => <IngressBlockRenderer centered={false} {...props} />,
              },
            }}
          ></SimpleBlockContent>
        )}

        {renderForm(variant)}
      </Container>
    </>
  )
}
export default Form
