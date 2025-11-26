'use client'
import { close } from '@equinor/eds-icons'
import { TransformableIcon } from '../../icons/TransformableIcon'
import { forwardRef, useEffect, useMemo, useRef } from 'react'
import { mergeRefs } from '@equinor/eds-utils'
import { Button } from '@/core/Button'
import { useTranslations } from 'next-intl'
import { twMerge } from 'tailwind-merge'

export type ModalProps = {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  dialogClassName?: string
  className?: string
}

const Modal = forwardRef<HTMLDialogElement, ModalProps>(function Modal(
  { isOpen, onClose, title, children, dialogClassName = '', className = '' },
  ref,
) {
  const modalRef = useRef<HTMLDialogElement>(null)
  const combinedDialogRef = useMemo(() => mergeRefs<HTMLDialogElement>(modalRef, ref), [modalRef, ref])
  const intl = useTranslations()

  useEffect(() => {
    if (isOpen) {
      modalRef?.current?.showModal()
    } else {
      modalRef?.current?.close()
    }
  }, [isOpen])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'Escape') {
      onClose()
    }
  }

  return (
    <dialog
      ref={combinedDialogRef}
      className={twMerge(
        `m-auto starting:open:backdrop:backdrop-blur-sm-none open:backdrop:backdrop-blur-sm-md rounded-lg p-0 opacity-0 backdrop:transition-all open:opacity-100 open:transition-opacity open:backdrop:bg-north-sea-90/50 starting:open:opacity-0 starting:open:backdrop:bg-transparent`,
        dialogClassName,
      )}
      aria-label={title}
      onKeyDown={handleKeyDown}
    >
      <div
        className={twMerge(
          `relative flex max-h-[90vh] w-[90vw] flex-col items-start overflow-y-auto overscroll-contain rounded-lg bg-white-100 px-4 py-4 md:shadow-lg lg:w-[997px]`,
          className,
        )}
        // Scrollable, needs to be keyboard accessible
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
      >
        <Button variant="ghost" className="sticky top-0 ml-auto p-3" onClick={onClose} aria-label={intl('close')}>
          <TransformableIcon iconData={close} className="h-auto w-full" />
        </Button>
        <div className="py-12 pr-12 pl-2 md:px-12">{children}</div>
      </div>
    </dialog>
  )
})

export default Modal
