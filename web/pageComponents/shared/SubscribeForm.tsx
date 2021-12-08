import type { SubscribeFormData } from '../../types/types'
//import type {SubscribeFormParmeters} from '../../types/types'
import styled from 'styled-components'
import SimpleBlockContent from '../../common/SimpleBlockContent'
import { TitleBlockRenderer } from '../../common/serializers'
import { Button, TextField, Checkbox, Icon } from '@equinor/eds-core-react'
import { useForm, Controller } from 'react-hook-form'
import { error_filled } from '@equinor/eds-icons'
//import { useRouter } from 'next/router'
//import { useEffect, useState } from 'react'

const StyledHeading = styled(TitleBlockRenderer)`
  padding: 0 0 var(--space-large) 0;
`
const Container = styled.div`
  padding: var(--space-3xLarge) var(--layout-paddingHorizontal-large);
  max-width: var(--maxViewportWidth);
  margin: auto;
`

const ButtonWrapper = styled.div`
  float: right;
  padding: var(--space-medium) 0px var(--space-medium) 0px;
`
const TextFieldWrapper = styled.div`
  padding: var(--space-small) 0px var(--space-medium) 0px;
`

const StyledFieldset = styled.fieldset`
  border: 0;
  padding: 0;
`
const StyledLegend = styled.legend`
  font-weight: var(--fontWeight-regular);
  font-size: var(--typeScale-2);
  padding: 0 0 var(--space-small) 0;
`
const UnstyledList = styled.ul`
  margin: 0;
  padding: var(--space-medium) 0 var(--space-large) 0px;
  list-style-type: none;
  @media (max-width: 920px) {
    column-count: 1;
  }
  @media (max-width: 1184px) {
    column-count: 2;
  }
  column-count: 3;
`
const StyledButton = styled(Button)`
  padding-left: var(--space-xLarge);
  padding-right: var(--space-xLarge);
`

const StyledSpan = styled.span`
  font-weight: var(--fontWeight-regular);
  font-size: var(--typeScale-1);
`
const ErrorStyledDiv = styled.div`
  font-weight: var(--fontWeight-regular);
  font-size: var(--typeScale-1);
  color: var(--clear-red-100);
  align-items: center;
  display: flex;
`
const StyledIcon = styled(Icon)`
  margin-left: var(--space-small);
`

type FormValues = {
  firstName: string
  email: string
  categories: string[]
}

const SubscribeForm = ({ data: { title } }: { data: SubscribeFormData }) => {
  //const router = useRouter()
  //  const locale = router.locale == 'no-nb' ? 'no' : 'en'
  //const [submitSuccess, setSubmitSuccess] = useState(false)
  const onSubmit = (data: FormValues) => {
    //   data.languageCode = locale
    /*const res = await fetch('/api/subscribe-form', {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })*/
    // const result = await res.json()
    //setSubmitSuccess(result.statusCode == 200)
    console.log(data)
    // setSubmitSuccess(true)

    console.log(data)
    reset()
  }

  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors },
  } = useForm<FormValues>()

  /* useEffect(() => {
    if (!submitSuccess) console.error('Failed to submit form')
    reset()
  }, [submitSuccess, reset])*/

  return (
    <>
      <Container>
        {title && (
          <SimpleBlockContent
            blocks={title}
            serializers={{
              types: {
                block: (props) => <StyledHeading {...props} />,
              },
            }}
          />
        )}
        {/* @TODO Norwegian translations for labels and button text*/}
        <form onSubmit={handleSubmit(onSubmit)}>
          <StyledFieldset>
            <StyledLegend> Categories </StyledLegend>
            {!errors.categories && <StyledSpan>Please select the category you want to subscribe to</StyledSpan>}

            {errors.categories && (
              <ErrorStyledDiv role="alert" id="atleast-one-category-required">
                <span>Please select the category you want to subscribe to</span>
                <StyledIcon data={error_filled} aria-hidden="true" />
              </ErrorStyledDiv>
            )}

            <UnstyledList>
              <li>
                <Checkbox
                  label="General news"
                  value="generalNews"
                  aria-invalid={errors.categories ? 'true' : 'false'}
                  aria-describedby="atleast-one-category-required"
                  {...register('categories', {
                    validate: (values) => values.length > 0,
                  })}
                />
              </li>
              <li>
                <Checkbox
                  label="Magazine stories"
                  aria-invalid={errors.categories ? 'true' : 'false'}
                  aria-describedby="atleast-one-category-required"
                  value="magazineStories"
                  {...register('categories')}
                />
              </li>
              <li>
                <Checkbox
                  label="Stock Market Announcements"
                  value="stockMarketAnnouncements"
                  aria-invalid={errors.categories ? 'true' : 'false'}
                  aria-describedby="atleast-one-category-required"
                  {...register('categories')}
                />
              </li>
              <li>
                <Checkbox
                  label="Crude Oil Assays"
                  aria-invalid={errors.categories ? 'true' : 'false'}
                  aria-describedby="atleast-one-category-required"
                  value="crudeOilAssays"
                  {...register('categories')}
                />
              </li>
              <li>
                <Checkbox
                  label="Loop stories"
                  aria-invalid={errors.categories ? 'true' : 'false'}
                  aria-describedby="atleast-one-category-required"
                  value="loopStories"
                  {...register('categories')}
                />
              </li>
            </UnstyledList>
          </StyledFieldset>

          <StyledFieldset>
            <StyledLegend> Contact information </StyledLegend>
            <Controller
              name="firstName"
              control={control}
              rules={{
                required: 'Required',
              }}
              render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
                <TextFieldWrapper>
                  <TextField
                    {...props}
                    id={props.name}
                    label="First Name"
                    inputRef={ref}
                    inputIcon={invalid ? <Icon data={error_filled} title="error" /> : undefined}
                    helperText={error?.message}
                    helperIcon={<Icon data={error_filled} title="error" />}
                    variant={invalid ? 'error' : 'default'}
                    aria-invalid={invalid ? 'true' : 'false'}
                  />
                </TextFieldWrapper>
              )}
            />
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'Required',
                pattern: {
                  value: /^[\w!#$%&'*+/=?`{|}~^-]+(?:\.[\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/g,
                  message: 'Not a valid email',
                },
              }}
              render={({ field: { ref, ...props }, fieldState: { invalid, error } }) => (
                <TextFieldWrapper>
                  <TextField
                    {...props}
                    id={props.name}
                    label="Email"
                    inputRef={ref}
                    inputIcon={invalid ? <Icon data={error_filled} title="error" /> : undefined}
                    helperText={error?.message}
                    helperIcon={<Icon data={error_filled} title="error" />}
                    variant={invalid ? 'error' : 'default'}
                    aria-invalid={invalid ? 'true' : 'false'}
                  />
                </TextFieldWrapper>
              )}
            />
          </StyledFieldset>
          <ButtonWrapper>
            <StyledButton type="submit">Subscribe</StyledButton>
          </ButtonWrapper>
        </form>
      </Container>
    </>
  )
}
export default SubscribeForm
