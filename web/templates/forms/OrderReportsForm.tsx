'use client'
import { Icon } from '@equinor/eds-core-react'
import { useForm, Controller } from 'react-hook-form'
import { error_filled } from '@equinor/eds-icons'
import { BaseSyntheticEvent, useState } from 'react'
import FriendlyCaptcha from './FriendlyCaptcha'
import { Button } from '@core/Button'
import { Checkbox } from '@core/Checkbox/Checkbox'
import { TextField } from '@core/TextField/TextField'
import { FormMessageBox } from '@core/Form/FormMessageBox'
import { useTranslations } from 'next-intl'

type FormValues = {
  name: string
  email: string
  company: string
  address: string
  zipcode: string
  city: string
  country: string
  reports: string[]
}

const OrderReportsForm = () => {
  const intl = useTranslations()
  const [isFriendlyChallengeDone, setIsFriendlyChallengeDone] = useState(false)
  const [isServerError, setServerError] = useState(false)
  const [isSuccessfullySubmitted, setSuccessfullySubmitted] = useState(false)

  const Checkboxes = () => {
    return (
      <>
        <li>
          <Checkbox
            label={intl('order_reports_checkbox_option_annualReport_label')}
            value="annualReport"
            aria-invalid={errors.reports ? 'true' : 'false'}
            aria-describedby="atleast-one-report-required"
            {...register('reports')}
            {...register('reports', {
              validate: (values) => values.length > 0,
            })}
          />
        </li>
        <li>
          <Checkbox
            label={intl('order_reports_checkbox_option_statutoryReport_label')}
            value="statutoryReport"
            aria-invalid={errors.reports ? 'true' : 'false'}
            aria-describedby="atleast-one-report-required"
            {...register('reports')}
          />
        </li>
      </>
    )
  }

  const {
    handleSubmit,
    control,
    reset,
    register,
    setError,
    formState: { errors, isSubmitSuccessful, isSubmitted, isSubmitting },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      company: '',
      zipcode: '',
      address: '',
      city: '',
      reports: [],
      country: '',
    },
  })

  const onSubmit = async (data: FormValues, event?: BaseSyntheticEvent) => {
    if (isFriendlyChallengeDone) {
      const res = await fetch('/api/forms/service-now-order-reports', {
        body: JSON.stringify({
          data,
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
        <div className="pb-6 text-sm">{intl('all_fields_mandatory')} </div>
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
              {!errors.reports && (
                <legend className="text-base font-semibold max-w-text">
                  {`${intl('order_reports_form_choose')}*`}
                </legend>
              )}
              {errors.reports && (
                <div
                  className="text-slate-80 border border-clear-red-100 px-6 py-4 text-sm font-semibold items-center flex gap-2"
                  role="alert"
                  id="atleast-one-report-required"
                >
                  <Icon data={error_filled} aria-hidden="true" />
                  <legend className="leading-none mt-1">{`${intl('order_reports_form_choose')}*`}</legend>
                </div>
              )}
              <ul>
                <Checkboxes />
              </ul>
            </fieldset>
            <Controller
              name="name"
              control={control}
              rules={{
                required: intl('name_validation'),
              }}
              render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
                <TextField
                  {...props}
                  id={props.name}
                  label={`${intl('name')}*`}
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
            <Controller
              name="company"
              control={control}
              rules={{
                required: intl('order_reports_form_company_validation'),
              }}
              render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
                <TextField
                  {...props}
                  id={props.name}
                  label={`${intl('order_reports_form_company')}*`}
                  inputRef={ref}
                  aria-required="true"
                  inputIcon={invalid ? <Icon data={error_filled} title="error" /> : undefined}
                  helperText={error?.message}
                  {...(invalid && { variant: 'error' })}
                />
              )}
            />
            <Controller
              name="address"
              control={control}
              rules={{
                required: intl('order_reports_form_address_validation'),
              }}
              render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
                <TextField
                  {...props}
                  id={props.name}
                  label={`${intl('order_reports_form_address')}*`}
                  inputRef={ref}
                  inputIcon={invalid ? <Icon data={error_filled} title="error" /> : undefined}
                  helperText={error?.message}
                  aria-required="true"
                  {...(invalid && { variant: 'error' })}
                />
              )}
            />

            <Controller
              name="zipcode"
              control={control}
              rules={{
                required: intl('order_reports_form_zipcode_validation'),
              }}
              render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
                <TextField
                  {...props}
                  id={props.name}
                  label={`${intl('order_reports_form_zipcode')}*`}
                  inputRef={ref}
                  inputIcon={invalid ? <Icon data={error_filled} title="error" /> : undefined}
                  helperText={error?.message}
                  aria-required="true"
                  {...(invalid && { variant: 'error' })}
                />
              )}
            />

            <Controller
              name="city"
              control={control}
              rules={{
                required: intl('order_reports_form_city_validation'),
              }}
              render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
                <TextField
                  {...props}
                  id={props.name}
                  aria-required="true"
                  label={`${intl('order_reports_form_city')}*`}
                  inputIcon={invalid ? <Icon data={error_filled} title="error" /> : undefined}
                  helperText={error?.message}
                  inputRef={ref}
                  {...(invalid && { variant: 'error' })}
                />
              )}
            />
            <Controller
              name="country"
              control={control}
              rules={{
                required: intl('order_reports_form_country_validation'),
              }}
              render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
                <TextField
                  {...props}
                  id={props.name}
                  label={`${intl('order_reports_form_country')}*`}
                  aria-required="true"
                  inputRef={ref}
                  inputIcon={invalid ? <Icon data={error_filled} title="error" /> : undefined}
                  helperText={error?.message}
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
                  <Icon data={error_filled} aria-hidden="true" />
                </p>
              )}
            </div>
            <Button type="submit">{isSubmitting ? intl('form_sending') : intl('order_reports_form_cta')}</Button>
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
export default OrderReportsForm
