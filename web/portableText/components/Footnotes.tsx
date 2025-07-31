'use client'
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { PortableText } from '@portabletext/react'
import { PortableTextBlock } from '@portabletext/types'
import isEmpty from '../helpers/isEmpty'
import { BaseLink } from '@/core/Link'
import { useTranslations } from 'next-intl'

function Footnotes({ blocks }: { blocks: PortableTextBlock[] }) {
  const intl = useTranslations()
  const notes = blocks
    //
    .filter(({ _type }) => _type === 'block')
    // make an array of the mark definitions of those blocks
    //@ts-ignore
    .reduce((acc, curr) => {
      const markDefs = Array.isArray(curr?.markDefs) ? curr.markDefs : []
      return [...acc, ...markDefs]
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
      data-prose="medium"
      className="border-y-[1px] border-autumn-storm-40 py-2 text-sm italic lg:text-xs"
    >
      <h2 className="sr-only" id="footnote-label">
        {intl('footnotes')}
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
                className="relative h-fit w-fit px-2 text-sm font-thin before:absolute before:top-1/2 before:left-1/2 before:aspect-square before:w-[48px] before:translate-x-[-50%] before:translate-y-[-50%] before:cursor-pointer before:rounded-[100%] before:content-[''] hover:no-underline lg:text-2xs"
                aria-label={intl('back_to_content')}
                role="doc-backlink"
                title={intl('back_to_content')}
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
