import { default as NextLink } from 'next/link'
import { Link } from '@components'
import styled from 'styled-components'
import type { LinkData } from '../../../types/types'
import { getUrlFromAction } from '../../../common/helpers/getUrlFromAction'

type CVProps = {
  data: LinkData
}

const Contact = styled.div`
  margin-top: var(--space-medium);
  text-align: center;
`

const CV = ({ data }: CVProps) => {
  const { type, label, ariaLabel } = data

  const url = getUrlFromAction(data) || ''
  return (
    <Contact>
      {type === 'internalUrl' ? (
        <NextLink href={url || ''} passHref>
          <Link variant="buttonLink" type={type} aria-label={ariaLabel}>
            {label}
          </Link>
        </NextLink>
      ) : (
        <Link variant="buttonLink" type={type} href={url} aria-label={ariaLabel}>
          {label}
        </Link>
      )}
    </Contact>
  )
}

export default CV
