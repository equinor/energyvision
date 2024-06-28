/* eslint-disable jsx-a11y/no-noninteractive-element-interactions*/
import { add_circle_filled } from '@equinor/eds-icons'
import { TransformableIcon } from '../../icons/TransformableIcon'
import { useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'

export type ModalProps = {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const nodeRef = useRef(null)
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    if (open) {
      const previouslyFocusedElement = document.activeElement as HTMLElement
      closeButtonRef.current?.focus()
      const scrollBarWidth = window.innerWidth - document.body.offsetWidth
      document.body.style.margin = `0px ${scrollBarWidth}px 0px 0px`
      document.body.style.overflow = 'hidden'

      return () => {
        document.body.style.margin = ``
        document.body.style.overflow = ''
        previouslyFocusedElement?.focus()
      }
    }
  }, [open])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      onClose()
    }

    if (event.key === 'Tab') {
      const focusableModalElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      const firstElement = focusableModalElements?.[0] as HTMLElement
      const lastElement = focusableModalElements?.[focusableModalElements.length - 1] as HTMLElement

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault()
          lastElement?.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault()
          firstElement?.focus()
        }
      }
    }
  }

  return (
    <CSSTransition
      in={isOpen}
      nodeRef={nodeRef}
      classNames="modal"
      timeout={300}
      unmountOnExit
      onEntered={() => setOpen(true)}
      onExited={() => setOpen(false)}
    >
      <div
        className={`fixed inset-0 flex justify-center bg-north-sea-90 w-full overflow-y-auto bg-opacity-80`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        ref={nodeRef}
        onKeyDown={handleKeyDown}
      >
        <div className="md:rounded-lg md:shadow-lg w-full md:w-[997px] md:mx-auto h-max md:my-24 relative">
          <div ref={modalRef} tabIndex={-1} className="bg-white-100 relative">
            <div className="flex justify-end sticky top-0 right-0 pt-8 md:pr-8 pr-4 bg-white">
              <button
                ref={closeButtonRef}
                className="text-gray-600 hover:text-gray-900"
                onClick={onClose}
                aria-label="Close modal"
              >
                <TransformableIcon iconData={add_circle_filled} className="rotate-45 md:scale-150" />
              </button>
            </div>
            <div className="md:pt-16 md:p-24 p-12">{children}</div>
          </div>
        </div>
      </div>
    </CSSTransition>
  )
}

export default Modal
