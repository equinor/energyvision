export default {
  name: 'backgroundColourPicker',
  type: 'object',
  fields: [
    {
      title: 'Colours',
      description: 'Pick a colour for the background, if needed (none is default)',
      name: 'colours',
      type: 'colorlist',
      options: {
        borderradius: {
          outer: '100%',
          inner: '100%',
        },
        tooltip: true,
        // TODO: See if we should put in a PR upstream to add support for CSS properties
        list: [
          { title: 'Default', value: 'hsl(0, 0%, 100%)' },
          { title: 'Warm', value: 'hsl(25, 100%, 92%)' },
          { title: 'Cold', value: 'hsl(184, 30%, 96%)' },
        ],
      },
    },
  ],
}
