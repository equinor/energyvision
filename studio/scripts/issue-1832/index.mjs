import { customAlphabet } from 'nanoid'

export default function script(client) {
  const nanoid = customAlphabet('1234567890abcdef', 12)

  const fetchDocuments = async () =>
    client.fetch(/* groq */ `
      *[_type == 'page' &&
        (count(content[_type == "table"].tableRows[count(row[_type == 'textField']) > 0]) > 0)
      ] [0...100] {
        _id,
        _rev,
        "table": content[_type == 'table' && count(tableRows[count(row[_type == 'textField']) > 0]) > 0] {
          "tableRows": tableRows[count(row[_type == 'textField']) > 0]{
              "row": row[_type == 'textField']
          }
        }
      }
    `)

  const buildPatches = (docs) =>
    docs
      .map((doc) =>
        doc.fields.map((el) => ({
          id: doc.id,
          patch: {
            set: {
              [`content..[_key == "${el._key}"]`]: {
                _key: el._key,
                _type: 'richText',
                text: [
                  {
                    _key: nanoid(),
                    style: 'normal',
                    _type: 'block',
                    children: [
                      {
                        _key: nanoid(),
                        _type: 'span',
                        marks: [],
                        text: el.text,
                      },
                    ],
                    markDefs: [],
                  },
                ],
              },
            },
            // this will cause the migration to fail if any of the documents has been
            // modified since it was fetched.
            ifRevisionID: doc._rev,
          },
        })),
      )
      .flat()

  const createTransaction = (patches) =>
    patches.reduce((tx, patch) => tx.patch(patch.id, patch.patch), client.transaction())

  const commitTransaction = (tx) => tx.commit()

  const migrateNextBatch = async () => {
    console.log('fetching...')
    const rawDocuments = await fetchDocuments()
    const documents = rawDocuments.map((document) => {
      return {
        id: document._id,
        fields: document.table?.flatMap((content) =>
          content.tableRows?.flatMap((table) => table.row?.flatMap((text) => text)),
        ),
      }
    })

    const patches = buildPatches(documents)

    if (patches.length === 0) {
      console.log('No more documents to migrate!')
      return null
    }
    console.log(
      `Migrating batch:\n %s`,
      patches.map((patch) => `${patch.id} => ${JSON.stringify(patch.patch)}`).join('\n'),
    )
    const transaction = createTransaction(patches)
    await commitTransaction(transaction)
    return migrateNextBatch()
  }

  migrateNextBatch().catch((err) => {
    console.error(err)
    process.exit(1)
  })
}
