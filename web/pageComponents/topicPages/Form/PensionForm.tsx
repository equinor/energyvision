import { Icon } from '@equinor/eds-core-react'
import { useForm, Controller } from 'react-hook-form'
import { error_filled } from '@equinor/eds-icons'
import { FormattedMessage, useIntl } from 'react-intl'
import { FormTextField, FormSelect, FormSubmitSuccessBox, FormSubmitFailureBox } from '@components'
import { BaseSyntheticEvent, useState } from 'react'
import FriendlyCaptcha from './FriendlyCaptcha'
import { PensionFormCatalogType } from '../../../types'
import { Button } from '@core/Button'
import { TextField } from '@core/TextField/TextField'

type PensionFormValues = {
  name: string
  email: string
  phone: string
  pensionCategory: string
  requests: string
}

const PensionForm = () => {
  const intl = useIntl()
  const [isServerError, setServerError] = useState(false)
  const [isFriendlyChallengeDone, setIsFriendlyChallengeDone] = useState(false)
  const [isSuccessfullySubmitted, setSuccessfullySubmitted] = useState(false)

  const onSubmit = async (data: PensionFormValues, event?: BaseSyntheticEvent) => {
    if (isFriendlyChallengeDone) {
      const res = await fetch('/api/forms/service-now-pension', {
        body: JSON.stringify({
          data,
          frcCaptchaSolution: (event?.target as any)['frc-captcha-solution'].value,
          catalogType: getCatalog(data.pensionCategory),
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

  const getCatalog = (category: string): PensionFormCatalogType | null => {
    if (category.includes(intl.formatMessage({ id: 'pension_form_pension', defaultMessage: 'Pension' })))
      return 'pension'
    else if (
      category.includes(intl.formatMessage({ id: 'pension_form_travel_insurance', defaultMessage: 'Travel Insurance' }))
    )
      return 'travelInsurance'
    else if (
      category.includes(
        intl.formatMessage({
          id: 'pension_form_other_pension_insurance_related',
          defaultMessage: 'Other Pension/Insurance Related',
        }),
      )
    )
      return 'otherPensionInsuranceRelated'
    else return null
  }
  const {
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors, isSubmitted, isSubmitting, isSubmitSuccessful },
  } = useForm<PensionFormValues>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      pensionCategory: '',
      requests: '',
    },
  })

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
            {/* Name field */}
            <Controller
              name="name"
              control={control}
              rules={{
                required: intl.formatMessage({
                  id: 'name_validation',
                  defaultMessage: 'Please fill out your name',
                }),
              }}
              render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => {
                const { name } = props
                return (
                  <FormTextField
                    {...props}
                    id={name}
                    label={`${intl.formatMessage({
                      id: 'name',
                      defaultMessage: 'Name',
                    })}*`}
                    inputRef={ref}
                    aria-required="true"
                    inputIcon={invalid ? <Icon data={error_filled} title="error" /> : undefined}
                    helperText={error?.message}
                    {...(invalid && { variant: 'error' })}
                  />
                )
              }}
            />

            {/* Email field */}
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
              render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => {
                const { name } = props
                return (
                  <FormTextField
                    {...props}
                    id={name}
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
                )
              }}
            />
            {/* Pension Category field */}
            <Controller
              name="pensionCategory"
              control={control}
              render={({ field: { ref, ...props } }) => {
                const { name } = props
                return (
                  <FormSelect
                    {...props}
                    selectRef={ref}
                    id={name}
                    label={intl.formatMessage({
                      id: 'category',
                      defaultMessage: 'Category',
                    })}
                  >
                    <option value="">
                      {intl.formatMessage({
                        id: 'form_please_select_an_option',
                        defaultMessage: 'Please select an option',
                      })}
                    </option>
                    <option value="pension">
                      {intl.formatMessage({ id: 'pension_form_category_pension', defaultMessage: 'Pension' })}
                    </option>
                    <option value="travelInsurance">
                      {intl.formatMessage({ id: 'pension_form_category_travel_insurance', defaultMessage: 'Travel Insurance' })}
                    </option>
                    <option value="otherPensionInsuranceRelated">
                      {intl.formatMessage({
                        id: 'pension_form_category_other',
                        defaultMessage: 'Other Pension/Insurance Related',
                      })}
                    </option>
                  </FormSelect>
                )
              }}
            />

            {/* requests field */}
            <Controller
              name="requests"
              control={control}
              rules={{
                required: intl.formatMessage({
                  id: 'pension_form_what_is_your_request_validation',
                  defaultMessage: 'Please let us know how we may help you',
                }),
              }}
              render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => {
                const { name } = props
                return (
                  <TextField
                    {...props}
                    id={name}
                    description={intl.formatMessage({
                      id: 'dont_enter_personal_info',
                      defaultMessage: `Please don't enter any personal information`,
                    })}
                    label={`${intl.formatMessage({
                      id: 'pension_form_what_is_your_request',
                      defaultMessage: 'What is your request?',
                    })}*`}
                    inputRef={ref}
                    multiline
                    rowsMax={10}
                    aria-required="true"
                    inputIcon={invalid ? <Icon data={error_filled} title="error" /> : undefined}
                    helperText={error?.message}
                    {...(invalid && { variant: 'error' })}
                  />
                )
              }}
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
                <FormattedMessage id="pension_form_submit" defaultMessage="Submit Form" />
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

export default PensionForm
