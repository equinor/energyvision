import { Preview, useSchema } from 'sanity';
import { StudioFeedback } from '../../../../components/StudioFeedback';

type DocumentPreviewProps = {
  value: unknown;
  type: string;
};

// Wrapper of Preview just so that the schema type is satisfied by schema.get()
export default function DocumentPreview(props: DocumentPreviewProps) {
  const schema = useSchema();

  const { type, value } = props;
  const schemaType = schema.get(type);
  if (!schemaType) {
    return <StudioFeedback tone="critical" title="Schema type not found" />;
  }

  return <Preview value={value} schemaType={schemaType} />;
}
