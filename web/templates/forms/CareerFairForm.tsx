'use client'
import { Icon } from '@equinor/eds-core-react'
import { useForm, Controller } from 'react-hook-form'
import { error_filled } from '@equinor/eds-icons'
import { BaseSyntheticEvent, useState } from 'react'
import FriendlyCaptcha from './FriendlyCaptcha'
import { TextField } from '@/core/TextField/TextField'
import { Button } from '@/core/Button'
import { Select } from '@/core/Select/Select'
import { Checkbox } from '@/core/Checkbox/Checkbox'
import { FormMessageBox } from '@/core/Form/FormMessageBox'
import { useLocale, useTranslations } from 'next-intl'

type FormValues = {
  organisation: string
  email: string
  contactPerson: string
  phone: string
  event: string
  eventDescription: string
  website: string
  supportingDocuments: string
  preferredLang: string
}

const CareerFairForm = () => {
  const intl = useTranslations()
  const locale = useLocale()

  const [isFriendlyChallengeDone, setIsFriendlyChallengeDone] = useState(false)
  const [isServerError, setServerError] = useState(false)
  const [isSuccessfullySubmitted, setSuccessfullySubmitted] = useState(false)

  const {
    handleSubmit,
    control,
    reset,
    register,
    watch,
    setError,
    formState: { errors, isSubmitted, isSubmitting, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      organisation: '',
      email: '',
      contactPerson: '',
      phone: '',
      event: '',
      eventDescription: '',
      website: '',
      supportingDocuments: '',
      preferredLang: locale,
    },
  })

  const onSubmit = async (data: FormValues, event?: BaseSyntheticEvent) => {
    data.preferredLang = locale
    if (isFriendlyChallengeDone) {
      const res = await fetch('/api/forms/service-now-career-fair-events', {
        body: JSON.stringify({
          data,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  const watchEvent = watch('event')
  return (
    <>
      {!isSuccessfullySubmitted && !isServerError && <div className="pb-6 text-sm">{intl('all_fields_mandatory')}</div>}
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
              name="organisation"
              control={control}
              rules={{
                required: intl('career_fair_form_organisation_validation'),
              }}
              render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
                <TextField
                  {...props}
                  id={props.name}
                  label={`${intl('career_fair_form_organisation')}*`}
                  inputRef={ref}
                  aria-required="true"
                  inputIcon={invalid ? <Icon data={error_filled} title="error" /> : undefined}
                  helperText={error?.message}
                  {...(invalid && { variant: 'error' })}
                />
              )}
            />
            <Controller
              name="contactPerson"
              control={control}
              rules={{
                required: intl('career_fair_form_contact_person_validation'),
              }}
              render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
                <TextField
                  {...props}
                  id={props.name}
                  label={`${intl('career_fair_form_contact_person')}*`}
                  inputRef={ref}
                  aria-required="true"
                  inputIcon={invalid ? <Icon data={error_filled} title="error" /> : undefined}
                  helperText={error?.message}
                  {...(invalid && { variant: 'error' })}
                />
              )}
            />
            <Controller
              name="phone"
              control={control}
              rules={{
                required: intl('career_fair_form_phone_validation'),
                pattern: {
                  value: /^[+]?([0-9]?[()]|[0-9]+|[0-9]+-){8,20}(?:x[0-9]{0,10})?$/g,
                  message: intl('career_fair_form_phone_validation'),
                },
              }}
              render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
                <TextField
                  {...props}
                  id={props.name}
                  label={`${intl('career_fair_form_phone')}*`}
                  description={intl('country_code_format')}
                  type="tel"
                  inputRef={ref}
                  inputIcon={invalid ? <Icon data={error_filled} title="error" /> : undefined}
                  helperText={error?.message}
                  aria-required="true"
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
              name="event"
              control={control}
              render={({ field: { ref, ...props } }) => (
                <>
                  <Select
                    {...props}
                    selectRef={ref}
                    id={props.name}
                    aria-describedby="select-helper-text-${id}"
                    label={intl('career_fair_form_event')}
                  >
                    <option value="">{intl('form_please_select_an_option')}</option>
                    <option>{intl('career_fair_form_invite_career_fair')}</option>
                    <option>{intl('career_fair_form_visit_equinor')}</option>
                  </Select>
                  {watchEvent == intl('career_fair_form_visit_equinor') && (
                    <p className="-mt-2" id="select-helper-text">
                      {intl('career_fair_form_visit_equinor_helper_text')}
                    </p>
                  )}
                </>
              )}
            />

            <Controller
              name="eventDescription"
              control={control}
              rules={{
                required: intl('career_fair_form_event_description_validation'),
              }}
              render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
                <TextField
                  {...props}
                  id={props.name}
                  multiline
                  rowsMax={10}
                  maxLength={3400}
                  aria-required="true"
                  label={`${intl('career_fair_form_event_description')}*`}
                  description={intl('form_validation_maxChars', {
                    maxChars: '3400',
                  })}
                  inputIcon={invalid ? <Icon data={error_filled} title="error" /> : undefined}
                  helperText={error?.message}
                  inputRef={ref}
                  {...(invalid && { variant: 'error' })}
                />
              )}
            />
            <Controller
              name="website"
              control={control}
              render={({ field: { ref, ...props } }) => (
                <TextField {...props} id={props.name} label={intl('career_fair_form_website')} inputRef={ref} />
              )}
            />
            <Checkbox
              className="pb-4"
              label={intl('career_fair_form_supporting_documents')}
              value="Yes"
              {...register('supportingDocuments')}
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
                <p role="alert" className="text-slate-80 border border-clear-red-100 px-6 py-4flex gap-2 font-semibold">
                  {/*@ts-ignore: TODO: types*/}
                  <span className="mt-1">{errors.root.notCompletedCaptcha.message}</span>
                  <Icon data={error_filled} aria-label="Error icon" />
                </p>
              )}
            </div>
            <Button type="submit">{isSubmitting ? intl('form_sending') : intl('career_fair_form_cta')}</Button>
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
export default CareerFairForm
