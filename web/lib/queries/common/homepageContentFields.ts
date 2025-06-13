import downloadableFileFields from './actions/downloadableFileFields'
import downloadableImageFields from './actions/downloadableImageFields'
import linkSelectorFields from './actions/linkSelectorFields'
import markDefs from './blockEditorMarks'

const homepageContentFields = /* groq */ `
_type == "homepageBanner" =>{
  "type": _type,
  "id": _key,
  title[]{..., ${markDefs}},
  rightAlignTitle,
  useWhiteTitle,
  ctaCards[]{
    "type": _type,
    "id": _key,
    overline,
    "link": link[0]{
      ${linkSelectorFields},
      ${downloadableFileFields},
      ${downloadableImageFields},
    },
  },
  image,
  "designOptions": {
      backgroundType,
      "theme":colorTheme,
  }
  },
`

export default homepageContentFields
