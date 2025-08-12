import { at, defineMigration, JsonObject, set, setIfMissing, unset } from 'sanity/migrate'
import { defaultColors } from '../../schemas/defaultColors'
import { nanoid } from 'nanoid'

const specialCases = ['teaser', 'table', 'tabs', 'fullWidthImage', 'grid', 'fullWidthVideo', 'campaignBanner']

export default defineMigration({
  title: 'Issue 2997',
  documentTypes: ['page', 'magazine', 'homePage'],

  migrate: {
    object(node, path, _) {
      if (node._type === 'cardsList') {
        // rename background to cardBackground.. and remove everything except key and _type..
        const { _type, title } = node.background as JsonObject
        const value = { _type, key: defaultColors.find((it) => it.title == title)?.key }
        return [at(['background'], unset()), at(['cardBackground'], set(value))]
      }
      if (node._type == 'textBlock') {
        console.log(JSON.stringify(path))
        const backgroundTitle = (node as JsonObject as JsonObject)?.title
        if (backgroundTitle === 'White' || !backgroundTitle) {
          // if background is white or undefined clear background...
          return unset()
        }

        var utility = defaultColors.find((color) => color.title == backgroundTitle)?.key
        if (!utility) {
          if (backgroundTitle == 'Slate Blue') utility = 'mid-blue'
          else if (backgroundTitle == 'Moss Green') utility = 'mid-green'
          console.error(
            'Cannot find key for color ' +
              backgroundTitle +
              ' so using alternate color ' +
              utility +
              ' ' +
              JSON.stringify(path) +
              ' ',
          )
        }

        const value = {
          _type: 'backgroundOptions',
          background: [{ _type: 'backgroundColor', key: utility, _key: nanoid() }],
        }
        if (utility)
          return [
            at(['designOptions'], set(value)), /// set new designOptions
            at(['background'], unset()), // unset deprecated field
          ]
      }
    },
  },
})
