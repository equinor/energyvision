import { BlockFieldStyle } from '../../../types/schemaTypes'

const bigTitle = {
  title: 'Large',
  value: 'normal',
  component: ({ children }: { children: React.ReactNode }) => {
    return <span style={{ fontSize: '42px' }}>{children}</span>
  },
}

export const defaultBannerBigTitletStyle: BlockFieldStyle[] = [
  bigTitle,
  {
    title: 'Extra Large',
    value: 'extraLarge',
    component: ({ children }: { children: React.ReactNode }) => {
      return <span style={{ fontSize: '56px' }}>{children}</span>
    },
  },
]

export const fiftyFiftyBigTitleStyle: BlockFieldStyle[] = [bigTitle]
