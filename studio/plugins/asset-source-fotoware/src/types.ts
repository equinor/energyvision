export type FWAsset = {
  href: string
  archiveHREF: string
  linkstance: string
  created: string
  modified: string
  filename: string
  filesize: number
  uniqueid: string
  doctype: string
  permissions: string[]
  previews: any[]
  quickRenditions: any[]
  metadataEditor: {
    name: string
    href: string
  }
  renditions: any[]
  attributes: {
    imageattributes: any
    photoAttributes: any
  }
  metadata: any
  ancestors: any[]
  props: any
}
