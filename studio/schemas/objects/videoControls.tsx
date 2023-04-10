import { ValidationRule, ValidationContext } from '../../types/schemaTypes'

export default {
  name: 'videoControls',
  title: 'Video Controls',
  type: 'object',
  fields: [
    {
      name: 'controls',
      type: 'boolean',
      title: 'Display Controls',
      initialValue: true,
      validation: (Rule: ValidationRule) =>
        Rule.custom((value: boolean, context: ValidationContext) => {
          const { parent } = context
          if (!value && !parent.autoPlay) {
            return 'Hiding controls is only allowed if Auto Play is enabled'
          }
          return true
        }),
    },
    {
      name: 'autoPlay',
      type: 'boolean',
      title: 'Auto Play',
      initialValue: false,
      validation: (Rule: ValidationRule) =>
        Rule.custom((value: boolean, context: ValidationContext) => {
          const { parent } = context
          if (value && !parent.muted) {
            return 'Auto play is only allowed if video is Muted'
          }
          return true
        }),
    },
    {
      name: 'muted',
      type: 'boolean',
      title: 'Muted',
      initialValue: false,
    },
    {
      name: 'loop',
      type: 'boolean',
      title: 'Loop',
      initialValue: false,
    },
    {
      name: 'allowFullScreen',
      type: 'boolean',
      title: 'Allow Full Screen',
      initialValue: false,
    },
  ],
}
