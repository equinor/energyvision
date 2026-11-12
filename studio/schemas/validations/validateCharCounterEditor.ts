import { toPlainText } from '@portabletext/react';
import type { PortableTextBlock } from 'sanity';

export const validateCharCounterEditor = (
  value: PortableTextBlock[],
  charLimit: number,
  allowZeroLength = false,
) => {
  if (!value || (value.length === 0 && !allowZeroLength)) {
    return allowZeroLength ? true : 'Required';
  }

  const plainText = toPlainText(value);
  const hasText = plainText.trim().length > 0;

  if (!hasText && !allowZeroLength) return 'Required';

  if (plainText.length > charLimit) {
    return `The introduction should be no longer than ${charLimit} characters. Currently ${plainText.length} characters long.`;
  }

  return true;
};
