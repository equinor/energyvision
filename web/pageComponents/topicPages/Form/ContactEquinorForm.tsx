import { Icon } from '@equinor/eds-core-react'
import { useForm, Controller } from 'react-hook-form'
import { error_filled } from '@equinor/eds-icons'
import { FormattedMessage, useIntl } from 'react-intl'
import { FormTextField, FormSelect, FormSubmitSuccessBox, FormSubmitFailureBox } from '@components'
import { BaseSyntheticEvent, useState } from 'react'
import FriendlyCaptcha from './FriendlyCaptcha'
import { ContactFormCatalogType } from '../../../types'
import { Button } from '@core/Button'
import { TextField } from '@core/TextField/TextField'

type ContactEquinorFormProps = {
  isHumanRightsRequest?: boolean
}
type FormValues = {
  name: string
  email: string
  category: string
  message: string
}

const ContactEquinorForm = (props: ContactEquinorFormProps) => {
  const intl = useIntl()
  const { isHumanRightsRequest } = props
  const [isServerError, setServerError] = useState(false)
  const [isFriendlyChallengeDone, setIsFriendlyChallengeDone] = useState(false)
  const [isSuccessfullySubmitted, setSuccessfullySubmitted] = useState(false)

  const getCatalog = (category: string): ContactFormCatalogType | null => {
    if (
      category.includes(
        intl.formatMessage({
          id: 'contact_form_human_rights_information_request',
          defaultMessage: 'Human Rights Information Request',
        }),
      )
    )
      return 'humanRightsInformationRequest'
    else if (
      category.includes(
        intl.formatMessage({
          id: 'contact_form_login_issues',
          defaultMessage: 'Login Issues',
        }),
      )
    )
      return 'loginIssues'
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
      category: isHumanRightsRequest
        ? intl.formatMessage({
            id: 'contact_form_human_rights_information_request',
            defaultMessage: 'Human Rights Information Request',
          })
        : intl.formatMessage({
            id: 'contact_form_ask_us',
            defaultMessage: 'Ask us a question',
          }),
    },
  })

  const onSubmit = async (data: FormValues, event?: BaseSyntheticEvent) => {
    if (isFriendlyChallengeDone) {
      const res = await fetch('/api/forms/service-now-contact-us', {
        body: JSON.stringify({
          data,
          frcCaptchaSolution: (event?.target as any)['frc-captcha-solution'].value,
          isHumanRightsInformationRequest: data.category.includes(
            intl.formatMessage({
              id: 'contact_form_human_rights_information_request',
              defaultMessage: 'Human Rights Information Request',
            }),
          ),
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
              render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => {
                const { name } = props
                return (
                  <FormTextField
                    {...props}
                    id={name}
                    label={`${intl.formatMessage({
                      id: 'name',
                      defaultMessage: 'Name',
                    })}*`}
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
              render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => {
                const { name } = props
                return (
                  <FormTextField
                    {...props}
                    id={name}
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
                )
              }}
            />
            <Controller
              name="category"
              control={control}
              render={({ field: { ref, ...props } }) => {
                const { name } = props
                return (
                  <FormSelect
                    {...props}
                    selectRef={ref}
                    id={name}
                    disabled={isHumanRightsRequest}
                    label={intl.formatMessage({ id: 'category', defaultMessage: 'Category' })}
                  >
                    <option>
                      {intl.formatMessage({ id: 'contact_form_ask_us', defaultMessage: 'Ask us a question' })}
                    </option>
                    <option>
                      {intl.formatMessage({
                        id: 'contact_form_report_error',
                        defaultMessage: 'Report an error on our website',
                      })}
                    </option>
                    <option>
                      {intl.formatMessage({
                        id: 'contact_form_contact_department',
                        defaultMessage: 'Contact a department or member of staff',
                      })}
                    </option>
                    <option>
                      {intl.formatMessage({
                        id: 'contact_form_investor_relations',
                        defaultMessage: 'Investor relations',
                      })}
                    </option>
                    <option>
                      {intl.formatMessage({
                        id: 'contact_form_human_rights_information_request',
                        defaultMessage: 'Human Rights Information Request',
                      })}
                    </option>

                    <option>
                      {intl.formatMessage({
                        id: 'contact_form_login_issues',
                        defaultMessage: 'Login Issues',
                      })}
                    </option>

                    <option>{intl.formatMessage({ id: 'contact_form_other', defaultMessage: 'Other' })}</option>
                  </FormSelect>
                )
              }}
            />

            <Controller
              name="message"
              control={control}
              rules={{
                required: intl.formatMessage({
                  id: 'contact_form_how_to_help_validation',
                  defaultMessage: 'Please let us know how we may help you',
                }),
              }}
              render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => {
                const { name } = props
                return (
                  <TextField
                    {...props}
                    id={name}
                    description={intl.formatMessage({
                      id: 'dont_enter_personal_info',
                      defaultMessage: `Please don't enter any personal information`,
                    })}
                    label={`${intl.formatMessage({
                      id: 'contact_form_how_to_help',
                      defaultMessage: 'How can we help you?',
                    })}*`}
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
                <FormattedMessage id="contact_form_cta" defaultMessage="Submit Form" />
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
export default ContactEquinorForm
