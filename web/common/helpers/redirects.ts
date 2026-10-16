import { sanityFetch } from '@/sanity/lib/live';
import { externalRedirects, redirects } from '@/sanity/queries/redirects';

export const getRedirectUrl = async (slug: string, locale: string) => {
  const { data }: { data: any } = await sanityFetch({
    query: redirects,
    params: {
      slug: slug,
      slugWithLocale: `/${locale}${slug}`,
    },
  });
  return data;
};

export const getExternalRedirectUrl = async (slug: string, locale: string) => {
  const { data }: { data: any } = await sanityFetch({
    query: externalRedirects,
    params: {
      slug: slug,
      slugWithLocale: `/${locale}${slug}`,
    },
  });
  return data;
};

export const getWWWRedirect = (
  requestLocale: string,
  host: string,
  pathname: string,
): string | undefined => {
  if (!host.includes('www')) {
    return `https://www.${host}/${requestLocale}${pathname}`;
  }
  return undefined;
};
