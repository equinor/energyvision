import { forwardRef } from 'react'
import styled from 'styled-components'
import { Button as EdsButton, ButtonProps as EdsButtonProps, Icon } from '@equinor/eds-core-react'
import { Text } from '@components'
import { error_outlined } from '@equinor/eds-icons'
import { FormattedMessage } from 'react-intl'

const Box = styled.div`
  display: flex;
  padding: var(--space-large);
  border-color: var(--energy-red-100);
  border-width: var(--eds_button__border_width);
  border-style: solid;
`
const StyledIcon = styled(Icon)`
  color: var(--energy-red-100);
  margin-right: var(--space-large);
`
const StyledEdsButton = styled(EdsButton)`
  padding-left: var(--space-xLarge);
  padding-right: var(--space-xLarge);
`

export const FormSubmitFailureBox = forwardRef<HTMLDivElement, EdsButtonProps>(function Button({ ...rest }, ref) {
  return (
    <Box color="var(--lichen-green-100)">
      <StyledIcon data={error_outlined} size={48} />
      <div>
        <Text size="md" bold={true}>
          <FormattedMessage id="form_failure_title" defaultMessage="Sorry, something went wrong!" />
        </Text>
        <Text>
          <FormattedMessage id="form_failure_line1" defaultMessage=" The form was not submitted. " />
          <br></br>
          <FormattedMessage id="form_failure_line2" defaultMessage="Please try again." />
        </Text>
        <StyledEdsButton ref={ref} {...rest} color="danger">
          <FormattedMessage id="form_failure_cta" defaultMessage="Try again" />
        </StyledEdsButton>
      </div>
    </Box>
  )
})
