import styled from 'styled-components'
import { default as NextLink } from 'next/link'
import { BreadcrumbsList } from '@components'

const { BreadcrumbsListItem } = BreadcrumbsList

const Container = styled.div`
  padding: 0 var(--layout-paddingHorizontal-large);
  max-width: var(--maxViewportWidth);
  margin-left: auto;
  margin-right: auto;
`

type BreadcrumbsProps = {
  slug: string
  defaultBreadcrumbs: string[]
  customBreadcrumbs: string[] | [] | null
}

const parseBreadcrumbs = (crumbs: string[]) => {
  return [
    {
      label: 'home',
      slug: '/',
    },
    ...crumbs
      .filter((e) => e)
      .map((item: string) => {
        return {
          label: item.split('/').at(-1),
          slug: item,
        }
      }),
  ]
}

export const Breadcrumbs = ({ slug, defaultBreadcrumbs, customBreadcrumbs }: BreadcrumbsProps) => {
  const crumbs = parseBreadcrumbs(
    customBreadcrumbs && customBreadcrumbs.length > 0 ? customBreadcrumbs : defaultBreadcrumbs,
  )

  if (crumbs.length < 2) return null

  return (
    <Container>
      <BreadcrumbsList>
        {crumbs.map((item) => {
          if (item.slug === slug) {
            return <BreadcrumbsListItem key={item.slug}>{item.label}</BreadcrumbsListItem>
          }

          return (
            <BreadcrumbsListItem key={item.slug}>
              <NextLink href={item.slug}>{item.label}</NextLink>
            </BreadcrumbsListItem>
          )
        })}
      </BreadcrumbsList>
    </Container>
  )
}
