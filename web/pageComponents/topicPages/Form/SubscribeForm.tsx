/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SubscribeFormParameters } from '../../../types/types'
import styled from 'styled-components'
import { Icon } from '@equinor/eds-core-react'
import { useForm, Controller } from 'react-hook-form'
import { error_filled } from '@equinor/eds-icons'
import { useRouter } from 'next/router'
import { FormattedMessage, useIntl } from 'react-intl'
import { FormButton, FormSubmitSuccessBox, FormTextField, FormSubmitFailureBox, Checkbox } from '@components'
import { BaseSyntheticEvent, useState } from 'react'
import FriendlyCaptcha from './FriendlyCaptcha'

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

const UnstyledList = styled.ul`
  margin: -12px;
  padding: var(--space-large) 0 var(--space-large) 0px;
  list-style-type: none;
  column-count: 2;
  @media (max-width: 920px) {
    column-count: 1;
  }
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
const StyledLegend = styled.legend`
  font-weight: var(--fontWeight-regular);
  font-size: var(--typeScale-2);
`

type FormValues = {
  firstName: string
  email: string
  categories: string[]
}

const SubscribeForm = () => {
  const router = useRouter()
  const intl = useIntl()
  const [submitButtonEnabled, setSubmitButtonEnabled] = useState(false)
  const [isServerError, setServerError] = useState(false)
  const [isSuccessfullySubmitted, setSuccessfullySubmitted] = useState(false)

  const onSubmit = async (data: FormValues, event?: BaseSyntheticEvent) => {
    const allCategories = data.categories.includes('all')
    const subscribeFormParamers: SubscribeFormParameters = {
      firstName: data.firstName,
      email: data.email,
      crudeOilAssays: allCategories || data.categories.includes('crudeOilAssays'),
      generalNews: allCategories || data.categories.includes('generalNews'),
      stockMarketAnnouncements: allCategories || data.categories.includes('stockMarketAnnouncements'),
      magazineStories: allCategories || data.categories.includes('magazineStories'),
      languageCode: router.locale == 'en' ? 'en' : 'no',
    }

    const res = await fetch('/api/subscribe-form', {
      body: JSON.stringify({
        subscribeFormParamers,
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

  const {
    handleSubmit,
    reset,
    control,
    register,
    formState: { errors, isSubmitting, isSubmitted, isSubmitSuccessful },
  } = useForm({ defaultValues: { firstName: '', email: '', categories: [] } })

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
            {!errors.categories && (
              <StyledLegend id="atleast-one-category-required">
                <FormattedMessage
                  id="subscribe_form_choose"
                  defaultMessage="Please choose one or more of the following"
                />
              </StyledLegend>
            )}
            {errors.categories && (
              <ErrorStyledDiv role="alert" id="atleast-one-category-required">
                <StyledLegend>
                  <FormattedMessage
                    id="subscribe_form_choose"
                    defaultMessage="Please choose one or more of the following"
                  />
                </StyledLegend>
                <StyledIcon data={error_filled} aria-hidden="true" />
              </ErrorStyledDiv>
            )}

            <UnstyledList>
              <li>
                <Checkbox
                  label={intl.formatMessage({
                    id: 'subscribe_form_general_news',
                    defaultMessage: 'General News',
                  })}
                  value="generalNews"
                  aria-describedby="atleast-one-category-required"
                  {...register('categories', {
                    validate: (values) => values.length > 0,
                  })}
                  aria-required
                  aria-invalid={errors.categories ? 'true' : 'false'}
                />
              </li>
              <li>
                <Checkbox
                  label={intl.formatMessage({
                    id: 'subscribe_form_magazine_stories',
                    defaultMessage: 'Magazine stories',
                  })}
                  aria-invalid={errors.categories ? 'true' : 'false'}
                  aria-describedby="atleast-one-category-required"
                  value="magazineStories"
                  aria-required
                  {...register('categories')}
                />
              </li>
              <li>
                <Checkbox
                  label={intl.formatMessage({
                    id: 'subscribe_form_stock_market',
                    defaultMessage: 'Stock market announcements',
                  })}
                  value="stockMarketAnnouncements"
                  aria-invalid={errors.categories ? 'true' : 'false'}
                  aria-describedby="atleast-one-category-required"
                  aria-required
                  {...register('categories')}
                />
              </li>
              <li>
                <Checkbox
                  label={intl.formatMessage({
                    id: 'subscribe_form_cruide_oil',
                    defaultMessage: 'Crude oil assays',
                  })}
                  aria-invalid={errors.categories ? 'true' : 'false'}
                  aria-describedby="atleast-one-category-required"
                  value="crudeOilAssays"
                  aria-required
                  {...register('categories')}
                />
              </li>
              <li>
                <Checkbox
                  label={intl.formatMessage({
                    id: 'subscribe_form_all',
                    defaultMessage: 'All',
                  })}
                  aria-invalid={errors.categories ? 'true' : 'false'}
                  aria-describedby="atleast-one-category-required"
                  value="all"
                  aria-required
                  {...register('categories')}
                />
              </li>
            </UnstyledList>
          </StyledFieldset>
          <Controller
            name="firstName"
            control={control}
            rules={{
              required: intl.formatMessage({
                id: 'subscribe_form_name_validation',
                defaultMessage: 'Please fill out your name',
              }),
            }}
            render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
              <FormTextField
                {...props}
                id={props.name}
                label={intl.formatMessage({
                  id: 'subscribe_form_first_name',
                  defaultMessage: 'First name',
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
            name="email"
            control={control}
            rules={{
              required: intl.formatMessage({
                id: 'subscribe_form_email_validation',
                defaultMessage: 'Please fill out a valid email address',
              }),
              pattern: {
                value: /^[\w!#$%&'*+/=?`{|}~^-]+(?:\.[\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/g,
                message: intl.formatMessage({
                  id: 'subscribe_form_email_validation',
                  defaultMessage: 'Please fill out a valid email address',
                }),
              },
            }}
            render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
              <FormTextField
                {...props}
                id={props.name}
                label={intl.formatMessage({
                  id: 'subscribe_form_email',
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
          <div className="pb-4 text-xs italic">
            <FormattedMessage id="all_fields_mandatory" defaultMessage="All fields with *  are mandatory" />
          </div>
          <FriendlyCaptcha
            doneCallback={() => {
              setSubmitButtonEnabled(true)
            }}
            errorCallback={(error: any) => {
              console.error('FriendlyCaptcha encountered an error', error)
              setSubmitButtonEnabled(true)
            }}
          />
          <FormButton type="submit" disabled={!submitButtonEnabled}>
            {isSubmitting ? (
              <FormattedMessage id="form_sending" defaultMessage={'Sending...'}></FormattedMessage>
            ) : (
              <FormattedMessage id="subscribe_form_cta" defaultMessage={'Subscribe'} />
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
export default SubscribeForm
