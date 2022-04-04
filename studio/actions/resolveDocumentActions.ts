// eslint-disable-next-line import/no-unresolved
import defaultResolve, { PublishAction } from 'part:@sanity/base/document-actions'
import { ConfirmPublishAction } from './ConfirmPublish'

export default function resolveDocumentActions(props: any) {
  // Replace default actions inside map() or add additional actions to return array
  return [...defaultResolve(props).map((Action: any) => (Action === PublishAction ? ConfirmPublishAction : Action))]
}
