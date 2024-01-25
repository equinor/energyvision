/* eslint-disable no-console */
import { getSanityClients as sanityClients } from '../run.js'

// Replace figure with fullWidthImage  and set aspectRatio to 0.3
const fetchDocuments = (client) =>
  client.fetch(
    /* groq */ `*[_type in ['page','magazine'] && length(content[_type == 'fullWidthImage' && aspectRatio == null])>0][0..100]{ _id,"images":content[_type == 'fullWidthImage']} `,
  )

const buildPatches = (docs) =>
  docs
    .map((doc) =>
      doc.images.map((image) => ({
        id: doc._id,
        patch: {
          set: {
            [`content[_key =="${image._key}"].aspectRatio`]: 0.3,
          },
          // this will cause the migration to fail if any of the documents has been
          // modified since it was fetched.
          ifRevisionID: doc._rev,
        },
      })),
    )
    .flat()

const createTransaction = (patches, client) =>
  patches.reduce((tx, patch) => tx.patch(patch.id, patch.patch), client.transaction())

const commitTransaction = (tx) => tx.commit()

const migrateNextBatch = async (client) => {
  const documents = await fetchDocuments(client)
  const patches = buildPatches(documents, client)
  if (patches.length === 0) {
    console.log('No more documents to migrate!')
    return null
  }
  console.log(
    `Migrating batch:\n %s`,
    patches.map((patch) => `${patch.id} => ${JSON.stringify(patch.patch)}`).join('\n'),
  )
  const transaction = createTransaction(patches, client)
  await commitTransaction(transaction)
  return migrateNextBatch(client)
}

export default function script() {
  sanityClients.map((client) =>
    migrateNextBatch(client).catch((err) => {
      console.error(err)
      process.exit(1)
    }),
  )
}
