import { defineMigration, insertBefore, at, unset } from 'sanity/migrate'
import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('1234567890abcdef', 12)

/**
 * Create table v2 version of the table.. 
 * Find occurences of TableRichText, has to be created new with Table
Find occurences of Table
Need to create new structure because migration from 
old: table > tableRows > tableRow > row > linkselector/downloadFile/dateField/numberfield/ 
to new: table > rows > row > cells > cell (portableText)
is not possible

Changes:
- change table > name:'tableRows' to name:'rows'
- change table > rows(old tableRows) > name:'tableRow' to name:'row'
- old: table > tableRows > tableRow > row > linkselector/downloadFile/dateField/numberfield/
   new: table > rows > row > cells > cell (portableText)
 */

const transform = (content) => {
  if (!content) return null
  let transformedContent
  if (content._type == 'richText') transformedContent = content.text
  else if (content._type == 'linkSelector') {
    if (content.reference) {
      const uniqueId = nanoid()
      transformedContent = [
        {
          _key: nanoid(),
          _type: 'block',
          children: [
            {
              _key: nanoid(),
              _type: 'span',
              marks: [uniqueId],
              text: content.label,
            },
          ],
          markDefs: [
            {
              _key: uniqueId,
              _type: 'internalLink',
              reference: content.reference,
              anchorReference: content.anchorReference,
            },
          ],
          style: 'normal',
        },
      ]
    } else if (content.url) {
      const uniqueId = nanoid()
      transformedContent = [
        {
          _type: 'block',
          _key: nanoid(),
          children: [
            {
              _key: nanoid(),
              _type: 'span',
              marks: [uniqueId],
              text: content.label,
            },
          ],
          markDefs: [{ _key: uniqueId, _type: 'link', href: content.url }],
          style: 'normal',
        },
      ]
    }
  } else if (content._type == 'numberField' || content._type == 'dateField') {
    transformedContent = [
      {
        _type: 'block',
        _key: nanoid(),
        children: [
          {
            _key: nanoid(),
            _type: 'span',
            marks: [],
            text: content.number || content.date,
          },
        ],
        style: 'normal',
      },
    ]
  } else if (content._type == 'downloadableFile') {
    const uniqueId = nanoid()
    transformedContent = [
      {
        _type: 'block',
        _key: nanoid(),
        children: [
          {
            _key: nanoid(),
            _type: 'span',
            marks: [uniqueId],
            text: content.filename,
          },
        ],
        markDefs: [
          {
            _key: uniqueId,
            _type: 'attachment',
            reference: content.fileReference,
          },
        ],
        style: 'normal',
      },
    ]
  }

  return {
    _type: 'cell',
    _key: nanoid(),
    content: transformedContent,
  }
}
export default defineMigration({
  title: 'Issue 2979',
  documentTypes: ['page'],
  migrate: {
    array(node, path, _context) {
      if (path[0] === 'content')
        // uncomment below line to delete tablev2
        //  return node.filter((it) => it._type === 'tableV2').map((it) => at([{ _key: it._key }], unset()))
        return node
          .filter((it) => it._type === 'table')
          .filter((e) => !!e)
          .map((item) => {
            const cells = item?.tableRows?.map((tableRow) => ({
              _type: 'row',
              cells: tableRow.row?.map((content) => transform(content)),
            }))

            const tableHeaders = item.tableHeaders?.map((it: any) => ({ ...it, _type: 'headerCell' })) // add missing type

            return [
              insertBefore(
                [
                  {
                    _type: 'tableV2',
                    _key: nanoid(),
                    title: item.title,
                    tableHeaders: tableHeaders,
                    ingress: item.ingress,
                    rows: cells,
                    theme: {
                      _type: 'tableTheme',
                      title: item?.theme?.title.toLowerCase() || 'grey',
                    },
                  },
                ],
                { _key: item._key },
              ),
            ]
          })
    },
  },
})
