import downloadableFileFields from './actions/downloadableFileFields'
import { anchorLinkReferenceFields } from './anchorLinkReferenceFields'

export const stickyMenu = /* groq */ `"stickyMenu": 
content->stickyMenu{
 title,
"type": _type,
"links": links[]{
   ${downloadableFileFields},
  ${anchorLinkReferenceFields}
}
}
`
