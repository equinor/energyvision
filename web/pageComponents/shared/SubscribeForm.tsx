import type { SubscribeFormData} from '../../types/types'

const SubscribeForm = ({data: {heading , formType}} : { data : SubscribeFormData}) =>{
    return <div>
        ${heading} ${formType}
    </div>
}
export default SubscribeForm