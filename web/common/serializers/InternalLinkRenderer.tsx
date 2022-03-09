import { Link } from '@components'
import { default as NextLink } from 'next/link'
import { getLocaleFromName } from '../../lib/localization'

type InternalLinkMark = {
  _key: string
  _type: string
  internalLink: {
    id: string
    name: string | null
    type: string
    lang: string
  }
  reference: {
    _ref: string
    _type: string
  }
  markKey: string
}

type Child = {
  _type: string
  _key: string
  children: string[]
  mark: InternalLinkMark
  markKey: string
}

export const InternalLinkRenderer = (child: Child) => {
  try {
    const { mark, children } = child
    const { id, lang } = mark.internalLink
    const linkLocale = getLocaleFromName(lang)
    const href = id

    return (
      <NextLink passHref href={`/${linkLocale}${href}`}>
        <Link>{children}</Link>
      </NextLink>
    )
  } catch (e) {
    console.error('Could not render internal link', child, e)
    return null
  }
}
