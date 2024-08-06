import { defineField } from 'sanity'
import LangInput from '../components/LangInput'

export const lang = defineField({
  title: 'Language',
  // should match 'languageField' plugin configuration setting, if customized
  name: 'lang', // should match languageFiled value in i18n documentTranslation.js
  type: 'string',
  // readOnly: true, // donot make it read only.. as this will prevent lang field from writing..
  hidden: false,
  components: {
    input: LangInput,
  },
  validation: (Rule) => Rule.required().error('Please select the language for this document'),
})
