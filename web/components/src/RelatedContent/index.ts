import { RelatedContent as RelatedContentWrapper, RelatedContentProps } from './RelatedContent'
import { Title } from './Title'
import { Links } from './Links'

type RelatedContentCompundProps = typeof RelatedContentWrapper & {
  Title: typeof Title
  Links: typeof Links
}

const RelatedContent = RelatedContentWrapper as RelatedContentCompundProps

RelatedContent.Title = Title
RelatedContent.Links = Links

export { RelatedContent }
export type { RelatedContentProps }
