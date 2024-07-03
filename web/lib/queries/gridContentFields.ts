import downloadableFileFields from './common/actions/downloadableFileFields'
import downloadableImageFields from './common/actions/downloadableImageFields'
import linkSelectorFields from './common/actions/linkSelectorFields'
import background from './common/background'
import markDefs from './common/blockEditorMarks'
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
"cookiePolicy": coalesce(cookiePolicy, 'none'),
"designOptions": {
"aspectRatio": coalesce(aspectRatio, '16:9'),
${background},
height,
},
},  
_type == "gridTextBlock"=>{
"type": _type,
"id": _key,
textAlignment,
overline,
useThemedTitle,
title[]{..., ${markDefs}},
themedTitle[]{..., ${markDefs}},
"titleThemeFromNormal": coalesce(titleThemeFromNormal.value, null),
"titleThemeFromLarger":coalesce(titleThemeFromLarger.value, null),
content[]{..., ${markDefs}},
"contentTheme":coalesce(contentTheme.value, null),
"action": action[0]{
${linkSelectorFields},
${downloadableFileFields},
${downloadableImageFields},
},
contentAlignment,
imageBackground
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
    useExtendedThemes,
    content[]{..., ${markDefs}},
    themedContent[]{..., ${markDefs}},
    "contentThemeFromNormal": coalesce(contentThemeFromNormal.value, null),
    "contentThemeFromLarger":coalesce(contentThemeFromLarger.value, null),
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
