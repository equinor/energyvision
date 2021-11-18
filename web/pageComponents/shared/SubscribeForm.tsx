import type { SubscribeFormData} from '../../types/types'
import styled from 'styled-components'
import SimpleBlockContent from '../../common/SimpleBlockContent'
import { TitleBlockRenderer } from '../../common/serializers'


const StyledHeading = styled(TitleBlockRenderer)`
  padding: 0 0 var(--space-large) 0;
`

const SubscribeForm = ({data: {title , formType}} : { data : SubscribeFormData}) =>{
    return <div>
    {title && (
          <SimpleBlockContent
            blocks={title}
            serializers={{
              types: {
                block: (props) => <StyledHeading {...props} />,
              },
            }}
          />
        )} {formType}
    </div>
}
export default SubscribeForm