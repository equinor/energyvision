'use client'
import { Icon } from '@equinor/eds-core-react'
import { useForm, Controller } from 'react-hook-form'
import { error_filled } from '@equinor/eds-icons'
import { BaseSyntheticEvent, useState } from 'react'
import FriendlyCaptcha from './FriendlyCaptcha'
import { ContactFormCatalogType } from '../../types'
import { Button } from '@/core/Button'
import { TextField } from '@/core/TextField/TextField'
import { Select } from '@/core/Select/Select'
import { FormMessageBox } from '@/core/Form/FormMessageBox'
import { useTranslations } from 'next-intl'

type FormValues = {
  name: string
  email: string
  category: string
  message: string
}

const ContactEquinorForm = () => {
  const intl = useTranslations()
  const [isServerError, setServerError] = useState(false)
  const [isFriendlyChallengeDone, setIsFriendlyChallengeDone] = useState(false)
  const [isSuccessfullySubmitted, setSuccessfullySubmitted] = useState(false)

  const getCatalog = (category: string): ContactFormCatalogType | null => {
    if (category.includes(intl('contact_form_login_issues'))) return 'loginIssues'
    else return null
  }
  const {
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors, isSubmitted, isSubmitting, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      message: '',
      category: '',
    },
  })

  const onSubmit = async (data: FormValues, event?: BaseSyntheticEvent) => {
    if (isFriendlyChallengeDone) {
      const res = await fetch('/api/forms/service-now-contact-us', {
        body: JSON.stringify({
          data,
          frcCaptchaSolution: (event?.target as any)['frc-captcha-response'].value,
          catalogType: getCatalog(data.category),
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
      {!isSuccessfullySubmitted && (
        <>
          <div className="pb-6 text-sm">{intl('all_fields_mandatory')} </div>
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
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: intl('email_validation'),
                    pattern: {
                      value:
                        /^[\w!#$%&'*+/=?`{|}~^-]+(?:\.[\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/g,
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
                <Controller
                  name="category"
                  control={control}
                  render={({ field: { ref, ...props } }) => {
                    const { name } = props
                    return (
                      <Select {...props} selectRef={ref} id={name} label={intl('category')}>
                        <option value="">{intl('form_please_select_an_option')}</option>
                        <option>{intl('contact_form_report_error')}</option>
                        <option>{intl('contact_form_contact_department')}</option>
                        <option>{intl('contact_form_investor_relations')}</option>
                        <option>{intl('contact_form_login_issues')}</option>
                        <option>{intl('contact_form_other')}</option>
                      </Select>
                    )
                  }}
                />

                <Controller
                  name="message"
                  control={control}
                  rules={{
                    required: intl('contact_form_how_to_help_validation'),
                  }}
                  render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => {
                    const { name } = props
                    return (
                      <TextField
                        {...props}
                        id={name}
                        description={intl('dont_enter_personal_info')}
                        label={`${intl('contact_form_how_to_help')}*`}
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
                      className="flex gap-2 border border-clear-red-100 px-6 py-4 font-semibold text-slate-80"
                    >
                      {/*@ts-ignore: TODO: types*/}
                      <span className="mt-1">{errors.root.notCompletedCaptcha.message}</span>
                      <Icon data={error_filled} aria-label="Erro icon" />
                    </p>
                  )}
                </div>
                <Button type="submit">{isSubmitting ? intl('form_sending') : intl('contact_form_cta')}</Button>
              </>
            )}
          </form>
        </>
      )}
      <div role="region" aria-live="assertive">
        {isSubmitSuccessful && <FormMessageBox variant="success" />}
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
    </>
  )
}
export default ContactEquinorForm
