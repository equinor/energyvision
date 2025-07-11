/* eslint-disable @typescript-eslint/no-explicit-any */
import { Icon } from '@equinor/eds-core-react'
import { useForm, Controller, useWatch } from 'react-hook-form'
import { error_filled } from '@equinor/eds-icons'
import { FormattedMessage, useIntl } from 'react-intl'
import { BaseSyntheticEvent, useMemo, useState } from 'react'
import FriendlyCaptcha from '../FriendlyCaptcha'
import { TextField } from '@core/TextField/TextField'
import { Button } from '@core/Button'
import { FormMessageBox } from '@core/Form/FormMessageBox'
import { Select } from '@core/Select/Select'
import { Checkbox } from '@core/Checkbox/Checkbox'
import getCatalogType from './getRequestType'

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
  const intl = useIntl()
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

  const watchCategory = useWatch({
    name: 'category',
    control,
  })

  const setPositionIdMandatory = useMemo(() => {
    return (
      watchCategory !==
        intl.formatMessage({
          id: 'careers_contact_form_suspected_recruitment_scam',
          defaultMessage: 'Suspected recruitment scam',
        }) && watchCategory !== ''
    )
  }, [intl, watchCategory])

  const onSubmit = async (data: FormValues, event?: BaseSyntheticEvent) => {
    data.preferredLang = intl.locale
    if (isFriendlyChallengeDone) {
      const res = await fetch('/api/forms/service-now-careers-contact', {
        body: JSON.stringify({
          data,
          frcCaptchaSolution: (event?.target as any)['frc-captcha-solution'].value,
          catalogType: getCatalogType(intl, data.category, data.candidateType),
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
        message: intl.formatMessage({
          id: 'form_antirobot_validation_required',
          defaultMessage: 'Anti-Robot verification is required',
        }),
      })
    }
  }

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
              name="name"
              control={control}
              rules={{
                required: intl.formatMessage({
                  id: 'name_validation',
                  defaultMessage: 'Please fill out your name',
                }),
              }}
              render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
                <TextField
                  {...props}
                  id={props.name}
                  label={`${intl.formatMessage({
                    id: 'name',
                    defaultMessage: 'Your Name',
                  })}*`}
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
                  id: 'careers_contact_form_phone_validation',
                  defaultMessage: 'Please enter a valid phone number',
                }),
                pattern: {
                  value: /^[+]?([0-9]?[()]|[0-9]+|[0-9]+-){8,20}(?:x[0-9]{0,10})?$/g,
                  message: intl.formatMessage({
                    id: 'careers_contact_form_phone_validation',
                    defaultMessage: 'Please enter a valid phone number',
                  }),
                },
              }}
              render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
                <TextField
                  {...props}
                  id={props.name}
                  label={`${intl.formatMessage({
                    id: 'careers_contact_form_phone',
                    defaultMessage: 'Phone Number',
                  })}*`}
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
                  id: 'email_validation',
                  defaultMessage: 'Please fill out a valid email address',
                }),
                pattern: {
                  value: /^[\w!#$%&'*+/=?`{|}~^-]+(?:\.[\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/g,
                  message: intl.formatMessage({
                    id: 'email_validation',
                    defaultMessage: 'Please fill out a valid email address',
                  }),
                },
              }}
              render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
                <TextField
                  {...props}
                  id={props.name}
                  label={`${intl.formatMessage({
                    id: 'email',
                    defaultMessage: 'Email',
                  })}*`}
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
                <Select
                  {...props}
                  selectRef={ref}
                  id={props.name}
                  label={intl.formatMessage({ id: 'category', defaultMessage: 'Category' })}
                >
                  <option value="">
                    {intl.formatMessage({
                      id: 'form_please_select_an_option',
                      defaultMessage: 'Please select an option',
                    })}
                  </option>
                  <option>
                    {intl.formatMessage({
                      id: 'careers_contact_form_onboarding',
                      defaultMessage: 'Onboarding',
                    })}
                  </option>
                  <option>
                    {intl.formatMessage({
                      id: 'careers_contact_form_questions_related_to_position',
                      defaultMessage: 'Questions related to a specific position',
                    })}
                  </option>
                  <option>
                    {intl.formatMessage({
                      id: 'careers_contact_form_technical_issues',
                      defaultMessage: 'Technical issue when applying for a specific position',
                    })}
                  </option>
                  <option>
                    {intl.formatMessage({
                      id: 'careers_contact_form_suspected_recruitment_scam',
                      defaultMessage: 'Suspected recruitment scam',
                    })}
                  </option>
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
                      return intl.formatMessage({
                        id: 'careers_contact_form_positionId_validation',
                        defaultMessage: 'Please enter a position ID or name ',
                      })
                    }
                    return true
                  },
                },
              }}
              render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
                <TextField
                  {...props}
                  id={props.name}
                  label={`${intl.formatMessage({
                    id: 'careers_contact_form_position',
                    defaultMessage: 'Position ID/name',
                  })}${setPositionIdMandatory ? '*' : ''}`}
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
                required: intl.formatMessage({
                  id: 'careers_contact_form_location_validation',
                  defaultMessage: 'Please enter a location ',
                }),
              }}
              render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
                <TextField
                  {...props}
                  id={props.name}
                  label={`${intl.formatMessage({
                    id: 'careers_contact_form_location',
                    defaultMessage: 'Location',
                  })}*`}
                  description={intl.formatMessage({
                    id: 'careers_contact_form_location_placeholder',
                    defaultMessage: 'Country/city',
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
              name="candidateType"
              control={control}
              render={({ field: { ref, ...props } }) => (
                <Select
                  {...props}
                  selectRef={ref}
                  id={props.name}
                  label={intl.formatMessage({
                    id: 'careers_contact_form_candidate_type',
                    defaultMessage: 'Candidate type',
                  })}
                >
                  <option value="">
                    {intl.formatMessage({
                      id: 'form_please_select_an_option',
                      defaultMessage: 'Please select an option',
                    })}
                  </option>
                  <option>
                    {intl.formatMessage({
                      id: 'careers_contact_form_experienced_professionals',
                      defaultMessage: 'Experienced professionals',
                    })}
                  </option>
                  <option>
                    {intl.formatMessage({
                      id: ' careers_contact_form_graduates',
                      defaultMessage: 'Graduates',
                    })}
                  </option>
                  <option>
                    {intl.formatMessage({
                      id: 'careers_contact_form_interns',
                      defaultMessage: 'Interns (e.g. summer, academic)',
                    })}
                  </option>
                  <option>
                    {intl.formatMessage({
                      id: 'careers_contact_form_apprentices',
                      defaultMessage: 'Apprentices/lærlinger',
                    })}
                  </option>
                  <option>
                    {intl.formatMessage({
                      id: 'careers_contact_form_other',
                      defaultMessage: 'Other',
                    })}
                  </option>
                </Select>
              )}
            />

            <Controller
              name="questions"
              control={control}
              rules={{
                required: intl.formatMessage({
                  id: 'careers_contact_form_questions_validation',
                  defaultMessage: 'Please enter a question',
                }),
              }}
              render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
                <TextField
                  {...props}
                  id={props.name}
                  label={`${intl.formatMessage({
                    id: 'careers_contact_form_questions',
                    defaultMessage: 'Type your questions',
                  })}*`}
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
              label={intl.formatMessage({
                id: 'careers_contact_form_supporting_documents',
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
            <Button type="submit">
              {isSubmitting ? (
                <FormattedMessage id="form_sending" defaultMessage={'Sending...'}></FormattedMessage>
              ) : (
                <FormattedMessage id="careers_contact_form_cta" defaultMessage="Submit Form" />
              )}
            </Button>
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
