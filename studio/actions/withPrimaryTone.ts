import type {
  DocumentActionComponent,
  DocumentActionDescription,
  DocumentActionProps,
} from 'sanity';

/**
 * Sanity's publish action reports `tone: 'default'`, which the themer renders in the
 * text colour. Override it so the publish button uses the accent (primary) colour.
 */
export function withPrimaryTone(originalAction: DocumentActionComponent) {
  const PrimaryToneAction = (props: DocumentActionProps) => {
    const originalResult = originalAction(
      props,
    ) as DocumentActionDescription | null;
    // Keep null so an inapplicable action stays hidden instead of rendering an empty button
    if (!originalResult) return originalResult;
    return { ...originalResult, tone: 'primary' as const };
  };
  PrimaryToneAction.action = originalAction.action;
  return PrimaryToneAction as DocumentActionComponent;
}
