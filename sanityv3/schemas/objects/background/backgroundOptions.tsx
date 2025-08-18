import { defineType, defineField } from 'sanity'
import singleItemArray from '../singleItemArray'
import { defaultBackgroundColors } from '../../defaultColors'

export default defineType({
  type: 'object',
  name: 'backgroundOptions',

  fields: [
    {
      ...singleItemArray(
        {
          type: 'array',
          name: 'background',
          description: 'Select what type of background you want to apply',
          title: 'Background',
          of: [
            { name: 'backgroundImage', type: 'imageBackground', title: 'Image' },
            {
              title: 'Color',
              description: 'Default is white.',
              type: 'colorlist',
            },
          ].filter((e) => e),
        },
        true,
      ),
      initialValue: [{ _type: 'colorlist', key: defaultBackgroundColors[0] }],
    },
  ],
})
