import { Text } from '@components'
import { Highlight } from '@core/Typography/Highlight'
import { Sub, Sup, ExternalLink, InternalLink, BulletList, NumberedList } from '../components'
import {
  defaultComponents,
  PortableTextBlockComponent,
  PortableTextListComponent,
  PortableTextListItemComponent,
  PortableTextMarkComponent,
  PortableTextReactComponents,
} from '@portabletext/react'
import { PortableTextBlockStyle } from '@portabletext/types'
import { List } from '@core/List'
import { Typography } from '@core/Typography'

type Props = {
  children?: React.ReactNode
}

export type BlockType = Record<PortableTextBlockStyle, PortableTextBlockComponent | undefined>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MarkType = Record<string, PortableTextMarkComponent<any> | undefined>
export type ListType = Record<'number' | 'bullet', PortableTextListComponent>
export type ListItemType = PortableTextListItemComponent

const block: BlockType = {
  h2: ({ children }: Props) => (
    <Typography as="h2" variant="xl">
      {children}
    </Typography>
  ),
  h3: ({ children }: Props) => (
    <Typography as="h3" variant="lg">
      {children}
    </Typography>
  ),
  normal: ({ children }: Props) => <Text>{children}</Text>,
  smallText: ({ children }: Props) => <Text size="small">{children}</Text>,
}

const marks: MarkType = {
  sub: Sub,
  sup: Sup,
  link: ExternalLink,
  internalLink: InternalLink,
  highlight: Highlight,
}

const list: ListType = {
  bullet: BulletList,
  number: NumberedList,
}

const listItem: ListItemType = ({ children }: Props) => <List.Item>{children}</List.Item>

const defaultSerializers: PortableTextReactComponents = {
  ...defaultComponents,
  block: {
    ...defaultComponents.block,
    ...block,
  } as BlockType,
  marks: {
    ...defaultComponents.marks,
    ...marks,
  } as MarkType,
  list: {
    ...defaultComponents.list,
    ...list,
  } as ListType,
  listItem: listItem as ListItemType,
}

export default defaultSerializers
