import { ValidationRule, ValidationContext } from '../../types/schemaTypes'

export default {
  name: 'videoControls',
  title: 'Video Controls',
  type: 'object',
  fields: [
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
          } else if (value && !parent.loop && !parent.controls) {
            return 'Auto play is only allowed if Loop is enabled'
          }
          return true
        }),
      hidden: ({ parent }: ValidationContext) => {
        return parent?.playButton
      },
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
  ],
}
