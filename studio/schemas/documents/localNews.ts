import SlugInput from '../components/SlugInput/index'
import { isUniqueWithinLocale } from '../validations/isUniqueWithinLocale'
import { newsSlug } from '../../../satellitesConfig.js'
import { defaultLanguage } from '../../languages'
import slugify from 'slugify'
import News from './news'
// eslint-disable-next-line import/no-unresolved
import client from 'part:@sanity/base/client'
import type { Rule, CurrentUser } from '@sanity/types'

const localNews = {
  title: 'Local news',
  name: 'localNews',
  // temporary restriction
  readOnly: ({ currentUser }: { currentUser: CurrentUser }) =>
    !currentUser.roles.find((role) => ['administrator'].includes(role.name)),
}

const fieldsToRemove = ['subscriptionType', 'slug']
const fields = News.fields.filter((field: any) => !fieldsToRemove.includes(field.name))

const localNewsFields = [
  {
    title: 'Local market tag',
    name: 'localNewsTag',
    type: 'array',
    description: 'Select which local market this article belongs to.',
    fieldset: 'slug',
    options: {
      disableNew: true,
    },
    of: [
      {
        type: 'reference',
        title: 'Local news tag',
        to: [{ type: 'localNewsTag' }],
      },
    ],
    validation: (Rule: Rule) => Rule.required().min(1).max(1),
  },
  {
    name: 'slug',
    title: 'Slug',
    type: 'slug',
    fieldset: 'slug',
    inputComponent: SlugInput,
    options: {
      isUnique: isUniqueWithinLocale,
      source: async (doc: any) => {
        // translated document ids end with _i18n__lang while base documents don't
        const lastFiveCharacters = doc._id.slice(-5)
        const translatedNews = newsSlug[lastFiveCharacters] || newsSlug[defaultLanguage.name]

        const localNewsTag = await client.fetch(`*[_id == $id && _type == 'localNewsTag'][0]`, {
          id: doc.localNewsTag[0]._ref,
        })
        const localNewsPath = localNewsTag[lastFiveCharacters] || localNewsTag[defaultLanguage.name]

        return doc.newsSlug ? `/${translatedNews}/${localNewsPath}/${slugify(doc.newsSlug, { lower: true })}` : ''
      },
      slugify: (value: string) => value,
    },
    description: '⚠️ Double check for typos and get it right on the first time! ⚠️',
    validation: (Rule: Rule) => Rule.required(),
  },
]

export default {
  ...News,
  ...localNews,
  fields: [...fields, ...localNewsFields],
}
