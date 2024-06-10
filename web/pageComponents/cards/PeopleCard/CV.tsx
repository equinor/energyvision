import { ButtonLink } from '@components'
import type { LinkData } from '../../../types/index'
import { getUrlFromAction } from '../../../common/helpers/getUrlFromAction'
import { getLocaleFromName } from '../../../lib/localization'

type CVProps = {
  data: LinkData
}

const CV = ({ data }: CVProps) => {
  const { type, label, ariaLabel } = data
  const locale = getLocaleFromName(data.link?.lang)

  const url = getUrlFromAction(data) || ''
  return (
    <ButtonLink href={url} aria-label={ariaLabel} locale={type === 'internalUrl' ? locale : undefined}>
      {label}
    </ButtonLink>
  )
}

export default CV
