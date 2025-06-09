import { languages } from '../languages'

const routes = languages.map((lang) => ({ type: `route_${lang.name}` }))
const routesHomepage = { type: `route_homepage` }

export default [routesHomepage, ...routes]
