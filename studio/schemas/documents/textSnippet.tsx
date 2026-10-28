import { text_field } from '@equinor/eds-icons';
import { translationField } from '../../helpers/translation';
import { EdsIcon } from '../../icons';
import { languages } from '../../languages';

// Legacy locale fields kept hidden so existing data is preserved; use translation.
const fields = languages.map((lang) => ({
  title: `${lang.title} value`,
  name: lang.iso.replace('-', '_'),
  description: `The ${lang.id} translation`,
  type: 'string',
  readOnly: true,
  hidden: true,
}));

export default {
  type: 'document',
  title: `Text Snippet`,
  name: `textSnippet`,
  icon: () => EdsIcon(text_field),
  fields: [...fields, translationField()],
};
