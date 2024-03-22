const background = /* groq */ `
    "background": coalesce(background.title, 'White'),
    "dark": coalesce(background.dark, false),
    "utility": coalesce(background.key, ""),
`
export default background
