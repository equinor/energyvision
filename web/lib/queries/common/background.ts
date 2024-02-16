const background = /* groq */ `
"background": {
    "backgroundColor": coalesce(background.title, 'White'),
     "backgroundOption": {
      "useSpecialBackground": backgroundOption.useSpecialBackground,
      "background": backgroundOption.background[0]
     }
  },
`
export default background
