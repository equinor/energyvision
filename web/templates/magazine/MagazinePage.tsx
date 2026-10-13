'use client';
import { magazineSlug } from '@energyvision/shared/satelliteConfig';
import { calendar } from '@equinor/eds-icons';
import { useLocale, useTranslations } from 'next-intl';
import type { PortableTextBlock } from 'next-sanity';
import FormattedDateTime from '@/core/FormattedDateTime/FormattedDateTime';
import Link from '@/core/Link/Link';
import TransformableIcon from '@/icons/TransformableIcon';
import { defaultLanguage } from '@/languageConfig';
import { twMerge } from '@/lib/twMerge/twMerge';
import {
  getLocaleFromIso,
  getNameFromIso,
} from '@/sanity/helpers/localization';
import {
  HeroBlock,
  type HeroBlockProps,
  type HeroData,
  HeroTypes,
} from '@/sections/Hero/HeroBlock';
import type { MagazineTag } from '@/sections/MagazineTags/MagazineTagBar';
import Teaser, { type TeaserData } from '@/sections/teasers/Teaser/Teaser';
import type { ContentType } from '@/types/index';
import { PageContent } from '../shared/SharedPageContent';

type MagazinePageProps = {
  magazineTags?: MagazineTag[];
  tags?: string[];
  footerComponent?: {
    data?: TeaserData;
  };
  title: PortableTextBlock[];
  content?: ContentType[];
  hero: HeroData;
  firstPublishedAt?: string;
  hideFooterComponent?: boolean;
};

const MagazinePage = ({
  hideFooterComponent,
  footerComponent,
  hero,
  title,
  firstPublishedAt,
  tags,
  magazineTags,
  content,
}: MagazinePageProps) => {
  const type = hero?.type || HeroTypes.DEFAULT;
  const locale = useLocale();
  const intl = useTranslations();
  const localeName = getNameFromIso(locale);
  const magazineIndexSlug = magazineSlug[localeName];
  const localePrefix =
    locale === defaultLanguage.iso ? '' : `/${getLocaleFromIso(locale)}`;
  const magazineIndexHref = magazineIndexSlug
    ? `${localePrefix}/${magazineIndexSlug}`
    : undefined;
  const translatedExploreTopics = intl('magazine_explore_topics');
  const exploreTopicsTitle =
    !translatedExploreTopics ||
    translatedExploreTopics === 'magazine_explore_topics'
      ? locale === 'nb-NO'
        ? 'Utforsk temaene våre'
        : 'Explore our topics'
      : translatedExploreTopics;
  const magazineTagLinkClassName =
    'focus-visible:envis-outline whitespace-nowrap rounded-full bg-moss-green-50 px-4 py-2 font-medium text-slate-80 text-sm no-underline hover:bg-moss-green-60 hover:text-slate-80 hover:underline focus:outline-hidden lg:text-xs';

  const subTitle = (
    <>
      <div
        className={twMerge(
          `flex flex-col gap-6 pb-10`,
          type === HeroTypes.FULL_WIDTH_IMAGE && 'px-layout-sm lg:px-layout-lg',
        )}
      >
        {firstPublishedAt && (
          <div className="flex items-center gap-2">
            <TransformableIcon iconData={calendar} className="-mt-1" />
            <FormattedDateTime
              variant="datetime"
              datetime={firstPublishedAt}
              className="text-base"
            />
          </div>
        )}
        {tags && tags?.filter((e) => e).length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {tags.map((tag) => {
              const matchedTag = magazineTags?.find(
                (magazineTag) => magazineTag.title === tag,
              );
              const href =
                matchedTag && magazineIndexHref
                  ? `${magazineIndexHref}?tag=${encodeURIComponent(matchedTag.key)}`
                  : undefined;

              return (
                <li key={`magazine_tag_key_${tag}`}>
                  {href ? (
                    <Link href={href} className={magazineTagLinkClassName}>
                      {tag}
                    </Link>
                  ) : (
                    <span className="whitespace-nowrap rounded-full bg-moss-green-50 px-3 py-1 font-medium text-slate-80 text-sm lg:text-xs">
                      {tag}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );

  const heroBlockProps: HeroBlockProps = {
    heroData: {
      //@ts-ignore: todo
      title,
      ...hero,
      //@ts-ignore
      //magazineTags,
      figCaptionClassName: 'hidden',
      subTitle: subTitle,
    },
    //@ts-ignore
    //tags,
    //@ts-ignore
    nextSectionDesignOptions: content?.[0]?.designOptions,
  };

  const heroProps = {
    background:
      hero.type !== HeroTypes.DEFAULT
        ? //@ts-ignore
          content?.[0]?.designOptions.background
        : hero?.background,
    heroType: hero?.type,
    heroHasBreadcrumbs: false,
  };

  return (
    <main className="mx-auto flex w-full max-w-fullwidth flex-col">
      <HeroBlock {...heroBlockProps} />
      <PageContent
        data={{
          content,
        }}
        heroProps={heroProps}
      />
      {magazineTags && magazineTags.length > 0 && magazineIndexHref && (
        <section className="mx-auto w-full max-w-content px-layout-sm pb-12 lg:px-layout-lg">
          <h2 className="mb-6 font-medium text-xl">{exploreTopicsTitle}</h2>
          <ul className="flex flex-wrap gap-2">
            {magazineTags.map((tag) => (
              <li key={tag.id}>
                <Link
                  href={`${magazineIndexHref}?tag=${encodeURIComponent(tag.key)}`}
                  className={magazineTagLinkClassName}
                >
                  {tag.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
      {!hideFooterComponent && footerComponent?.data && (
        <Teaser data={footerComponent.data} />
      )}
    </main>
  );
};

export default MagazinePage;
