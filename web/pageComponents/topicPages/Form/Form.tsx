import TitleText from '../../shared/portableText/TitleText'
import IngressText from '../../shared/portableText/IngressText'
import ContactEquinorForm from './ContactEquinorForm'
import SubscribeForm from './SubscribeForm'
import CareerFairForm from './CareerFairForm'
import OrderReportsForm from './OrderReportsForm'
import CareersContactForm from './careersContactForm/CareersContactForm'
import type { FormData } from '../../../types/index'
import { twMerge } from 'tailwind-merge'
import CallToActions from '@sections/CallToActions'



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
                <div className='pb-10'>
                  {downloads.length > 0 && <CallToActions callToActions={downloads} overrideButtonStyle />}
                </div>
              )}
            </>
            <OrderReportsForm />
          </>
        )
    }
  }

  return (
    <div className={twMerge(`pb-page-content px-layout-lg max-w-viewport mx-auto`, className)} id={anchor}>
      {title && <TitleText className='px-0 pt-0 pr-6' value={title} />}
      {ingress && <IngressText value={ingress}></IngressText>}

      {renderForm(variant)}
    </div>
  )
}
export default Form
