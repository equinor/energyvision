import { toPlainText } from '@portabletext/react'
import { Collapsible } from 'radix-ui'
import { forwardRef, useMemo, useState } from 'react'
import { GoDash, GoPlus } from 'react-icons/go'
import BaseLink from '@/core/Link/BaseLink'
import { Typography } from '@/core/Typography'
import { chunkArray } from '@/lib/helpers/chunkArray'
import Blocks from '@/portableText/Blocks'

export const findAllAnchors = (content = []) => {
  return content
    ?.filter((block: any) => {
      return (
        (block?.type === 'anchorLink' && block?.anchorReference) ||
        (block?.type === 'textBlock' && block?.anchorReference)
      )
    })
    ?.map((block: any) => {
      let label =
        block?.anchorLabel ??
        block?.anchorReference.charAt(0).toUpperCase() +
          block?.anchorReference.slice(1)
      if (block?.type === 'textBlock') {
        label = Array.isArray(block?.title)
          ? toPlainText(block?.title)
          : block?.title
      }
      return {
        anchorReference: block?.anchorReference,
        //anchorLabel when AnchorLink comp, title when Textblock component
        label,
      }
    })
}
const alphabet = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
]

type AnchorSearchProps = {
  anchors: any
  label?: string
  anchor?: string
}

const AnchorSearch = forwardRef<HTMLDivElement, AnchorSearchProps>(
  function AnchorSearch({ anchors, label, anchor }, ref) {
    const [letter, setLetter] = useState<string | undefined>(undefined)
    const [open, setOpen] = useState(false)
    const availableLetters = useMemo(() => {
      const firstChars = anchors
        ?.map((anchor: any) => {
          return String(anchor?.label).charAt(0).toUpperCase()
        })
        .sort()

      return [...new Set(firstChars)]
    }, [anchors?.map])
    const letters = useMemo(() => {
      return letter ? [letter] : availableLetters
    }, [letter, availableLetters])

    return (
      <div ref={ref} id={anchor} className={`mb-12 px-layout-md`}>
        <Collapsible.Root
          className='CollapsibleRoot'
          open={open}
          onOpenChange={setOpen}
        >
          <Collapsible.Trigger className='group w-full bg-moss-green-50'>
            <div className='flex w-full gap-2 px-2 pt-3 pb-4'>
              <div className='mt-1'>
                <GoPlus
                  className={`text-slate-80 ${open ? 'hidden' : 'block'} dark:text-white-100`}
                  size={32}
                />
                <GoDash
                  className={`text-slate-80 ${open ? 'block' : 'hidden'} dark:text-white-100`}
                  size={32}
                />
              </div>
              <Typography
                as='h2'
                variant='h4'
                className='group-hover:underline'
              >
                {label}
              </Typography>
            </div>
          </Collapsible.Trigger>
          <Collapsible.Content className='ps-4'>
            <ul className='flex w-fit gap-3 pt-6 pb-2 text-md'>
              <span className='sr-only'>Filter on a letter: </span>
              <li className='flex'>
                <button
                  type='button'
                  className={`hover:underline ${typeof letter === 'undefined' ? 'underline' : 'no-underline'}`}
                  onClick={() => setLetter(undefined)}
                >
                  All
                </button>
                <span className='ps-2'>|</span>
              </li>

              {alphabet.map(char => {
                const hasContent = availableLetters.some(
                  contentLetter => contentLetter === char,
                )
                return (
                  <li
                    key={`nav_${char}`}
                    className={`${hasContent ? 'text-slate-80' : 'text-neutral-400'}`}
                  >
                    <button
                      type='button'
                      disabled={!hasContent}
                      className={`hover:underline ${char === letter ? 'underline' : 'no-underline'}`}
                      onClick={() => setLetter(char)}
                    >
                      {char}
                    </button>
                  </li>
                )
              })}
            </ul>
            <div
              tabIndex={0}
              className='flex max-h-[50vh] flex-col overflow-auto border-neutral-400 border-y'
            >
              {letters?.map(contentLetter => {
                const content = anchors?.filter(
                  (anchor: any) =>
                    String(anchor?.label).charAt(0).toUpperCase() ===
                    contentLetter,
                )
                const chunks = chunkArray(content ?? [], 5)

                return (
                  <div
                    key={contentLetter as string}
                    className='grid auto-cols-min grid-flow-col border-neutral-400 border-b py-8 last:border-none'
                  >
                    <Typography
                      group='plain'
                      variant='div'
                      className='w-fit ps-4 pe-20 font-semibold text-2xl'
                    >
                      {contentLetter as string}
                    </Typography>
                    <div className='grid auto-cols-[500px] grid-flow-col'>
                      {chunks?.map((chunk: any) => {
                        return (
                          <div
                            key={`chunk_${chunk?.toString()}`}
                            className='flex flex-col gap-2'
                          >
                            {chunk?.map((anchor: any) => {
                              return (
                                <BaseLink
                                  key={anchor.anchorReference}
                                  type='internalUrl'
                                  href={`#${anchor.anchorReference}`}
                                  className='text-base hover:underline'
                                  onClick={() => setOpen(false)}
                                >
                                  {Array.isArray(anchor?.label) ? (
                                    <Blocks value={anchor?.label} />
                                  ) : (
                                    anchor.label
                                  )}
                                </BaseLink>
                              )
                            })}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </Collapsible.Content>
        </Collapsible.Root>
      </div>
    )
  },
)

export default AnchorSearch
