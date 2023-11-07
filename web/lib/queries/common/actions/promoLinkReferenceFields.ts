import { linkReferenceFields } from '../actions/linkSelectorFields'

export const promoLinkReferenceFields = /* groq */ `
 {
    "label": link.label,
    "ariaLabel": link.ariaLabel,
    "anchorReference": link.anchorReference,
    "link": select(
      link.linkToOtherLanguage == true =>
        link.referenceToOtherLanguage->${linkReferenceFields},
        link.reference->${linkReferenceFields},
    ),
    "href": link.url,
    "type": select(
      defined(link.url) => "externalUrl",
      "internalUrl"
    )
  }
`
