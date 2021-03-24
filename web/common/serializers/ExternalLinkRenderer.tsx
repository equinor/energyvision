// https://www.sanity.io/docs/portable-text-internal-and-external-links
export const ExternalLinkRenderer = (child: { mark: any; children: any }) => {
  try {
    const { mark, children } = child
    const { href } = mark
    return <a href={href}>{children}</a>
  } catch (e) {
    console.error('Could not render enternal link', e)
    return null
  }
}
