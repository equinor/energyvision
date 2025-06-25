const background = /* groq */ `
"background": {
    "type": coalesce(designOptions.background[0]._type, "backgroundColor"),
    "backgroundColor": coalesce(designOptions.background[0].title, background.title, 'White'),
    "backgroundUtility":coalesce(designOptions.background[0].key, background.key, ""),
    "backgroundImage": coalesce(designOptions.background[0],""),
    "dark": coalesce(designOptions.background[0].dark, background.dark, false),
}
`
export default background
