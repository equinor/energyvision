import { forwardRef } from 'react'
import styled from 'styled-components'
import { Button as EdsButton, ButtonProps as EdsButtonProps, Icon } from '@equinor/eds-core-react'
import { Text } from '@components'
import { check } from '@equinor/eds-icons'
import { FormattedMessage } from 'react-intl'

const Box = styled.div`
  display: flex;
  background-color: var(--lichen-green-100);
  padding: var(--space-large);
  border-color: var(--moss-green-95);
  border-width: var(--eds_button__border_width);
  border-style: solid;
`
const StyledIcon = styled(Icon)`
  color: var(--moss-green-95);
  margin-right: var(--space-large);
`
const StyledEdsButton = styled(EdsButton)`
  padding-left: var(--space-xLarge);
  padding-right: var(--space-xLarge);
`
const StyledText = styled(Text)`
  color: var(--moss-green-95);
`

export const FormSubmitSuccessBox = forwardRef<HTMLDivElement, EdsButtonProps>(function Button({ ...rest }, ref) {
  return (
    <Box color="var(--lichen-green-100)">
      <StyledIcon data={check} size={48} />
      <div>
        <StyledText size="md" bold={true}>
          <FormattedMessage id="form_success_title" defaultMessage="Thank you!" />
        </StyledText>
        <Text>
          <FormattedMessage id="form_success_line1" defaultMessage="Your form was successfully submitted." />
          <br></br>
          <FormattedMessage id="form_success_line2" defaultMessage="You will hear from us shortly." />
        </Text>
        <StyledEdsButton ref={ref} {...rest}>
          <FormattedMessage id="form_success_cta" defaultMessage="Reopen the form" />
        </StyledEdsButton>
      </div>
    </Box>
  )
})
