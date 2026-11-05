import { defaultLanguage } from '@/languageConfig';
import { getLocaleFromIso } from '@/sanity/helpers/localization';
import type { LinkData } from '../../types/index';

export const getUrlFromAction = ({
  link,
  href = '',
  type,
  fileName,
  anchorReference,
}: LinkData): string | undefined => {
  if (!type && !href) return undefined;

  const anchor = anchorReference ? `#${anchorReference}` : '';
  const locale =
    link?.lang !== defaultLanguage.iso
      ? `/${getLocaleFromIso(link?.lang)}`
      : '';

  if (type === 'internalUrl') {
    if (!link?.slug) {
      console.warn('Missing slug in action:', fileName);
    }
    return locale + link?.slug + anchor || '';
  }

  if (type === 'anchorLink') {
    return href && href !== '#' ? href : anchor ? anchor : undefined;
  }

  if (!href && type !== 'downloadableFile' && type !== 'downloadableImage') {
    console.warn('Missing external url in action:', fileName, type);
  }

  return href + anchor || '/';
};
