import { EnvelopeIcon } from '@sanity/icons/Envelope';
import { useToast } from '@sanity/ui/toast';
import { useCallback, useState } from 'react';
import {
  type DocumentActionComponent,
  type DocumentActionConfirmDialogProps,
  useClient,
} from 'sanity';
import { apiVersion } from '../sanity.client';
import { NEWSLETTER_RESENT_AT_FIELD_NAME } from '../schemas/documents/news/sharedNewsFields';

/**
 * Stamps `newsletterResentAt` on an already published news article. The web
 * newsletter RSS feed uses that timestamp as the item's pubDate so Make
 * picks up the article again.
 *
 * Role, dataset and draft/published filtering happens in `sanity.config.tsx`.
 */
export const ResendNewsletterAction: DocumentActionComponent = (props) => {
  const { id, published, onComplete } = props;
  const [isDialogOpen, setDialogOpen] = useState(false);
  const toast = useToast();
  const client = useClient({ apiVersion });

  const onCancel = useCallback(() => {
    setDialogOpen(false);
    onComplete();
  }, [onComplete]);

  const onConfirm = useCallback(() => {
    client
      .patch(id)
      .set({ [NEWSLETTER_RESENT_AT_FIELD_NAME]: new Date().toISOString() })
      .commit()
      .then(() => {
        toast.push({
          status: 'success',
          title: 'Newsletter resend triggered',
          description: 'The article will be included in the next newsletter.',
        });
      })
      .catch((err: Error) => {
        toast.push({
          status: 'error',
          title: 'Failed to trigger newsletter resend',
          description: err.message,
        });
      })
      .finally(() => {
        setDialogOpen(false);
        onComplete();
      });
  }, [client, id, toast, onComplete]);

  if (!published) {
    return null;
  }

  const disabledReason = published.subscriptionType
    ? undefined
    : 'The article needs a newsletter subscription type before it can be resent';

  return {
    label: 'Resend newsletter…',
    icon: EnvelopeIcon,
    disabled: Boolean(disabledReason),
    title: disabledReason,
    onHandle: () => setDialogOpen(true),
    dialog:
      isDialogOpen &&
      ({
        type: 'confirm',
        tone: 'caution',
        message:
          'This will send the article to newsletter subscribers again. Are you sure you want to resend the newsletter?',
        onCancel,
        onConfirm,
      } as DocumentActionConfirmDialogProps),
  };
};
