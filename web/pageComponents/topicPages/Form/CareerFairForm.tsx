import { Icon, Checkbox } from '@equinor/eds-core-react'
import { useForm, Controller } from 'react-hook-form'
import { error_filled } from '@equinor/eds-icons'
import { FormattedMessage, useIntl } from 'react-intl'
import { FormButton, FormTextField, FormSelect } from '@components'
import styled from 'styled-components'

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
`
const CareerFairForm = () => {
  const intl = useIntl()

  const onSubmit = async (data: FormValues) => {
    data.preferredLang = intl.locale
    const res = await fetch('/api/forms/service-now-career-fair-events', {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    if (res.status != 200) console.error('Error submitting form')
    reset()
  }

  const { handleSubmit, control, reset, register, watch } = useForm({
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

  const watchEvent = watch('event')
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
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
              variant={invalid ? 'error' : 'default'}
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
              placeholder={intl.formatMessage({
                id: 'career_fair_form_name_placeholder',
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
            <FormTextField
              {...props}
              id={props.name}
              label={intl.formatMessage({
                id: ' career_fair_form_phone',
                defaultMessage: 'Phone Number',
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
                id: ' career_fair_form_email',
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
                  Please be aware that we only offer visits to a few selected locations. Please specify your preferred
                  location and we will revert to you as soon as we can.
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
            <FormTextField
              {...props}
              id={props.name}
              multiline
              rowsMax={10}
              maxLength={3400}
              aria-required="true"
              label={intl.formatMessage({
                id: 'career_fair_form_event_description',
                defaultMessage: 'Event Description (max 3400 characters)',
              })}
              inputIcon={invalid ? <Icon data={error_filled} title="error" /> : undefined}
              helperText={error?.message}
              inputRef={ref}
              variant={invalid ? 'error' : 'default'}
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
              variant="default"
            />
          )}
        />
        <Checkbox
          label={intl.formatMessage({
            id: 'career_fair_form_supporting_documents',
            defaultMessage:
              'Tick the box if you would like to send supporting documents, and we will get in touch with you',
          })}
          value="Yes"
          {...register('supportingDocuments')}
        />

        <FormButton type="submit">
          <FormattedMessage id="career_fair_form_cta" defaultMessage="Submit Form" />
        </FormButton>
      </form>
    </>
  )
}
export default CareerFairForm
