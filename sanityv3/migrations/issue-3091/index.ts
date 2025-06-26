import { at, defineMigration, setIfMissing, set, unset, JsonObject, JsonArray } from 'sanity/migrate'
import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('1234567890abcdef', 12)
export default defineMigration({
  title: 'Issue 3091',

  migrate: {
    object(node, path, context) {
      // this will be called for every object node in every document of the matching type
      // any patch returned will be applied to the document
      // you can also return mutations that touches other documents

      ///////////////////////////////////////
      //  Regular link selector...
      if (node._type === 'linkSelector' && !node.link) {
        // External link
        const unsets = [
          at('url', unset()),
          at('referenceToOtherLanguage', unset()),
          at('reference', unset()),
          at('linkToOtherLanguage', unset()),
        ]
        if (node.url) {
          return [at('link', set([{ _type: 'link', _key: nanoid(), href: node.url }])), ...unsets]
        }

        // Internal link
        if (node.linkToOtherLanguage == true) {
          // another language
          const value = node.referenceToOtherLanguage as JsonObject
          return [at('link', set([{ _key: nanoid(), ...value, _type: 'referenceToOtherLanguage' }])), ...unsets]
        } else {
          const value = node.reference as JsonObject
          return [at('link', set([{ _type: 'reference', _key: nanoid(), ...value }])), ...unsets]
        }
      }

      //////////////////////////////////////////////////////////////////
      /// people promotion link
      if (node._type == 'people' && node.isLink && node.linkSelector == null) {
        let linkSelector: JsonObject = { label: node.label }
        const unsets = [
          at('reference', unset()),
          at('referenceToOtherLanguage', unset()),
          at('linkToOtherLanguage', unset()),
          at('label', unset()),
          at('url', unset()),
          at('anchorReference', unset()),
        ]
        // External link
        if (node.url) {
          linkSelector = {
            ...linkSelector,
            link: [{ _type: 'link', _key: nanoid(), href: node.url }],
          }
          return [at('linkSelector', set(linkSelector)), ...unsets]
        }

        // Internal link
        if (node.linkToOtherLanguage == true) {
          // another language
          const value = node.referenceToOtherLanguage as JsonObject

          linkSelector = {
            ...linkSelector,
            link: [{ _key: nanoid(), ...value, _type: 'referenceToOtherLanguage' }],
          }
          return [at('linkSelector', set(linkSelector)), ...unsets]
        } else {
          const value = node.reference as JsonObject
          linkSelector = {
            ...linkSelector,
            link: [{ _type: 'reference', _key: nanoid(), ...value }],
          }
          return [at('linkSelector', set(linkSelector)), ...unsets]
        }
      }

      ////////////////////////////////////////////////////
      /// Footer.....
      if (node._type == 'footerColumnGroup') {
        const links = node?.columnLinks
          ?.filter((it) => it._type != 'linkSelector')
          ?.map((it) => ({
            label: it.label,
            _key: it._key,
            _type: 'linkSelector',
            link: [
              {
                _key: nanoid(),
                _type: it._type == 'someLink' ? 'socialMediaLink' : it.url ? 'link' : 'reference',
                href: it.url,
                someType: it.someType,
                ...it.reference,
              },
            ],
          }))
        if (links > 0) return at(['columnLinks'], set(links))
        else console.log('No footer links to migrate')
      }

      ///////////////////////////////
      // Content blocks....
      if (node._type == 'internalLink') {
        const value = node.linkToOtherLanguage
          ? (node.referenceToOtherLanguange as JsonObject) // fix for typo
          : (node.reference as JsonObject)
        const type = node.linkToOtherLanguage ? 'referenceToOtherLanguage' : 'reference'
        return [
          set({ ...value, _type: type, _key: node._key }),
          at('referenceToOtherLanguange', unset()),
          at('reference', unset()),
          at('linkToOtherLanguage', unset()),
        ]
      }
    },
  },
})
