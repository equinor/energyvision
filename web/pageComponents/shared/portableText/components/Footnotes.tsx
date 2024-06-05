/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { PortableText } from '@portabletext/react'
import { PortableTextBlock } from '@portabletext/types'
import isEmpty from '../helpers/isEmpty'
import { BaseLink } from '@core/Link'
import { FormattedMessage, useIntl } from 'react-intl'

function Footnotes({ blocks }: { blocks: PortableTextBlock[] }) {
  const intl = useIntl()
  const notes = blocks
    //
    .filter(({ _type }) => _type === 'block')
    // make an array of the mark definitions of those blocks
    //@ts-ignore
    .reduce((acc, curr) => {
      //TODO: look into more correct reduce
      //@ts-ignore
      return [...acc, ...curr?.markDefs]
    }, [])
    // find all the footnote mark definitions
    //@ts-ignore
    .filter(({ _type }: any) => _type === 'footnote')

  if (!notes || notes?.length === 0) {
    return null
  }
  return (
    <footer
      role="doc-endnotes"
      className="prose prose-md py-2 text-sm lg:text-xs border-y-[1px] border-autumn-storm-40 italic"
    >
      {/*       <div className="h-[1px] bg-autumn-storm-60 w-[30vw]" /> */}
      <h2 className="sr-only" id="footnote-label">
        <FormattedMessage id="footnotes" defaultMessage="Footnotes" />
      </h2>
      <ol className="my-0">
        {notes.map(({ _key, text }: { _key: any; text: any }) => (
          // the _key is what markKey refers to in the main text component
          <li id={`${_key}`} key={_key}>
            <p className="m-0 p-0">
              <PortableText
                value={text}
                components={{
                  block: {
                    normal: ({ children }: any) => {
                      if (isEmpty(children)) return null
                      return (
                        <span>
                          <>{children}</>
                        </span>
                      )
                    },
                    smallText: ({ children }: any) => <span className="text-sm">{children}</span>,
                  },
                }}
              />
              <BaseLink
                href={`#${`back_ref_${_key}`}`}
                className="
                w-full
                h-full
                px-2 
                hover:no-underline
                text-xs
                lg:text-2xs 
                font-thin"
                aria-label={intl.formatMessage({ id: 'back_to_content', defaultMessage: 'Back to content' })}
                role="doc-backlink"
              >
                ↵
              </BaseLink>
            </p>
          </li>
        ))}
      </ol>
    </footer>
  )
}

export default Footnotes
