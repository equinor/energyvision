import downloadableFileFields from './actions/downloadableFileFields'
import downloadableImageFields from './actions/downloadableImageFields'
import linkSelectorFields from './actions/linkSelectorFields'
import markDefs from './blockEditorMarks'

const homepageContentFields = /* groq */ `
_type == "homepageBanner" =>{
  "type": _type,
  "id": _key,
  title[]{..., ${markDefs}},
  ctaCards[]{
    "type": _type,
    "id": _key,
    overline,
    "link": link[]{
      ${linkSelectorFields},
      ${downloadableFileFields},
      ${downloadableImageFields},
    },
  },
  image,
  attribution,
  "designOptions": {
      colorBackground,
    },
  },
`

export default homepageContentFields
