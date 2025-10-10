/**
 *  This script replaces FullWidthImage from imageWithAlt to imageWithAltAndCaption
 */
/* eslint-disable no-console */
import { sanityClients } from './getSanityClients'

const fetchDocuments = (client) =>
  client.fetch(
    /* groq */ `*[_type in ['page','magazine']  && count(content[_type=="fullWidthImage" && image._type == "imageWithAlt"])>0][0..100]{_id,"images":content[_type=="fullWidthImage" && image._type == "imageWithAlt"]}`,
  )

const buildPatches = (docs) =>
  docs
    .map((doc) =>
      doc.images.map((image) => ({
        id: doc._id,
        patch: {
          set: {
            [`content[_key =="${image._key}"].image`]: {
              _type: 'imageWithAltAndCaption',
              image: image.image,
            },
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
