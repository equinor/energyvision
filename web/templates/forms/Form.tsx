import dynamic from 'next/dynamic'
import { twMerge } from 'tailwind-merge'
import CallToActions from '@/sections/CallToActions'
import Blocks from '../../portableText/Blocks'
import type { FormData } from '../../types/index'

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
    <section className={twMerge(`pb-page-content`, className)} id={anchor}>
      <div className='mx-auto max-w-content px-layout-sm lg:px-layout-lg'>
        {title && <Blocks group='heading' variant='h2' value={title} />}
        {ingress && (
          <Blocks group='paragraph' variant='ingress' value={ingress} />
        )}
        {renderForm(data.form)}
      </div>
    </section>
  )
}
export default Form
