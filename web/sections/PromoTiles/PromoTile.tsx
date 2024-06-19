import Card from '@sections/cards/Card'
import { getUrlFromAction } from '../../common/helpers'
import { ColorKeyTokens, colorKeyToUtilityMap } from '../../styles/colorKeyToUtilityMap'
import { BaseLinkProps } from '@core/Link'
import { ArrowRight } from '../../icons'
import { PromoTileData } from '../../types/types'

export type FakeReadMoreProps = {
  children?: React.ReactNode
} & Pick<BaseLinkProps, 'type'>

/** Fake link based on Read more link style */
export const FakeReadMoreLink = ({ type = 'internalUrl', children }: FakeReadMoreProps) => {
  const classNames = `
    group
    inline-flex
    align-baseline
    w-fit
    text-slate-80
    text-sm
    leading-0
  `
  const contentClassNames = `
  relative
  after:content-['']
  after:block
  after:absolute
  after:bottom-0
  after:left-0
  after:border-b
  after:border-slate-80
  dark:after:border-white-100
  after:w-[0%]
  after:transition-all
  after:duration-300
  group-hover/card:after:w-full
  `
  const iconClassNames = `
    size-arrow-right
    text-energy-red-100
    ${type === 'externalUrl' ? '-rotate-45' : ''}
    dark:text-white-100
    ml-2
    group-hover/card:translate-x-2
    transition-all
    duration-300
  `

  return (
    <div className={classNames}>
      <span className={contentClassNames}>{children}</span>
      <ArrowRight className={iconClassNames} />
    </div>
  )
}

export const PromoTile = ({ id, designOptions, image, title, action, linkLabelAsTitle }: PromoTileData) => {
  const url = getUrlFromAction(action)
  const { background } = designOptions
  const colorName =
    Object.keys(colorKeyToUtilityMap).find(
      (key) => colorKeyToUtilityMap[key as keyof ColorKeyTokens]?.backgroundName === background?.backgroundColor,
    ) ?? 'white-100'

  const twBg = background?.backgroundUtility
    ? colorKeyToUtilityMap[background.backgroundUtility]?.background
    : colorKeyToUtilityMap[colorName as keyof ColorKeyTokens]?.background

  return (
    <Card
      {...(id && { id: id })}
      //eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      href={url}
      image={image}
      variant="secondary"
      className="w-full h-full md:max-w-[100%]"
    >
      <Card.Content
        {...(!linkLabelAsTitle && { noArrow: true })}
        {...(linkLabelAsTitle && { variant: 'secondary' })}
        className={`${twBg}`}
      >
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/** @ts-ignore */}
        <Card.Header
          {...(!linkLabelAsTitle && { titleBlock: title })}
          {...(linkLabelAsTitle && { title: action.label })}
          titleClassName={linkLabelAsTitle ? '' : 'group-hover/card:no-underline'}
        />
        {!linkLabelAsTitle && <FakeReadMoreLink type={action.type}>{action.label}</FakeReadMoreLink>}
      </Card.Content>
    </Card>
  )
}
