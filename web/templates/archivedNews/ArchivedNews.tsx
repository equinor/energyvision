'use client'

export default function ArchivedNews({ content }: any) {
  return (
    <>
      {/* The <div> element has a child <button> element that allows keyboard interaction */}
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}

      <div
        className="legacyStyles"
        dangerouslySetInnerHTML={{ __html: content.replaceAll('<a ', '<a rel="nofollow" ') }}
      />
    </>
  )
}
