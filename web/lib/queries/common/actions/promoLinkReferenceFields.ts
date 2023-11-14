import { linkReferenceFields } from '../actions/linkSelectorFields'

export const promoLinkReferenceFields = /* groq */ `
 {
    "label": label,
    "ariaLabel": ariaLabel,
    "anchorReference": anchorReference,
    "link": select(
      linkToOtherLanguage == true =>
        referenceToOtherLanguage->${linkReferenceFields},
        reference->${linkReferenceFields},
    ),
    "href": url,
    "type": select(
      defined(url) => "externalUrl",
      "internalUrl"
    )
  }
`
