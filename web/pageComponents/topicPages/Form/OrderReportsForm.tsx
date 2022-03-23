import styled from 'styled-components'
import { Icon, Checkbox } from '@equinor/eds-core-react'
import { useForm, Controller } from 'react-hook-form'
import { error_filled } from '@equinor/eds-icons'
import { FormattedMessage, useIntl } from 'react-intl'
import { FormButton, FormTextField } from '@components'

const UnstyledList = styled.ul`
  margin: -12px;
  padding: var(--space-large) 0 var(--space-large) 0px;
  list-style-type: none;
  column-count: 1;
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
const ErrorStyledDiv = styled.div`
  font-weight: var(--fontWeight-regular);
  font-size: var(--typeScale-2);
  color: var(--clear-red-100);
  align-items: center;
  display: flex;
`
const StyledIcon = styled(Icon)`
  margin-left: var(--space-small);
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

  const onSubmit = async (data: FormValues) => {
    const res = await fetch('/api/forms/service-now-order-reports', {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    if (res.status != 200) console.error('Error submitting form')
    reset()
  }

  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: { errors },
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
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledFieldset>
          {!errors.reports && (
            <StyledLegend id="atleast-one-report-required">
              <FormattedMessage
                id="subscribe_form_choose"
                defaultMessage="Please choose atleast one of the following reports"
              />
            </StyledLegend>
          )}
          {errors.reports && (
            <ErrorStyledDiv role="alert" id="atleast-one-report-required">
              <StyledLegend>
                <FormattedMessage
                  id="subscribe_form_choose"
                  defaultMessage="Please choose atleast one of the following reports"
                />
              </StyledLegend>
              <StyledIcon data={error_filled} aria-hidden="true" />
            </ErrorStyledDiv>
          )}
          <UnstyledList>
            <li>
              <Checkbox
                label="Annual Report and Form 20-F"
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
                label="Årsrapport for norske myndigheter"
                value="statutoryReport"
                aria-invalid={errors.reports ? 'true' : 'false'}
                aria-describedby="atleast-one-report-required"
                {...register('reports')}
              />
            </li>
          </UnstyledList>
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
              id: 'order_reports_fair_form_email_validation',
              defaultMessage: 'Please fill out a valid email address',
            }),
            pattern: {
              value: /^[\w!#$%&'*+/=?`{|}~^-]+(?:\.[\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/g,
              message: intl.formatMessage({
                id: 'order_reports_fair_form_email_validation',
                defaultMessage: 'Please fill out a valid email address',
              }),
            },
          }}
          render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
            <FormTextField
              {...props}
              id={props.name}
              label={intl.formatMessage({
                id: ' order_reports_fair_form_email',
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
              id: 'order_reports_fair_form_company_validation',
              defaultMessage: 'Please enter your company',
            }),
          }}
          render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
            <FormTextField
              {...props}
              id={props.name}
              label={intl.formatMessage({
                id: 'order_reports_fair_form_company',
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
              id: 'order_reports_fair_form_address_validation',
              defaultMessage: 'Please enter your address',
            }),
          }}
          render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
            <FormTextField
              {...props}
              id={props.name}
              label={intl.formatMessage({
                id: ' order_reports_fair_form_address',
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
              id: 'order_reports_fair_form_zipcode_validation',
              defaultMessage: 'Please enter your post number/Zip code',
            }),
          }}
          render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
            <FormTextField
              {...props}
              id={props.name}
              label={intl.formatMessage({
                id: ' order_reports_fair_form_zipcode',
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
              id: 'order_reports_fair_form_city_validation',
              defaultMessage: 'Please enter your city',
            }),
          }}
          render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
            <FormTextField
              {...props}
              id={props.name}
              aria-required="true"
              label={intl.formatMessage({
                id: 'order_reports_fair_form_city',
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
              id: 'order_reports_fair_form_country_validation',
              defaultMessage: 'Please enter your country',
            }),
          }}
          render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
            <FormTextField
              {...props}
              id={props.name}
              label={intl.formatMessage({
                id: 'order_reports_fair_form_country',
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
        <FormButton type="submit">
          <FormattedMessage id="order_reports_fair_form_cta" defaultMessage="Order printed copies" />
        </FormButton>
      </form>
    </>
  )
}
export default OrderReportsForm
