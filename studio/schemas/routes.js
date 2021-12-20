import languages from './languages'

export default languages.map((lang) => ({ type: `route_${lang.name}` }))
