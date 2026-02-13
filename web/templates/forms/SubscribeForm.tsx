'use client'
import { Icon } from '@equinor/eds-core-react'
import { error_filled } from '@equinor/eds-icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocale, useTranslations } from 'next-intl'
import { type BaseSyntheticEvent, useId, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import type * as z from 'zod'
import {
  type newsletterCategoryLocale,
  subscribe,
} from '@/app/_actions/subscription.actions'
import { Button } from '@/core/Button'
import { Checkbox } from '@/core/Checkbox/Checkbox'
import { FormMessageBox } from '@/core/Form/FormMessageBox'
import { TextField } from '@/core/TextField/TextField'
import { subscribeSchema } from '@/lib/zodSchemas/zodSchemas'
import { getLocaleFromIso } from '@/sanity/helpers/localization'
import FriendlyCaptcha from './FriendlyCaptcha'

const SubscribeForm = () => {
  const locale = useLocale()
  const intl = useTranslations()
  const [isFriendlyChallengeDone, setIsFriendlyChallengeDone] = useState(false)
  const [isServerError, setServerError] = useState(false)
  const [isSuccessfullySubmitted, setSuccessfullySubmitted] = useState(false)
  const formId = useId()

  const {
    handleSubmit,
    reset,
    control,
    register,
    setError,
    formState: { errors, isSubmitting, isSubmitted, isSubmitSuccessful },
  } = useForm({
    resolver: zodResolver(subscribeSchema),
    defaultValues: { email: '', categories: [] },
  })

  const onSubmit = async (
    formData: z.infer<typeof subscribeSchema>,
    event?: BaseSyntheticEvent,
  ) => {
    if (isFriendlyChallengeDone) {
      console.log('locale', locale)
      const res = await subscribe({
        locale: getLocaleFromIso(locale) as newsletterCategoryLocale,
        frcCaptchaSolution: (event?.target as any)['frc-captcha-response']
          .value,
        formData,
      })
      console.log('subscribe res', res)

      /*       const res = await fetch('/api/newsletter/subscription', {
        body: JSON.stringify({
          data,
          languageCode: locale === 'en' ? 'en' : 'no',
          frcCaptchaSolution: (event?.target as any)['frc-captcha-response']
            .value,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      }) */
      if (res?.status) {
        setSuccessfullySubmitted(res.status)
      } else {
        setServerError(!res?.status)
      }
    } else {
      //@ts-ignore: TODO: types
      setError('root.notCompletedCaptcha', {
        type: 'custom',
        message: intl('form_antirobot_validation_required'),
      })
    }
  }

  return (
    <>
      {!isSuccessfullySubmitted && (
        <>
          <div className='pt-8 pb-6 text-sm'>
            {intl('all_fields_mandatory')}
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            onReset={() => {
              reset()
              setIsFriendlyChallengeDone(false)
              setSuccessfullySubmitted(false)
            }}
            className='flex flex-col gap-12'
          >
            {!isSuccessfullySubmitted && !isServerError && (
              <>
                <fieldset className='p-0 pb-4'>
                  {!errors.categories && (
                    <legend
                      id='atleast-one-category-required'
                      className='max-w-text font-semibold text-base'
                    >
                      {intl('subscribe_form_choose')}*
                    </legend>
                  )}
                  {errors.categories && (
                    <div
                      className='flex items-center gap-2 border border-clear-red-100 px-6 py-4 font-semibold text-slate-80 text-sm'
                      role='alert'
                      id='atleast-one-category-required'
                    >
                      <legend>{intl('subscribe_form_choose')}</legend>
                      <Icon data={error_filled} aria-hidden='true' />
                    </div>
                  )}
                  <ul>
                    <li>
                      <Checkbox
                        label={intl('subscribe_form_general_news')}
                        value='generalNews'
                        aria-describedby='atleast-one-category-required'
                        {...register('categories')}
                        aria-invalid={errors.categories ? 'true' : 'false'}
                      />
                    </li>
                    <li>
                      <Checkbox
                        label={intl('subscribe_form_magazine_stories')}
                        aria-invalid={errors.categories ? 'true' : 'false'}
                        aria-describedby='atleast-one-category-required'
                        value='magazineStories'
                        {...register('categories')}
                      />
                    </li>
                    <li>
                      <Checkbox
                        label={intl('subscribe_form_stock_market')}
                        value='stockMarketAnnouncements'
                        aria-invalid={errors.categories ? 'true' : 'false'}
                        aria-describedby='atleast-one-category-required'
                        {...register('categories')}
                      />
                    </li>
                    <li>
                      <Checkbox
                        label={intl('subscribe_form_cruide_oil')}
                        aria-invalid={errors.categories ? 'true' : 'false'}
                        aria-describedby='atleast-one-category-required'
                        value='crudeOilAssays'
                        {...register('categories')}
                      />
                    </li>
                  </ul>
                </fieldset>
                <Controller
                  name='email'
                  control={control}
                  render={({
                    field: { ref, ...props },
                    fieldState: { invalid, error },
                  }) => (
                    <TextField
                      {...props}
                      id={`${props.name}_${formId}`}
                      label={`${intl('email')}*`}
                      inputRef={ref}
                      inputIcon={
                        invalid ? (
                          <Icon data={error_filled} title='error' />
                        ) : undefined
                      }
                      helperText={error?.message}
                      aria-required='true'
                      {...(invalid && { variant: 'error' })}
                    />
                  )}
                />
                <div className='flex flex-col gap-2'>
                  <FriendlyCaptcha
                    doneCallback={() => {
                      setIsFriendlyChallengeDone(true)
                    }}
                    errorCallback={(error: any) => {
                      console.error(
                        'FriendlyCaptcha encountered an error',
                        error,
                      )
                      setIsFriendlyChallengeDone(true)
                    }}
                  />
                  {/*@ts-ignore: TODO: types*/}
                  {errors?.root?.notCompletedCaptcha && (
                    <p
                      role='alert'
                      className='flex gap-2 border border-clear-red-100 px-6 py-4 font-semibold text-slate-80'
                    >
                      {/*@ts-ignore: TODO: types*/}
                      <span className='mt-1'>
                        {errors.root.notCompletedCaptcha.message}
                      </span>
                      <Icon data={error_filled} aria-label='Error Icon' />
                    </p>
                  )}
                </div>
                <Button type='submit'>
                  {isSubmitting
                    ? intl('form_sending')
                    : intl('subscribe_form_cta')}
                </Button>
              </>
            )}
          </form>
        </>
      )}
      <section aria-live='assertive'>
        {isSubmitSuccessful && <FormMessageBox variant='success' />}
        {isSubmitted && isServerError && (
          <FormMessageBox
            variant='error'
            onClick={() => {
              reset(undefined, { keepValues: true })
              setServerError(false)
            }}
          />
        )}
      </section>
    </>
  )
}
export default SubscribeForm
