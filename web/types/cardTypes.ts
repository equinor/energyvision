import type { PortableTextBlock } from '@portabletext/types';
import type { Figure, Image } from '@/core/Image/imageUtilities';
import type { HeroData, HeroTypes } from '@/sections/Hero/HeroBlock';
import type { LinkData } from './index';

export type CardTypes = 'news' | 'topics' | 'people' | 'events';

export type CardData = {
  type?: 'news' | 'topics' | 'localNews' | 'magazine';
  id: string;
  slug: string;
  title: string | PortableTextBlock[];
  publishDateTime?: string;
  heroImage: Figure;
  openGraphImage?: Image;
  ingress?: PortableTextBlock[];
  heroType?: HeroTypes;
  /** News only: show an "Updated" tag on the promotion image */
  showUpdatedTag?: boolean;
  /** News only: fallback ISO timestamp for the updated tag */
  updatedAt?: string;
  /** News only: ISO date and time shown together with the updated tag */
  customUpdatedTimestamp?: string;
};

export type MagazineCardData = {
  id?: string;
  slug: string;
  title: string | PortableTextBlock[];
  firstPublishedAt?: string;
  publishDateTime?: string;
  hero?: HeroData;
};

export type PeopleCardData = {
  type?: 'people';
  id: string;
  image?: Image;
  name: string;
  title?: string;
  department?: string;
  email?: string;
  phone?: string;
  isLink: boolean;
  cv?: LinkData;
  enableStructuredMarkup?: boolean;
};
