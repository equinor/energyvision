import styled from 'styled-components'
import { Button } from '@components'
import NextLink from 'next/link'

const Wrapper = styled.div`
  a {
    margin: 0 var(--space-xSmall);
  }
`

export type LocalizationSwitchProps = {
  en_GB: string
  nb_NO: string
  activeLocale: string
}

// @TODO: how to handle cases where no translation available
// should this redirect to front page? should there be a message in that case?
export const LocalizationSwitch = ({ en_GB, nb_NO, activeLocale }: LocalizationSwitchProps) => {
  if (!en_GB || !nb_NO) return null

  return (
    <Wrapper>
      <NextLink href={en_GB} locale="en" passHref>
        <Button variant={activeLocale == 'en' ? 'outlined' : 'ghost'}>EN</Button>
      </NextLink>
      |
      <NextLink href={nb_NO} locale="no" passHref>
        <Button variant={activeLocale == 'no' ? 'outlined' : 'ghost'}>NO</Button>
      </NextLink>
    </Wrapper>
  )
}
