import type { SubscribeFormData, SubscribeFormParmeters } from '../../types/types'
import styled from 'styled-components'
import SimpleBlockContent from '../../common/SimpleBlockContent'
import { TitleBlockRenderer } from '../../common/serializers'
import { Button, TextField, Checkbox, Icon } from '@equinor/eds-core-react'
import { signUp } from '../../components/utils/subscription'
import { useForm, Controller } from 'react-hook-form'
import { error_filled } from '@equinor/eds-icons'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

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
  padding: 16px 0px 16px 0px;
`
const TextFieldWrapper = styled.div`
  padding: 16px 0px 16px 0px;
`

const StyledFieldset = styled.fieldset`
  border: 0;
`
const StyledLegend = styled.legend`
  font-weight: 500;
`
const UnstyledList = styled.ul`
  margin: 0;
  padding: 0 0 16px 0px;
  list-style-type: none;
  @media (max-width: 750px) {
    -webkit-column-count: 2;
    -moz-column-count: 2;
    column-count: 2;
  }
  -webkit-column-count: 3;
  -moz-column-count: 3;
  column-count: 3;
`
const StyledButton = styled(Button)`
  padding-left: 32px;
  padding-right: 32px;
`

const SubscribeForm = ({ data: { title, formType } }: { data: SubscribeFormData }) => {
  const router = useRouter()
  const locale = router.locale == 'no-nb' ? 'no' : 'en'
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const onSubmit = (data: SubscribeFormParmeters) => {
    data.languageCode = locale
    signUp(data).then((isSuccessful) => {
      setSubmitSuccess(isSuccessful)
    })
  }

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      firstName: '',
      email: '',
      generalNews: false,
      magazineStories: false,
      stockMarketAnnouncements: false,
      crudeOilAssays: false,
      loopStories: false,
    },
  })

  useEffect(() => {
    if (submitSuccess) reset({})
  }, [submitSuccess, reset])

  return (
    <>
      <Container>
        <div>
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
        </div>
        {formType}
        <form onSubmit={handleSubmit(onSubmit)}>
          <StyledFieldset>
            <StyledLegend> Categories: </StyledLegend>
            <UnstyledList>
              <li>
                <Controller
                  name="generalNews"
                  control={control}
                  render={({ field: { ...props } }) => (
                    <Checkbox label="General news" {...props} id={props.name} value="first" />
                  )}
                />
              </li>
              <li>
                <Controller
                  name="magazineStories"
                  control={control}
                  render={({ field: { ...props } }) => (
                    <Checkbox {...props} id={props.name} label="Magazine stories" value="third" />
                  )}
                />
              </li>
              <li>
                <Controller
                  name="stockMarketAnnouncements"
                  control={control}
                  render={({ field: { ...props } }) => (
                    <Checkbox {...props} id={props.name} label="Stock market announcements" value="second" />
                  )}
                />
              </li>
              <li>
                <Controller
                  name="crudeOilAssays"
                  control={control}
                  render={({ field: { ...props } }) => (
                    <Checkbox {...props} id={props.name} label="Crude oil assays" value="third" />
                  )}
                />
              </li>
              <li>
                <Controller
                  name="loopStories"
                  control={control}
                  render={({ field: { ...props } }) => (
                    <Checkbox {...props} id={props.name} label="Loop stories" value="third" />
                  )}
                />
              </li>
            </UnstyledList>
          </StyledFieldset>
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
                />
              </TextFieldWrapper>
            )}
          />
          <ButtonWrapper>
            <StyledButton type="submit">Subscribe</StyledButton>
          </ButtonWrapper>
        </form>
      </Container>
    </>
  )
}
export default SubscribeForm
