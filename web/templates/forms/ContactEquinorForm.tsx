import { Icon } from '@equinor/eds-core-react'
import { useForm, Controller } from 'react-hook-form'
import { error_filled } from '@equinor/eds-icons'
import { FormattedMessage, useIntl } from 'react-intl'
import { BaseSyntheticEvent, useState } from 'react'
import FriendlyCaptcha from './FriendlyCaptcha'
import { ContactFormCatalogType } from '../../types'
import { Button } from '@core/Button'
import { TextField } from '@core/TextField/TextField'
import { Select } from '@core/Select/Select'
import { FormMessageBox } from '@core/Form/FormMessageBox'

type FormValues = {
  name: string
  email: string
  category: string
  message: string
}

const ContactEquinorForm = () => {
  const intl = useIntl()
  const [isServerError, setServerError] = useState(false)
  const [isFriendlyChallengeDone, setIsFriendlyChallengeDone] = useState(false)
  const [isSuccessfullySubmitted, setSuccessfullySubmitted] = useState(false)

  const getCatalog = (category: string): ContactFormCatalogType | null => {
    if (
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
      category: '',
    },
  })

  const onSubmit = async (data: FormValues, event?: BaseSyntheticEvent) => {
    if (isFriendlyChallengeDone) {
      const res = await fetch('/api/forms/service-now-contact-us', {
        body: JSON.stringify({
          data,
          frcCaptchaSolution: (event?.target as any)['frc-captcha-response'].value,
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
      {!isSuccessfullySubmitted && (
        <>
          <div className="pb-6 text-sm">
            <FormattedMessage id="all_fields_mandatory" defaultMessage="All fields with *  are mandatory" />
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            onReset={() => {
              reset()
              setIsFriendlyChallengeDone(false)
              setSuccessfullySubmitted(false)
            }}
            className="flex flex-col gap-12"
          >
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
                  <TextField
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
                  <TextField
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
                  <Select
                    {...props}
                    selectRef={ref}
                    id={name}
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
                        id: 'contact_form_login_issues',
                        defaultMessage: 'Login Issues',
                      })}
                    </option>

                    <option>{intl.formatMessage({ id: 'contact_form_other', defaultMessage: 'Other' })}</option>
                  </Select>
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
                <p
                  role="alert"
                  className="text-slate-80 border border-clear-red-100 px-6 py-4  flex gap-2 font-semibold"
                >
                  {/*@ts-ignore: TODO: types*/}
                  <span className="mt-1">{errors.root.notCompletedCaptcha.message}</span>
                  <Icon data={error_filled} aria-label="Error Icon" />
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
          </form>
        </>
      )}
      <div role="region" aria-live="assertive">
        {isSubmitSuccessful && <FormMessageBox variant="success" />}
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
    </>
  )
}
export default ContactEquinorForm
