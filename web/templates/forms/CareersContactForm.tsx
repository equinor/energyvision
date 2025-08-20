'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Icon } from '@equinor/eds-core-react'
import { useForm, Controller, useWatch } from 'react-hook-form'
import { error_filled } from '@equinor/eds-icons'
import { BaseSyntheticEvent, useMemo, useState } from 'react'
import FriendlyCaptcha from './FriendlyCaptcha'
import { TextField } from '@/core/TextField/TextField'
import { Button } from '@/core/Button'
import { FormMessageBox } from '@/core/Form/FormMessageBox'
import { Select } from '@/core/Select/Select'
import { Checkbox } from '@/core/Checkbox/Checkbox'
import { useLocale, useTranslations } from 'next-intl'

type FormValues = {
  name: string
  email: string
  phone: string
  category: string
  questions: string
  positionId: string
  preferredLang: string
  candidateType: string
  supportingDocuments: string
}

const CareersContactForm = () => {
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
    formState: { errors, isSubmitted, isSubmitting, isSubmitSuccessful },
    setError,
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      positionId: '',
      location: '',
      phone: '',
      questions: '',
      category: '',
      preferredLang: '',
      candidateType: '',
      supportingDocuments: '',
    },
  })
  const suspectedRecruitmentScam =
    intl('careers_contact_form_suspected_recruitment_scam') ?? 'Suspected recruitment scam'
  const onboarding = intl('careers_contact_form_onboarding')
  const graduates = intl(' careers_contact_form_graduates')
  const interns = intl('careers_contact_form_interns')
  const apprentices = intl('careers_contact_form_apprentices')

  const watchCategory = useWatch({
    name: 'category',
    control,
  })

  const setPositionIdMandatory = useMemo(() => {
    return watchCategory !== suspectedRecruitmentScam && watchCategory !== ''
  }, [watchCategory])

  const getCatalogType = (category: string, candidateType: string) => {
    if (category.includes(suspectedRecruitmentScam)) return 'suspectedRecruitmentScamRequest'
    else if (category.includes(onboarding)) return 'onboarding'
    else if (
      candidateType.includes(graduates) ||
      candidateType.includes(interns) ||
      candidateType.includes(apprentices)
    )
      return 'emergingTalentsQueries'
    else return 'others'
  }

  const onSubmit = async (data: FormValues, event?: BaseSyntheticEvent) => {
    data.preferredLang = locale
    if (isFriendlyChallengeDone) {
      const res = await fetch('/api/forms/service-now-careers-contact', {
        body: JSON.stringify({
          data,
          frcCaptchaSolution: (event?.target as any)['frc-captcha-solution'].value,
          catalogType: getCatalogType(data.category, data.candidateType),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })
      setSuccessfullySubmitted(res.status == 200)
      setServerError(res.status != 200)
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
              name="phone"
              control={control}
              rules={{
                required: intl('careers_contact_form_phone_validation'),
                pattern: {
                  value: /^[+]?([0-9]?[()]|[0-9]+|[0-9]+-){8,20}(?:x[0-9]{0,10})?$/g,
                  message: intl('careers_contact_form_phone_validation'),
                },
              }}
              render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
                <TextField
                  {...props}
                  id={props.name}
                  label={`${intl('careers_contact_form_phone')}*`}
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
              name="category"
              control={control}
              render={({ field: { ref, ...props } }) => (
                <Select {...props} selectRef={ref} id={props.name} label={intl('category')}>
                  <option value="">{intl('form_please_select_an_option')}</option>
                  <option>{onboarding}</option>
                  <option>{intl('careers_contact_form_questions_related_to_position')}</option>
                  <option>{intl('careers_contact_form_technical_issues')}</option>
                  <option>{suspectedRecruitmentScam}</option>
                </Select>
              )}
            />

            <Controller
              name="positionId"
              control={control}
              rules={{
                validate: {
                  require: (value) => {
                    if (!value && setPositionIdMandatory) {
                      console.log('not validated required field')
                      return intl('careers_contact_form_positionId_validation')
                    }
                    return true
                  },
                },
              }}
              render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
                <TextField
                  {...props}
                  id={props.name}
                  label={`${intl('careers_contact_form_position')}${setPositionIdMandatory ? '*' : ''}`}
                  inputIcon={invalid ? <Icon data={error_filled} title="error" /> : undefined}
                  helperText={error?.message}
                  {...(setPositionIdMandatory && {
                    'aria-required': true,
                  })}
                  {...(invalid && { variant: 'error' })}
                  inputRef={ref}
                />
              )}
            />

            <Controller
              name="location"
              control={control}
              rules={{
                required: intl('careers_contact_form_location_validation'),
              }}
              render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
                <TextField
                  {...props}
                  id={props.name}
                  label={`${intl('careers_contact_form_location')}*`}
                  description={intl('careers_contact_form_location_placeholder')}
                  inputRef={ref}
                  inputIcon={invalid ? <Icon data={error_filled} title="error" /> : undefined}
                  helperText={error?.message}
                  aria-required="true"
                  {...(invalid && { variant: 'error' })}
                />
              )}
            />

            <Controller
              name="candidateType"
              control={control}
              render={({ field: { ref, ...props } }) => (
                <Select {...props} selectRef={ref} id={props.name} label={intl('careers_contact_form_candidate_type')}>
                  <option value="">{intl('form_please_select_an_option')}</option>
                  <option>{intl('careers_contact_form_experienced_professionals')}</option>
                  <option>{graduates}</option>
                  <option>{interns}</option>
                  <option>{apprentices}</option>
                  <option>{intl('careers_contact_form_other')}</option>
                </Select>
              )}
            />

            <Controller
              name="questions"
              control={control}
              rules={{
                required: intl('careers_contact_form_questions_validation'),
              }}
              render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
                <TextField
                  {...props}
                  id={props.name}
                  label={`${intl('careers_contact_form_questions')}*`}
                  inputRef={ref}
                  multiline
                  rowsMax={10}
                  aria-required="true"
                  inputIcon={invalid ? <Icon data={error_filled} title="error" /> : undefined}
                  helperText={error?.message}
                  {...(invalid && { variant: 'error' })}
                />
              )}
            />
            <Checkbox
              className="pb-4"
              label={intl('careers_contact_form_supporting_documents')}
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
                <p
                  role="alert"
                  className="flex gap-2 border border-clear-red-100 px-6 py-4 font-semibold text-slate-80"
                >
                  {/*@ts-ignore: TODO: types*/}
                  <span className="mt-1">{errors.root.notCompletedCaptcha.message}</span>
                  <Icon data={error_filled} aria-hidden="true" />
                </p>
              )}
            </div>

            <Button type="submit">{isSubmitting ? intl('form_sending') : intl('careers_contact_form_cta')}</Button>
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
export default CareersContactForm
