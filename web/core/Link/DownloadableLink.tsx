import { Typography } from '@core/Typography'
import { Modal } from '@sections/Modal'
import FriendlyCaptcha from '@templates/forms/FriendlyCaptcha'
import { ArrowRight } from '../../icons'
import { forwardRef, useCallback, useState } from 'react'
import { useIntl } from 'react-intl'
import { getArrowElement, ResourceLinkProps } from './ResourceLink'
import { BaseLink } from './BaseLink'
import { BsFiletypePdf, BsFiletypeXlsx } from 'react-icons/bs'
import envisTwMerge from '../../twMerge'

type Variants = 'default' | 'fit' | 'stickyMenu'

export type DownloadableLinkProps = {
  variant?: Variants
  fileName?: string
  label?: string
} & Omit<ResourceLinkProps, 'variant'>

const DownloadableLink = forwardRef<HTMLDivElement, DownloadableLinkProps>(function DownloadableLink(
  { fileName, label, type = 'downloadableFile', extension, showExtensionIcon, ariaHideText, variant = 'fit' },
  ref,
) {
  const intl = useIntl()
  const [showModal, setShowModal] = useState(false)
  const [isFriendlyChallengeDone, setIsFriendlyChallengeDone] = useState(false)
  const [downloadRequestUrl, setDownloadRequestUrl] = useState(null)

  const [notHuman, setNotHuman] = useState(false)

  const variantClassName: Partial<Record<string, string>> = {
    default: 'w-full',
    fit: 'w-fit',
    stickyMenu: 'w-fit',
  }

  const contentVariantClassName: Partial<Record<string, string>> = {
    default: 'pb-3 pr-2',
    stickyMenu: 'pb-3 pr-2',
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

  const handleSuccessfullFriendlyChallenge = useCallback(
    async (event: any) => {
      const solution = event.detail.response
      if (fileName) {
        setIsFriendlyChallengeDone(true)
        const response = await fetch('/api/download/getFileUrl', {
          body: JSON.stringify({
            fileName: fileName,
            frcCaptchaSolution: solution,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        })
        const url = await response.json()
        setDownloadRequestUrl(url.url)
      }
    },
    [fileName],
  )

  const commonResourceLinkWrapperClassName = `
    group
    text-base
    relative
    flex
    flex-col
    justify-end
    gap-0
    text-slate-blue-95
    dark:text-white-100
    pt-3
    border-b
    border-grey-50
    dark:border-white-100 
    no-underline
    ${variantClassName[variant]}`

  return (
    <div ref={ref}>
      <button
        type="button"
        onClick={handleRequestFile}
        className={
          variant !== 'stickyMenu'
            ? commonResourceLinkWrapperClassName
            : `group 
            relative 
            flex
            justify-center
            w-fit
            underline-offset-2
            text-slate-80
            text-sm`
        }
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
          ${variant !== 'stickyMenu' ? 'pb-3 pr-2' : ''}
`}
        >
          <span
            className={`flex 
            justify-start 
            text-start 
            text-pretty 
            pt-1 
            grow 
            leading-none
          ${variant === 'stickyMenu' ? 'w-fit group-hover:underline no-underline leading-none align-middle' : ''}
            `}
          >
            {intl.formatMessage({ id: 'request_download_action_prefix', defaultMessage: 'Request' })}
            {` ${label}`}
          </span>
          {variant !== 'stickyMenu' && (
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
          )}
        </span>
        {variant !== 'stickyMenu' && (
          <span className="w-[0%] h-[1px] bg-grey-40 transition-all duration-300 group-hover:w-full" />
        )}
      </button>
      {showModal && (
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
            doneCallback={(event) => {
              handleSuccessfullFriendlyChallenge(event)
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
      )}
    </div>
  )
})

export default DownloadableLink
