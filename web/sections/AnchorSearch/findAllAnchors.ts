import { toPlainText } from 'next-sanity'

export const findAllAnchors = (content: any[] = []) => {
  return content
    ?.filter((block: any) => {
      return (
        (block?.type === 'anchorLink' && block?.anchorReference) ||
        (block?.type === 'textBlock' && block?.anchorReference)
      )
    })
    ?.map((block: any) => {
      let label =
        block?.anchorLabel ??
        block?.anchorReference.charAt(0).toUpperCase() +
          block?.anchorReference.slice(1)

      if (block?.type === 'textBlock') {
        label = Array.isArray(block?.title)
          ? toPlainText(block?.title)
          : block?.title
      }

      return {
        anchorReference: block?.anchorReference,
        // anchorLabel when AnchorLink component, title when TextBlock component
        label,
      }
    })
}
