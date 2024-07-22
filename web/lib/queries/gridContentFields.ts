import downloadableFileFields from './common/actions/downloadableFileFields'
import downloadableImageFields from './common/actions/downloadableImageFields'
import linkSelectorFields from './common/actions/linkSelectorFields'
import background from './common/background'
import markDefs from './common/blockEditorMarks'
import { cookiePolicyQuery } from './common/cookiePolicy'
import { videoPlayerFields } from './videoPlayerFields'

const gridContentFields = /* groq */ `
_type == "videoPlayer" => {
  ${videoPlayerFields}
},
_type == "iframe" => {
"type": _type,
"id": _key,
title,
ingress[]{
...,
${markDefs},
},
description[]{
...,
${markDefs},
},
frameTitle,
"action": action[0]{
${linkSelectorFields},
},
url,
${cookiePolicyQuery},
"designOptions": {
"aspectRatio": coalesce(aspectRatio, '16:9'),
${background},
height,
},
},  
_type == "gridTextBlock"=>{
"type": _type,
"id": _key,
"theme": coalesce(theme.value, null),
textAlignment,
content[]{..., ${markDefs}},
"action": action[0]{
${linkSelectorFields},
${downloadableFileFields},
${downloadableImageFields},
},
backgroundImage
},
_type == "figure"=>{
"type": _type,
"id": _key,
"figure": figure{
_type,
image,
attribution,
caption
},
"designOptions": {
${background},
},
},
_type == "gridTeaser" => {
    "type": _type,
    "id": _key,
    content[]{..., ${markDefs}},
    author,
    authorTitle,
    quote,
    "imagePosition": coalesce(imagePosition, 'left'),
    "theme": coalesce(theme.value, null),
    "image": image {
      ...,
      "extension": asset-> extension
    },
    "action": action[0]{
      ${linkSelectorFields},
      ${downloadableFileFields},
      ${downloadableImageFields},
    },
  },
`
export default gridContentFields
