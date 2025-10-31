import { Typography } from '@core/Typography'
import { Modal } from '@sections/Modal'
import FriendlyCaptcha from '@templates/forms/FriendlyCaptcha'
import { ArrowRight } from '../../icons'
import { forwardRef, useState } from 'react'
import { useIntl } from 'react-intl'
import { getArrowElement, ResourceLinkProps } from './ResourceLink'
import { BaseLink } from './BaseLink'
import { BsFiletypePdf, BsFiletypeXlsx } from 'react-icons/bs'
import envisTwMerge from '../../twMerge'

export type DownloadableLinkProps = {
  fileName?: string
  label?: string
} & ResourceLinkProps

const DownloadableLink = forwardRef<HTMLDivElement, DownloadableLinkProps>(function DownloadableLink(
  { fileName, label, type = 'downloadableFile', extension, showExtensionIcon, ariaHideText, variant = 'fit' },
  ref,
) {
  const intl = useIntl()
  const [showModal, setShowModal] = useState(false)
  const [isFriendlyChallengeDone, setIsFriendlyChallengeDone] = useState(false)
  const [downloadRequestUrl, setDownloadRequestUrl] = useState(null)

  const [notHuman, setNotHuman] = useState(false)
  console.log('DownloadableLink fileName', fileName)
  console.log('DownloadableLink downloadRequestUrl', downloadRequestUrl)

  const contentVariantClassName: Partial<Record<string, string>> = {
    default: 'pb-3 pr-2',
    fit: 'pb-3 pr-2',
  }

  const handleRequestFile = () => {
    setShowModal(!showModal)
  }

  const handleClose = () => {
    setShowModal(false)
  }

  const getTranslation = () => {
    return intl.formatMessage({ id: 'downloadDocument', defaultMessage: 'Download document' })
  }

  const getContentElements = (children?: React.ReactNode) => {
    const textClassNames = `pt-1 grow leading-none`
    switch (type) {
      case 'downloadableFile':
        return extension &&
          (extension.toUpperCase() === 'PDF' ||
            extension.toUpperCase() === 'XLS' ||
            extension.toUpperCase() === 'XLSX') &&
          showExtensionIcon ? (
          <>
            {extension.toUpperCase() === 'PDF' ? (
              <BsFiletypePdf aria-label="pdf" size={24} className="mr-2 min-w-6 min-h-6" />
            ) : (
              <BsFiletypeXlsx aria-label="xlsx" size={24} className="mr-2 min-w-6 min-h-6" />
            )}
            <span
              className={textClassNames}
              {...(ariaHideText && {
                'aria-hidden': true,
              })}
            >
              {children}
            </span>
          </>
        ) : (
          <span
            className={textClassNames}
            {...(ariaHideText && {
              'aria-hidden': true,
            })}
          >
            {children}
            {(extension && !showExtensionIcon) ||
            (extension &&
              (extension.toUpperCase() !== 'PDF' ||
                extension.toUpperCase() !== 'XLS' ||
                extension.toUpperCase() !== 'XLSX') &&
              showExtensionIcon) ? (
              <span
                aria-label={`, ${getTranslation()} ${extension.toUpperCase()}`}
              >{`(${extension.toUpperCase()})`}</span>
            ) : null}
          </span>
        )
      default:
        return (
          <span
            className={textClassNames}
            {...(ariaHideText && {
              'aria-hidden': true,
            })}
          >
            {children}
            {extension ? (
              <span aria-label={`, ${getTranslation()} ${extension.toUpperCase()}`}>
                {`(${extension.toUpperCase()})`}
              </span>
            ) : null}
          </span>
        )
    }
  }

  const handleSuccessfullFriendlyChallenge = async () => {
    if (fileName) {
      console.log('File request friendly challenge successfully done')
      setIsFriendlyChallengeDone(true)
      const response = await fetch(`/api/download/getFileUrl?fileName=${encodeURIComponent(fileName)}`)
      const url = await response.json()
      console.log('response data url', url)
      setDownloadRequestUrl(url.url)
    }
  }
  const commonLinkWrapperClassName = `
    group
    text-base
    relative
    flex
    flex-col
    justify-end
    gap-0
    text-slate-blue-95
    dark:text-white-100
    w-fit 
    pt-3
    border-b
    border-grey-50
    dark:border-white-100 no-underline`

  return (
    <div ref={ref}>
      <button
        type="button"
        onClick={handleRequestFile}
        className={commonLinkWrapperClassName}
        aria-haspopup="dialog"
        aria-label={`Request file download modal`}
      >
        <span
          className={`h-full
          w-inherit 
          flex
          justify-start
          items-center
          gap-x-2
          pb-3 
          pr-2`}
        >
          <span className="pt-1 grow leading-none">
            {intl.formatMessage({ id: 'request_download_action_prefix', defaultMessage: 'Request' })}
            {` ${label}`}
          </span>
          <ArrowRight
            className={`ml-6 
                xl:ml-8
                size-arrow-right
                text-energy-red-100
                dark:text-white-100
                justify-self-end
                min-h-arrow-right
                min-w-arrow-right
                transition-all
                duration-300
                translate-y-0.5 
                group-hover:translate-x-2`}
          />
        </span>
        <span className="w-[0%] h-[1px] bg-grey-40 transition-all duration-300 group-hover:w-full" />
      </button>
      <Modal isOpen={showModal} onClose={handleClose} title="Request file download">
        <Typography as="h2" variant="h5" className="mb-4">
          {intl.formatMessage({ id: 'request_download_action_prefix', defaultMessage: 'Request' })}
          {` ${label}`}
        </Typography>
        <Typography variant="body" className="mb-10">
          {intl.formatMessage({
            id: 'download_modal_ingress',
            defaultMessage: 'Please confirm that you are human below and the link will appear.',
          })}
        </Typography>
        <FriendlyCaptcha
          doneCallback={() => {
            handleSuccessfullFriendlyChallenge()
          }}
          errorCallback={(error: any) => {
            console.error('FriendlyCaptcha encountered an error', error)
            setNotHuman(true)
            setIsFriendlyChallengeDone(false)
          }}
        />
        {notHuman && (
          <Typography variant="body" role="alert" className="py-6 text-slate-80 text-base">
            {intl.formatMessage({
              id: 'not_human_message',
              defaultMessage: 'We are sorry, but anti-robot protection failed and we cannot proceed',
            })}
          </Typography>
        )}
        {downloadRequestUrl && isFriendlyChallengeDone && !notHuman && (
          <BaseLink
            className={envisTwMerge(`${commonLinkWrapperClassName}`, 'pt-20')}
            type={type}
            href={downloadRequestUrl}
            {...(extension &&
              extension.toLowerCase() === 'pdf' && {
                target: '_blank',
              })}
          >
            <span
              className={`h-full 
                w-inherit 
                flex
                justify-start
                items-center
                gap-x-2
                ${contentVariantClassName[variant]}`}
            >
              {getContentElements(<>{`${label}`}</>)}
              {getArrowElement(type)}
            </span>

            <span className="w-[0%] h-[1px] bg-grey-40 transition-all duration-300 group-hover:w-full" />
          </BaseLink>
        )}
      </Modal>
    </div>
  )
})

export default DownloadableLink
