'use client';
import { useLocale, useTranslations } from 'next-intl';
import type { HTMLAttributes } from 'react';
import type { HeaderData } from '@/contexts/pageContext';
import { defaultLanguage, languages } from '@/languageConfig';
import { twMerge } from '@/lib/twMerge/twMerge';
import type { LocaleSlug } from '@/sanity/pages/utils';
import ButtonLink from '../Link/ButtonLink';

export type LocalizationSwitchProps = {
  headerData: HeaderData | undefined;
} & HTMLAttributes<HTMLUListElement>;

export const LocalizationSwitch = ({ headerData }: LocalizationSwitchProps) => {
  const intl = useTranslations();
  const locale = useLocale();
  const { slugs, currentSlug } = headerData || { slugs: [] };
  const activeLocale = locale ?? defaultLanguage.iso;

  if (slugs.length < 1 && !currentSlug) return null;

  function SwitchItem({
    obj,
    language,
  }: {
    obj: LocaleSlug;
    language: any;
  }): JSX.Element {
    return (
      <ButtonLink
        variant="ghost"
        href={obj.slug}
        hrefLang={`${language?.iso}`}
        aria-current={activeLocale === String(language?.iso) ? 'true' : 'false'}
        className={` ${activeLocale === String(language?.iso) ? 'hidden md:block' : ''} flex flex-col items-stretch gap-0 px-2 text-xs`}
      >
        <span className="sr-only"> {language?.title}</span>
        <span
          aria-hidden
          className={twMerge(
            `uppercase`,
            activeLocale === String(language?.iso)
              ? 'font-semibold'
              : 'font-normal',
          )}
        >
          {language?.iso === 'en-GB' ? 'en' : language?.locale}
        </span>
      </ButtonLink>
    );
  }

  {
    /** Case for page with no translations  */
  }
  if (slugs.length === 0 && currentSlug) {
    const language = languages.find((lang) => lang.iso === currentSlug.lang);
    return (
      <div className="flex flex-col items-stretch gap-0 px-2 text-xs">
        <span className="sr-only">
          {`${intl('current_language') ?? 'current language'}: ${language?.title}`}
        </span>
        <span aria-hidden className="font-semibold uppercase">
          {language?.iso === 'en-GB' ? 'en' : language?.locale}
        </span>
      </div>
    );
  }

  return (
    <nav aria-label={intl('choose_language') ?? 'Choose language'}>
      <ul className="flex items-center md:divide-x md:divide-dashed md:divide-gray-400">
        {slugs
          .sort(
            (a, b) =>
              Number(b.lang === defaultLanguage.iso) -
              Number(a.lang === defaultLanguage.iso),
          )
          .map((obj) => {
            const language = languages.find((lang) => lang.iso === obj.lang);
            return (
              <li
                className={twMerge(
                  `flex items-center`,
                  activeLocale === String(language?.locale) &&
                    'hidden md:block',
                )}
                key={obj.lang}
              >
                <SwitchItem obj={obj} language={language} />
              </li>
            );
          })}
      </ul>
    </nav>
  );
};
