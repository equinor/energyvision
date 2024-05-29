export default {
  name: 'gridColorTheme',
  title: 'Grid Color theme',
  description: 'Text color on background color. Call to actions will be black or white text',
  type: 'string',
  options: {
    list: [
      { title: 'normal', value: 'normal' },
      { title: 'red on white', value: 'redOnWhite' },
      { title: 'white on dark blue', value: 'whiteOnDarkBlue' },
      { title: 'dark blue on light blue', value: 'darkBlueOnLightBlue' },
    ],
  },
  initialValue: 'normal',
}
