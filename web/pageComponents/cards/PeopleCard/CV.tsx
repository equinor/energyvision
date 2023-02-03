import { default as NextLink } from 'next/link'
import { ButtonLink } from '@components'
import type { LinkData } from '../../../types/types'
import { getUrlFromAction } from '../../../common/helpers/getUrlFromAction'
import { getLocaleFromName } from '../../../lib/localization'
import { Flags } from '../../../common/helpers/datasetHelpers'

type CVProps = {
  data: LinkData
}

const CV = ({ data }: CVProps) => {
  const { type, label, ariaLabel } = data
  const locale = getLocaleFromName(data.link?.lang)

  const url = getUrlFromAction(data) || ''
  return (
    <>
      {type === 'internalUrl' ? (
        <NextLink href={url || ''} locale={Flags.IS_DEV ? locale : undefined} passHref legacyBehavior>
          <ButtonLink aria-label={ariaLabel}>{label}</ButtonLink>
        </NextLink>
      ) : (
        <ButtonLink href={url} aria-label={ariaLabel}>
          {label}
        </ButtonLink>
      )}
    </>
  )
}

export default CV
