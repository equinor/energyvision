import { BreadcrumbsList as Wrapper } from './BreadcrumbList'
import { BreadcrumbsListItem } from './BreadcrumbListItem'

type BreadcrumbsListCompoundProps = typeof Wrapper & {
  BreadcrumbsListItem: typeof BreadcrumbsListItem
}

const BreadcrumbsList = Wrapper as BreadcrumbsListCompoundProps

BreadcrumbsList.BreadcrumbsListItem = BreadcrumbsListItem

export { BreadcrumbsList }
