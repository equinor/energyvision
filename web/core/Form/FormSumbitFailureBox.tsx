import { ButtonProps as EdsButtonProps, Icon } from '@equinor/eds-core-react'
import { Text } from '@components'
import { error_outlined } from '@equinor/eds-icons'
import { FormattedMessage } from 'react-intl'
import { twMerge } from 'tailwind-merge'
import { Button as FormButton } from '@core/Button'
import { forwardRef } from 'react'

export const FormSubmitFailureBox = forwardRef<HTMLDivElement, EdsButtonProps>(function Button() {
  return (
    <div className={twMerge('border border-solid border-energy-red-100 border-[1px] flex p-8')}>
      <Icon className={twMerge('text-energy-red-100 mr-8')} data={error_outlined} size={48} />
      <div>
        <Text size="md" bold={true}>
          <FormattedMessage id="form_failure_title" defaultMessage="Sorry, something went wrong!" />
        </Text>
        <Text>
          <FormattedMessage id="form_failure_line1" defaultMessage=" The form was not submitted. " />
          <br></br>
          <FormattedMessage id="form_failure_line2" defaultMessage="Please try again." />
        </Text>
        {/* <EdsButton className={twMerge('pl-10 pr-10')} ref={ref} {...rest} color="danger">
          <FormattedMessage id="form_failure_cta" defaultMessage="Try again" />
        </EdsButton> */}
        <FormButton variant="contained" className={twMerge('pl-10 pr-10')}>
          <FormattedMessage id="form_failure_cta" defaultMessage="Try again" />
        </FormButton>
      </div>
    </div>
  )
})
