import type { SubscribeFormParameters } from '../../../types/index'
import { Icon } from '@equinor/eds-core-react'
import { useForm, Controller } from 'react-hook-form'
import { error_filled } from '@equinor/eds-icons'
import { useRouter } from 'next/router'
import { FormattedMessage, useIntl } from 'react-intl'
import { FormSubmitSuccessBox, FormTextField, FormSubmitFailureBox, Checkbox } from '@components'
import { BaseSyntheticEvent, useState } from 'react'
import FriendlyCaptcha from './FriendlyCaptcha'
import { Button } from '@core/Button'

type FormValues = {
  firstName: string
  email: string
  categories: string[]
}

const SubscribeForm = () => {
  const router = useRouter()
  const intl = useIntl()
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
        languageCode: router.locale == 'en' ? 'en' : 'no',
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
        message: intl.formatMessage({
          id: 'form_antirobot_validation_required',
          defaultMessage: 'Anti-Robot verification is required',
        }),
      })
    }
  }

  return (
    <>
      {!isSuccessfullySubmitted && !isServerError && (
        <div className="pt-8 pb-6 text-sm">
          <FormattedMessage id="all_fields_mandatory" defaultMessage="All fields with *  are mandatory" />
        </div>
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
                  <FormattedMessage
                    id="subscribe_form_choose"
                    defaultMessage="Please choose one or more of the following"
                  />
                </legend>
              )}
              {errors.categories && (
                <div
                  className="text-clear-red-100 text-sm font-semibold items-center flex gap-2"
                  role="alert"
                  id="atleast-one-category-required"
                >
                  <legend>
                    <FormattedMessage
                      id="subscribe_form_choose"
                      defaultMessage="Please choose one or more of the following"
                    />
                  </legend>
                  <Icon data={error_filled} aria-hidden="true" />
                </div>
              )}
              <ul>
                <li>
                  <Checkbox
                    label={intl.formatMessage({
                      id: 'subscribe_form_general_news',
                      defaultMessage: 'General News',
                    })}
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
                    label={intl.formatMessage({
                      id: 'subscribe_form_magazine_stories',
                      defaultMessage: 'Magazine stories',
                    })}
                    aria-invalid={errors.categories ? 'true' : 'false'}
                    aria-describedby="atleast-one-category-required"
                    value="magazineStories"
                    aria-required
                    {...register('categories')}
                  />
                </li>
                <li>
                  <Checkbox
                    label={intl.formatMessage({
                      id: 'subscribe_form_stock_market',
                      defaultMessage: 'Stock market announcements',
                    })}
                    value="stockMarketAnnouncements"
                    aria-invalid={errors.categories ? 'true' : 'false'}
                    aria-describedby="atleast-one-category-required"
                    aria-required
                    {...register('categories')}
                  />
                </li>
                <li>
                  <Checkbox
                    label={intl.formatMessage({
                      id: 'subscribe_form_cruide_oil',
                      defaultMessage: 'Crude oil assays',
                    })}
                    aria-invalid={errors.categories ? 'true' : 'false'}
                    aria-describedby="atleast-one-category-required"
                    value="crudeOilAssays"
                    aria-required
                    {...register('categories')}
                  />
                </li>
                <li>
                  <Checkbox
                    label={intl.formatMessage({
                      id: 'subscribe_form_all',
                      defaultMessage: 'All',
                    })}
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
                required: intl.formatMessage({
                  id: 'email_validation',
                  defaultMessage: 'Please fill out a valid email address',
                }),
                pattern: {
                  value: /^[\w!#$%&'*+/=?`{|}~^-]+(?:\.[\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/g,
                  message: intl.formatMessage({
                    id: 'email_validation',
                    defaultMessage: 'Please fill out a valid email address',
                  }),
                },
              }}
              render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
                <FormTextField
                  {...props}
                  id={props.name}
                  label={`${intl.formatMessage({
                    id: 'email',
                    defaultMessage: 'Email',
                  })}*`}
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
                <p role="alert" className="text-clear-red-100 flex gap-2 font-semibold">
                  {/*@ts-ignore: TODO: types*/}
                  <span className="mt-1">{errors.root.notCompletedCaptcha.message}</span>
                  <Icon data={error_filled} aria-hidden="true" />
                </p>
              )}
            </div>
            <Button type="submit">
              {isSubmitting ? (
                <FormattedMessage id="form_sending" defaultMessage={'Sending...'}></FormattedMessage>
              ) : (
                <FormattedMessage id="subscribe_form_cta" defaultMessage={'Subscribe'} />
              )}
            </Button>
          </>
        )}
        {isSubmitSuccessful && !isServerError && <FormSubmitSuccessBox type="reset" />}
        {isSubmitted && isServerError && (
          <FormSubmitFailureBox
            type="button"
            onClick={() => {
              reset(undefined, { keepValues: true })
              setServerError(false)
            }}
          />
        )}
      </form>
    </>
  )
}
export default SubscribeForm
