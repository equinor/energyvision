import { CopyIcon } from '@sanity/icons'
import { uuid } from '@sanity/uuid'
import { useCallback, useMemo, useState } from 'react'
import { filter, firstValueFrom } from 'rxjs'
import {
  type DocumentActionComponent,
  InsufficientPermissionsMessage,
  useClient,
  useCurrentUser,
  useDocumentOperation,
  useDocumentPairPermissions,
  useDocumentStore,
  useTranslation,
} from 'sanity'
import { useRouter } from 'sanity/router'

import { structureLocaleNamespace } from 'sanity/structure'
import { defaultLanguage } from '../languages'
import { useToast } from '@sanity/ui'
import { apiVersion } from '../sanity.client'
import { FIRST_PUBLISHED_AT_FIELD_NAME, LAST_MODIFIED_AT_FIELD_NAME, requiredCustomPublishFields } from './constants'

const DISABLED_REASON_KEY = {
  NOTHING_TO_DUPLICATE: 'action.duplicate.disabled.nothing-to-duplicate',
  NOT_READY: 'action.duplicate.disabled.not-ready',
}

export const CustomDuplicateAction: DocumentActionComponent = ({ id, draft, published, type, onComplete }) => {
  const documentStore = useDocumentStore()
  const { duplicate } = useDocumentOperation(id, type)
  const { navigateIntent } = useRouter()
  const [isDuplicating, setDuplicating] = useState(false)
  const [permissions, isPermissionsLoading] = useDocumentPairPermissions({
    id,
    type,
    permission: 'duplicate',
  })

  const { t } = useTranslation(structureLocaleNamespace)

  const currentUser = useCurrentUser()
  const client = useClient({ apiVersion: apiVersion })
  const toast = useToast()

  const handle = useCallback(async () => {
    const dupeId = uuid()
    const lang = draft?.lang || published?.lang
    if (lang && lang != defaultLanguage.name) {
      toast.push({
        duration: 7000,
        status: 'error',
        title: 'Cannot duplicate the translation.',
      })
      onComplete()
      return
    }

    setDuplicating(true)

    // set up the listener before executing
    const duplicateSuccess = firstValueFrom(
      documentStore.pair.operationEvents(id, type).pipe(filter((e) => e.op === 'duplicate' && e.type === 'success')),
    )
    duplicate.execute(dupeId)

    // only navigate to the duplicated document when the operation is successful
    await duplicateSuccess
    navigateIntent('edit', { id: dupeId, type })

    // clear the custom fields...
    if (requiredCustomPublishFields.includes(type)) {
      await client
        .patch(`drafts.${dupeId}`)
        .unset([LAST_MODIFIED_AT_FIELD_NAME, FIRST_PUBLISHED_AT_FIELD_NAME])
        .commit()
        .catch((e) => console.error(e))
    }

    onComplete()
  }, [documentStore.pair, duplicate, id, navigateIntent, onComplete, type, client, draft, published])

  return useMemo(() => {
    if (!isPermissionsLoading && !permissions?.granted) {
      return {
        icon: CopyIcon,
        disabled: true,
        label: t('action.duplicate.label'),
        title: InsufficientPermissionsMessage({ context: 'duplicate-document', currentUser: currentUser }),
      }
    }

    return {
      icon: CopyIcon,
      disabled: isDuplicating || Boolean(duplicate.disabled) || isPermissionsLoading,
      label: isDuplicating ? t('action.duplicate.running.label') : t('action.duplicate.label'),
      title: duplicate.disabled ? t(DISABLED_REASON_KEY[duplicate.disabled]) : '',
      onHandle: handle,
    }
  }, [currentUser, duplicate.disabled, handle, isDuplicating, isPermissionsLoading, permissions?.granted, t])
}
