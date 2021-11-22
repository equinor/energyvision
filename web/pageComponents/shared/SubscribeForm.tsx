import type { SubscribeFormData } from '../../types/types'
import styled from 'styled-components'
import SimpleBlockContent from '../../common/SimpleBlockContent'
import { TitleBlockRenderer } from '../../common/serializers'
import { Button, TextField, Checkbox, Icon } from '@equinor/eds-core-react'
import { authenticate } from '../../components/utils/subscribeForm'
import { Heading } from '@components'
import { useForm, Controller } from 'react-hook-form'
import { error_filled } from '@equinor/eds-icons'

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

const SubscribeForm = ({ data: { title, formType } }: { data: SubscribeFormData }) => {
  /*const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault() // to prevent navigation from storybook
    //action('onSubmit')(e)
    authenticate()
  }*/

  const { handleSubmit, control } = useForm()
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
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          <Heading level="h6">Categories:</Heading>
          <UnstyledList>
            <li>
              <Checkbox label="General news" name="general-news" value="first" />
            </li>
            <li>
              <Checkbox label="Magazine stories" name="magazine-stories" value="third" />
            </li>
            <li>
              <Checkbox label="Stock market announcements" name="stock-market-announcements" value="second" />
            </li>
            <li>
              <Checkbox label="Crude oil assays" name="crude-oil-assays" value="third" />
            </li>
            <li>
              <Checkbox label="Loop stories" name="loop-stories" value="third" />
            </li>
          </UnstyledList>

          <TextFieldWrapper>
            <TextField id="firstName" label="First Name" />
          </TextFieldWrapper>
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
            <Button type="submit">Subscribe</Button>
          </ButtonWrapper>
        </form>
      </Container>
    </>
  )
}
export default SubscribeForm
