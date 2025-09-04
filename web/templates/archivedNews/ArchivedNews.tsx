'use client'

import { anchorClick } from '@/common/helpers/staticPageHelpers'

export default function ArchivedNews({ content }: any) {
  /*  const onLinkClicked = (e: React.MouseEvent<HTMLDivElement>) => {
    anchorClick(e, router)
  }

  const onLinkClickedKeyHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.which == 32 || e.which == 13) {
      anchorClick(e, router)
    }
  }*/
  return (
    <>
      {/* The <div> element has a child <button> element that allows keyboard interaction */}
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}

      <div
        className="legacyStyles"
        // onClick={onLinkClicked}
        // onKeyDown={onLinkClickedKeyHandler}
        dangerouslySetInnerHTML={{ __html: content.replaceAll('<a ', '<a rel="nofollow" ') }}
      />
    </>
  )
}
