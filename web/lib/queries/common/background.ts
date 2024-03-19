const background = /* groq */ `
"background": {
    "backgroundColor": coalesce(background.title, 'White'),
     "backgroundOption": {
      "useSpecialBackground": backgroundOption.useSpecialBackground,
      "background": backgroundOption.background[0]
     },
      "dark": coalesce(background.dark, false),
      "utility": coalesce(background.key, ""),
  }
`
export default background
