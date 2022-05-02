import styled, { css } from 'styled-components'
import NextLink from 'next/link'
import { outlineTemplate, Tokens } from '@utils'
import { languages } from '../../languages'

const { outline } = Tokens

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`

const StyledDiv = styled.div`
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
  display: none;
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
  @media (min-width: 600px) {
    display: block;
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

const Divider = styled.span`
  display: none;
  @media (min-width: 600px) {
    display: inline-block;
  }
`

export type AllSlugsType = { slug: string; lang: string }[]

export type LocalizationSwitchProps = {
  allSlugs: AllSlugsType
  activeLocale: string
}

type LocaleLinkProps = {
  href: string
  title: string
  locale: string
  active: boolean
}

const LocaleLink: React.FC<LocaleLinkProps> = ({ href, title, locale, active, children }) => {
  if (!active) {
    return (
      <NextLink href={href} locale={locale} passHref>
        <StyledLink aria-label={title}>{children}</StyledLink>
      </NextLink>
    )
  }

  return <ActiveLocale>{children}</ActiveLocale>
}

export const LocalizationSwitch = ({ allSlugs: slugs, activeLocale, ...rest }: LocalizationSwitchProps) => {
  if (slugs.length < 1) return null

  return (
    <Wrapper {...rest}>
      {slugs.map((obj, key) => {
        const language = languages.find((lang) => lang.name === obj.lang)
        return (
          <StyledDiv key={obj.lang}>
            <LocaleLink
              href={obj.slug}
              title={`Switch to ${language?.title}`}
              locale={`${language?.locale}`}
              active={activeLocale === `${language?.locale}`}
            >
              <span style={{ textTransform: 'uppercase' }}>{language?.locale}</span>
            </LocaleLink>
            {key + 1 < slugs.length && <Divider>|</Divider>}
          </StyledDiv>
        )
      })}
    </Wrapper>
  )
}
