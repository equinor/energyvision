import { getTranslations } from 'next-intl/server';
import { forwardRef } from 'react';
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaLinkedin,
  FaYoutube,
} from 'react-icons/fa';
import { SiX } from 'react-icons/si';
import { getIsoFromName } from '@/sanity/helpers/localization';
import type { LinkData } from '@/types';
import { ArrowRight } from '../../icons';
import { BaseLink } from './BaseLink';

function getSomeSvg(someType: SomeType) {
  const iconMap = {
    facebook: <FaFacebookSquare size={24} className="text-current" />, //<Facebook height={24} width={24} />,
    instagram: <FaInstagramSquare size={24} className="text-current" />, //<Instagram height={24} width={24} />,
    linkedin: <FaLinkedin size={24} className="text-current" />, //<Linkedin height={24} width={24} />,
    twitter: <SiX size={24} className="text-current" />, //<Twitter height={24} width={24} />,
    youtube: <FaYoutube size={24} className="text-current" />, //<Youtube height={24} width={24} />,
  };

  if (!(someType in iconMap))
    console.warn(
      'Unable to get social icon for footer: Unknown SoMe type passed',
    );
  return iconMap[someType] || null;
}

export type SomeType =
  | 'facebook'
  | 'instagram'
  | 'youtube'
  | 'twitter'
  | 'linkedin';

export type FooterLinkProps = {
  type: 'internalLink' | 'externalUrl';
  someType?: SomeType;
  href: string;
  label: string;
} & LinkData;

const FooterLink = forwardRef<HTMLAnchorElement, FooterLinkProps>(
  async ({ type, someType, label, link, href }, ref) => {
    const linkLocale = getIsoFromName(link?.lang);
    const isExternal =
      type === 'externalUrl' ||
      href?.startsWith('http') ||
      href?.toLowerCase().includes('.pdf');
    const target = isExternal ? '_blank' : undefined;
    const intl = await getTranslations();

    const icon =
      type === 'externalUrl' && someType ? getSomeSvg(someType) : null;

    return (
      <BaseLink
        ref={ref}
        href={href}
        hrefLang={linkLocale}
        target={target}
        type={type}
        className={`group flex min-h-11 min-w-11 items-center gap-1 text-sm no-underline hover:text-moss-green-90 hover:underline dark:hover:text-moss-green-90`}
      >
        {icon && (
          <span
            className="mr-1.5 size-6 text-white-100 leading-none dark:hover:text-white-100"
            aria-hidden={true}
          >
            {icon}
          </span>
        )}
        <span className="flex leading-none">{label}</span>
        {isExternal && (
          <ArrowRight
            aria-label={`${intl('externalLink')} arrow right icon`}
            className="size-5 -translate-y-0.5 rotate-[-50deg] transform text-gray-500 group-hover:text-moss-green-90"
          />
        )}
      </BaseLink>
    );
  },
);

export default FooterLink;
