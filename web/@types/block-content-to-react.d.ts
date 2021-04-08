// Used  https://github.com/nhi/sanity-block-content-to-react-types initially

// Try https://github.com/sanity-io/next-sanity/blob/main/types/blockContent.d.ts instead

/* eslint-disable no-unused-vars */

declare module '@sanity/block-content-to-react' {
  import { ImageUrlBuilderOptionsWithAliases } from '@sanity/image-url/lib/types/types'
  import { ElementType, ReactElement } from 'react'

  namespace BlockContent {
    interface PortableTextEntry {
      _type?: string
      _key?: string
      [key: string]: unknown
    }

    interface PortableTextProps {
      blocks?: PortableTextEntry[]
      className?: string
      renderContainerOnSingleChild?: boolean
      serializers?: PortableTextSerializers
      imageOptions?: ImageUrlBuilderOptionsWithAliases

      projectId?: string
      dataset?: string
    }

    interface PortableTextSerializers {
      types?: Record<string, string | ElementType>
      marks?: Record<string, string | ElementType>
      list?: string | ElementType
      listItem?: string | ElementType
      hardBreak?: string | ElementType
      container?: string | ElementType
      markFallback?: string | ElementType
      text?: string | ElementType
    }
  }

  // eslint-disable-next-line no-unused-vars
  function BlockContent(props: BlockContent.PortableTextProps): ReactElement
  export = BlockContent
}
