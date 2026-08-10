import { isoToSchemaName, languages } from '../languages'

const routes = languages.map((lang) => ({ type: `route_${isoToSchemaName(lang.iso)}` }))
const routesHomepage = { type: `route_homepage` }

export default [routesHomepage, ...routes]
