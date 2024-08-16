import { LinkData } from '../../types'
import { getUrlFromAction } from '../../common/helpers'
import { useState } from 'react'
import { PortableTextBlock } from '@portabletext/types'
import { ButtonLink } from '@core/Link'
import { commonButtonStyling, getVariant } from '@core/Button'
import { getLocaleFromName } from '../../lib/localization'
import Modal from '@sections/Modal/Modal'
import RichText from './portableText/RichText'
import { add_circle_filled } from '@equinor/eds-icons'
import { twMerge } from 'tailwind-merge'
import { TransformableIcon } from '../../icons/TransformableIcon'
import { useIntl } from 'react-intl'
import { title } from 'process'

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
    <div className={twMerge(`grid md:grid-cols-2 md:gap-x-4 md:pt-11 pt-8`, className)}>
      {action && action.label && (
        <ButtonLink
          href={actionUrl || ''}
          aria-label={action?.ariaLabel}
          variant="outlined"
          className={`w-full md:mb-8 mb-4 justify-center ${getVariant('outlined-secondary')}`}
          locale={action?.type === 'internalUrl' ? getLocaleFromName(action?.link?.lang) : undefined}
        >
          {action.label}
        </ButtonLink>
      )}

      {transcript && (
        <>
          <button
            onClick={handleOpen}
            aria-label={`${readTranscript} ${ariaTitle}`}
            className={`w-full mb-8 ${commonButtonStyling} ${getVariant('contained-secondary')}`}
          >
            <span className="grow">{readTranscript}</span>
            <TransformableIcon className={'scale-90 lg:scale-100'} iconData={add_circle_filled} />
          </button>
          <Modal isOpen={isOpen} onClose={handleClose} title={ariaTitle}>
            <RichText value={transcript} />
          </Modal>
        </>
      )}
    </div>
  )
}
export default TranscriptAndActions
