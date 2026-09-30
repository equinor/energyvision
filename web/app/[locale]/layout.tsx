import '../globals.css';
import { GoogleTagManager } from '@next/third-parties/google';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { draftMode, headers } from 'next/headers';
import NextLink from 'next/link';
import Script from 'next/script';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getTranslations } from 'next-intl/server';
import { PageProvider } from '@/contexts/pageContext';
import { getValidLanguagesLocales } from '@/languageConfig';
import { crawlableDomains } from '@/lib/helpers/domainHelpers';
import {
  getLocaleFromIso,
  getNameFromIso,
} from '@/sanity/helpers/localization';
import { dataset } from '@/sanity/lib/api';
import { IS_FETCH_OPTIMIZED, routeSanityFetch } from '@/sanity/lib/fetch';
import { getDynamicFetchOptions, SanityLive } from '@/sanity/lib/live';
import { footerAndErrorImageQuery } from '@/sanity/queries/footer';
import Footer from '@/sections/Footer/Footer';
import GoToTopButton from '@/sections/GoToTopButton';
import { SiteImprove } from './SiteImprove';

const equinor = localFont({
  src: [
    { path: '../fonts/equinor/Equinor-Regular.woff' },
    { path: '../fonts/equinor/EquinorVariable-VF.woff' },
    { path: '../fonts/equinor/EquinorVariable-VF.woff2' },
  ],
});

// Keep everything except crawlable production domains out of search engines.
export async function generateMetadata(): Promise<Metadata> {
  const host = String((await headers()).get('host'));
  const isCrawlable =
    process.env.RADIX_ENVIRONMENT === 'prod' && crawlableDomains.includes(host);

  return isCrawlable
    ? {}
    : {
        robots: {
          index: false,
          // Allows search engines to follow links on the page, but not index it
          follow: true,
        },
      };
}

//the [locale] segment corresponds to the locale (iso format), not the prefix(/no).
export function generateStaticParams() {
  return getValidLanguagesLocales().map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
}: LayoutProps<'/[locale]'>) {
  const t = await getTranslations();
  const locale = await getLocale();

  const isPreview = (await draftMode()).isEnabled;
  const dynamic = await getDynamicFetchOptions({}); // cannot read searchParams here, so footer will have draft version always in draft mode with published perspective
  const googleTagManagerId = process.env['NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID'];

  return (
    <html lang={locale} className={`${equinor.className} `}>
      <body className="min-h-screen has-data-no-sticky:pt-topbar">
        {!isPreview && (
          // cookiebot script must strictly be inside body.
          <Script
            src="https://consent.cookiebot.com/uc.js"
            id="Cookiebot"
            strategy="beforeInteractive"
            data-cbid="f1327b03-7951-45da-a2fd-9181babc783f"
            data-blockingmode="auto"
            data-culture={locale === 'nb-NO' ? 'nb' : getLocaleFromIso(locale)}
          />
        )}

        <NextLink
          href="#mainTitle"
          className="sr-only bg-moss-green-50 text-sm transition focus:not-sr-only focus:flex focus:w-full focus:items-center focus:justify-center focus:p-4 focus:underline"
        >
          {t('skipToContent') ?? 'Skip to main content'}
        </NextLink>
        {!IS_FETCH_OPTIMIZED && <SanityLive />}
        {/* Preview link is sent to stakeholders dont show draft toolbar, only use if needed in local development
        Must first filter all conditional rendering props in the page content, otherwise the visual editing will not work correctly inside presentation tool. This is a big job and will be done later. For now, we will not render the visual editing inside the presentation tool. 
        */}
        {/*      {isPreview && (
          <>
            <DraftModeToolbar />
            <ConditionalVisualEditing />
          </>
        )} */}
        <NextIntlClientProvider>
          <CachedContent dynamic={dynamic}>{children}</CachedContent>
          {/* } <PageProvider initialErrorImage={errorImage}>{children}</PageProvider>
          <Footer {...footerData} />
          <GoToTopButton /> */}
        </NextIntlClientProvider>
      </body>
      {/** TODO look into scripts */}
      {!(isPreview || dataset === 'global-development') && (
        <>
          {googleTagManagerId && (
            //https://nextjs.org/docs/app/guides/third-party-libraries#google-third-parties
            <GoogleTagManager gtmId={googleTagManagerId} />
          )}
          <SiteImprove />
        </>
      )}
    </html>
  );
}

async function CachedContent({
  dynamic,
  children,
}: {
  dynamic: Awaited<ReturnType<typeof getDynamicFetchOptions>>;
  children: React.ReactNode;
}) {
  'use cache: remote';
  const locale = await getLocale();
  const queryParams = {
    lang: getNameFromIso(locale) ?? 'en_GB',
  };

  const { data: footerAndErrorImageData }: { data: any } =
    await routeSanityFetch({
      query: footerAndErrorImageQuery,
      params: queryParams,
      tags: [`footer:${locale}`],
      requestTag: 'footer-and-error-image',
      ...dynamic,
    });

  const { errorImage, ...footerData } = footerAndErrorImageData || {};
  return (
    <>
      <PageProvider initialErrorImage={errorImage}>{children}</PageProvider>
      <Footer {...footerData} />
      <GoToTopButton />
    </>
  );
}
