'use client'
import { Icon } from '@equinor/eds-core-react'
import { useForm, Controller } from 'react-hook-form'
import { error_filled } from '@equinor/eds-icons'
import { BaseSyntheticEvent, useState } from 'react'
import FriendlyCaptcha from './FriendlyCaptcha'
import { PensionFormCatalogType } from '../../types'
import { Button } from '@/core/Button'
import { TextField } from '@/core/TextField/TextField'
import { Select } from '@/core/Select/Select'
import { FormMessageBox } from '@/core/Form/FormMessageBox'
import { useTranslations } from 'next-intl'

type PensionFormValues = {
  name: string
  email: string
  phone: string
  pensionCategory: string
  requests: string
}

const PensionForm = () => {
  const intl = useTranslations()
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
        message: intl('form_antirobot_validation_required'),
      })
    }
  }

  const getCatalog = (category: string): PensionFormCatalogType | null => {
    if (category.includes(intl('pension_form_pension'))) return 'pension'
    else if (category.includes(intl('pension_form_travel_insurance'))) return 'travelInsurance'
    else if (category.includes(intl('pension_form_other_pension_insurance_related')))
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
            {/* Name field */}
            <Controller
              name="name"
              control={control}
              rules={{
                required: intl('name_validation'),
              }}
              render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => {
                const { name } = props
                return (
                  <TextField
                    {...props}
                    id={name}
                    label={`${intl('name')}*`}
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
                required: intl('email_validation'),
                pattern: {
                  value: /^[\w!#$%&'*+/=?`{|}~^-]+(?:\.[\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/g,
                  message: intl('email_validation'),
                },
              }}
              render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => {
                const { name } = props
                return (
                  <TextField
                    {...props}
                    id={name}
                    label={`${intl('email')}*`}
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
                  <Select {...props} selectRef={ref} id={name} label={intl('category')}>
                    <option value="">{intl('form_please_select_an_option')}</option>
                    <option value="pension">{intl('pension_form_category_pension')}</option>
                    <option value="travelInsurance">{intl('pension_form_category_travel_insurance')}</option>
                    <option value="otherPensionInsuranceRelated">{intl('pension_form_category_other')}</option>
                  </Select>
                )
              }}
            />

            {/* requests field */}
            <Controller
              name="requests"
              control={control}
              rules={{
                required: intl('pension_form_what_is_your_request_validation'),
              }}
              render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => {
                const { name } = props
                return (
                  <TextField
                    {...props}
                    id={name}
                    description={intl('dont_enter_personal_info')}
                    label={`${intl('pension_form_what_is_your_request')}*`}
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

            <Button type="submit">{isSubmitting ? intl('form_sending') : intl('pension_form_submit')}</Button>
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

export default PensionForm
