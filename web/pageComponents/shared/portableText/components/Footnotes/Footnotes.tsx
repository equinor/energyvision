/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { PortableText } from '@portabletext/react'
import { PortableTextBlock } from '@portabletext/types'
import isEmpty from '../../helpers/isEmpty'
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

  const handelScrollToRef = (id: string, e: any) => {
    e.preventDefault()
    if (document.getElementById(id)) {
      window.scrollTo({
        //@ts-ignore
        top: document.getElementById(id)?.offsetTop - 120,
        behavior: 'smooth',
      })
    }
  }

  return (
    <footer
      role="doc-endnotes"
      className="prose prose-md py-2 text-sm lg:text-xs border-y-[1px] border-autumn-storm-40 italic"
    >
      <h2 className="sr-only" id="footnote-label">
        <FormattedMessage id="footnotes" defaultMessage="Footnotes" />
      </h2>
      <ul className="my-0 list-none px-0 not-prose">
        {notes.map((props: any) => {
          return (
            <li id={`${props?._key}`} className="relative group" key={props?._key}>
              <p className="w-full m-0 p-0 text-sm text-balance grid grid-cols-[max-content_1fr]">
                <span className="pr-2">{`${props?.marker})`}</span>
                <span className="group-target:animate-highlightInOut">
                  <PortableText
                    value={props?.text}
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
                    href={`#${`back_ref_${props?._key}`}`}
                    className="
                w-fit
                h-fit
                px-2 
                hover:underline
                text-sm
                lg:text-2xs 
                font-thin
                relative
                clickbound-area"
                    aria-label={intl.formatMessage({ id: 'back_to_content', defaultMessage: 'Back to content' })}
                    role="doc-backlink"
                    title={intl.formatMessage({ id: 'back_to_content', defaultMessage: 'Back to content' })}
                    onClick={(e) => handelScrollToRef(`back_ref_${props?._key}`, e)}
                  >
                    ↵
                  </BaseLink>
                </span>
              </p>
            </li>
          )
        })}
      </ul>
    </footer>
  )
}

export default Footnotes
