import {
  DocumentInternationalizationMenu,
  DocumentInternationalizationMenuProps,
} from '@sanity/document-internationalization'

import { useEffect, useRef } from 'react'
import { Role, useCurrentUser } from 'sanity'

export default function CustomDocumentInternationalizationMenu(props: DocumentInternationalizationMenuProps) {
  const parentRef = useRef(null)
  // Get current user
  const currentUser = useCurrentUser()

  const enableManageTranslation = currentUser?.roles.some((role: Role) =>
    ['administrator', 'developer'].includes(role.name),
  )
  useEffect(() => {
    if (parentRef.current) {
      const targetNode = document.querySelector('[data-portal]')
      // Create a MutationObserver instance
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList') {
            const buttons = targetNode?.querySelectorAll('button')
            if (buttons && buttons?.length > 1 && buttons[0].innerText == 'Manage Translations') {
              buttons[0].disabled = !enableManageTranslation || true
              buttons[0].setAttribute('data-disabled', enableManageTranslation ? 'false' : 'true')
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
  }, [])
  return <div ref={parentRef}>{DocumentInternationalizationMenu(props)}</div>
}
