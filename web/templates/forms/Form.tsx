import ContactEquinorForm from './ContactEquinorForm'
import SubscribeForm from './SubscribeForm'
import CareerFairForm from './CareerFairForm'
import OrderReportsForm from './OrderReportsForm'
import CareersContactForm from './CareersContactForm'
import type { FormData } from '../../types/index'
import { twMerge } from 'tailwind-merge'
import CallToActions from '@/sections/CallToActions'
import PensionForm from './PensionForm'
import { Heading } from '@/core/Typography'
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
    <div className={twMerge(`mx-auto max-w-viewport px-layout-lg pb-page-content`, className)} id={anchor}>
      {title && <Heading as="h2" className="px-0 pt-0 pr-6" value={title} />}
      {ingress && <Blocks value={ingress} />}

      {renderForm(variant)}
    </div>
  )
}
export default Form
