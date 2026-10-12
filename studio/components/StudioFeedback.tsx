import { Card, Stack, Text } from '@sanity/ui';

type StudioFeedbackProps = {
  className?: string;
  message?: string;
  title?: string;
  tone?: 'critical' | 'primary';
};

export function StudioFeedback({
  className,
  message,
  title,
  tone = 'primary',
}: StudioFeedbackProps) {
  return (
    <Card
      className={className}
      border
      padding={4}
      radius={3}
      role={tone === 'critical' ? 'alert' : 'status'}
      tone={tone}
    >
      <Stack gap={3}>
        {title && <Text weight="semibold">{title}</Text>}
        {message && <Text size={2}>{message}</Text>}
      </Stack>
    </Card>
  );
}
