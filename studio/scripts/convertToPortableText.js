/* eslint-disable no-console */

import { customAlphabet } from 'nanoid'
import { sanityClients } from './getSanityClients'

const nanoid = customAlphabet('1234567890abcdef', 12)

const fetchDocuments = (client) =>
  client.fetch(
    /* groq */ `*[_type in ['page','magazine'] && length(content[_type == "promoTileArray"].group[count(title)==null])>0][0..100] {_id, _rev, "promotileArray":content[_type == "promoTileArray"].group[count(title)==null] }`,
  )

const buildPatches = (docs) =>
  docs
    .map((doc) =>
      doc.promotileArray.map((promoTile) => ({
        id: doc._id,
        patch: {
          set: {
            [`content..[_key =="${promoTile._key}"].title`]: [
              {
                style: 'normal',
                _type: 'block',
                _key: nanoid(),
                children: [
                  {
                    _type: 'span',
                    marks: [],
                    _key: nanoid(),
                    text: `${promoTile.title}`,
                  },
                ],
                markDefs: [],
              },
            ],
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
