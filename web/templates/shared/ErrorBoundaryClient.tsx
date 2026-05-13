'use client'
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
  return (
    <ErrorBoundary
      fallbackRender={({ error }) => {
        console.error(
          `Error in component ${c.type}: ${
            c?.title ? toPlainText(c.title) : ''
          }`,
          error,
        )
        return (
          <div
            role='alert'
            className={`mx-layout-sm mb-page-content flex flex-col items-center gap-8 rounded-card bg-gray-20 px-6 py-8 lg:mx-layout-lg`}
          >
            <TbFaceIdError size={64} />
            <Typography as='h2' variant='h3' className='text-center'>
              {dataset === 'global'
                ? ` error in component ${c.type}: ${
                    c?.title ? toPlainText(c.title) : ''
                  }`
                : ` this section could not be shown`}
            </Typography>
          </div>
        )
      }}
    >
      {children}
    </ErrorBoundary>
  )
}
