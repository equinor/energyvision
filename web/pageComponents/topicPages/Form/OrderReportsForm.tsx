import { Icon } from '@equinor/eds-core-react'
import { useForm, Controller } from 'react-hook-form'
import { error_filled } from '@equinor/eds-icons'
import { FormattedMessage, useIntl } from 'react-intl'
import { FormTextField, FormSubmitFailureBox, FormSubmitSuccessBox, Checkbox } from '@components'
import { BaseSyntheticEvent, useState } from 'react'
import FriendlyCaptcha from './FriendlyCaptcha'
import { Button } from '@core/Button'

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
  const intl = useIntl()
  const [isFriendlyChallengeDone, setIsFriendlyChallengeDone] = useState(false)
  const [isServerError, setServerError] = useState(false)
  const [isSuccessfullySubmitted, setSuccessfullySubmitted] = useState(false)

  const Checkboxes = () => {
    return (
      <>
        <li>
          <Checkbox
            label={intl.formatMessage({
              id: 'order_reports_checkbox_option_annualReport_label',
              defaultMessage: 'Annual report (english version)',
            })}
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
            label={intl.formatMessage({
              id: 'order_reports_checkbox_option_statutoryReport_label',
              defaultMessage: 'Annual report (norwegian version)',
            })}
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
        <div className="pb-6 text-sm">
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
              {!errors.reports && (
                <legend className="text-base font-semibold max-w-text">
                  <FormattedMessage
                    id="order_reports_form_choose"
                    defaultMessage="Please choose atleast one of the following reports"
                  />
                  {`*`}
                </legend>
              )}
              {errors.reports && (
                <div
                  className="text-clear-red-100 text-sm font-semibold items-center flex gap-2"
                  role="alert"
                  id="atleast-one-report-required"
                >
                  <Icon data={error_filled} aria-hidden="true" />
                  <legend className="leading-none mt-1">
                    <FormattedMessage
                      id="order_reports_form_choose"
                      defaultMessage="Please select atleast one of the reports"
                    />
                    {`*`}
                  </legend>
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
                required: intl.formatMessage({
                  id: 'order_reports_form_name_validation',
                  defaultMessage: 'Please enter your name',
                }),
              }}
              render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
                <FormTextField
                  {...props}
                  id={props.name}
                  label={`${intl.formatMessage({
                    id: 'order_reports_form_name',
                    defaultMessage: 'Name',
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
                  id: 'order_reports_form_email_validation',
                  defaultMessage: 'Please fill out a valid email address',
                }),
                pattern: {
                  value: /^[\w!#$%&'*+/=?`{|}~^-]+(?:\.[\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/g,
                  message: intl.formatMessage({
                    id: 'order_reports_form_email_validation',
                    defaultMessage: 'Please fill out a valid email address',
                  }),
                },
              }}
              render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
                <FormTextField
                  {...props}
                  id={props.name}
                  label={`${intl.formatMessage({
                    id: 'order_reports_form_email',
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
            <Controller
              name="company"
              control={control}
              rules={{
                required: intl.formatMessage({
                  id: 'order_reports_form_company_validation',
                  defaultMessage: 'Please enter your company',
                }),
              }}
              render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
                <FormTextField
                  {...props}
                  id={props.name}
                  label={`${intl.formatMessage({
                    id: 'order_reports_form_company',
                    defaultMessage: 'Company',
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
              name="address"
              control={control}
              rules={{
                required: intl.formatMessage({
                  id: 'order_reports_form_address_validation',
                  defaultMessage: 'Please enter your address',
                }),
              }}
              render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
                <FormTextField
                  {...props}
                  id={props.name}
                  label={`${intl.formatMessage({
                    id: 'order_reports_form_address',
                    defaultMessage: 'Address',
                  })}*`}
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
                required: intl.formatMessage({
                  id: 'order_reports_form_zipcode_validation',
                  defaultMessage: 'Please enter your post number/Zip code',
                }),
              }}
              render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
                <FormTextField
                  {...props}
                  id={props.name}
                  label={`${intl.formatMessage({
                    id: 'order_reports_form_zipcode',
                    defaultMessage: 'Post number/Zip code',
                  })}*`}
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
                required: intl.formatMessage({
                  id: 'order_reports_form_city_validation',
                  defaultMessage: 'Please enter your city',
                }),
              }}
              render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
                <FormTextField
                  {...props}
                  id={props.name}
                  aria-required="true"
                  label={`${intl.formatMessage({
                    id: 'order_reports_form_city',
                    defaultMessage: 'City',
                  })}*`}
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
                required: intl.formatMessage({
                  id: 'order_reports_form_country_validation',
                  defaultMessage: 'Please enter your country',
                }),
              }}
              render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
                <FormTextField
                  {...props}
                  id={props.name}
                  label={`${intl.formatMessage({
                    id: 'order_reports_form_country',
                    defaultMessage: 'Country',
                  })}*`}
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
                <FormattedMessage id="order_reports_form_cta" defaultMessage="Order printed copies" />
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
export default OrderReportsForm
