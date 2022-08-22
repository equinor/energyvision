export type SharedNewsFields = {
  slug: string
  title: string
  ingress: string
  // ISO 8601
  publishDateTime?: string
  blocks: {
    blockKey: string
    children: {
      childKey: string
      text: string
    }[]
  }[]
  _id: string
}
