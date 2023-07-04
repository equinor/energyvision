import { css } from 'styled-components'

export const cookieBot = css`
  #CybotCookiebotDialog a,
  #CybotCookiebotDialog div,
  #CybotCookiebotDialogBodyContentControls,
  #CybotCookiebotDialogBodyContentTitle {
    font-family: Equinor !important;
  }

  #CybotCookiebotDialog {
    padding-bottom: 0.5rem !important;
    box-shadow: $black_normal 2px 2px 6px 2px !important;
    border: 18px solid #fff !important;
    border-radius: 4px !important;
  }

  #CybotCookiebotDialogBody {
    max-width: none !important;
  }

  .bottom-dialog {
    #CybotCookiebotDialog {
      border: 0px solid #fff !important;
      border-radius: 0px !important;
    }

    #CybotCookiebotDialogBody {
      //Responsive properties
      margin-left: var(--space-4xLarge) !important;
      margin-right: var(--space-4xLarge) !important;
    }
    .CybotCookiebotDialogBodyButton {
      display: block;
    }
    #CybotCookiebotDialogBodyLevelButtonLevelOptinAllowallSelectionWrapper {
      padding-bottom: var(--space-xSmall) !important;
      padding-top: 0px !important;
    }
  }

  .CybotCookiebotDialogBodyButton {
    @media (min-width: 375px) and (max-width: 599px) {
      display: block;
    }
    @media (min-width: 600px) {
      display: inline;
    }
  }

  #CybotCookiebotDialogBodyLevelButtonLevelOptinAllowallSelectionWrapper {
    padding-bottom: var(--space-small) !important;
    padding-top: var(--space-small);
  }

  #CybotCookiebotDialogBodyContentTitle {
    font-size: var(--typeScale-2) !important;
    font-weight: 500 !important;
  }

  #CybotCookiebotDialogBodyContentText {
    font-size: var(--typeScale-1) !important;
    line-height: var(--lineHeight-3) !important;
    p {
      padding: 0;
    }
  }

  #CybotCookiebotDialogBodyLevelButtonLevelOptinAllowallSelection,
  #CybotCookiebotDialogBodyLevelButtonLevelOptinDeclineAll {
    height: auto !important;
    line-height: var(--lineHeight-3) !important;
    border-radius: 4px !important;
    padding: var(--space-xSmall) var(--space-small) !important;
    background-color: white !important;
    color: var(--black-100) !important;
    border-color: var(--moss-green-95) !important;
    width: auto !important;
    transition: border-color 0.4s, color 0.4s, background-color 0.2s;
  }

  #CybotCookiebotDialogBodyLevelButtonLevelOptinAllowallSelection:hover,
  #CybotCookiebotDialogBodyLevelButtonLevelOptinDeclineAll:hover {
    background-color: var(--moss-green-60) !important;
  }

  #CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll {
    height: auto !important;
    line-height: var(--lineHeight-3) !important;
    border-radius: 4px !important;
    padding: var(--space-xSmall) var(--space-small) !important;
    border-color: var(--moss-green-95) !important;
    background-color: var(--moss-green-95) !important;
    color: white !important;
    width: auto !important;
    transition: border-color 0.4s, color 0.4s, background-color 0.2s;
  }

  #CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll:hover {
    background: var(--moss-green-100) !important;
  }

  #CybotCookiebotDialogBodyButtonAccept {
    font-size: var(--typeScale-1) !important;
    height: auto !important;
    line-height: var(--lineHeight-1) !important;
    border-radius: 4px !important;
    padding: var(--space-medium) var(--space-medium) !important;
    border-color: var(--moss-green-95) !important;
    background-color: var(--moss-green-95) !important;
    color: white !important;
    transition: border-color 0.4s, color 0.4s, background-color 0.2s;
  }

  #CybotCookiebotDialogBodyButtonAccept:hover {
    background: var(--moss-green-60) !important;
  }

  #CybotCookiebotDialogBodyButtonDetails {
    font-size: var(--typeScale-0) !important;
    padding: var(--space-xSmall) var(--space-small) 0 0 !important;
    color: var(--moss-green-95) !important;
  }

  #CybotCookiebotDialogDetail {
    #CybotCookiebotDialogDetailBody {
      max-width: 1040px;
      margin-top: 15px;

      #CybotCookiebotDialogDetailBodyContentTabs {
        a {
          font-size: var(--typeScale-1);
        }
      }

      #CybotCookiebotDialogDetailBodyContent {
        height: 211px;

        a {
          font-size: var(--typeScale-0);
        }

        #CybotCookiebotDialogDetailBodyContentTextOverview {
          #CybotCookiebotDialogDetailBodyContentCookieContainer {
            #CybotCookiebotDialogDetailBodyContentCookieContainerTypes {
              a {
                padding: 10px 8px !important;

                label {
                  margin-right: 0.2rem;
                  background-position-y: 0 !important;
                }
              }
            }

            #CybotCookiebotDialogDetailBodyContentCookieContainerTypeDetails {
              font-size: 14px;
              height: 187px;
              max-height: 187px;
            }
          }
        }

        #CybotCookiebotDialogDetailBodyContentTextAbout,
        .CybotCookiebotDialogDetailBodyContentCookieTypeIntro {
          p,
          a {
            font-size: var(--typeScale-1);
            line-height: var(--lineHeight-2);
          }
          p {
            padding-bottom: 10px;
          }
        }
      }
    }
  }

  .CybotCookiebotDialogDetailBodyContentCookieTypeTable {
    thead {
      tr {
        font-size: 16px !important;
      }
      th {
        padding: 8px 2px !important;
      }
    }
  }

  #CybotCookiebotDialogBodyLevelButtonsTable {
    #CybotCookiebotDialogBodyLevelButtonsSelectPane {
      padding: 0 var(--space-small) !important;
      .CybotCookiebotDialogBodyLevelButtonWrapper {
        padding: var(--space-small) 0;
      }
    }
    #CybotCookiebotDialogBodyLevelDetailsWrapper {
      padding: var(--space-small) !important;
      text-align: center !important;
      .CybotCookiebotDialogBodyLink {
        font-size: var(--typeScale-0) !important;
      }
    }
  }
  // Checkbox customization
  input[type='checkbox'].CybotCookiebotDialogBodyLevelButton:checked + label {
    background-image: url('data:image/svg+xml;utf8,<svg%20xmlns="http://www.w3.org/2000/svg"%20fill="%23007079"%20xmlns:v="https://vecta.io/nano"><path%20d="M14.5,16h-13A1.5,1.5,0,0,1,0,14.5v-13A1.5,1.5,0,0,1,1.5,0h13A1.5,1.5,0,0,1,16,1.5v13a1.5,1.5,0,0,1-1.5,1.5zM1.5,1a.5.5,0,0,0-.5.5v13a.5.5,0,0,0,.5.5h13a.5.5,0,0,0,.5-.5v-13a.5.5,0,0,0-.5-.5h-13z"/><path%20d="M14.5.5h-13c-.55,0-1,.45-1,1v13c0,.55.45,1,1,1h13c.55,0,1-.45,1-1v-13c0-.55-.45-1-1-1zm-1.043,3.614L7.18,12.227c-.147.19-.368.31-.607.327-.022.002-.044.002-.065.002-.217,0-.426-.082-.584-.232L2.73,9.3a.85.85,0,0,1,1.169-1.234l2.51,2.378,5.704-7.37a.85.85,0,0,1,1.192-.151c.372.286.44.82.152,1.19z"/></svg>') !important;
  }

  input[type='checkbox'].CybotCookiebotDialogBodyLevelButton.CybotCookiebotDialogBodyLevelButtonDisabled + label {
    background-image: url('data:image/svg+xml;utf8,<svg%20xmlns="http://www.w3.org/2000/svg"%20fill="%23b3b3b3"%20xmlns:v="https://vecta.io/nano"><path%20d="M14.5,16h-13A1.5,1.5,0,0,1,0,14.5v-13A1.5,1.5,0,0,1,1.5,0h13A1.5,1.5,0,0,1,16,1.5v13a1.5,1.5,0,0,1-1.5,1.5zM1.5,1a.5.5,0,0,0-.5.5v13a.5.5,0,0,0,.5.5h13a.5.5,0,0,0,.5-.5v-13a.5.5,0,0,0-.5-.5h-13z"/><path%20d="M14.5.5h-13c-.55,0-1,.45-1,1v13c0,.55.45,1,1,1h13c.55,0,1-.45,1-1v-13c0-.55-.45-1-1-1zm-1.043,3.614L7.18,12.227c-.147.19-.368.31-.607.327-.022.002-.044.002-.065.002-.217,0-.426-.082-.584-.232L2.73,9.3a.85.85,0,0,1,1.169-1.234l2.51,2.378,5.704-7.37a.85.85,0,0,1,1.192-.151c.372.286.44.82.152,1.19z"/></svg>') !important;
  }

  input[type='checkbox'].CybotCookiebotDialogBodyLevelButton + label {
    background-image: url('data:image/svg+xml;utf8,<svg%20version="1.1"%20id="Layer_1"%20xmlns="http://www.w3.org/2000/svg"%20xmlns:xlink="http://www.w3.org/1999/xlink"%20x="0px"%20y="0px"%20enable-background="new%200%200%2016%2016"%20xml:space="preserve"><path%20fill="none"%20stroke="%23007079"%20stroke-linejoin="round"%20stroke-miterlimit="10"%20d="M14.5,15.5h-13c-0.55,0-1-0.45-1-1v-13,c0-0.55,0.45-1,1-1h13c0.55,0,1,0.45,1,1v13C15.5,15.05,15.05,15.5,14.5,15.5z"/></svg>') !important;
    padding: 2px 0 0 20px !important;
  }

  // Cookie declaration customization
  .CookieDeclarationType {
    border: none !important;
  }

  #CookieDeclarationUserStatusLabelMulti,
  #CookieDeclarationUserStatusLabelOn,
  #CookieDeclarationUserStatusLabelOff,
  #CookieDeclarationChangeConsent,
  td.CookieDeclarationTableCell {
    font-size: var(--typeScale-1);
    line-height: var(--lineHeight-2);
    margin-bottom: var(--space-xSmall);
  }

  @media (min-width: $screen-xs) and (max-width: 599px) {
    #CybotCookiebotDialogBodyLevelButtonLevelOptinAllowallSelectionWrapper {
      width: 100%;
      #CybotCookiebotDialogBodyLevelButtonLevelOptinAllowallSelection,
      #CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll {
        display: block;
      }
    }
  }
`
