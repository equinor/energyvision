import { Text } from '@components'
import { check } from '@equinor/eds-icons'
import { FormattedMessage } from 'react-intl'
import { twMerge } from 'tailwind-merge'
import { Button as FormButton } from '@core/Button'
import { forwardRef } from 'react'
import { ButtonProps as EdsButtonProps, Icon } from '@equinor/eds-core-react'

export const FormSubmitSuccessBox = forwardRef<HTMLDivElement, EdsButtonProps>(function Button() {
  return (
    <div className={twMerge('border bg-lichen-green-100 border-solid border-moss-green-95 border-[1px] flex p-8')}>
      <Icon className={twMerge('text-moss-green-95 mr-8')} data={check} size={48} />
      <div>
        <p className={twMerge('text-moss-green-95 text-md font-bold mb-6 leading-cloudy')}>
          <FormattedMessage id="form_success_title" defaultMessage="Thank you!" />
        </p>
        <Text>
          <FormattedMessage id="form_success_line1" defaultMessage="Your form was successfully submitted." />
          <br></br>
          <FormattedMessage id="form_success_line2" defaultMessage="You will hear from us shortly." />
        </Text>
        {/* <EdsButton className={twMerge('pl-10 pr-10')} ref={ref} {...rest}>
          <FormattedMessage id="form_success_cta" defaultMessage="Reopen the form" />
        </EdsButton> */}
        <FormButton variant="contained" className={twMerge('pl-10 pr-10')}>
          <FormattedMessage id="form_success_cta" defaultMessage="Reopen the form" />
        </FormButton>
      </div>
    </div>
  )
})
