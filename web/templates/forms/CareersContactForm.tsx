'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Icon } from '@equinor/eds-core-react'
import { error_filled } from '@equinor/eds-icons'
import { useLocale, useTranslations } from 'next-intl'
import { type BaseSyntheticEvent, useId, useMemo, useState } from 'react'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { Button } from '@/core/Button'
import { Checkbox } from '@/core/Checkbox/Checkbox'
import { FormMessageBox } from '@/core/Form/FormMessageBox'
import { Select } from '@/core/Select/Select'
import { TextField } from '@/core/TextField/TextField'
import FriendlyCaptcha from './FriendlyCaptcha'
import verifyCaptcha from '@/app/_actions/verifyCaptcha'
import submitFormServerAction from '@/app/_actions/submitFormServerAction'
import {
  contentRegex,
  emailRegex,
  englishTextRegex,
  nameRegex,
  phoneRegex,
} from './validations'

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
  location: string
}

const CareersContactForm = () => {
  const intl = useTranslations()
  const locale = useLocale()
  const [isFriendlyChallengeDone, setIsFriendlyChallengeDone] = useState(false)
  const [isServerError, setServerError] = useState(false)
  const [isSuccessfullySubmitted, setSuccessfullySubmitted] = useState(false)
  const formId = useId()

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
    intl('careers_contact_form_suspected_recruitment_scam') ??
    'Suspected recruitment scam'
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
  }, [watchCategory, suspectedRecruitmentScam])

  const getCatalogType = (category: string, candidateType: string) => {
    if (category.includes(suspectedRecruitmentScam))
      return 'b04a9748832d8610347af830feaad382'
    if (
      candidateType.includes(graduates) ||
      candidateType.includes(interns) ||
      candidateType.includes(apprentices)
    )
      return '3971e24c375a3640615af01643990ebf'
    return '59e02ac8375a3640615af01643990e7c'
  }

  const onSubmit = async (data: FormValues, event?: BaseSyntheticEvent) => {

    data.preferredLang = locale
    if (isFriendlyChallengeDone) {
      const frcCaptchaSolution = (event?.target as any)['frc-captcha-response'].value
      const isCaptchaVerified = await verifyCaptcha(frcCaptchaSolution)
      const cid = getCatalogType(data.category, data.candidateType)
      if(!isCaptchaVerified){
        return
      }

      let finalFormData = {
        "variables": {
          "requested_for": "tpawe",
          "cid": cid, //change
          "name": data.name,
          "phone": data.phone,
          "email": data.email,
          "external_emails": data.email,
          "positiondetails": data.positionId,
          "location": data.location,
          "questions": data.questions,
          "supportingdocuments": data.supportingDocuments,
          "candidatetype": data.candidateType,
          "category": data.category
        }
      }
      
      // Call the server action directly
      const result = await submitFormServerAction(JSON.stringify(finalFormData), 'CAT0012840')

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

  return (
    <>
      {!isSuccessfullySubmitted && (
        <>
          <div className='pb-6 text-sm'>{intl('all_fields_mandatory')} </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            onReset={() => {
              reset()
              setIsFriendlyChallengeDone(false)
              setSuccessfullySubmitted(false)
            }}
            className='flex flex-col gap-12'
          >
            {!isSuccessfullySubmitted && !isServerError && (
              <>
                <Controller
                  name='name'
                  control={control}
                  rules={{
                    required: intl('name_validation'),
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
                      label={`${intl('name')}*`}
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
                    required: intl('careers_contact_form_phone_validation'),
                    pattern: {
                      value: phoneRegex,
                      message: intl('careers_contact_form_phone_validation'),
                    },
                  }}
                  render={({
                    field: { ref, ...props },
                    fieldState: { invalid, error },
                  }) => (
                    <TextField
                      {...props}
                      id={`${props.name}_${formId}`}
                      label={`${intl('careers_contact_form_phone')}*`}
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
                  name='category'
                  control={control}
                  render={({ field: { ref, ...props } }) => (
                    <Select
                      {...props}
                      selectRef={ref}
                      id={`${props.name}_${formId}`}
                      label={intl('category')}
                    >
                      <option value=''>
                        {intl('form_please_select_an_option')}
                      </option>
                      <option>{onboarding}</option>
                      <option>
                        {intl(
                          'careers_contact_form_questions_related_to_position',
                        )}
                      </option>
                      <option>
                        {intl('careers_contact_form_technical_issues')}
                      </option>
                      <option>{suspectedRecruitmentScam}</option>
                    </Select>
                  )}
                />

                <Controller
                  name='positionId'
                  control={control}
                  rules={{
                    validate: {
                      require: value => {
                        if (!value && setPositionIdMandatory) {
                          console.log('not validated required field')
                          return intl(
                            'careers_contact_form_positionId_validation',
                          )
                        }
                        return true
                      },
                    },
                    pattern: {
                      value: englishTextRegex,
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
                      label={`${intl('careers_contact_form_position')}${setPositionIdMandatory ? '*' : ''}`}
                      inputIcon={
                        invalid ? (
                          <Icon data={error_filled} title='error' />
                        ) : undefined
                      }
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
                  name='location'
                  control={control}
                  rules={{
                    required: intl('careers_contact_form_location_validation'),
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
                      label={`${intl('careers_contact_form_location')}*`}
                      description={intl(
                        'careers_contact_form_location_placeholder',
                      )}
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
                  name='candidateType'
                  control={control}
                  render={({ field: { ref, ...props } }) => (
                    <Select
                      {...props}
                      selectRef={ref}
                      id={`${props.name}_${formId}`}
                      label={intl('careers_contact_form_candidate_type')}
                    >
                      <option value=''>
                        {intl('form_please_select_an_option')}
                      </option>
                      <option>
                        {intl('careers_contact_form_experienced_professionals')}
                      </option>
                      <option>{graduates}</option>
                      <option>{interns}</option>
                      <option>{apprentices}</option>
                      <option>{intl('careers_contact_form_other')}</option>
                    </Select>
                  )}
                />

                <Controller
                  name='questions'
                  control={control}
                  rules={{
                    required: intl('careers_contact_form_questions_validation'),
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
                      label={`${intl('careers_contact_form_questions')}*`}
                      inputRef={ref}
                      multiline
                      rowsMax={10}
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
                <Checkbox
                  className='pb-4'
                  label={intl('careers_contact_form_supporting_documents')}
                  value='Yes'
                  {...register('supportingDocuments')}
                />
                <div className='flex flex-col gap-2'>
                  <FriendlyCaptcha
                    doneCallback={() => {
                      setIsFriendlyChallengeDone(true)
                    }}
                    errorCallback={(error: any) => {
                      console.error(
                        'FriendlyCaptcha encountered an error',
                        error,
                      )
                      setIsFriendlyChallengeDone(true)
                    }}
                  />
                  {/*@ts-ignore: TODO: types*/}
                  {errors?.root?.notCompletedCaptcha && (
                    <p
                      role='alert'
                      className='flex gap-2 border border-clear-red-100 px-6 py-4 font-semibold text-slate-80'
                    >
                      {/*@ts-ignore: TODO: types*/}
                      <span className='mt-1'>
                        {errors.root.notCompletedCaptcha.message}
                      </span>
                      <Icon data={error_filled} aria-hidden='true' />
                    </p>
                  )}
                </div>

                <Button type='submit'>
                  {isSubmitting
                    ? intl('form_sending')
                    : intl('careers_contact_form_cta')}
                </Button>
              </>
            )}
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
export default CareersContactForm
