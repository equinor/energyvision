import { at, defineMigration, unset } from 'sanity/migrate';

export default defineMigration({
  title: 'Remove obsolete Magazine search exclusion flag',
  documentTypes: ['magazine'],
  filter: 'defined(excludeFromSearch)',
  migrate: {
    document() {
      return at('excludeFromSearch', unset());
    },
  },
});
