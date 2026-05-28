import { check, error_outlined } from '@equinor/eds-icons'
import { getTranslations } from 'next-intl/server'
import { forwardRef, type HTMLAttributes } from 'react'
import { Button } from '@/core/Button'
import { Typography } from '@/core/Typography'
import { TransformableIcon } from '../../icons/TransformableIcon'

type Variant = 'success' | 'error'

type FormMessageBoxProps = {
  variant?: Variant
  onClick?: () => void
} & HTMLAttributes<HTMLDivElement>

export const FormMessageBox = forwardRef<HTMLDivElement, FormMessageBoxProps>(
  async function FormMessageBox(
    { variant = 'success', onClick, ...rest },
    ref,
  ) {
    const variantClassName: Partial<Record<Variant, string>> = {
      success: 'border-norwegian-woods-100',
      error: 'border-energy-red-100',
    }

    const t = await getTranslations()
    return (
      <div
        ref={ref}
        {...rest}
        className={`flex gap-6 border-2 px-6 py-4 ${variantClassName[variant]}`}
      >
        <TransformableIcon
          iconData={variant === 'success' ? check : error_outlined}
          size={48}
          className={`mt-2 mr-8 ${variant === 'success' ? 'fill-norwegian-woods-100' : 'fill-energy-red-100'}`}
        />
        <div>
          <Typography variant='body' className='font-semibold text-md'>
            {variant === 'success'
              ? t('form_success_title')
              : t('form_failure_title')}
          </Typography>
          <Typography variant='body'>
            {variant === 'success' ? (
              <>
                {t('form_success_line1')}
                {t('form_success_line2')}
              </>
            ) : (
              <>
                {t('form_failure_line1')}
                {t('form_failure_line2')}
              </>
            )}
          </Typography>
          {variant === 'error' && (
            <Button
              variant='outlined-secondary'
              {...(variant === 'error' &&
                onClick && {
                  onClick,
                })}
              type='button'
              className='mt-4'
            >
              {t('form_failure_cta')}
            </Button>
          )}
        </div>
      </div>
    )
  },
)
