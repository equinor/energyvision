import { css } from 'styled-components'

export const cookieBot = css`
  #CybotCookiebotDialog a,
  #CybotCookiebotDialog div,
  #CybotCookiebotDialogBodyContentControls,
  #CybotCookiebotDialogBodyContentTitle {
    font-family: Equinor !important;
  }

  #CybotCookiebotDialogBodyLevelButtonLevelOptinAllowallSelection:hover,
  #CybotCookiebotDialogBodyLevelButtonLevelOptinDeclineAll:hover {
    background-color: var(--moss-green-60) !important;
  }

  #CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll:hover {
    background: var(--moss-green-100) !important;
  }

  #CybotCookiebotDialogBodyButtonAccept:hover {
    background: var(--moss-green-60) !important;
  }

  #CybotCookiebotDialogHeader {
    display: 'none' !important;
  }
`
