import { useEffect } from 'react'
import {
  type Reference,
  type StringInputProps,
  set,
  unset,
  useClient,
  useFormValue,
} from 'sanity'
import { defaultWebLang, languages } from '../../languages'
import { apiVersion } from '../../sanity.client'

type PersonListRoute = {
  slug?: string
  lang?: string
}

const buildPersonUrl = (
  routeSlug: string,
  routeLang: string | undefined,
  personName: string,
) => {
  const locale = languages.find(language => language.name === routeLang)?.locale
  const localePrefix =
    routeLang && routeLang !== defaultWebLang?.name && locale
      ? `/${locale}`
      : ''
  const normalizedRouteSlug = routeSlug.startsWith('/')
    ? routeSlug
    : `/${routeSlug}`
  const searchParams = new URLSearchParams()
  searchParams.set('person', encodeURIComponent(personName))
  return `${localePrefix}${normalizedRouteSlug}?${searchParams.toString()}`
}

export const GeneratedPersonUrlInput = (props: StringInputProps) => {
  const { onChange, path } = props
  const client = useClient({ apiVersion })
  const personName = useFormValue(['name']) as string | undefined
  const personListRoute = useFormValue(['personListRoute']) as
    | Reference
    | undefined
  const currentValue = useFormValue(path) as string | undefined

  useEffect(() => {
    let isCurrent = true
    const trimmedName = personName?.trim()
    const routeId = personListRoute?._ref

    if (!trimmedName || !routeId) {
      if (currentValue) onChange(unset())
      return
    }

    client
      .fetch<PersonListRoute>(
        /* groq */ `{
          "slug": coalesce(
            *[_id == "drafts." + $routeId][0].slug.current,
            *[_id == $routeId][0].slug.current
          ),
          "lang": coalesce(
            *[_id == "drafts." + $routeId][0].content->lang,
            *[_id == $routeId][0].content->lang
          )
        }`,
        { routeId },
      )
      .then(route => {
        if (!isCurrent) return

        const nextValue = route.slug
          ? buildPersonUrl(route.slug, route.lang, trimmedName)
          : undefined

        if (nextValue === currentValue) return
        onChange(nextValue ? set(nextValue) : unset())
      })

    return () => {
      isCurrent = false
    }
  }, [client, currentValue, onChange, personListRoute?._ref, personName])

  return props.renderDefault(props)
}
