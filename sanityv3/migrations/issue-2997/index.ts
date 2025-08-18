import { at, defineMigration, JsonArray, JsonObject, set, setIfMissing, unset } from 'sanity/migrate'
import { defaultColors } from '../../schemas/defaultColors'
import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('1234567890abcdef', 12)

const specialCases = ['teaser', 'table', 'tabs', 'fullWidthImage', 'grid', 'fullWidthVideo', 'campaignBanner']

export default defineMigration({
  title: 'Issue 2997',
  documentTypes: ['page', 'magazine', 'homePage'],

  migrate: {
    object(node, path, _) {
      if (node._type === 'cardsList' && node.background) {
        // rename background to cardBackground.. and remove everything except key and _type..
        const { _type, title } = node.background as JsonObject
        const value = { _type, key: defaultColors.find((it) => it.title == title)?.key }
        return [at(['background'], unset()), at(['cardBackground'], set(value))]
      }
      if (node._type == 'textBlock') {
        const background = (node as JsonObject)?.background as JsonObject
        const backgroundTitle = background?.title
        if (backgroundTitle && !node.designOptions) {
          if (backgroundTitle === 'White') {
            // if background is white or undefined clear background...
            return at(['background'], unset()) // unset deprecated field
          }
          var utility = defaultColors.find((color) => color.title == backgroundTitle)?.key

          if (!utility) {
            if (backgroundTitle == 'Slate Blue') utility = 'mid-blue'
            else if (backgroundTitle == 'Moss Green') utility = 'mid-green'
            console.error(
              'Cannot find key for color ' +
                JSON.stringify(backgroundTitle) +
                ' so using alternate color ' +
                utility +
                ' ' +
                JSON.stringify(path) +
                ' ',
            )
          }

          const value = {
            _type: 'backgroundOptions',
            background: [{ _type: 'colorlist', key: utility, _key: nanoid() }],
          }
          if (utility)
            return [
              at(['designOptions'], set(value)), /// set new designOptions
              at(['background'], unset()), // unset deprecated field
            ]
        } else if (node.designOptions) {
          const backgroundArray = (node.designOptions as JsonObject).background as JsonArray
          const bg = backgroundArray && (backgroundArray[0] as JsonObject)
          if (bg && bg._type === 'backgroundColor') {
            const value = {
              _type: 'backgroundOptions',
              background: [{ _type: 'colorlist', key: bg.key, _key: nanoid() }],
            }

            return [
              at(['designOptions'], set(value)), /// set new designOptions
              at(['background'], unset()), // unset deprecated field
            ]
          }
        }
      }
    },
  },
})
