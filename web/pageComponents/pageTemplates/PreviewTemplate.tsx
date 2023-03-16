/* eslint-disable import/no-unresolved */
import { lazy } from 'react'
import { usePreview } from '../../lib/sanity'
import ErrorPage from 'next/error'

const MagazinePage = lazy(() => import('./MagazinePage'))
const LandingPage = lazy(() => import('./LandingPage'))
const EventPage = lazy(() => import('./Event'))
const NewsPage = lazy(() => import('./News'))
const TopicPage = lazy(() => import('./TopicPage'))

const getPageComponent = (template: string) => {
  switch (template) {
    case 'landingPage':
      return LandingPage
    case 'event':
      return EventPage
    case 'news':
    case 'localNews':
      return NewsPage
    case 'magazine':
      return MagazinePage
    default:
      return TopicPage
  }
}

type PreviewTemplateProps = {
  token: string | null
  template: string
  query: string
  queryParams: any
}

const PreviewTemplate = ({ token, template, query, queryParams }: PreviewTemplateProps) => {
  const pageData = usePreview(token, query, queryParams)
  const Page = getPageComponent(template)

  if (!pageData || pageData.length === 0) {
    return <ErrorPage statusCode={404} />
  }

  return <Page data={pageData} />
}

export default PreviewTemplate
