import dynamic from 'next/dynamic'
import { twMerge } from 'tailwind-merge'
import CallToActions from '@/sections/CallToActions'
import Blocks from '../../portableText/Blocks'
import type { FormData } from '../../types/index'

//import CareerFairForm from './CareerFairForm'
//import CareersContactForm from './CareersContactForm'
//import ContactEquinorForm from './ContactEquinorForm'
//import OrderReportsForm from './OrderReportsForm'
//import PensionForm from './PensionForm'
//import SubscribeForm from './SubscribeForm'

const ContactEquinorForm = dynamic(() => import('./ContactEquinorForm'))
const CareersContactForm = dynamic(() => import('./CareersContactForm'))
const CareerFairForm = dynamic(() => import('./CareerFairForm'))
const OrderReportsForm = dynamic(() => import('./OrderReportsForm'))
const PensionForm = dynamic(() => import('./PensionForm'))
const SubscribeForm = dynamic(() => import('./SubscribeForm'))

const Form = ({
  data,
  anchor,
  className,
}: {
  data: FormData
  anchor?: string
  className?: string
}) => {
  const { title, ingress, downloads } = data

  const renderForm = (variant: string | undefined) => {
    console.log('renderForm variant', variant)
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
            {downloads && (
              <div className='pb-10'>
                {downloads.length > 0 && (
                  <CallToActions callToActions={downloads} />
                )}
              </div>
            )}
            <OrderReportsForm />
          </>
        )
      default:
        console.warn(`Missing form component for variant ${variant}`)
        return null
    }
  }

  return (
    <section
      className={twMerge(
        `px-layout-sm pb-page-content lg:px-layout-lg`,
        className,
      )}
      id={anchor}
    >
      {title && <Blocks group='heading' variant='h2' value={title} />}
      {ingress && (
        <Blocks group='paragraph' variant='ingress' value={ingress} />
      )}
      {renderForm(data.form)}
    </section>
  )
}
export default Form
