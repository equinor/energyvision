'use client'

import { add_circle_filled, add_circle_outlined } from '@equinor/eds-icons'
import type { PortableTextBlock } from '@portabletext/types'
import { forwardRef, type ReactNode, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { Image } from '@/core/Image/Image'
import type { Image as ImageType } from '@/core/Image/imageUtilities'
import { Typography } from '@/core/Typography'
import { TransformableIcon } from '@/icons/TransformableIcon'
import { Modal } from '@/sections/Modal'
import {
  type ColorKeys,
  colorKeyToUtilityMap,
} from '@/styles/colorKeyToUtilityMap'
import { LogoPrimary } from '../Logo/Logo'

export type ModalPromotionProps = {
  background?: ColorKeys
  image?: ImageType
  title: string | PortableTextBlock[]
  ingress?: string | PortableTextBlock[]
  /** about title element */
  eyebrow?: ReactNode
  /** h2 or h3 if section title in parent block component */
  hasSectionTitle?: boolean
  modalTitle?: string
  modalContent?: ReactNode
  className?: string
}

const getPlainText = (text: string | PortableTextBlock[] | undefined) => {
  if (typeof text === 'undefined') return text

  return Array.isArray(text)
    ? text
        .map(block => block.children.map(span => span.text).join(''))
        .join('\n')
        .replace(/\n/g, ' ')
    : text
}

export const ModalPromotion = forwardRef<HTMLDivElement, ModalPromotionProps>(
  function ModalPromotion(
    {
      background,
      title,
      ingress,
      image,
      className = '',
      hasSectionTitle = false,
      eyebrow,
      modalTitle,
      modalContent,
    },
    ref,
  ) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const plainText = getPlainText(title)
    const plainIngress = getPlainText(ingress)

    const handleOpenModal = (e: React.MouseEvent) => {
      e.preventDefault()
      const searchParams = new URLSearchParams()
      if (plainText) {
        searchParams.set('hashtag', encodeURIComponent(plainText))
      }
      window.history.pushState({}, '', `?${searchParams.toString()}`)
      setIsModalOpen(true)
    }

    return (
      <>
        <div
          ref={ref}
          className={twMerge(
            `grid w-full max-w-full grid-cols-1 grid-rows-[minmax(31%,200px)_1fr] overflow-hidden rounded-card`,
            colorKeyToUtilityMap[background ?? 'gray-20']?.background,
            className,
          )}
        >
          {image ? (
            <Image
              grid='xs'
              image={image}
              fill
              className='aspect-video h-full w-full'
              aspectRatio='16:9'
              imageClassName='rounded-t-card'
            />
          ) : (
            <div className='flex aspect-video h-full w-full items-center justify-center rounded-t-card bg-autumn-storm-60'>
              <LogoPrimary className='h-auto w-[20%] text-white-100' />
            </div>
          )}
          <button
            type='button'
            onClick={handleOpenModal}
            aria-label={`View ${plainText} details`}
            className='group/btn relative flex w-full cursor-pointer flex-col items-start text-start'
          >
            <div className='flex w-full grow flex-col items-start justify-start ps-10 pe-10 pt-6 pb-12'>
              {eyebrow && eyebrow}
              <div className='flex h-fit flex-col justify-start'>
                {plainText && (
                  <Typography
                    as={hasSectionTitle ? 'h3' : 'h2'}
                    variant={ingress ? 'h5' : 'h6'}
                    className='leading-tight group-hover/btn:underline'
                  >
                    {plainText}
                  </Typography>
                )}
                {plainIngress && (
                  <Typography
                    group='card'
                    variant='ingress'
                    className='lg:line-clamp-5'
                  >
                    {plainIngress}
                  </Typography>
                )}
              </div>
            </div>

            <span className='absolute inset-e-6.5 bottom-5 p-1' aria-hidden>
              <TransformableIcon
                iconData={add_circle_outlined}
                className='h-6 w-6 group-hover/btn:hidden'
              />
              <TransformableIcon
                iconData={add_circle_filled}
                className='hidden h-6 w-6 group-hover/btn:block'
              />
            </span>
          </button>
        </div>

        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false)
              window.history.pushState({}, '', window.location.pathname)
            }}
            title={modalTitle || plainText || 'Details'}
          >
            {modalContent}
          </Modal>
        )}
      </>
    )
  },
)

export default ModalPromotion
