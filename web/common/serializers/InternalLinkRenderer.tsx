/* eslint-disable no-unused-vars */
// @TODO

export const InternalLinkRenderer = (child: { mark: any; children: any }) => {
  try {
    const { mark, children } = child
    const { id, type } = mark.internalLink

    switch (type) {
      default:
        return <span>Need to implement internal link</span>
    }
  } catch (e) {
    console.error('Could not render internal link', e)
    return null
  }
}
