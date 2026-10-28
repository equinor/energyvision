// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import { defaultLanguage, languages } from '../../languageConfig';

/**
 * Converts ISO locale code (e.g., "en-GB") to locale code (e.g., "en")
 * Falls back to default language if not found
 */
export const getLocaleFromIso = (iso: string | undefined): string => {
  return (
    languages.find((lang) => lang.iso === iso)?.locale || defaultLanguage.locale
  );
};
