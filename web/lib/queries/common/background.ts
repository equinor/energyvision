const background = /* groq */ `
"background": {
    "type": coalesce(designOptions.background[0]._type, "backgroundColor"),
   "backgroundUtility":coalesce(designOptions.background[0].key, background.key, ""),
    "backgroundImage": coalesce(designOptions.background[0],""),
}
`
export default background
