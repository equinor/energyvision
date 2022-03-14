import { Link } from '@components'
import { default as NextLink } from 'next/link'
import { getLocaleFromName } from '../../../lib/localization'

type InternalLink = {
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

export const InternalLink = ({ value, children }: { value: InternalLink; children: React.ReactNode }) => {
  console.log(value, children)
  try {
    const { id, lang } = value.internalLink
    const linkLocale = getLocaleFromName(lang)
    const href = id

    return (
      <NextLink passHref href={`/${linkLocale}${href}`}>
        <Link>{children}</Link>
      </NextLink>
    )
  } catch (e) {
    console.error('Could not render internal link', children, e)
    return null
  }
}
