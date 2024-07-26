import { sanityClients } from './getSanityClients.mjs'

/**
 * This migration script adds `lastModifiedAt` and sets it to the current _updatedAt field.
 * Applicable to news, localNews and magazine.
 */

const UPDATED_AT = `_updatedAt`
const LAST_MODIFIED_AT = `lastModifiedAt`
const SCHEMA_TYPE = [`news`, `localNews`, 'magazine']

// This will use the client configured in ./sanity.cli.ts
const client = sanityClients[0]

//&& _id in $testDocs
const query = `*[_type in $type && !defined(${LAST_MODIFIED_AT}) ][0...100] {
    _id, 
    _rev, 
    ${UPDATED_AT}
  }`
const fetchDocuments = () =>
  client.fetch(query, {
    type: SCHEMA_TYPE,
  })

const buildPatches = (docs) =>
  docs.map((doc) => ({
    id: doc._id,
    patch: {
      setIfMissing: { [LAST_MODIFIED_AT]: doc[UPDATED_AT] },
      // this will cause the migration to fail if any of the
      // documents have been modified since the original fetch.
      ifRevisionID: doc._rev,
    },
  }))

const createTransaction = (patches) =>
  patches.reduce((tx, patch) => tx.patch(patch.id, patch.patch), client.transaction())

const commitTransaction = (tx) => tx.commit()

const migrateNextBatch = async () => {
  const documents = await fetchDocuments()
  console.log(`Found ${documents.length} documents to migrate\n`)

  const patches = buildPatches(documents)
  if (patches.length === 0) {
    // eslint-disable-next-line no-console
    console.debug('No more documents to migrate!')
    return null
  }
  // eslint-disable-next-line no-console
  console.debug(
    `Migrating batch:\n %s`,
    patches.map((patch) => `${patch.id} => ${JSON.stringify(patch.patch)}`).join('\n'),
  )
  const transaction = createTransaction(patches)
  await commitTransaction(transaction)
  return migrateNextBatch()
}

migrateNextBatch().catch((err) => {
  console.error(err)
  // eslint-disable-next-line no-process-exit
  process.exit(1)
})
