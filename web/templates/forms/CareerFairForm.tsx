'use client'
import { Icon } from '@equinor/eds-core-react'
import { error_filled } from '@equinor/eds-icons'
import { useLocale, useTranslations } from 'next-intl'
import { type BaseSyntheticEvent, useState, useId } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '@/core/Button'
import { Checkbox } from '@/core/Checkbox/Checkbox'
import { FormMessageBox } from '@/core/Form/FormMessageBox'
import { Select } from '@/core/Select/Select'
import { TextField } from '@/core/TextField/TextField'
import FriendlyCaptcha from './FriendlyCaptcha'
import {
  contentRegex,
  emailRegex,
  nameRegex,
  phoneRegex,
  urlRegex,
} from './validations'
import verifyCaptcha from '@/app/_actions/verifyCaptcha'
import submitFormServerAction from '@/app/_actions/submitFormServerAction'

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
  const formId = useId()
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
      const frcCaptchaSolution = (event?.target as any)['frc-captcha-response'].value
      const isCaptchaVerified = await verifyCaptcha(frcCaptchaSolution)

      if(!isCaptchaVerified){
        return
      }
    
      let finalFormData = {
        "variables": {
          "requested_for": "tpawe",
          "cid": "848f447ddb692600ff6272dabf961948",
          "external_emails": data.email,
          "phonenumber": data.phone,
          "contactperson": data.contactPerson,
          "schoolorganisation": data.organisation,
          "event": data.event,
          "descriptionofevent": data.eventDescription,
          "linktowebsite": data.website,
          "supportingdocuments": data.supportingDocuments      
        }
      }
      
      // Call the server action directly
      // CAT0012839 is CAT ID for Career Fair Form //
      const result = await submitFormServerAction(JSON.stringify(finalFormData), 'CAT0012839')

      setServerError(result.status !== 200)
      setSuccessfullySubmitted(result.status === 200)
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
      {!isSuccessfullySubmitted && (
        <>
          <div className='pb-6 text-sm'>{intl('all_fields_mandatory')}</div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            onReset={() => {
              reset()
              setIsFriendlyChallengeDone(false)
              setSuccessfullySubmitted(false)
            }}
            className='flex flex-col gap-12'
          >
            <Controller
              name='organisation'
              control={control}
              rules={{
                required: intl('career_fair_form_organisation_validation'),
                pattern: {
                  value: /^[a-zA-Z0-9 ]*$/,
                  message: intl('not_valid_input'),
                },
              }}
              render={({
                field: { ref, ...props },
                fieldState: { invalid, error },
              }) => (
                <TextField
                  {...props}
                  id={`${props.name}_${formId}`}
                  label={`${intl('career_fair_form_organisation')}*`}
                  inputRef={ref}
                  aria-required='true'
                  inputIcon={
                    invalid ? (
                      <Icon data={error_filled} title='error' />
                    ) : undefined
                  }
                  helperText={error?.message}
                  {...(invalid && { variant: 'error' })}
                />
              )}
            />
            <Controller
              name='contactPerson'
              control={control}
              rules={{
                required: intl('career_fair_form_contact_person_validation'),
                pattern: {
                  value: nameRegex,
                  message: intl('not_valid_input'),
                },
              }}
              render={({
                field: { ref, ...props },
                fieldState: { invalid, error },
              }) => (
                <TextField
                  {...props}
                  id={`${props.name}_${formId}`}
                  label={`${intl('career_fair_form_contact_person')}*`}
                  inputRef={ref}
                  aria-required='true'
                  inputIcon={
                    invalid ? (
                      <Icon data={error_filled} title='error' />
                    ) : undefined
                  }
                  helperText={error?.message}
                  {...(invalid && { variant: 'error' })}
                />
              )}
            />
            <Controller
              name='phone'
              control={control}
              rules={{
                required: intl('career_fair_form_phone_validation'),
                pattern: {
                  value: phoneRegex,
                  message: intl('career_fair_form_phone_validation'),
                },
              }}
              render={({
                field: { ref, ...props },
                fieldState: { invalid, error },
              }) => (
                <TextField
                  {...props}
                  id={`${props.name}_${formId}`}
                  label={`${intl('career_fair_form_phone')}*`}
                  description={intl('country_code_format')}
                  type='tel'
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

            <Controller
              name='email'
              control={control}
              rules={{
                required: intl('email_validation'),
                pattern: {
                  value: emailRegex,
                  message: intl('email_validation'),
                },
              }}
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
            <Controller
              name='event'
              control={control}
              render={({ field: { ref, ...props } }) => (
                <>
                  <Select
                    {...props}
                    selectRef={ref}
                    id={`${props.name}_${formId}`}
                    aria-describedby='select-helper-text-${id}'
                    label={intl('career_fair_form_event')}
                  >
                    <option value=''>
                      {intl('form_please_select_an_option')}
                    </option>
                    <option>
                      {intl('career_fair_form_invite_career_fair')}
                    </option>
                    <option>{intl('career_fair_form_visit_equinor')}</option>
                  </Select>
                  {watchEvent === intl('career_fair_form_visit_equinor') && (
                    <p className='-mt-2' id='select-helper-text'>
                      {intl('career_fair_form_visit_equinor_helper_text')}
                    </p>
                  )}
                </>
              )}
            />

            <Controller
              name='eventDescription'
              control={control}
              rules={{
                required: intl('career_fair_form_event_description_validation'),
                pattern: {
                  value: contentRegex,
                  message: intl('not_valid_input'),
                },
              }}
              render={({
                field: { ref, ...props },
                fieldState: { invalid, error },
              }) => (
                <TextField
                  {...props}
                  id={`${props.name}_${formId}`}
                  multiline
                  rowsMax={10}
                  maxLength={3400}
                  aria-required='true'
                  label={`${intl('career_fair_form_event_description')}*`}
                  description={intl('form_validation_maxChars', {
                    maxChars: '3400',
                  })}
                  inputIcon={
                    invalid ? (
                      <Icon data={error_filled} title='error' />
                    ) : undefined
                  }
                  helperText={error?.message}
                  inputRef={ref}
                  {...(invalid && { variant: 'error' })}
                />
              )}
            />
            <Controller
              name='website'
              control={control}
              rules={{
                pattern: {
                  value: urlRegex,
                  message: intl('not_valid_input'),
                },
              }}
              render={({ field: { ref, ...props } }) => (
                <TextField
                  {...props}
                  id={`${props.name}_${formId}`}
                  label={intl('career_fair_form_website')}
                  inputRef={ref}
                />
              )}
            />
            <Checkbox
              className='pb-4'
              label={intl('career_fair_form_supporting_documents')}
              value='Yes'
              {...register('supportingDocuments')}
            />

            <div className='flex flex-col gap-2'>
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
                  role='alert'
                  className='gap-2 border border-clear-red-100 px-6 py-4flex font-semibold text-slate-80'
                >
                  {/*@ts-ignore: TODO: types*/}
                  <span className='mt-1'>
                    {errors.root.notCompletedCaptcha.message}
                  </span>
                  <Icon data={error_filled} aria-label='Error icon' />
                </p>
              )}
            </div>
            <Button type='submit'>
              {isSubmitting
                ? intl('form_sending')
                : intl('career_fair_form_cta')}
            </Button>
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
export default CareerFairForm
