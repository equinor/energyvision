import { RelatedContent as RelatedContentWrapper, RelatedContentProps } from './RelatedContent'

import { Links, LinksProps, StyledLinks } from './Links'

type RelatedContentCompundProps = typeof RelatedContentWrapper & {
  Links: typeof Links
}

const RelatedContent = RelatedContentWrapper as RelatedContentCompundProps

RelatedContent.Links = Links

export { RelatedContent, StyledLinks }
export type { RelatedContentProps, LinksProps }
