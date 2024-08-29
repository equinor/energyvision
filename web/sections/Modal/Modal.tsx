import { close } from '@equinor/eds-icons'
import { TransformableIcon } from '../../icons/TransformableIcon'
import { forwardRef, useEffect, useMemo, useRef } from 'react'
import { useIntl } from 'react-intl'
import { mergeRefs } from '@equinor/eds-utils'
import { Button } from '@core/Button'
import envisTwMerge from '../../twMerge'

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
  const intl = useIntl()

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
      className={envisTwMerge(
        `
        p-0
        modal
        modal-transition
        bd-blurred
      `,
        dialogClassName,
      )}
      aria-label={title}
      onKeyDown={handleKeyDown}
    >
      <div
        className={envisTwMerge(
          `w-[90vw] 
          lg:w-[997px] 
          max-h-[90vh]
          relative
          flex 
          flex-col 
          items-start
          py-4 
          px-4 
          overscroll-contain
          overflow-y-auto
          rounded-lg
          md:shadow-lg
          `,
          className,
        )}
        // Scrollable, needs to be keyboard accessible
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
      >
        <Button
          variant="ghost"
          className="ml-auto sticky top-0 p-3"
          onClick={onClose}
          aria-label={intl.formatMessage({ id: 'close', defaultMessage: 'Close' })}
        >
          <TransformableIcon iconData={close} className="w-full h-auto" />
        </Button>
        <div className="pl-2 pr-12 md:px-12 py-12">{children}</div>
      </div>
    </dialog>
  )
})

export default Modal
