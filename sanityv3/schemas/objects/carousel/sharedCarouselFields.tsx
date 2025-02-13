import type { Rule } from 'sanity'

export const singleMode = {
  type: 'boolean',
  name: 'singleMode',
  title: 'Single mode',
  description: 'Displays the carousel as one item at the time. Default is scroll container',
  initialValue: false,
  validation: (Rule: Rule) =>
    Rule.custom((value: any, context) => {
      if (!value) {
        return true
      }
      //@ts-ignore:todo
      return value && context?.parent?.items?.length >= 3 ? true : 'Single mode requires at least 3 items'
    }),
}
export const carouselWidth = {
  type: 'boolean',
  name: 'useFullWidthScroll',
  title: 'Use scroll fullwidth container',
  description:
    'Scroll: Select this if you want the carusel go full viewport width. Default is within large content column',
  initialValue: false,
  validation: (Rule: Rule) =>
    Rule.custom((value: any, context) => {
      if (!value) {
        return true
      }
      //@ts-ignore:todo
      return value && context?.parent?.singleMode ? 'Single mode is set, turn off single mode to use this' : true
    }),
}

export const autoPlay = {
  type: 'boolean',
  name: 'autoplay',
  title: 'Autoplay',
  description: 'Whether the carousel should autoplay or not.',
  initialValue: false,
  hidden: ({ parent }: { parent: any }) => !parent?.singleMode,
}
