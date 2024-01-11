import { getCliClient } from 'sanity/cli'

const client = getCliClient({
  apiVersion: '2024-01-01',
  projectId: process.env.SANITY_STUDIO_API_PROJECT_ID || 'h61q9gi9',
  token: process.env.SANITY_STUDIO_MUTATION_TOKEN,
  dataset: 'global-development',
  useCdn: false,
})

// Go to your project folder and run this script in your terminal with:
// `sanity exec migrations/renameField.js --with-user-token`
//
// This example shows how you may write a migration script that renames a field (name => fullname)
// on a specific document type (author).
// This will migrate documents in batches of 100 and continue patching until no more documents are
// returned from the query.
//
// This script can safely be run, even if documents are being concurrently modified by others.
// If a document gets modified in the time between fetch => submit patch, this script will fail,
// but can safely be re-run multiple times until it eventually runs out of documents to migrate.

// A few things to note:
// - This script will exit if any of the mutations fail due to a revision mismatch (which means the
//   document was edited between fetch => update)
// - The query must eventually return an empty set, or else this script will continue indefinitely

// Fetching documents that matches the precondition for the migration.
// NOTE: This query should eventually return an empty set of documents to mark the migration
// as complete
const fetchDocuments = () => client.fetch(`*[_type == 'page'][0...100] {_id, _rev, name}`)

const buildPatches = (docs) =>
  docs.map((doc) => ({
    id: doc._id,
    patch: {
      set: { fullname: doc.name },
      unset: ['name'],
      // this will cause the transaction to fail if the documents has been
      // modified since it was fetched.
      ifRevisionID: doc._rev,
    },
  }))

const createTransaction = (patches) =>
  patches.reduce((tx, patch) => tx.patch(patch.id, patch.patch), client.transaction())

const commitTransaction = (tx) => tx.commit()

const migrateNextBatch = async () => {
  const documents = await fetchDocuments()
  console.log(documents)
}

migrateNextBatch().catch((err) => {
  console.error(err)
  process.exit(1)
})
