'use client'
import { Typography } from '@/core/Typography'
import { Modal } from '@/sections/Modal'
import FriendlyCaptcha from '@/templates/forms/FriendlyCaptcha'
import { ArrowRight } from '../../icons'
import { forwardRef, useState } from 'react'
import { getArrowElement, ResourceLinkProps } from './ResourceLink'
import { BaseLink } from './BaseLink'
import { BsFiletypePdf, BsFiletypeXlsx } from 'react-icons/bs'
import { useTranslations } from 'next-intl'
import { twMerge } from 'tailwind-merge'

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
  const intl = useTranslations()
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
    return intl('downloadDocument')
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
              <BsFiletypePdf aria-label="pdf" size={24} className="mr-2 min-h-6 min-w-6" />
            ) : (
              <BsFiletypeXlsx aria-label="xlsx" size={24} className="mr-2 min-h-6 min-w-6" />
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

  const handleSuccessfullFriendlyChallenge = async (event: any) => {
    console.log('captcha event', event)
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
  }

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
            : `group relative flex w-fit justify-center text-sm text-slate-80 underline-offset-2`
        }
        aria-haspopup="dialog"
        aria-label={`Request file download modal`}
      >
        <span
          className={`w-inherit flex h-full items-center justify-start gap-x-2 ${variant !== 'stickyMenu' ? 'pr-2 pb-3' : ''} `}
        >
          <span
            className={`flex grow justify-start pt-1 text-start leading-none text-pretty ${variant === 'stickyMenu' ? 'w-fit align-middle leading-none no-underline group-hover:underline' : ''} `}
          >
            {intl('request_download_action_prefix')}
            {` ${label}`}
          </span>
          {variant !== 'stickyMenu' && (
            <ArrowRight
              className={`ml-6 size-arrow-right min-h-arrow-right min-w-arrow-right translate-y-0.5 justify-self-end text-energy-red-100 transition-all duration-300 group-hover:translate-x-2 xl:ml-8 dark:text-white-100`}
            />
          )}
        </span>
        {variant !== 'stickyMenu' && (
          <span className="bg-grey-40 h-[1px] w-[0%] transition-all duration-300 group-hover:w-full" />
        )}
      </button>
      <Modal isOpen={showModal} onClose={handleClose} title="Request file download">
        <Typography as="h2" variant="h5" className="mb-4">
          {intl('request_download_action_prefix')}
          {` ${label}`}
        </Typography>
        <Typography variant="body" className="mb-10">
          {intl('download_modal_ingress')}
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
          <Typography variant="body" role="alert" className="py-6 text-base text-slate-80">
            {intl('not_human_message')}
          </Typography>
        )}
        {downloadRequestUrl && isFriendlyChallengeDone && !notHuman && (
          <BaseLink
            className={twMerge(`${commonResourceLinkWrapperClassName}`, 'pt-20')}
            type={type}
            href={downloadRequestUrl}
            {...(extension &&
              extension.toLowerCase() === 'pdf' && {
                target: '_blank',
              })}
          >
            <span
              className={`w-inherit flex h-full items-center justify-start gap-x-2 ${contentVariantClassName[variant]}`}
            >
              {getContentElements(<>{`${label}`}</>)}
              {getArrowElement(type)}
            </span>

            <span className="bg-grey-40 h-[1px] w-[0%] transition-all duration-300 group-hover:w-full" />
          </BaseLink>
        )}
      </Modal>
    </div>
  )
})

export default DownloadableLink
