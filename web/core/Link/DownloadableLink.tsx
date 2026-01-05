import { Typography } from '@core/Typography'
import { Modal } from '@sections/Modal'
import FriendlyCaptcha from '@templates/forms/FriendlyCaptcha'
import { forwardRef, useCallback, useState } from 'react'
import { BsFiletypePdf, BsFiletypeXlsx } from 'react-icons/bs'
import { useIntl } from 'react-intl'
import { ArrowRight } from '../../icons'
import envisTwMerge from '../../twMerge'
import { BaseLink } from './BaseLink'
import { getArrowElement, type ResourceLinkProps } from './ResourceLink'

type Variants = 'default' | 'fit' | 'stickyMenu'

export type DownloadableLinkProps = {
  variant?: Variants
  isAttachment?: boolean
} & Omit<ResourceLinkProps, 'variant'>

const DownloadableLink = forwardRef<HTMLDivElement, DownloadableLinkProps>(function DownloadableLink(
  {
    children,
    fileName,
    fileId,
    label,
    type = 'downloadableFile',
    extension,
    showExtensionIcon = true,
    ariaHideText,
    variant = 'fit',
    isAttachment = false,
  },
  ref,
) {
  const intl = useIntl()
  const [showModal, setShowModal] = useState(false)
  const [isFriendlyChallengeDone, setIsFriendlyChallengeDone] = useState(false)
  const [downloadRequestUrl, setDownloadRequestUrl] = useState(null)
  const downloadLabel = label ?? (Array.isArray(children) ? children?.[0] : '')

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
    return intl.formatMessage({
      id: 'downloadDocument',
      defaultMessage: 'Download document',
    })
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
              <BsFiletypePdf title="pdf" size={24} className="mr-2 min-w-6 min-h-6" />
            ) : (
              <BsFiletypeXlsx title="xlsx" size={24} className="mr-2 min-w-6 min-h-6" />
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
              <span>{`(${extension.toUpperCase()})`}</span>
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
            {extension ? <span>{`(${extension.toUpperCase()})`}</span> : null}
          </span>
        )
    }
  }

  const handleSuccessfullFriendlyChallenge = useCallback(
    async (event: any) => {
      const solution = event.detail.response
      if (fileId || fileName) {
        setIsFriendlyChallengeDone(true)
        const response = await fetch('/api/download/getFileUrl', {
          body: JSON.stringify({
            fileName: fileName,
            fileId: fileId,
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
    [fileName, fileId],
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
            items-end
            w-fit
            underline-offset-2
            text-slate-80
            text-sm`
        }
        title={`${getTranslation()}: ${fileName}`}
        aria-haspopup="dialog"
      >
        <div
          className={`h-full
          w-inherit 
          flex
          justify-start
          items-center
          gap-x-2
          ${variant !== 'stickyMenu' ? 'pb-3 pr-2' : ''}
`}
        >
          <div
            className={`flex 
            justify-start 
            text-start 
            text-pretty 
            pt-1 
            grow 
            leading-none
          ${
            variant === 'stickyMenu'
              ? 'w-fit group-hover:underline no-underline leading-none align-middle items-end'
              : ''
          }
            `}
          >
            {getContentElements(<>{`${downloadLabel}`}</>)}
          </div>
          {variant !== 'stickyMenu' && !isAttachment && (
            <div className={`flex flex-col px-1 translate-y-[1px]`}>
              <ArrowRight
                className={`
                rotate-90
                size-arrow-right
                text-energy-red-100
                dark:text-white-100
                justify-self-end
                min-h-arrow-right
                min-w-arrow-right
                transition-all
                duration-300
                group-hover:translate-y-0.5`}
              />
              <div className="bg-energy-red-100 dark:bg-white-100 h-[2px] w-full" />
            </div>
          )}
        </div>
        {variant !== 'stickyMenu' && (
          <div className="w-[0%] h-[1px] bg-grey-40 transition-all duration-300 group-hover:w-full" />
        )}
      </button>
      {showModal && (
        <Modal isOpen={showModal} onClose={handleClose} title="Request file download">
          <Typography as="h2" variant="h5" className="mb-4">
            {intl.formatMessage({
              id: 'request_download_action_prefix',
              defaultMessage: 'Request',
            })}
            {` ${downloadLabel}`}
          </Typography>
          <Typography group="plain" variant="div" className="mb-10">
            {intl.formatMessage({
              id: 'download_modal_ingress',
              defaultMessage: 'Please confirm that you are human below and the link will appear.',
            })}
          </Typography>
          <FriendlyCaptcha
            startMode="auto"
            doneCallback={(event: any) => {
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
              className={envisTwMerge(`${commonResourceLinkWrapperClassName}`, 'pt-20')}
              type={type}
              href={downloadRequestUrl}
              {...(extension &&
                extension.toLowerCase() === 'pdf' && {
                  target: '_blank',
                })}
              aria-description={fileName}
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
                {getContentElements(`${downloadLabel}`)}
                {getArrowElement(extension && extension.toLowerCase() === 'pdf' ? 'externalUrl' : type)}
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
