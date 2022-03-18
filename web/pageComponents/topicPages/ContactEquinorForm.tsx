import styled from 'styled-components'
import { Button, TextField, NativeSelect, Icon } from '@equinor/eds-core-react'
import { useForm, Controller } from 'react-hook-form'
import { error_filled } from '@equinor/eds-icons'
import { FormattedMessage, useIntl } from 'react-intl'

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: right;
  padding: var(--space-medium) 0px var(--space-medium) 0px;
`
const TextFieldWrapper = styled.div`
  padding: var(--space-small) 0px var(--space-medium) 0px;
  p {
    color: var(--clear-red-100);
  }
`
const StyledButton = styled(Button)`
  padding-left: var(--space-xLarge);
  padding-right: var(--space-xLarge);
`

type FormValues = {
  name: string
  email: string
  category: string
  receiver: string
  message: string
}

const ContactEquinorForm = () => {
  const intl = useIntl()

  const onSubmit = async (data: FormValues) => {
    const res = await fetch('/api/forms/service-now-contact-us', {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    if (res.status != 200) console.error('Error submitting form')
    reset()
  }

  const { handleSubmit, control, reset } = useForm({
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
      {/* @TODO Norwegian translations for labels and button text*/}
      <form onSubmit={handleSubmit(onSubmit)}>
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
            <TextFieldWrapper>
              <TextField
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
            </TextFieldWrapper>
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
            <TextFieldWrapper>
              <TextField
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
            </TextFieldWrapper>
          )}
        />
        <Controller
          name="category"
          control={control}
          render={({ field: { ref, ...props } }) => (
            <TextFieldWrapper>
              <NativeSelect
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
                  {intl.formatMessage({ id: 'contact_form_investor_relations', defaultMessage: 'Investor relations' })}
                </option>
                <option>{intl.formatMessage({ id: 'contact_form_other', defaultMessage: 'Other' })}</option>
              </NativeSelect>
            </TextFieldWrapper>
          )}
        />

        <Controller
          name="receiver"
          control={control}
          render={({ field: { ref, ...props } }) => (
            <TextFieldWrapper>
              <TextField
                {...props}
                id={props.name}
                label={intl.formatMessage({
                  id: 'contact_form_name',
                  defaultMessage: 'Who are you trying to reach?',
                })}
                inputRef={ref}
                variant="default"
              />
            </TextFieldWrapper>
          )}
        />
        <Controller
          name="message"
          control={control}
          rules={{
            required: intl.formatMessage({
              id: 'contact_form_name_validation',
              defaultMessage: 'Please let us know how we may help you',
            }),
          }}
          render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
            <TextFieldWrapper>
              <TextField
                {...props}
                id={props.name}
                label={intl.formatMessage({
                  id: 'contact_form_name',
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
            </TextFieldWrapper>
          )}
        />
        <ButtonWrapper>
          <StyledButton type="submit">
            <FormattedMessage id="contact_form_cta" defaultMessage="Submit Form" />
          </StyledButton>
        </ButtonWrapper>
      </form>
    </>
  )
}
export default ContactEquinorForm
