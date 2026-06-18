import downloadableFileFields from './actions/downloadableFileFields'
import { anchorLinkReferenceFields } from './anchorLinkReferenceFields'

export const stickyMenu = /* groq */ `"stickyMenu": 
content->stickyMenu{
 title,
"type": _type,
"links": links[]{
   ${downloadableFileFields},
  ${anchorLinkReferenceFields}
},
"background": coalesce(backgroundColor.key, 'white-100'),
}
`
export const stickyMenuOutSideContent = /* groq */ `"stickyMenu": 
@->stickyMenu{
 title,
"type": _type,
"links": links[]{
   ${downloadableFileFields},
  ${anchorLinkReferenceFields}
},
"background": coalesce(backgroundColor.key, 'white-100'),
}
`
