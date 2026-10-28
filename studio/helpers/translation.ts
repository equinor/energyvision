import { defineField } from 'sanity';
import { defaultLanguage, languages } from '../languages';

export type TranslationValue = {
  _key: string;
  _type?: string;
  language?: string;
  value?: string;
};

export const getTranslation = (
  translations: TranslationValue[] | undefined,
  iso: string = defaultLanguage.iso,
) => translations?.find((it) => it.language === iso)?.value;

export const createTranslations = (
  getValue: (iso: string) => string | undefined,
  createKey: () => string,
): TranslationValue[] =>
  languages.map(({ iso }) => ({
    _key: createKey(),
    _type: 'internationalizedArrayStringValue',
    language: iso,
    value: getValue(iso),
  }));

type TranslationFieldOptions = {
  required?: boolean;
  fieldset?: string;
};

export const translationField = ({
  required = false,
  fieldset,
}: TranslationFieldOptions = {}) =>
  defineField({
    name: 'translation',
    title: 'Translation',
    type: 'internationalizedArrayString',
    fieldset,
    validation: required
      ? (Rule) =>
          Rule.custom((value: TranslationValue[] | undefined) => {
            const missing = languages.filter(
              ({ iso }) => !getTranslation(value, iso)?.trim(),
            );
            return (
              missing.length === 0 ||
              `Missing translation for ${missing.map((it) => it.title).join(', ')}`
            );
          })
      : undefined,
  });
