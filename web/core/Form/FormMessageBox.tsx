import { forwardRef, HTMLAttributes } from 'react'
import { check, error_outlined } from '@equinor/eds-icons'
import { TransformableIcon } from '../../icons/TransformableIcon'
import { Typography } from '@core/Typography'
import { Button } from '@core/Button'
import { useTranslations } from 'next-intl'

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
  const t = useTranslations()
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
            t("form_success_title")
          ) : (
            t("form_failure_title")
          )}
        </Typography>
        <Typography variant="body">
          {variant === 'success' ? (
            <>
            {t("form_success_line1")}
             {t("form_success_line2")}
           </>
          ) : (
            <> {t("form_failure_line1")}
             {t("form_failure_line2")}
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
         t("form_failure_cta" )
          ) : (
            t("form_success_cta")
          )}
        </Button>
      </div>
    </div>
  )
})
