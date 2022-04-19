/* eslint-disable import/no-unresolved */
import {
  PublishWithi18nAction,
  DeleteWithi18nAction,
  DuplicateWithi18nAction,
} from '@sanity/document-internationalization/lib/actions'
import defaultResolve, { PublishAction } from 'part:@sanity/base/document-actions'
import { DuplicateToAction } from '@sanity/cross-dataset-duplicator'
import config from 'config:@sanity/cross-dataset-duplicator'
import { IS_SECRET } from '../src/lib/datasetHelpers'
import { ConfirmPublishWithi18nAction } from './ConfirmPublishWithi18n'

export default function resolveDocumentActions(props: any) {
  const defaults = defaultResolve(props).map((Action: any) =>
    Action === PublishAction ? ConfirmPublishWithi18nAction : Action,
  )
  const defaultActions = [...defaults, PublishWithi18nAction, DeleteWithi18nAction, DuplicateWithi18nAction]

  // This will look through the "types" array in your migration.json config file
  // If the type of this document is found in that array, the Migrate Action will show
  if (IS_SECRET && config?.types?.length && config.types.includes(props.type)) {
    return [...defaultActions, DuplicateToAction]
  }

  // ...all your other document action code
  return defaultActions
}
