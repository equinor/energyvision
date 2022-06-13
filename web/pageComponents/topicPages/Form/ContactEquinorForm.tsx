import { Icon } from '@equinor/eds-core-react'
import { useForm, Controller } from 'react-hook-form'
import { error_filled } from '@equinor/eds-icons'
import { FormattedMessage, useIntl } from 'react-intl'
import { FormButton, FormTextField, FormSelect, FormSubmitSuccessBox, FormSubmitFailureBox } from '@components'
import { BaseSyntheticEvent, useState } from 'react'
import FriendlyCaptcha from './FriendlyCaptcha'

type FormValues = {
  name: string
  email: string
  category: string
  receiver: string
  message: string
}

const ContactEquinorForm = () => {
  const intl = useIntl()
  const [submitButtonEnabled, setSubmitButtonEnabled] = useState(false)
  const [isServerError, setServerError] = useState(false)
  const [isSuccessfullySubmitted, setSuccessfullySubmitted] = useState(false)
  const onSubmit = async (data: FormValues, event?: BaseSyntheticEvent) => {
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
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
    setServerError(res.status != 200)
    setSuccessfullySubmitted(res.status == 200)
  }

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitted, isSubmitting, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      receiver: '',
      message: '',
      category: intl.formatMessage({
        id: 'contact_form_ask_us',
        defaultMessage: 'Ask us a question',
      }),
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
            <Controller
              name="name"
              control={control}
              rules={{
                required: intl.formatMessage({
                  id: 'contact_form_name_validation',
                  defaultMessage: 'Please fill out your name',
                }),
              }}
              render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
                <FormTextField
                  {...props}
                  id={props.name}
                  label={intl.formatMessage({
                    id: 'contact_form_name',
                    defaultMessage: 'Name',
                  })}
                  placeholder={intl.formatMessage({
                    id: 'contact_form_name_placeholder',
                    defaultMessage: 'Jane Doe',
                  })}
                  inputRef={ref}
                  aria-required="true"
                  inputIcon={invalid ? <Icon data={error_filled} title="error" /> : undefined}
                  helperText={error?.message}
                  variant={invalid ? 'error' : 'default'}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              rules={{
                required: intl.formatMessage({
                  id: 'contact_form_email_validation',
                  defaultMessage: 'Please fill out a valid email address',
                }),
                pattern: {
                  value: /^[\w!#$%&'*+/=?`{|}~^-]+(?:\.[\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/g,
                  message: intl.formatMessage({
                    id: 'contact_form_email_validation',
                    defaultMessage: 'Please fill out a valid email address',
                  }),
                },
              }}
              render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
                <FormTextField
                  {...props}
                  id={props.name}
                  label={intl.formatMessage({
                    id: 'contact_form_email',
                    defaultMessage: 'Email',
                  })}
                  inputRef={ref}
                  inputIcon={invalid ? <Icon data={error_filled} title="error" /> : undefined}
                  helperText={error?.message}
                  aria-required="true"
                  variant={invalid ? 'error' : 'default'}
                />
              )}
            />
            <Controller
              name="category"
              control={control}
              render={({ field: { ref, ...props } }) => (
                <FormSelect
                  {...props}
                  selectRef={ref}
                  id={props.name}
                  label={intl.formatMessage({ id: 'contact_form_category', defaultMessage: 'Category' })}
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
                  <option>{intl.formatMessage({ id: 'contact_form_other', defaultMessage: 'Other' })}</option>
                </FormSelect>
              )}
            />

            <Controller
              name="receiver"
              control={control}
              render={({ field: { ref, ...props } }) => (
                <FormTextField
                  {...props}
                  id={props.name}
                  label={intl.formatMessage({
                    id: 'contact_form_reaching_out',
                    defaultMessage: 'Who are you trying to reach?',
                  })}
                  inputRef={ref}
                  variant="default"
                />
              )}
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
              render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
                <FormTextField
                  {...props}
                  id={props.name}
                  label={intl.formatMessage({
                    id: 'contact_form_how_to_help',
                    defaultMessage: 'How can we help you?',
                  })}
                  inputRef={ref}
                  multiline
                  rowsMax={10}
                  aria-required="true"
                  inputIcon={invalid ? <Icon data={error_filled} title="error" /> : undefined}
                  helperText={error?.message}
                  variant={invalid ? 'error' : 'default'}
                />
              )}
            />

            <FriendlyCaptcha
              doneCallback={() => {
                setSubmitButtonEnabled(true)
              }}
              errorCallback={() => {
                setSubmitButtonEnabled(true)
              }}
            />
            <FormButton type="submit" disabled={!submitButtonEnabled}>
              {isSubmitting ? (
                <FormattedMessage id="form_sending" defaultMessage={'Sending...'}></FormattedMessage>
              ) : (
                <FormattedMessage id="contact_form_cta" defaultMessage="Submit Form" />
              )}
            </FormButton>
          </>
        )}
        {isSubmitSuccessful && !isServerError && <FormSubmitSuccessBox type="reset" />}
        {isSubmitted && isServerError && (
          <FormSubmitFailureBox
            type="button"
            onClick={() => {
              reset(undefined, { keepValues: true })
              setServerError(false)
              setSubmitButtonEnabled(false)
            }}
          />
        )}
      </form>
    </>
  )
}
export default ContactEquinorForm
