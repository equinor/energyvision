import {
  DocumentInternationalizationMenu,
  type DocumentInternationalizationMenuProps,
} from '@sanity/document-internationalization'

import { useEffect, useRef } from 'react'
import { useCurrentUser } from 'sanity'

export default function CustomDocumentInternationalizationMenu(
  props: DocumentInternationalizationMenuProps,
) {
  const parentRef = useRef(null)
  //@ts-ignore
  const { roles } = useCurrentUser()
  const enableManageTranslation =
    roles.some(
      (role: any) =>
        role?.name === 'administrator' || role?.name === 'developer',
    ) ?? false

  useEffect(() => {
    if (parentRef.current) {
      const targetNode = document.querySelector('[data-portal]')
      // Create a MutationObserver instance
      const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          if (mutation.type === 'childList') {
            const buttons = targetNode?.querySelectorAll('button')
            const translateButton =
              buttons &&
              Array.from(buttons)?.find(
                (button: any) => button.innerText === 'Manage Translations',
              )

            if (translateButton) {
              translateButton.disabled = !enableManageTranslation
              translateButton.setAttribute(
                'data-disabled',
                enableManageTranslation ? 'false' : 'true',
              )
              translateButton.style.display = enableManageTranslation
                ? 'block'
                : 'none'
            }
          }
        })
      })

      if (targetNode)
        // Start observing the target element
        observer.observe(targetNode, {
          childList: true, // Watch for text/content changes
        })
    }
  }, [enableManageTranslation])
  return <div ref={parentRef}>{DocumentInternationalizationMenu(props)}</div>
}
