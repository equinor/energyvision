import { createClient } from '@sanity/client';

const dataset = 'global-development';
// change the deleted initial value template name with drafts. prefix to purge the draft document. For example, if the initial value template name is "norwegian-menu", then the documentId should be "drafts.norwegian-menu"
const documentId = 'drafts.norwegian-menu';

const client = createClient({
  apiVersion: '2023-12-06',
  projectId: process.env.SANITY_STUDIO_API_PROJECT_ID || 'h61q9gi9',
  token: process.env.SANITY_STUDIO_MUTATION_TOKEN,
  dataset,
});

const purgeDocument = async () => {
  const { dataset } = client.config();

  await client.request({
    uri: `/data/mutate/${dataset}`,
    method: 'POST',
    body: {
      mutations: [
        {
          delete: {
            id: documentId,
            purge: true,
          },
        },
      ],
    },
  });

  console.log(`Purged ${documentId} from ${dataset}.`);
};

purgeDocument().catch((error) => {
  console.error(error);
  process.exit(1);
});
