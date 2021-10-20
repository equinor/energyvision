import styled, { css } from 'styled-components'
import NextLink from 'next/link'
import { outlineTemplate, Tokens } from '@utils'
import { useWindowSize } from '@reach/window-size'

const { outline } = Tokens

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`

const SharedStyle = css`
  display: flex;
  padding: var(--space-xSmall);
  margin: 0;
  font-size: var(--typeScale-0);
  font-weight: var(--fontWeight-medium);
  line-height: 1em;
`

const ActiveLocale = styled.span`
  ${SharedStyle}
  color: var(--slate-blue-95);
  position: relative;

  &:after {
    content: '';
    display: block;
    width: calc(100% - (var(--space-xSmall) * 2));
    height: 2px;
    position: absolute;
    bottom: calc(var(--space-xSmall) * 0.5);
    left: 0;
    right: 0;
    margin: 0 auto;
    background: var(--moss-green-100);
  }
`

const StyledLink = styled.a`
  ${SharedStyle}
  text-decoration: none;
  color: var(--grey-60);

  &[data-focus-visible-added]:focus {
    ${outlineTemplate(outline)}
  }

  &:hover {
    background: var(--moss-green-70);
  }

  &:visited {
    color: var(--grey-60);
  }

  @media (max-width: 600px) {
    min-width: 48px;
    min-height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export type LocalizationSwitchProps = {
  en_GB: string
  nb_NO: string
  activeLocale: string
}

type LocaleLinkProps = {
  href: string
  title: string
  locale: string
  active: boolean
  width: number
}

const BREAKPOINT = 600

const LocaleLink: React.FC<LocaleLinkProps> = ({ href, title, locale, active, width, children }) => {
  if (!active) {
    return (
      <NextLink href={href} locale={locale} passHref>
        <StyledLink aria-label={title}>{children}</StyledLink>
      </NextLink>
    )
  }

  if (width > BREAKPOINT) {
    return <ActiveLocale aria-hidden="true">{children}</ActiveLocale>
  }

  return null
}

// @TODO: how to handle cases where no translation available
// should this redirect to front page? should there be a message in that case?
export const LocalizationSwitch = ({ en_GB, nb_NO, activeLocale, ...rest }: LocalizationSwitchProps) => {
  const { width } = useWindowSize()

  if (!en_GB || !nb_NO) return null

  return (
    <Wrapper {...rest}>
      <LocaleLink href={en_GB} title="Switch to English" locale="en" active={activeLocale === 'en'} width={width}>
        EN
      </LocaleLink>
      {width > BREAKPOINT ? '|' : null}
      <LocaleLink href={nb_NO} title="Switch to Norwegian" locale="no" active={activeLocale === 'no'} width={width}>
        NO
      </LocaleLink>
    </Wrapper>
  )
}
