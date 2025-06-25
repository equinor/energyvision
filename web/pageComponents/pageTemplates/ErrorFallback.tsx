import { GlobalStyle, GlobalFontStyle } from '../../styles/globalStyles'
import type { FallbackProps } from 'react-error-boundary'
import { Button } from '@/core/Button'
import { Typography } from '@/core/Typography'

const sliceErrorStack = (stackTrace = '', numLines = 10) => stackTrace.split('\n').slice(0, numLines).join('\n')

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <section className="px-layout-sm">
      <GlobalStyle />
      <GlobalFontStyle />
      <Typography variant="h3">An Error Occurred</Typography>
      <div className="mx-0 my-7">
        <Typography variant="body">
          The application detected an error that prevented it from loading. This error has been automatically reported
          to the development team. You can try clicking the <strong>Reload the Page</strong> button below to return to
          the page you were on previously.
        </Typography>
        <Button className="mb-7" onClick={resetErrorBoundary}>
          Reload the Page
        </Button>
      </div>

      <div className="mx-0 my-10">
        <Typography variant="h4">Error Details</Typography>

        <div
          className="p-2 block bg-grey-20 rounded-lg my-4 mx-0 overflow-x-auto"
          role="textbox"
          aria-label="Error message"
        >
          <pre className="p-2 text-2">{error.message}</pre>
        </div>

        <details className="mx-0 my-10">
          <summary className="text-md mb-4">Expand to Show Error Stack Traces</summary>
          <Typography variant="h5">Stack Trace</Typography>
          <div
            className="p-2 block bg-grey-20 rounded-lg my-4 mx-0 overflow-x-auto"
            role="textbox"
            aria-label="Stack trace"
          >
            <pre className="p-2 text-2">{sliceErrorStack(error.stack)}</pre>
          </div>
        </details>
      </div>
    </section>
  )
}
