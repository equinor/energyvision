import { LinkData } from '../../types'
import { getUrlFromAction } from '../../common/helpers'
import { useState } from 'react'
import { PortableTextBlock } from '@portabletext/types'
import { ResourceLink } from '@core/Link'
import { getLocaleFromName } from '../../lib/localization'
import Modal from '@sections/Modal/Modal'
import { add_circle_filled, add_circle_outlined } from '@equinor/eds-icons'
import { twMerge } from 'tailwind-merge'
import { TransformableIcon } from '../../icons/TransformableIcon'
import { useIntl } from 'react-intl'
import Blocks from '../../pageComponents/shared/portableText/Blocks'
import { Typography } from '@core/Typography'

type TranscriptAndActionsProps = {
  className?: string
  action?: LinkData
  transcript?: PortableTextBlock[]
  ariaTitle: string
}
const TranscriptAndActions = ({ action, transcript, className, ariaTitle }: TranscriptAndActionsProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const actionUrl = action ? getUrlFromAction(action) : ''
  const intl = useIntl()
  const readTranscript = intl.formatMessage({ id: 'read_transcript', defaultMessage: 'Read transcript' })
  const handleOpen = () => {
    setIsOpen(true)
  }
  const handleClose = () => {
    setIsOpen(false)
  }
  return (
    <div className={twMerge(`pt-3 pb-2 flex gap-2 `, className)}>
      {transcript && (
        <>
          <button
            onClick={handleOpen}
            aria-haspopup="dialog"
            aria-label={`${readTranscript} ${ariaTitle}`}
            className={`
              w-fit 
              flex 
              gap-4 
              pr-4
              pb-2
              group
              focus:outline-none
              focus-visible:envis-outline
              dark:focus:outline-none
              dark:focus-visible:envis-outline-invert
              border-b border-grey-40 dark:border-white-100`}
          >
            <span className={`grid`}>
              <TransformableIcon
                size={24}
                iconData={add_circle_outlined}
                className="fill-slate-80 
                dark:fill-white-100 
                opacity-100
                group-hover:opacity-0
                group-data-open:opacity-0
                transition-opacity
                col-span-full
                row-span-full"
              />
              <TransformableIcon
                className={`fill-slate-80
                  dark:fill-white-100
                  opacity-0
                  group-hover:opacity-100
                  group-data-open:opacity-0
                  transition-opacity
                  col-span-full
                  row-span-full`}
                size={24}
                iconData={add_circle_filled}
              />
            </span>
            <Typography as="span" className="">
              {readTranscript}
            </Typography>
          </button>
          <Modal isOpen={isOpen} onClose={handleClose} title={ariaTitle}>
            <Blocks value={transcript} />
          </Modal>
        </>
      )}
    </div>
  )
}
export default TranscriptAndActions
