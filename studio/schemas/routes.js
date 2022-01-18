import languages from '../languages'

const routes = languages.map((lang) => ({ type: `route_${lang.name}` }))

export default [...routes, { type: 'route_homepage' }]
