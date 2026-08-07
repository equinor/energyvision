'use client'
import { useTranslations } from 'next-intl'
import { toPlainText } from 'next-sanity'
import { ErrorBoundary } from 'react-error-boundary'
import { TbFaceIdError } from 'react-icons/tb'
import { Typography } from '@/core/Typography'
import { dataset } from '@/languageConfig'

export const ErrorBoundaryClient = ({
  component: c,
  children,
}: {
  component: any
  children: any
}) => {
  const t = useTranslations()

  return (
    <ErrorBoundary
      fallbackRender={({ error }) => {
        console.error(
          `Error in component ${c.type} with title: ${
            c?.title ? toPlainText(c.title) : ''
          }`,
          error,
        )
        return (
          <div
            role='alert'
            className={`mx-layout-sm mb-page-content flex flex-col items-center rounded-card bg-gray-20 px-6 py-8 lg:mx-layout-lg`}
          >
            <TbFaceIdError size={64} />
            <Typography as='h2' variant='h4' className='text-center'>
              {dataset === 'global-development'
                ? `Error in ${c.type}`
                : (t('sectionRenderError') ??
                  `This section could not be shown`)}
            </Typography>
            {dataset === 'global-development' && (
              <>
                <Typography as='h3' variant='h5' className='text-center'>
                  {`Title: ${c?.title ? toPlainText(c.title) : ''}`}
                </Typography>
                <Typography variant='body' className='pt-2 text-center'>
                  {error?.toString() ?? ``}
                </Typography>
              </>
            )}
          </div>
        )
      }}
    >
      {children}
    </ErrorBoundary>
  )
}
