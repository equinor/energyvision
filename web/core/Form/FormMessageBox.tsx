import { forwardRef, HTMLAttributes } from 'react'
import { check, error_outlined } from '@equinor/eds-icons'
import { FormattedMessage } from 'react-intl'
import { TransformableIcon } from '../../icons/TransformableIcon'
import { Typography } from '@core/Typography'
import { Button } from '@core/Button'

type Variant = 'success' | 'error'

type FormMessageBoxProps = {
  variant?: Variant
  onClick?: () => void
} & HTMLAttributes<HTMLDivElement>

export const FormMessageBox = forwardRef<HTMLDivElement, FormMessageBoxProps>(function FormMessageBox(
  { variant = 'success', onClick, ...rest },
  ref,
) {
  const variantClassName: Partial<Record<Variant, string>> = {
    success: 'border-norwegian-woods-100',
    error: 'border-energy-red-100',
  }
  return (
    <div ref={ref} {...rest} className={`flex gap-6 px-6 py-4 border-2 ${variantClassName[variant]}`}>
      <TransformableIcon
        iconData={variant === 'success' ? check : error_outlined}
        size={48}
        className={`mt-2 mr-8 ${variant === 'success' ? 'fill-norwegian-woods-100' : 'fill-energy-red-100'}`}
      />
      <div>
        <Typography variant="body" className="text-md font-semibold">
          {variant === 'success' ? (
            <FormattedMessage id="form_success_title" defaultMessage="Thank you!" />
          ) : (
            <FormattedMessage id="form_failure_title" defaultMessage="Sorry, something went wrong!" />
          )}
        </Typography>
        <Typography variant="body">
          {variant === 'success' ? (
            <>
              <FormattedMessage id="form_success_line1" defaultMessage="Your form was successfully submitted. " />{' '}
              <FormattedMessage id="form_success_line2" defaultMessage="You will hear from us shortly." />
            </>
          ) : (
            <>
              <FormattedMessage id="form_failure_line1" defaultMessage=" The form was not submitted." />{' '}
              <FormattedMessage id="form_failure_line2" defaultMessage="Please try again." />
            </>
          )}
        </Typography>
        <Button
          variant="outlined-secondary"
          {...(variant === 'error' &&
            onClick && {
              onClick,
            })}
          type={variant === 'success' ? 'reset' : 'button'}
          className="mt-4"
        >
          {variant === 'success' ? (
            <FormattedMessage id="form_failure_cta" defaultMessage="Try again" />
          ) : (
            <FormattedMessage id="form_success_cta" defaultMessage="Reopen the form" />
          )}
        </Button>
      </div>
    </div>
  )
})
