import { forwardRef } from 'react'
import { Button as EdsButton, ButtonProps as EdsButtonProps, Icon } from '@equinor/eds-core-react'
import { Text } from '@components'
import { check } from '@equinor/eds-icons'
import { FormattedMessage } from 'react-intl'
import { twMerge } from 'tailwind-merge'

export const FormSubmitSuccessBox = forwardRef<HTMLDivElement, EdsButtonProps>(function Button({ ...rest }, ref) {
  return (
    <div className={twMerge('border bg-lichen-green-100 border-solid border-moss-green-95 border-[1px] flex p-8')}>
      <Icon className={twMerge('text-moss-green-95 mr-8')} data={check} size={48} />
      <div>
        <Text className={twMerge('text-moss-green-95')} size="md" bold={true}>
          <FormattedMessage id="form_success_title" defaultMessage="Thank you!" />
        </Text>
        <Text>
          <FormattedMessage id="form_success_line1" defaultMessage="Your form was successfully submitted." />
          <br></br>
          <FormattedMessage id="form_success_line2" defaultMessage="You will hear from us shortly." />
        </Text>
        <EdsButton className={twMerge('pl-10 pr-10')} ref={ref} {...rest}>
          <FormattedMessage id="form_success_cta" defaultMessage="Reopen the form" />
        </EdsButton>
      </div>
    </div>
  )
})
