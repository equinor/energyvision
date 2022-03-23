import { Icon } from '@equinor/eds-core-react'
import { useForm, Controller } from 'react-hook-form'
import { error_filled } from '@equinor/eds-icons'
import { FormattedMessage, useIntl } from 'react-intl'
import { FormButton, FormTextField, FormSelect } from '@components'

type FormValues = {
  name: string
  email: string
  phone: string
  category: string
  questions: string
  positionId: string
  preferredLang: string
}

const CareersContactForm = () => {
  const intl = useIntl()

  const onSubmit = async (data: FormValues) => {
    data.preferredLang = intl.locale
    const res = await fetch('/api/forms/service-now-careers-contact', {
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
      positionId: '',
      location: '',
      phone: '',
      questions: '',
      category: intl.formatMessage({
        id: 'careers_contact_form_thesis_writing',
        defaultMessage: 'Thesis writing',
      }),
      preferredLang: '',
    },
  })
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          rules={{
            required: intl.formatMessage({
              id: 'careers_contact_form_name_validation',
              defaultMessage: 'Please fill out your name',
            }),
          }}
          render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
            <FormTextField
              {...props}
              id={props.name}
              label={intl.formatMessage({
                id: 'careers_contact_form_name',
                defaultMessage: 'Your Name',
              })}
              placeholder={intl.formatMessage({
                id: 'careers_contact_form_name_placeholder',
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
            <FormTextField
              {...props}
              id={props.name}
              label={intl.formatMessage({
                id: 'careers_contact_form_phone',
                defaultMessage: 'Phone Number',
              })}
              placeholder={intl.formatMessage({
                id: 'careers_contact_form_phone_placeholder',
                defaultMessage: 'Country code and phone number',
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
          name="email"
          control={control}
          rules={{
            required: intl.formatMessage({
              id: 'careers_contact_form_email_validation',
              defaultMessage: 'Please fill out a valid email address',
            }),
            pattern: {
              value: /^[\w!#$%&'*+/=?`{|}~^-]+(?:\.[\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/g,
              message: intl.formatMessage({
                id: 'careers_contact_form_email_validation',
                defaultMessage: 'Please fill out a valid email address',
              }),
            },
          }}
          render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
            <FormTextField
              {...props}
              id={props.name}
              label={intl.formatMessage({
                id: 'careers_contact_form_email',
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
              label={intl.formatMessage({ id: 'careers_contact_form_category', defaultMessage: 'Category' })}
            >
              <option>
                {intl.formatMessage({ id: 'careers_contact_form_thesis_writing', defaultMessage: 'Thesis writing' })}
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
            </FormSelect>
          )}
        />

        <Controller
          name="positionId"
          control={control}
          render={({ field: { ref, ...props } }) => (
            <FormTextField
              {...props}
              id={props.name}
              label={intl.formatMessage({
                id: 'careers_contact_form_position',
                defaultMessage: 'Position ID/name',
              })}
              inputRef={ref}
              variant="default"
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
            <FormTextField
              {...props}
              id={props.name}
              label={intl.formatMessage({
                id: 'careers_contact_form_location',
                defaultMessage: 'Locaton',
              })}
              placeholder={intl.formatMessage({
                id: 'careers_contact_form_location_placeholder',
                defaultMessage: 'Country/city',
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
          name="questions"
          control={control}
          rules={{
            required: intl.formatMessage({
              id: 'careers_contact_form_questions_validation',
              defaultMessage: 'Please enter a question',
            }),
          }}
          render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
            <FormTextField
              {...props}
              id={props.name}
              label={intl.formatMessage({
                id: 'careers_contact_form_questions',
                defaultMessage: 'Type your questions',
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

        <FormButton type="submit">
          <FormattedMessage id="careers_contact_form_cta" defaultMessage="Submit Form" />
        </FormButton>
      </form>
    </>
  )
}
export default CareersContactForm
