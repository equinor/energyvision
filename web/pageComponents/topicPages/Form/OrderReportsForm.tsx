import styled from 'styled-components'
import { Icon, Checkbox } from '@equinor/eds-core-react'
import { useForm, Controller } from 'react-hook-form'
import { error_filled } from '@equinor/eds-icons'
import { FormattedMessage, useIntl } from 'react-intl'
import { FormButton, FormTextField, FormSubmitFailureBox, FormSubmitSuccessBox } from '@components'
import { BaseSyntheticEvent, useState } from 'react'
import FriendlyCaptcha from './FriendlyCaptcha'

const UnstyledList = styled.ul`
  list-style-type: none;
  column-count: 1;
  padding: 0 var(--space-medium) 0 0;
  margin: var(--space-medium) 0 var(--space-medium) -12px;
`
const StyledFieldset = styled.fieldset`
  border: 0;
  padding: 0;
  margin-inline-start: 0;
  margin-inline-end: 0;
  padding-block-start: 0;
  padding-inline-start: 0;
  padding-inline-end: 0;
  padding-block-end: 0;
`
const StyledLegend = styled.legend`
  font-weight: var(--fontWeight-regular);
  font-size: var(--typeScale-2);
`
const ErrorDiv = styled.div`
  display: flex;
`
const ErrorStyledList = styled(UnstyledList)`
  border: var(--eds_button__border_width) var(--clear-red-100) solid;
`
const StyledIcon = styled(Icon)`
  margin-left: var(--space-small);
  color: var(--clear-red-100);
  margin-top: var(--space-medium);
`
const StyledHelper = styled.p`
  margin: calc(var(--space-small) * -1) 0 var(--space-medium) 8px;
  color: var(--clear-red-100);
  font-weight: 500;
`

type FormValues = {
  name: string
  email: string
  company: string
  address: string
  zipcode: string
  city: string
  country: string
  reports: string[]
}

