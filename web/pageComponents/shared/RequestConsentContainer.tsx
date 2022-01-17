import styled from 'styled-components'
import { Text, Button } from '@components'

import type { CookiePolicy } from '../../types/types'

declare global {
  interface Window {
    Cookiebot: any
  }
}

const StyledDiv = styled.div`
  border: 1px solid var(--slate-blue-100);
  padding: var(--space-medium) var(--space-large);
  background-color: var(--white-100);
  text-align: center;
`

const RequestConsentContainer = ({ consentType }: { consentType: CookiePolicy }) => {
  return (
    <StyledDiv>
      <Text centered>
        {/* @TODO Add this text in Sanity and translate it */}
        Want the full picture? We’d love to share this content with you, but first you must accept additional cookies by
        enabling them in our cookie settings. [Missing: {consentType}]
      </Text>
      <Button
        onClick={() => {
          window.Cookiebot.renew()
        }}
        color="secondary"
        variant="outlined"
      >
        Cookie settings
      </Button>
    </StyledDiv>
  )
}

export default RequestConsentContainer
