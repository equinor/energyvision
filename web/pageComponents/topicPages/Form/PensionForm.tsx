/* eslint-disable @typescript-eslint/no-explicit-any */
import { Icon } from '@equinor/eds-core-react'
import { useForm, Controller } from 'react-hook-form'
import { error_filled } from '@equinor/eds-icons'
import { FormattedMessage, useIntl } from 'react-intl'
import { FormButton, FormTextField, FormSelect, FormSubmitSuccessBox, FormSubmitFailureBox } from '@components'
import { BaseSyntheticEvent, useState } from 'react'
import FriendlyCaptcha from './FriendlyCaptcha'
import { PensionFormCatalogType } from '../../../types'
import React from 'react'

type PensionFormValues = {
  name: string
  email: string
  phone: string
  pensionCategory: string
  requests: string
}

const PensionForm = () => {
  const intl = useIntl()
  const [submitButtonEnabled, setSubmitButtonEnabled] = useState(false)
  const [isServerError, setServerError] = useState(false)
  const [isSuccessfullySubmitted, setSuccessfullySubmitted] = useState(false)

  const onSubmit = async (data: PensionFormValues, event?: BaseSyntheticEvent) => {
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
    formState: { isSubmitted, isSubmitting, isSubmitSuccessful },
  } = useForm<PensionFormValues>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      pensionCategory: intl.formatMessage({id: 'pension_form_select_topic', defaultMessage: 'Select topic'}),
      requests: '',
    },
  })

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onReset={() => {
          reset()
          setSubmitButtonEnabled(false)
          setSuccessfullySubmitted(false)
        }}
      >
        {!isSuccessfullySubmitted && !isServerError && (
          <>
            {/* Name field */}
            <Controller
              name="name"
              control={control}
              rules={{
                required: intl.formatMessage({
                  id: 'pension_form_name_validation',
                  defaultMessage: 'Please fill out your name',
                }),
              }}
              render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => {
                const { name } = props
                return (
                  <FormTextField
                    {...props}
                    id={name}
                    label={intl.formatMessage({
                      id: 'pension_form_name',
                      defaultMessage: 'Name',
                    })}
                    placeholder={intl.formatMessage({
                      id: 'pension_form_name_placeholder',
                      defaultMessage: 'Jane Doe',
                    })}
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
                  id: 'pension_form_email_validation',
                  defaultMessage: 'Please fill out a valid email address',
                }),
                pattern: {
                  value: /^[\w!#$%&'*+/=?`{|}~^-]+(?:\.[\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/g,
                  message: intl.formatMessage({
                    id: 'pension_form_email_validation',
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
                    label={intl.formatMessage({
                      id: 'pension_form_email',
                      defaultMessage: 'Email',
                    })}
                    inputRef={ref}
                    inputIcon={invalid ? <Icon data={error_filled} title="error" /> : undefined}
                    helperText={error?.message}
                    aria-required="true"
                    {...(invalid && { variant: 'error' })}
                  />
                )
              }}
            />

            {/* Phone field */}
            <Controller
              name="phone"
              control={control}
              rules={{
                required: intl.formatMessage({
                  id: 'pension_form_phone_validation',
                  defaultMessage: 'Please fill out your phone number',
                }),
              }}
              render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => {
                const { name } = props
                return (
                  <FormTextField
                    {...props}
                    id={name}
                    label={intl.formatMessage({
                      id: 'pension_form_phone',
                      defaultMessage: 'Phone',
                    })}
                    placeholder={intl.formatMessage({
                      id: 'pension_form_phone_placeholder',
                      defaultMessage: '123-456-7890',
                    })}
                    inputRef={ref}
                    aria-required="true"
                    inputIcon={invalid ? <Icon data={error_filled} title="error" /> : undefined}
                    helperText={error?.message}
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
                      id: 'pension_form_category',
                      defaultMessage: 'Category',
                    })}
                  >
                    <option value="">
                      {intl.formatMessage({ id: 'pension_form_select_topic', defaultMessage: 'Select topic' })}
                    </option>
                    <option value="pension">
                      {intl.formatMessage({ id: 'pension_form_pension', defaultMessage: 'Pension' })}
                    </option>
                    <option value="travelInsurance">
                      {intl.formatMessage({ id: 'pension_form_travel_insurance', defaultMessage: 'Travel Insurance' })}
                    </option>
                    <option value="otherPensionInsuranceRelated">
                      {intl.formatMessage({
                        id: 'pension_form_other_pension_insurance_related',
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
                  <FormTextField
                    {...props}
                    id={name}
                    placeholder={intl.formatMessage({
                      id: 'pension_form_what_is_your_request_placeholder',
                      defaultMessage: `Please don't enter any personal information`,
                    })}
                    label={intl.formatMessage({
                      id: 'pension_form_what_is_your_request',
                      defaultMessage: 'What is your request?',
                    })}
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

            <div className="pb-4 text-xs italic">
              <FormattedMessage id="all_fields_mandatory" defaultMessage="All fields with * are mandatory" />
            </div>

            <FriendlyCaptcha
              doneCallback={() => {
                setSubmitButtonEnabled(true)
              }}
              errorCallback={(error: any) => {
                console.error('FriendlyCaptcha encountered an error', error)
                setSubmitButtonEnabled(true)
              }}
            />

            <FormButton type="submit" disabled={!submitButtonEnabled}>
              {isSubmitting ? (
                <FormattedMessage id="form_sending" defaultMessage={'Sending...'} />
              ) : (
                <FormattedMessage id="pension_form_cta" defaultMessage="Submit Form" />
              )}
            </FormButton>
          </>
        )}

        {isSubmitSuccessful && <FormSubmitSuccessBox />}
        {isServerError && <FormSubmitFailureBox />}
      </form>
    </>
  )
}

export default PensionForm
