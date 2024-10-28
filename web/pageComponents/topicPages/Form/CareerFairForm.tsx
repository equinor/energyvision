/* eslint-disable @typescript-eslint/no-explicit-any */
import { Icon } from '@equinor/eds-core-react'
import { useForm, Controller } from 'react-hook-form'
import { error_filled } from '@equinor/eds-icons'
import { FormattedMessage, useIntl } from 'react-intl'
import { FormTextField, Checkbox, FormSelect, FormSubmitSuccessBox, FormSubmitFailureBox } from '@components'
import styled from 'styled-components'
import { BaseSyntheticEvent, useState } from 'react'
import FriendlyCaptcha from './FriendlyCaptcha'
import { TextField } from '@core/TextField/TextField'
import { Button } from '@core/Button'

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

const StyledHelper = styled.p`
  margin-top: calc(var(--space-small) * -1);
  font-size: var(--typeScale-0);
`

const StyledCheckBox = styled(Checkbox)`
  padding-bottom: var(--space-medium);
`

const CareerFairForm = () => {
  const intl = useIntl()
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
      event: intl.formatMessage({
        id: 'career_fair_form_invite_career_fair',
        defaultMessage: 'Invite Equinor to a career fair or student event',
      }),
      eventDescription: '',
      website: '',
      supportingDocuments: '',
      preferredLang: intl.locale,
    },
  })
  const onSubmit = async (data: FormValues, event?: BaseSyntheticEvent) => {
    data.preferredLang = intl.locale
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
        message: intl.formatMessage({
          id: 'form_antirobot_validation_required',
          defaultMessage: 'Anti-Robot verification is required',
        }),
      })
    }
  }

  const watchEvent = watch('event')
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
            <Controller
              name="organisation"
              control={control}
              rules={{
                required: intl.formatMessage({
                  id: 'career_fair_form_organisation_validation',
                  defaultMessage: 'Please enter your school or organisation',
                }),
              }}
              render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
                <FormTextField
                  {...props}
                  id={props.name}
                  label={intl.formatMessage({
                    id: 'career_fair_form_organisation',
                    defaultMessage: 'School / Organisation',
                  })}
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
                required: intl.formatMessage({
                  id: 'career_fair_form_contact_person_validation',
                  defaultMessage: 'Please enter a contact person',
                }),
              }}
              render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
                <FormTextField
                  {...props}
                  id={props.name}
                  label={intl.formatMessage({
                    id: 'career_fair_form_contact_person',
                    defaultMessage: 'Contact Person',
                  })}
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
                required: intl.formatMessage({
                  id: 'career_fair_form_phone_validation',
                  defaultMessage: 'Please enter your phone number',
                }),
                pattern: {
                  value: /^[+]?([0-9]?[()]|[0-9]+|[0-9]+-){8,20}(?:x[0-9]{0,10})?$/g,
                  message: intl.formatMessage({
                    id: 'career_fair_form_phone_validation',
                    defaultMessage: 'Please enter your phone number',
                  }),
                },
              }}
              render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
                <TextField
                  {...props}
                  id={props.name}
                  label={intl.formatMessage({
                    id: 'career_fair_form_phone',
                    defaultMessage: 'Phone Number',
                  })}
                  description={intl.formatMessage({
                    id: 'country_code_format',
                    defaultMessage: 'Enter phone number with country code',
                  })}
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
                required: intl.formatMessage({
                  id: 'career_fair_form_email_validation',
                  defaultMessage: 'Please fill out a valid email address',
                }),
                pattern: {
                  value: /^[\w!#$%&'*+/=?`{|}~^-]+(?:\.[\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/g,
                  message: intl.formatMessage({
                    id: 'career_fair_form_email_validation',
                    defaultMessage: 'Please fill out a valid email address',
                  }),
                },
              }}
              render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
                <FormTextField
                  {...props}
                  id={props.name}
                  label={intl.formatMessage({
                    id: 'career_fair_form_email',
                    defaultMessage: 'Email',
                  })}
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
                  <FormSelect
                    {...props}
                    selectRef={ref}
                    id={props.name}
                    aria-describedby="select-helper-text-${id}"
                    label={intl.formatMessage({ id: 'career_fair_form_event', defaultMessage: 'Event' })}
                  >
                    <option>
                      {intl.formatMessage({
                        id: 'career_fair_form_invite_career_fair',
                        defaultMessage: 'Invite Equinor to a career fair or student event',
                      })}
                    </option>
                    <option>
                      {intl.formatMessage({
                        id: 'career_fair_form_invite_company_presentation',
                        defaultMessage: 'Invite Equinor to hold a company presentation',
                      })}
                    </option>
                    <option>
                      {intl.formatMessage({
                        id: 'career_fair_form_visit_equinor',
                        defaultMessage: 'Would like to visit Equinor office or facility',
                      })}
                    </option>
                  </FormSelect>
                  {watchEvent ==
                    intl.formatMessage({
                      id: 'career_fair_form_visit_equinor',
                      defaultMessage: 'Would like to visit Equinor office or facility',
                    }) && (
                    <StyledHelper id="select-helper-text">
                      {intl.formatMessage({
                        id: 'career_fair_form_visit_equinor_helper_text',
                        defaultMessage:
                          'Please be aware that we only offer visits to a few selected locations. Please specify your preferred location and we will revert to you as soon as we can.',
                      })}
                    </StyledHelper>
                  )}
                </>
              )}
            />

            <Controller
              name="eventDescription"
              control={control}
              rules={{
                required: intl.formatMessage({
                  id: 'career_fair_form_event_description_validation',
                  defaultMessage: 'Please enter a description for the event',
                }),
              }}
              render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
                <TextField
                  {...props}
                  id={props.name}
                  multiline
                  rowsMax={10}
                  maxLength={3400}
                  aria-required="true"
                  label={intl.formatMessage({
                    id: 'career_fair_form_event_description',
                    defaultMessage: 'Event Description',
                  })}
                  description={intl.formatMessage(
                    {
                      id: 'form_validation_maxChars',
                      defaultMessage: 'Max {maxChars} characters',
                    },
                    {
                      maxChars: '3400',
                    },
                  )}
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
                <FormTextField
                  {...props}
                  id={props.name}
                  label={intl.formatMessage({
                    id: 'career_fair_form_website',
                    defaultMessage: 'Link to website',
                  })}
                  inputRef={ref}
                />
              )}
            />
            <StyledCheckBox
              label={intl.formatMessage({
                id: 'career_fair_form_supporting_documents',
                defaultMessage:
                  'Tick the box if you would like to send supporting documents, and we will get in touch with you',
              })}
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
                <FormattedMessage id="career_fair_form_cta" defaultMessage="Submit Form" />
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
export default CareerFairForm
