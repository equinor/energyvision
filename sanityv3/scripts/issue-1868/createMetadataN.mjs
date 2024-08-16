import { sanityClients } from './getSanityClients.mjs'
import { testDocs, SCHEMA_TYPE } from './testDocument.mjs'

/**
 * This migration script creates new `translation.metadata` documents for all
 * documents that have a `__i18n_refs` field that is an array of references.
 *
 * This migration is necessary for the new version of the plugin to work.
 *
 * 1. Take a backup of your dataset with:
 * `npx sanity@latest dataset export`
 *
 * 2. Copy this file to the root of your Sanity Studio project
 *
 * 3. Update the `UNSET_REFS_FIELD`, `UNSET_BASE_FIELD`,
 * and `SCHEMA_TYPE` constants to match your use
 *
 * 4. Run the script (replace <schema-type> with the name of your schema type):
 * npx sanity@latest exec ./createMetadata.ts --with-user-token
 *
 * 5. Repeat for every schema type and dataset using the updated plugin
 */

const client = sanityClients[0]
// Values in this field will be used to create meta documents
const UNSET_REFS_FIELD = `_langRefs`

// This field will NOT be modified in this script
// Run the `renameLanguageField.ts` script after if you want to change this
const LANGUAGE_FIELD = `_lang`
// eslint-disable-next-line no-console
console.log(
  `Finding "${SCHEMA_TYPE}" documents with translation references in a "${UNSET_REFS_FIELD}" field to create "translation.metadata" documents.`,
)

const fetchDocuments = () =>
  client.fetch(
    `*[
      _type in $type 
      && (defined(${UNSET_REFS_FIELD}) ) 
      && defined(${LANGUAGE_FIELD})
     
    ][0...100] {
      _id, 
      _rev,
      ${LANGUAGE_FIELD},
      ${UNSET_REFS_FIELD}, 
    }`,
    { type: SCHEMA_TYPE, testDocs: testDocs },
  )

const buildMetadata = (docs) => {
  return docs
    .filter((doc) => doc?.[UNSET_REFS_FIELD]?.length)
    .map((doc) => {
      return {
        create: {
          _type: 'translation.metadata',
          translations: [
            {
              _key: doc[LANGUAGE_FIELD],
              value: {
                _type: 'reference',
                _ref: doc._id.replace(`drafts.`, ``),
                ...(doc[UNSET_REFS_FIELD].some((ref) => typeof ref._weak !== 'undefined')
                  ? { _weak: doc[UNSET_REFS_FIELD].find((ref) => ref._weak)?._weak }
                  : {}),
              },
            },
            ...doc[UNSET_REFS_FIELD].map(({ _ref, _key, _weak }) => ({
              _key,
              value: {
                _type: 'reference',
                _ref,
                ...(typeof _weak === 'undefined' ? {} : { _weak }),
              },
            })),
          ],
        },
        patch: {
          id: doc._id,
          patch: {
            unset: [UNSET_REFS_FIELD],
            // this will cause the migration to fail if any of the documents has been
            // modified since it was fetched.
            ifRevisionID: doc._rev,
          },
        },
      }
    })
}

const commitTransaction = (tx) => tx.commit()

const migrateNextBatch = async () => {
  // Get all docs that match query
  const documents = await fetchDocuments()
  console.log('Found ' + documents.length + ' docs')

  // Create new metadata documents before unsetting
  const metadatas = buildMetadata(documents)

  if (metadatas.length) {
    const tx = client.transaction()
    metadatas.forEach((metadata) => {
      console.log(JSON.stringify(metadata.patch) + '\n')
      return tx.create(metadata.create).patch(metadata.patch.id, metadata.patch.patch)
    })
    await commitTransaction(tx)
  }
  if (documents.length === 0) {
    // eslint-disable-next-line no-console
    console.debug('No more documents to create or patch!')
    // eslint-disable-next-line no-console
    console.debug(
      'Be sure to migrate your "language" field using the "renameLanguageField.ts" script or update your plugin configuration\'s "Langage Field" setting',
    )
    return null
  }
  return migrateNextBatch()
}

migrateNextBatch().catch((err) => {
  console.error(err)
  // eslint-disable-next-line no-process-exit
  process.exit(1)
})
