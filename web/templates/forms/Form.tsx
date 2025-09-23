import ContactEquinorForm from './ContactEquinorForm'
import SubscribeForm from './SubscribeForm'
import CareerFairForm from './CareerFairForm'
import OrderReportsForm from './OrderReportsForm'
import CareersContactForm from './CareersContactForm'
import type { FormData } from '../../types/index'
import { twMerge } from 'tailwind-merge'
import CallToActions from '@/sections/CallToActions'
import PensionForm from './PensionForm'
import Blocks from '../../portableText/Blocks'

const Form = ({ data, anchor, className }: { data: FormData; anchor?: string; className?: string }) => {
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
      case 'pensionForm':
        return <PensionForm />
      case 'orderReportsForm':
        return (
          <>
            <>
              {downloads && (
                <div className="pb-10">{downloads.length > 0 && <CallToActions callToActions={downloads} />}</div>
              )}
            </>
            <OrderReportsForm />
          </>
        )
    }
  }

  return (
    <section className={twMerge(`px-layout-sm pb-page-content lg:px-layout-lg`, className)} id={anchor}>
      {title && <Blocks variant="h2" value={title} />}
      {ingress && <Blocks variant="ingress" value={ingress} />}
      {renderForm(variant)}
    </section>
  )
}
export default Form
