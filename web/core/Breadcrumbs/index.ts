import { BreadcrumbsList as Wrapper } from './BreadcrumbList'
import { BreadcrumbsListItem } from './BreadcrumbListItem'
import { Breadcrumbs } from './Breadcrumbs'

type BreadcrumbsListCompoundProps = typeof Wrapper & {
  BreadcrumbsListItem: typeof BreadcrumbsListItem
}

const BreadcrumbsList = Wrapper as BreadcrumbsListCompoundProps

BreadcrumbsList.BreadcrumbsListItem = BreadcrumbsListItem

export { Breadcrumbs, BreadcrumbsList }
