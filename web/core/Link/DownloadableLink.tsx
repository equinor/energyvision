import { forwardRef, useCallback, useState } from 'react'
//BsFiletypeDoc, BsFiletypeMov,
import {
  BsFiletypeJpg,
  BsFiletypePdf,
  BsFiletypePng,
  BsFiletypeXls,
  BsFiletypeXlsx,
  BsFileZip,
} from 'react-icons/bs'
import { useIntl } from 'react-intl'
import { Typography } from '@/core/Typography'
import { twMerge } from '@/lib/twMerge/twMerge'
import { Modal } from '@/sections/Modal'
import FriendlyCaptcha from '@/templates/forms/FriendlyCaptcha'
import type { LinkType } from '@/types'
import { ArrowRight } from '../../icons'
import { BaseLink } from './BaseLink'
import { getArrowElement, type ResourceLinkProps } from './ResourceLink'

type Variants = 'default' | 'fit'
type Type = 'simple' | 'resource' | 'stickyMenu'

export type DownloadableLinkProps = {
  /** Type of downloadable link
   * @default resource */
  type?: Type
  /** File or image
   * @default downloadableFile */
  linkType: LinkType
  /** Full width or fitted width on link
   * @default fit */
  variant?: Variants
  /** If type is of an extension type (PDF), show the extention as icon
   * @default true */
  showExtensionIcon?: boolean
} & Omit<ResourceLinkProps, 'variant' | 'type' | 'showExtensionIcon'>

const DownloadableLink = forwardRef<HTMLDivElement, DownloadableLinkProps>(
  function DownloadableLink(
    {
      children,
      file,
      type = 'resource',
      linkType = 'downloadableFile',
      showExtensionIcon = true,
      variant = 'fit',
    },
    ref,
  ) {
    const { label, originalFilename, url, extension } = file || {}
    const fileUrl = url
      ? `${url.replace('cdn.sanity.io', 'cdn.equinor.com')}?${originalFilename.replace(/ /g, '-')}`
      : null
    const intl = useIntl()
    const [showModal, setShowModal] = useState(false)
    const [isFriendlyChallengeDone, setIsFriendlyChallengeDone] =
      useState(false)
    const assetLabel =
      label ?? (Array.isArray(children) ? children?.[0] : originalFilename)
    const hasIcon = ['pdf', 'png', 'jpg', 'xlsx', 'xls', 'zip']
    const openInNewTab = ['pdf', 'png', 'jpg']

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

    const getExtensionIcon = () => {
      const iconClassName = 'min-w-5'
      switch (extension?.toUpperCase()) {
        case 'PDF':
          return (
            <BsFiletypePdf title='pdf' size={20} className={iconClassName} />
          )
        case 'XLSX':
          return (
            <BsFiletypeXlsx title='xlsx' size={20} className={iconClassName} />
          )
        case 'PNG':
          return (
            <BsFiletypePng title='png' size={20} className={iconClassName} />
          )
        case 'JPG':
          return (
            <BsFiletypeJpg title='jpg' size={20} className={iconClassName} />
          )
        case 'XLS':
          return (
            <BsFiletypeXls title='xls' size={20} className={iconClassName} />
          )
        case 'ZIP':
          return <BsFileZip title='zip' size={20} className={iconClassName} />
        default:
          return null
      }
    }

    const handleSuccessfullFriendlyChallenge = useCallback(
      async (event: any) => {
        const solution = event.detail.response
        setIsFriendlyChallengeDone(true)
        const response = await fetch('/api/download/getFileUrl', {
          body: JSON.stringify({
            frcCaptchaSolution: solution,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        })
        console.log('response')
        if (!response.ok) {
          setNotHuman(true)
        }
      },
      [],
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

    const linkElement = (
      <div className='flex items-baseline gap-1'>
        {showExtensionIcon && getExtensionIcon()}
        <div className='pt-1 leading-none'>
          {assetLabel}
          {extension && (!showExtensionIcon || !hasIcon.includes(extension)) ? (
            <span>{`(${extension.toLowerCase()})`}</span>
          ) : null}
        </div>
      </div>
    )

    return (
      <div ref={ref}>
        <button
          type='button'
          onClick={handleRequestFile}
          className={
            type !== 'stickyMenu'
              ? commonResourceLinkWrapperClassName
              : `group relative flex w-fit items-end justify-center text-slate-80 text-sm underline-offset-2`
          }
          title={`${assetLabel}`}
          aria-haspopup='dialog'
        >
          <div
            className={`flex h-full w-inherit items-center justify-start gap-x-2 ${type !== 'stickyMenu' ? 'pr-2 pb-3' : ''}
`}
          >
            <div
              className={`flex grow justify-start text-pretty pt-1 text-start leading-none ${
                type === 'stickyMenu'
                  ? 'w-fit items-end align-middle leading-none no-underline group-hover:underline'
                  : ''
              }`}
            >
              {linkElement}
            </div>
            {!(type === 'stickyMenu' || type === 'simple') && (
              <div className={`flex translate-y-px flex-col px-1`}>
                <ArrowRight
                  className={`size-arrow-right min-h-arrow-right min-w-arrow-right rotate-90 justify-self-end text-energy-red-100 transition-all duration-300 group-hover:translate-y-0.5 dark:text-white-100`}
                />
                <div className='h-0.5 w-full bg-energy-red-100 dark:bg-white-100' />
              </div>
            )}
          </div>
          {type !== 'stickyMenu' && (
            <div className='h-px w-[0%] bg-grey-40 transition-all duration-300 group-hover:w-full' />
          )}
        </button>
        {showModal && (
          <Modal
            isOpen={showModal}
            onClose={handleClose}
            title='Request file download'
          >
            <Typography as='h2' variant='h5' className='mb-4'>
              {intl.formatMessage({
                id: 'request_download_action_prefix',
                defaultMessage: 'Request',
              })}
              {` ${assetLabel}`}
            </Typography>
            <Typography group='plain' variant='div' className='mb-10'>
              {intl.formatMessage({
                id: 'download_modal_ingress',
                defaultMessage:
                  'Please confirm that you are human below and the link will appear.',
              })}
            </Typography>
            <FriendlyCaptcha
              startMode='auto'
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
              <Typography
                variant='body'
                role='alert'
                className='py-6 text-base text-slate-80'
              >
                {intl.formatMessage({
                  id: 'not_human_message',
                  defaultMessage:
                    'We are sorry, but anti-robot protection failed and we cannot proceed',
                })}
              </Typography>
            )}
            {isFriendlyChallengeDone && !notHuman && (
              <BaseLink
                className={twMerge(
                  `${commonResourceLinkWrapperClassName}`,
                  'pt-20',
                )}
                type={linkType}
                href={linkType === 'downloadableFile' ? fileUrl : url}
                {...(extension &&
                  openInNewTab?.includes(extension.toLowerCase()) && {
                    target: '_blank',
                  })}
              >
                <span
                  className={`flex h-full w-inherit items-center justify-start gap-x-2 ${contentVariantClassName[variant]}`}
                >
                  {linkElement}
                  {getArrowElement(
                    extension && openInNewTab?.includes(extension.toLowerCase())
                      ? 'externalUrl'
                      : linkType,
                  )}
                </span>

                <span className='h-px w-[0%] bg-grey-40 transition-all duration-300 group-hover:w-full' />
              </BaseLink>
            )}
          </Modal>
        )}
      </div>
    )
  },
)

export default DownloadableLink
