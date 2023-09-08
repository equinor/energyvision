import { defineField } from 'sanity'

export const lang = defineField({
  // should match 'languageField' plugin configuration setting, if customized
  name: 'lang', // should match languageFiled value in i18n documentTranslation.js
  type: 'string',
  readOnly: true,
  hidden: true,
  validation: (Rule) => Rule.required().error('Please select the language for this document'),
})
