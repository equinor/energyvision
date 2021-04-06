// https://www.sanity.io/docs/portable-text-internal-and-external-links
import { BaseLink } from '@components'
import { Icon } from '@equinor/eds-core-react'
import { external_link } from '@equinor/eds-icons'

export const ExternalLinkRenderer = (child: { mark: any; children: any }) => {
  try {
    const { mark, children } = child
    const { href } = mark
    return (
      <BaseLink href={href}>
        {children}
        <Icon data={external_link} size={16} />
      </BaseLink>
    )
  } catch (e) {
    console.error('Could not render enternal link', e)
    return null
  }
}
