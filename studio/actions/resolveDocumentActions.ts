/* eslint-disable import/no-unresolved */
import defaultResolve from 'part:@sanity/base/document-actions'
import { DuplicateToAction } from '@sanity/cross-dataset-duplicator'
import config from 'config:@sanity/cross-dataset-duplicator'
import { IS_SECRET } from '../src/lib/datasetHelpers'

/*
export default function resolveDocumentActions(props: any) {
  // Replace default actions inside map() or add additional actions to return array
  return [
    ...defaultResolve(props).map((Action: any) => {
      return Action === PublishAction ? () => ConfirmPublishAction(props, Action) : Action
    }),
  ]
}
*/

export default function resolveDocumentActions(props: any) {
  const defaultActions = defaultResolve(props)
  // This will look through the "types" array in your migration.json config file
  // If the type of this document is found in that array, the Migrate Action will show
  if (IS_SECRET && config?.types?.length && config.types.includes(props.type)) {
    return [...defaultActions, DuplicateToAction]
  }

  // ...all your other document action code
  return defaultActions
}
