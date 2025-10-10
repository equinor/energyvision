import { languages } from '../../languages'
import type { CurrentUser } from 'sanity'
import { EdsIcon } from '../../icons'
import { tag_more } from '@equinor/eds-icons'

const LocalNewsTagDescription = () => (
  <>
    <span style={{ display: 'block', marginTop: '8px' }}>
      The translated names used to display the tag on the web and generate the slugs.
    </span>
    <span style={{ display: 'block', marginTop: '8px' }}>
      <span role="img" aria-label="warning icon">
        ⚠️
      </span>{' '}
      Since these values are used to automatically generate slugs; they should only be changed if you know what you are
      doing.
    </span>
  </>
)

const fields = languages.map((lang) => ({
  title: `${lang.title} value`,
  name: lang.name,
  description: `The ${lang.id} translation`,
  type: 'string',
  fieldset: 'tagName',
}))

export default {
  type: 'document',
  title: `Local news tag`,
  name: `localNewsTag`,
  icon: () => EdsIcon(tag_more),
  readOnly: ({ currentUser }: { currentUser: CurrentUser }) =>
    !currentUser.roles.find((role) => ['administrator'].includes(role.name)),
  fieldsets: [
    {
      title: 'Tag names',
      name: 'tagName',
      description: LocalNewsTagDescription(),
      options: {
        collapsible: false,
        collapsed: false,
      },
    },
  ],
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      description: 'Identifying title for use within the studio',
    },
    ...fields,
  ],
}
