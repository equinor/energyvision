/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SubscribeFormParameters } from '../../../types/types'
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
  const [isServerError, setServerError] = useState(false)
  const [isFriendlyChallengeDone, setIsFriendlyChallengeDone] = useState(false)
  const [isSuccessfullySubmitted, setSuccessfullySubmitted] = useState(false)

  const {
    handleSubmit,
    reset,
    control,
    register,
    setError,
    formState: { errors, isSubmitting, isSubmitted, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      firstName: '',
      email: '',
      categories: [],
      notCompletedCaptcha: '',
    },
  })

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
      setError('notCompletedCaptcha', { type: 'custom', message: 'Anti-Robot Verification is required' })
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => {
        reset()
        setSuccessfullySubmitted(false)
        setIsFriendlyChallengeDone(false)
      }}
      className="pt-6 flex flex-col gap-4"
    >
      {!isSuccessfullySubmitted && !isServerError && (
        <>
          <div className="pb-4 text-base">
            <FormattedMessage id="all_fields_mandatory" defaultMessage="All fields with *  are mandatory" />
          </div>
          <fieldset>
            {!errors.categories && (
              <legend className="text-base font-semibold max-w-text" id="atleast-one-category-required">
                <FormattedMessage
                  id="subscribe_form_choose"
                  defaultMessage="Please choose one or more of the following"
                />
                *
              </legend>
            )}
            {errors.categories && (
              <div
                className="text-clear-red-100 text-base font-semibold flex gap-2"
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

            <ul className="columns-1 lg:columns-2">
              {/*             <li>
                <Checkbox
                  label={intl.formatMessage({
                    id: 'select_all',
                    defaultMessage: 'Select all',
                  })}
                  value="all"
                  onChange={handleSelectAll}
                />
              </li> */}
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
            name="firstName"
            control={control}
            rules={{
              required: intl.formatMessage({
                id: 'subscribe_form_name_validation',
                defaultMessage: 'Please fill out your name',
              }),
            }}
            render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
              <FormTextField
                {...props}
                id={props.name}
                label={`${intl.formatMessage({
                  id: 'subscribe_form_first_name',
                  defaultMessage: 'First name',
                })}*`}
                inputRef={ref}
                aria-required="true"
                inputIcon={invalid ? <Icon data={error_filled} title="error" /> : undefined}
                helperText={error?.message}
                {...(invalid && { variant: 'error' })}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            rules={{
              required: intl.formatMessage({
                id: 'subscribe_form_email_validation',
                defaultMessage: 'Please fill out a valid email address',
              }),
              pattern: {
                value: /^[\w!#$%&'*+/=?`{|}~^-]+(?:\.[\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/g,
                message: intl.formatMessage({
                  id: 'subscribe_form_email_validation',
                  defaultMessage: 'Please fill out a valid email address',
                }),
              },
            }}
            render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
              <FormTextField
                {...props}
                id={props.name}
                label={`${intl.formatMessage({
                  id: 'subscribe_form_email',
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
          {errors.notCompletedCaptcha && (
            <p role="alert" className="text-clear-red-100 flex gap-2 font-semibold">
              {errors.notCompletedCaptcha.message}
              <Icon data={error_filled} aria-hidden="true" />
            </p>
          )}
          <FriendlyCaptcha
            doneCallback={() => {
              setIsFriendlyChallengeDone(true)
            }}
            errorCallback={(error: any) => {
              console.error('FriendlyCaptcha encountered an error', error)
            }}
          />
          <Button type="submit" className="mt-4">
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
  )
}
export default SubscribeForm