const OrderReportsForm = () => {
  const intl = useIntl()
  const [submitButtonEnabled, setSubmitButtonEnabled] = useState(false)
  const [isServerError, setServerError] = useState(false)
  const [isSuccessfullySubmitted, setSuccessfullySubmitted] = useState(false)
  const onSubmit = async (data: FormValues, event?: BaseSyntheticEvent) => {
    const res = await fetch('/api/forms/service-now-order-reports', {
      body: JSON.stringify({
        data,
        frcCaptchaSolution: (event?.target as any)['frc-captcha-solution'].value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
    setServerError(res.status != 200)
    setSuccessfullySubmitted(res.status == 200)
  }

  const Checkboxes = () => {
    return (
      <>
        <li>
          <Checkbox
            label="Annual Report and Form 20-F (English version)"
            value="annualReport"
            aria-invalid={errors.reports ? 'true' : 'false'}
            aria-describedby="atleast-one-report-required"
            {...register('reports')}
            {...register('reports', {
              validate: (values) => values.length > 0,
            })}
          />
        </li>
        <li>
          <Checkbox
            label="Årsrapport for norske myndigheter (Norwegian version)"
            value="statutoryReport"
            aria-invalid={errors.reports ? 'true' : 'false'}
            aria-describedby="atleast-one-report-required"
            {...register('reports')}
          />
        </li>
      </>
    )
  }
  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: { errors, isSubmitSuccessful, isSubmitted, isSubmitting },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      company: '',
      zipcode: '',
      address: '',
      city: '',
      reports: [],
      country: '',
    },
  })
  return (
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
          <StyledFieldset>
            <StyledLegend>
              <FormattedMessage
                id="order_reports_form_choose"
                defaultMessage="Please choose atleast one of the following reports"
              />
            </StyledLegend>
            {errors.reports && (
              <>
                <ErrorDiv id="atleast-one-report-required">
                  <ErrorStyledList>
                    <Checkboxes />
                  </ErrorStyledList>
                  <StyledIcon data={error_filled} aria-hidden="true" />
                </ErrorDiv>
                <StyledHelper id="atleast-one-report-required" role="alert">
                  <FormattedMessage
                    id="order_reports_form_choose"
                    defaultMessage="Please select atleast one of the reports"
                  />
                </StyledHelper>
              </>
            )}
            {!errors.reports && (
              <UnstyledList>
                <Checkboxes />
              </UnstyledList>
            )}
          </StyledFieldset>
          <Controller
            name="name"
            control={control}
            rules={{
              required: intl.formatMessage({
                id: 'order_reports_form_name_validation',
                defaultMessage: 'Please enter your name',
              }),
            }}
            render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
              <FormTextField
                {...props}
                id={props.name}
                label={intl.formatMessage({
                  id: 'order_reports_form_name',
                  defaultMessage: 'Name',
                })}
                placeholder={intl.formatMessage({
                  id: 'order_reports_form_name_placeholder',
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
                id: 'order_reports_form_email_validation',
                defaultMessage: 'Please fill out a valid email address',
              }),
              pattern: {
                value: /^[\w!#$%&'*+/=?`{|}~^-]+(?:\.[\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/g,
                message: intl.formatMessage({
                  id: 'order_reports_form_email_validation',
                  defaultMessage: 'Please fill out a valid email address',
                }),
              },
            }}
            render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
              <FormTextField
                {...props}
                id={props.name}
                label={intl.formatMessage({
                  id: ' order_reports_form_email',
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
            name="company"
            control={control}
            rules={{
              required: intl.formatMessage({
                id: 'order_reports_form_company_validation',
                defaultMessage: 'Please enter your company',
              }),
            }}
            render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
              <FormTextField
                {...props}
                id={props.name}
                label={intl.formatMessage({
                  id: 'order_reports_form_company',
                  defaultMessage: 'Company',
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
            name="address"
            control={control}
            rules={{
              required: intl.formatMessage({
                id: 'order_reports_form_address_validation',
                defaultMessage: 'Please enter your address',
              }),
            }}
            render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
              <FormTextField
                {...props}
                id={props.name}
                label={intl.formatMessage({
                  id: ' order_reports_form_address',
                  defaultMessage: 'Address',
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
            name="zipcode"
            control={control}
            rules={{
              required: intl.formatMessage({
                id: 'order_reports_form_zipcode_validation',
                defaultMessage: 'Please enter your post number/Zip code',
              }),
            }}
            render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
              <FormTextField
                {...props}
                id={props.name}
                label={intl.formatMessage({
                  id: ' order_reports_form_zipcode',
                  defaultMessage: 'Post number/Zip code',
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
            name="city"
            control={control}
            rules={{
              required: intl.formatMessage({
                id: 'order_reports_form_city_validation',
                defaultMessage: 'Please enter your city',
              }),
            }}
            render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
              <FormTextField
                {...props}
                id={props.name}
                aria-required="true"
                label={intl.formatMessage({
                  id: 'order_reports_form_city',
                  defaultMessage: 'City',
                })}
                inputIcon={invalid ? <Icon data={error_filled} title="error" /> : undefined}
                helperText={error?.message}
                inputRef={ref}
                variant={invalid ? 'error' : 'default'}
              />
            )}
          />
          <Controller
            name="country"
            control={control}
            rules={{
              required: intl.formatMessage({
                id: 'order_reports_form_country_validation',
                defaultMessage: 'Please enter your country',
              }),
            }}
            render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
              <FormTextField
                {...props}
                id={props.name}
                label={intl.formatMessage({
                  id: 'order_reports_form_country',
                  defaultMessage: 'Country',
                })}
                aria-required="true"
                inputRef={ref}
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
              <FormattedMessage id="order_reports_form_cta" defaultMessage="Order printed copies" />
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
  )
}
export default OrderReportsForm
