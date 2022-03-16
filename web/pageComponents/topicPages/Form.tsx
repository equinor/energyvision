import type { FormData } from '../../types/types'
import styled from 'styled-components'
import SimpleBlockContent from '../../common/SimpleBlockContent'
import { TitleBlockRenderer, IngressBlockRenderer } from '../../common/serializers'
import ContactEquinorForm from './ContactEquinorForm'
import SubscribeForm from './SubscribeForm'

const StyledHeading = styled(TitleBlockRenderer)`
  padding: 0 0 var(--space-large) 0;
`
const Container = styled.div`
  padding: var(--space-3xLarge) var(--layout-paddingHorizontal-large);
  max-width: var(--maxViewportWidth);
  margin: auto;
`

const Form = ({ data }: { data: FormData }) => {
  const { title, ingress } = data
  // const forms = content?.forms || []
  const variant = data.form.type

  const renderForm = (variant: string | undefined) => {
    switch (variant) {
      case 'subscribeForm':
        return <SubscribeForm />
      case 'contactEquinorForm':
        return <ContactEquinorForm />
      /* case 'careersContactForm' : return </>
            case 'orderReportsForm' :  return </>
            case 'careerFairAndVisitsForm' : return </>*/
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
                block: (props) => <IngressBlockRenderer centered={true} {...props} />,
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
