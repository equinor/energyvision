import { defaultLanguage, languages } from '../../languages';

/**
 * Route document types keep their original names, e.g. en-GB → route_en_GB.
 * Use the route `lang` field for language filtering instead of the type name.
 */
export const getRouteType = (iso: string): string =>
  `route_${iso.replace('-', '_')}`;

export const getLocaleFromName = (iso: string | undefined): string =>
  languages.find((lang) => lang.iso === iso)?.locale || defaultLanguage.locale;

export const getIdFromName = (iso: string | undefined): string =>
  languages.find((lang) => lang.iso === iso)?.id || defaultLanguage.id;
