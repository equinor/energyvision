'use client'
import type { SubscribeFormParameters } from '../../types/index'
import { Icon } from '@equinor/eds-core-react'
import { useForm, Controller } from 'react-hook-form'
import { error_filled } from '@equinor/eds-icons'
import { BaseSyntheticEvent, useState } from 'react'
import FriendlyCaptcha from './FriendlyCaptcha'
import { Button } from '@/core/Button'
import { Checkbox } from '@/core/Checkbox/Checkbox'
import { TextField } from '@/core/TextField/TextField'
import { FormMessageBox } from '@/core/Form/FormMessageBox'
import { useLocale, useTranslations } from 'next-intl'

type FormValues = {
  firstName: string
  email: string
  categories: string[]
}

const SubscribeForm = () => {
  const locale = useLocale()
  const intl = useTranslations()
  const [isFriendlyChallengeDone, setIsFriendlyChallengeDone] = useState(false)
  const [isServerError, setServerError] = useState(false)
  const [isSuccessfullySubmitted, setSuccessfullySubmitted] = useState(false)

  const {
    handleSubmit,
    reset,
    control,
    register,
    setError,
    formState: { errors, isSubmitting, isSubmitted, isSubmitSuccessful },
  } = useForm({ defaultValues: { firstName: '', email: '', categories: [] } })

  const onSubmit = async (data: FormValues, event?: BaseSyntheticEvent) => {
    if (isFriendlyChallengeDone) {
      const allCategories = data.categories.includes('all')
      const subscribeFormParamers: SubscribeFormParameters = {
        firstName: data.firstName,
        email: data.email,
        crudeOilAssays: allCategories || data.categories.includes('crudeOilAssays'),
        generalNews: allCategories || data.categories.includes('generalNews'),
        stockMarketAnnouncements: allCategories || data.categories.includes('stockMarketAnnouncements'),
        magazineStories: allCategories || data.categories.includes('magazineStories'),
        languageCode: locale == 'en' ? 'en' : 'no',
      }

      const res = await fetch('/api/subscribe-form', {
        body: JSON.stringify({
          subscribeFormParamers,
          frcCaptchaSolution: (event?.target as any)['frc-captcha-solution'].value,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })
      setServerError(res.status != 200)
      setSuccessfullySubmitted(res.status == 200)
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
      {!isSuccessfullySubmitted && !isServerError && (
        <div className="pt-8 pb-6 text-sm">{intl('all_fields_mandatory')} </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        onReset={() => {
          reset()
          setIsFriendlyChallengeDone(false)
          setSuccessfullySubmitted(false)
        }}
        className="flex flex-col gap-12"
      >
        {!isSuccessfullySubmitted && !isServerError && (
          <>
            <fieldset className="p-0 pb-4">
              {!errors.categories && (
                <legend id="atleast-one-category-required" className="text-base font-semibold max-w-text">
                  {intl('subscribe_form_choose')}*
                </legend>
              )}
              {errors.categories && (
                <div
                  className="text-slate-80 border border-clear-red-100 px-6 py-4 text-sm font-semibold items-center flex gap-2"
                  role="alert"
                  id="atleast-one-category-required"
                >
                  <legend>{intl('subscribe_form_choose')}</legend>
                  <Icon data={error_filled} aria-hidden="true" />
                </div>
              )}
              <ul>
                <li>
                  <Checkbox
                    label={intl('subscribe_form_general_news')}
                    value="generalNews"
                    aria-describedby="atleast-one-category-required"
                    {...register('categories', {
                      validate: (values) => values.length > 0,
                    })}
                    aria-required
                    aria-invalid={errors.categories ? 'true' : 'false'}
                  />
                </li>
                <li>
                  <Checkbox
                    label={intl('subscribe_form_magazine_stories')}
                    aria-invalid={errors.categories ? 'true' : 'false'}
                    aria-describedby="atleast-one-category-required"
                    value="magazineStories"
                    aria-required
                    {...register('categories')}
                  />
                </li>
                <li>
                  <Checkbox
                    label={intl('subscribe_form_stock_market')}
                    value="stockMarketAnnouncements"
                    aria-invalid={errors.categories ? 'true' : 'false'}
                    aria-describedby="atleast-one-category-required"
                    aria-required
                    {...register('categories')}
                  />
                </li>
                <li>
                  <Checkbox
                    label={intl('subscribe_form_cruide_oil')}
                    aria-invalid={errors.categories ? 'true' : 'false'}
                    aria-describedby="atleast-one-category-required"
                    value="crudeOilAssays"
                    aria-required
                    {...register('categories')}
                  />
                </li>
                <li>
                  <Checkbox
                    label={intl('subscribe_form_all')}
                    aria-invalid={errors.categories ? 'true' : 'false'}
                    aria-describedby="atleast-one-category-required"
                    value="all"
                    aria-required
                    {...register('categories')}
                  />
                </li>
              </ul>
            </fieldset>
            <Controller
              name="email"
              control={control}
              rules={{
                required: intl('email_validation'),
                pattern: {
                  value: /^[\w!#$%&'*+/=?`{|}~^-]+(?:\.[\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/g,
                  message: intl('email_validation'),
                },
              }}
              render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
                <TextField
                  {...props}
                  id={props.name}
                  label={`${intl('email')}*`}
                  inputRef={ref}
                  inputIcon={invalid ? <Icon data={error_filled} title="error" /> : undefined}
                  helperText={error?.message}
                  aria-required="true"
                  {...(invalid && { variant: 'error' })}
                />
              )}
            />
            <div className="flex flex-col gap-2">
              <FriendlyCaptcha
                doneCallback={() => {
                  setIsFriendlyChallengeDone(true)
                }}
                errorCallback={(error: any) => {
                  console.error('FriendlyCaptcha encountered an error', error)
                  setIsFriendlyChallengeDone(true)
                }}
              />
              {/*@ts-ignore: TODO: types*/}
              {errors?.root?.notCompletedCaptcha && (
                <p
                  role="alert"
                  className="text-slate-80 border border-clear-red-100 px-6 py-4 flex gap-2 font-semibold"
                >
                  {/*@ts-ignore: TODO: types*/}
                  <span className="mt-1">{errors.root.notCompletedCaptcha.message}</span>
                  <Icon data={error_filled} aria-label="Error Icon" />
                </p>
              )}
            </div>
            <Button type="submit">{isSubmitting ? intl('form_sending') : intl('subscribe_form_cta')}</Button>
          </>
        )}
        <div role="region" aria-live="assertive">
          {isSubmitSuccessful && !isServerError && <FormMessageBox variant="success" />}
          {isSubmitted && isServerError && (
            <FormMessageBox
              variant="error"
              onClick={() => {
                reset(undefined, { keepValues: true })
                setServerError(false)
              }}
            />
          )}
        </div>
      </form>
    </>
  )
}
export default SubscribeForm
