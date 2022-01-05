import styled from 'styled-components'

declare global {
  interface Window {
    Cookiebot: any
  }
}

const StyledDiv = styled.div`
  background-color: var(--clear-red-60);
  border-radius: 4px;
  font-weight: 500;
  color: var(--slate-blue-100);
  text-align: center;
`
const StyledButton = styled.button`
  text-decoration: underline;
`
const StyledParagraph = styled.p`
  padding: var(--space-medium);
`
const RequestConsentContainer = ({ consentType }: { consentType: string }) => {
  return (
    <StyledDiv>
      <StyledParagraph>
        Want the full picture? We’d love to share this content with you, but you must accept cookies before we can.
        Click the{' '}
        <StyledButton
          onClick={() => {
            window.Cookiebot.renew()
          }}
        >
          Cookie settings
        </StyledButton>{' '}
        link to enable
        {consentType} cookies
      </StyledParagraph>
    </StyledDiv>
  )
}

export default RequestConsentContainer
