import { languages } from '../languages';
import { getRouteType } from '../src/lib/localization';

const routes = languages.map((lang) => ({
  type: getRouteType(lang.iso),
}));
const routesHomepage = { type: `route_homepage` };

export default [routesHomepage, ...routes];
