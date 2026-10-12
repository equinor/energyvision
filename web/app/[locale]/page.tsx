import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { connection } from 'next/server';
import { getLocale } from 'next-intl/server';
import { stegaClean } from 'next-sanity';
import { OrganizationJsonLd } from 'next-seo';
import { Suspense } from 'react';
import { getValidLanguagesLocales } from '@/languageConfig';
import { Flags } from '@/sanity/helpers/datasetHelpers';
import { getNameFromIso } from '@/sanity/helpers/localization';
import { routeSanityFetch, sanityFetchMetadata } from '@/sanity/lib/fetch';
import { getDynamicFetchOptions } from '@/sanity/lib/live';
import { constructSanityMetadata, getPage } from '@/sanity/pages/utils';
import { menuQuery as globalMenuQuery } from '@/sanity/queries/menu';
import { homePageMetaQuery } from '@/sanity/queries/metaData';
import { simpleMenuQuery } from '@/sanity/queries/simpleMenu';
import Header from '@/sections/Header/Header';
import LoadingPage from '@/sections/LoadingPage/LoadingPage';
import HomePage from '@/templates/homepage/HomePage';
import { FriendlyCaptchaSdkWrapper } from './FriendlyCaptchaWrapper';

export function generateStaticParams() {
  return getValidLanguagesLocales().map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { data: metaData }: { data: any } = await sanityFetchMetadata({
    query: homePageMetaQuery,
    params: {
      lang: getNameFromIso(locale),
    },
    perspective: 'published',
  });

  return constructSanityMetadata('', locale, metaData);
}

async function DynamicMetadataMarker() {
  return (
    <Suspense>
      <MetadataConnection />
    </Suspense>
  );
}

async function MetadataConnection() {
  await connection();
  return null;
}

// Layer 1: branches on draft mode without awaiting any other dynamic API,
// so the published route still prerenders into the static shell.
export default async function Home({ searchParams }: PageProps<'/[locale]'>) {
  const { isEnabled: isDraftMode } = await draftMode();
  if (!isDraftMode) {
    return (
      <>
        <DynamicMetadataMarker />
        <CachedHome dynamic={{ perspective: 'published', stega: false }} />
      </>
    );
  }

  return (
    <>
      <DynamicMetadataMarker />
      <Suspense fallback={<LoadingPage homepage />}>
        <DynamicHome searchParams={searchParams} />
      </Suspense>
    </>
  );
}

async function DynamicHome({
  searchParams,
}: Pick<PageProps<'/[locale]'>, 'searchParams'>) {
  const resolvedSearchParams = await searchParams;
  const dynamic = await getDynamicFetchOptions(resolvedSearchParams);

  return <CachedHome dynamic={dynamic} />;
}

// Layer 3: fetches through the existing draft-aware/cached `routeSanityFetch`/`getPage`.
async function CachedHome({
  dynamic,
}: {
  dynamic: Awaited<ReturnType<typeof getDynamicFetchOptions>>;
}) {
  'use cache: remote';
  const locale = await getLocale();

  const [siteMenuResult, homePageData] = await Promise.all([
    routeSanityFetch({
      query: Flags.HAS_FANCY_MENU ? globalMenuQuery : simpleMenuQuery,
      params: {
        lang: getNameFromIso(locale) ?? 'en_GB',
      },
      tags: [`siteMenu:${locale}`],
      requestTag: 'site-menu',
      ...dynamic,
    }),
    getPage({
      slug: '',
      locale,
      tags: [`homePage:${locale}`],
      ...dynamic,
    }),
  ]);

  const pageContent = dynamic.stega ? stegaClean(homePageData) : homePageData;

  const { headerData, pageData } = pageContent;
  const { data: siteMenuData } = siteMenuResult || {};

  if (!pageData) notFound();

  const template = pageData?.template || null;

  if (!template) console.warn('Missing homepage template', pageData?.slug);

  return (
    <FriendlyCaptchaSdkWrapper>
      <Header siteMenuData={siteMenuData} headerData={headerData} />
      <OrganizationJsonLd
        name="Equinor ASA"
        url="https://www.equinor.com"
        logo="https://cdn.eds.equinor.com/logo/equinor-logo-horizontal.svg#red"
        description={pageData?.seoAndSome?.metaDescription}
        sameAs={[
          'https://twitter.com/Equinor',
          'https://facebook.com/Equinor',
          'https://linkedin.com/company/equinor',
          'https://www.instagram.com/equinor/',
          'https://www.youtube.com/equinor',
        ]}
      />
      <HomePage headerData={headerData} {...pageData} />
    </FriendlyCaptchaSdkWrapper>
  );
}
