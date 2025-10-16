import { sanityClients } from './getSanityClients.mjs'
import { testDocs, SCHEMA_TYPE } from './testDocument.mjs'

/**
 * This migration script rewrites the value of field `__i18n_lang` to `language`
 * on all documents of type `lesson`, overwriting the `language` field if it existed.
 *
 * This migration is NOT necessary for the new version of the plugin but you may
 * prefer to no longer have field names with double underscore prefixes.
 *
 * 1. Take a backup of your dataset with:
 * `npx sanity@latest dataset export`
 *
 * 2. Copy this file to the root of your Sanity Studio project
 *
 * 3. Update the `UNSET_FIELD_NAME`, `NEW_FIELD_NAME` and `SCHEMA_TYPE` constants
 * to match your use current data if you customised these settings in the
 * previous versions of the plugin
 *
 * 4. Run the script (replace <schema-type> with the name of your schema type):
 * npx sanity@latest exec ./renameLanguageField.ts --with-user-token
 *
 * 5. Repeat for every schema type and dataset using the updated plugin
 */

const UNSET_FIELD_NAME = `_lang`
const NEW_FIELD_NAME = `lang`
// This field will be unset from all documents that contain it
const UNSET_BASE_FIELD = `__i18n_base`

// This will use the client configured in ./sanity.cli.ts
const client = sanityClients[0]

//&& _id in $testDocs
const query = `*[_type in $type && defined(${UNSET_FIELD_NAME}) || defined(${UNSET_BASE_FIELD})
  ][0...100] {
    _id, 
    _rev, 
    ${UNSET_FIELD_NAME}
  }`
const fetchDocuments = () =>
  client.fetch(query, {
    type: SCHEMA_TYPE,
    testDocs: testDocs,
  })

const buildPatches = (docs) =>
  docs.map((doc) => ({
    id: doc._id,
    patch: {
      set: { [NEW_FIELD_NAME]: doc[UNSET_FIELD_NAME] },
      unset: [UNSET_FIELD_NAME, UNSET_BASE_FIELD],
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
