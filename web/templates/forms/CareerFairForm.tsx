'use client'
import { Icon } from '@equinor/eds-core-react'
import { error_filled } from '@equinor/eds-icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocale, useTranslations } from 'next-intl'
import { type BaseSyntheticEvent, useId, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import type { z } from 'zod'
import submitFormServerAction from '@/app/_actions/submitFormServerAction'
import verifyCaptcha from '@/app/_actions/verifyCaptcha'
import { Button } from '@/core/Button'
import { Checkbox } from '@/core/Checkbox/Checkbox'
import { FormMessageBox } from '@/core/Form/FormMessageBox'
import { Select } from '@/core/Select/Select'
import { TextField } from '@/core/TextField/TextField'
import { careerFairFormSchema } from '@/lib/zodSchemas/zodSchemas'
import FriendlyCaptcha from './FriendlyCaptcha'

// import {
//   contentRegex,
//   emailRegex,
//   nameRegex,
//   phoneRegex,
//   urlRegex,
// } from './validations'

// type FormValues = {
//   organisation: string
//   email: string
//   contactPerson: string
//   phone: string
//   event: string
//   eventDescription: string
//   website: string
//   supportingDocuments: string
//   preferredLang: string
// }

type CareerFairFormData = z.infer<ReturnType<typeof careerFairFormSchema>>

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
    formState: { errors, isSubmitted, isSubmitting },
  } = useForm<CareerFairFormData>({
    resolver: zodResolver(careerFairFormSchema(intl)),
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

  const onSubmit = async (
    data: CareerFairFormData,
    event?: BaseSyntheticEvent,
  ) => {
    data.preferredLang = locale
    if (isFriendlyChallengeDone) {
      const frcCaptchaSolution = (event?.target as any)['frc-captcha-response']
        .value
      const isCaptchaVerified = await verifyCaptcha(frcCaptchaSolution)

      if (!isCaptchaVerified) {
        return
      }

      const finalFormData = {
        variables: {
          requested_for: 'equinordotcom',
          cid: '848f447ddb692600ff6272dabf961948',
          external_emails: data.email,
          phonenumber: data.phone,
          contactperson: data.contactPerson,
          schoolorganisation: data.organisation,
          event: data.event,
          descriptionofevent: data.eventDescription,
          linktowebsite: data.website,
          supportingdocuments:
            data.supportingDocuments === 'Yes' ? 'Yes' : 'No',
        },
      }

      // Call the server action directly
      // CAT0012839 is CAT ID for Career Fair Form //
      const res = await submitFormServerAction(
        JSON.stringify(finalFormData),
        'CareerFairs',
      )

      if (res?.status) {
        setSuccessfullySubmitted(res.status)
      } else {
        setServerError(!res?.status)
      }
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
        {isSuccessfullySubmitted && <FormMessageBox variant='success' />}
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
