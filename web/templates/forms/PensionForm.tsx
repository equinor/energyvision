'use client'
import { Icon } from '@equinor/eds-core-react'
import { error_filled } from '@equinor/eds-icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { type BaseSyntheticEvent, useId, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import type { z } from 'zod'
import submitFormServerAction from '@/app/_actions/submitFormServerAction'
import verifyCaptcha from '@/app/_actions/verifyCaptcha'
import { Button } from '@/core/Button'
import { FormMessageBox } from '@/core/Form/FormMessageBox'
import { Select } from '@/core/Select/Select'
import { TextField } from '@/core/TextField/TextField'
import { pensionFormSchema } from '@/lib/zodSchemas/zodSchemas'
import type { PensionFormCatalogType } from '../../types'
import FriendlyCaptcha from './FriendlyCaptcha'

type PensionFormData = z.infer<ReturnType<typeof pensionFormSchema>>

const getCatalogIdentifier = (catalogType: PensionFormCatalogType | string) => {
  switch (catalogType) {
    case 'travelInsurance':
      return '1818180393ca2950eaf1f4527cba101d'
    default:
      return '6777904f938a2950eaf1f4527cba1048'
  }
}

const PensionForm = () => {
  const intl = useTranslations()
  const [isServerError, setServerError] = useState(false)
  const [isFriendlyChallengeDone, setIsFriendlyChallengeDone] = useState(false)
  const [isSuccessfullySubmitted, setSuccessfullySubmitted] = useState(false)
  const formId = useId()

  const onSubmit = async (
    data: PensionFormData,
    event?: BaseSyntheticEvent,
  ) => {
    if (isFriendlyChallengeDone) {
      const frcCaptchaSolution = (event?.target as any)['frc-captcha-response']
        .value
      const isCaptchaVerified = await verifyCaptcha(frcCaptchaSolution)

      if (!isCaptchaVerified) {
        return
      }

      let cid = '6777904f938a2950eaf1f4527cba1048'
      if (data.pensionCategory) {
        cid = getCatalogIdentifier(data.pensionCategory)
      }

      const finalFormData = {
        variables: {
          requested_for: 'equinordotcom',
          external_emails: data.email,
          copytoemail: data.email,
          name: data.name,
          category: data.pensionCategory,
          howcanwehelp: data.requests,
          tryingtoreach: 'whoever can assist',
          cid: cid,
        },
      }

      // Call the server action directly
      // CAT0012836 is CAT ID for Contact Equinor Form //
      const res = await submitFormServerAction(
        JSON.stringify(finalFormData),
        'ContactEquinor',
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

  const {
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors, isSubmitted, isSubmitting },
  } = useForm<PensionFormData>({
    resolver: zodResolver(pensionFormSchema(intl)),
    defaultValues: {
      name: '',
      email: '',
      pensionCategory: '',
      requests: '',
    },
  })

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
                {/* Name field */}
                <Controller
                  name='name'
                  control={control}
                  render={({
                    field: { ref, ...props },
                    fieldState: { invalid, error },
                  }) => {
                    const { name } = props
                    return (
                      <TextField
                        {...props}
                        id={`${name}_${formId}`}
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
                    )
                  }}
                />

                {/* Email field */}
                <Controller
                  name='email'
                  control={control}
                  render={({
                    field: { ref, ...props },
                    fieldState: { invalid, error },
                  }) => {
                    const { name } = props
                    return (
                      <TextField
                        {...props}
                        id={`${name}_${formId}`}
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
                    )
                  }}
                />
                {/* Pension Category field */}
                <Controller
                  name='pensionCategory'
                  control={control}
                  render={({ field: { ref, ...props } }) => {
                    const { name } = props
                    return (
                      <Select
                        {...props}
                        selectRef={ref}
                        id={`${name}_${formId}`}
                        label={intl('category')}
                      >
                        <option value=''>
                          {intl('form_please_select_an_option')}
                        </option>
                        <option value='pension'>
                          {intl('pension_form_category_pension')}
                        </option>
                        <option value='travelInsurance'>
                          {intl('pension_form_category_travel_insurance')}
                        </option>
                        <option value='otherPensionInsuranceRelated'>
                          {intl('pension_form_category_other')}
                        </option>
                      </Select>
                    )
                  }}
                />

                {/* requests field */}
                <Controller
                  name='requests'
                  control={control}
                  render={({
                    field: { ref, ...props },
                    fieldState: { invalid, error },
                  }) => {
                    const { name } = props
                    return (
                      <TextField
                        {...props}
                        id={`${name}_${formId}`}
                        description={intl('dont_enter_personal_info')}
                        label={`${intl('pension_form_what_is_your_request')}*`}
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
                    )
                  }}
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
                      <Icon data={error_filled} aria-label='Error icon' />
                    </p>
                  )}
                </div>

                <Button type='submit'>
                  {isSubmitting
                    ? intl('form_sending')
                    : intl('pension_form_submit')}
                </Button>
              </>
            )}
          </form>
        </>
      )}
      <div aria-live='assertive'>
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
      </div>
    </>
  )
}

export default PensionForm
