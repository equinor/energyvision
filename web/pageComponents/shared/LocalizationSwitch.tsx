import styled, { css } from 'styled-components'
import NextLink from 'next/link'
import { outlineTemplate, Tokens } from '@utils'
import { languages } from '../../languages'
import { ButtonLink } from '@core/Link'

const { outline } = Tokens

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

const StyledLink = styled(NextLink)`
  ${SharedStyle}
  text-decoration: none;
  color: var(--grey-60);
  min-width: 48px;
  min-height: 48px;
  align-items: center;
  justify-content: center;

  &[data-focus-visible-added]:focus {
    ${outlineTemplate(outline)}
  }

  &:hover {
    background: var(--moss-green-70);
  }

  &:visited {
    color: var(--grey-60);
  }

  @media (min-width: 600px) {
    min-width: auto;
    min-height: auto;
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

const LocaleLink: React.FC<React.PropsWithChildren<LocaleLinkProps>> = ({ href, title, locale, active, children }) => {
  if (!active) {
    return (
      <StyledLink href={href} locale={locale} aria-label={title} prefetch={false}>
        {children}
      </StyledLink>
    )
  }

  return <ActiveLocale>{children}</ActiveLocale>
}

export const LocalizationSwitch = ({ allSlugs: slugs, activeLocale, ...rest }: LocalizationSwitchProps) => {
  if (slugs.length < 1) return null

  return (
    <div className="flex items-center" {...rest}>
      {slugs.map((obj, key) => {
        const language = languages.find((lang) => lang.name === obj.lang)
        return (
          <div className="flex items-center" key={obj.lang}>
            <ButtonLink
              variant="ghost"
              href={obj.slug}
              locale={`${language?.locale}`}
              className={`flex flex-col gap-0 items-stretch px-2 text-xs`}
            >
              <span className="sr-only">{`Switch to ${language?.title}`}</span>
              <span
                aria-hidden
                className={`uppercase ${activeLocale === String(language?.locale) ? 'font-bold' : 'font-normal'}`}
              >
                {language?.locale}
              </span>
              {/*               <span
                className={`h-[2px] ${
                  activeLocale === String(language?.locale) ? 'bg-moss-green-100' : 'bg-transparent'
                } w-full`}
              /> */}
            </ButtonLink>
            {key + 1 < slugs.length && <span className="hidden md:block">|</span>}
          </div>
        )
      })}
    </div>
  )
}
