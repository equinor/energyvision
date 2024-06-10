import Card from '@sections/cards/Card'
import styled from 'styled-components'
import type { PromoTileArrayData, PromoTileData } from '../../types/index'
import { Ratios } from '../shared/SanityImage'
import { Carousel } from '../shared/Carousel'
import { useMediaQuery } from '../../lib/hooks/useMediaQuery'
import { useSanityLoader } from '../../lib/hooks/useSanityLoader'
import { BaseLinkProps } from '@core/Link'
import { ArrowRight } from '../../icons'
import { getUrlFromAction } from '../../common/helpers'
import { ColorKeyTokens, colorKeyToUtilityMap } from '../../styles/colorKeyToUtilityMap'
import { twMerge } from 'tailwind-merge'

/* const { Header, Action, Media } = Card */

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 1fr;
  grid-gap: var(--space-medium);
  padding: var(--space-3xLarge) var(--layout-paddingHorizontal-large);
  max-width: var(--maxViewportWidth);
  margin: auto;

  @media (min-width: 750px) {
    grid-template-columns: 1fr 1fr;
  }
`

const HorizontalWrapper = styled.div`
  --card-maxWidth: 280px;
  --card-minWidth: 280px;
  padding-top: var(--space-3xLarge);
  padding-bottom: var(--space-3xLarge);

  @media (min-width: 800px) {
    --card-maxWidth: 400px;
    --card-minWidth: 400px;
  }
`

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
  const iconClassNames = `text-energy-red-100
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

const TWPromoTile = ({ id, designOptions, image, title, action, linkLabelAsTitle }: PromoTileData) => {
  const bgImage = useSanityLoader(image, 400, Ratios.FIVE_TO_FOUR)
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
      {...(bgImage && {
        imageUrl: bgImage.src,
      })}
      variant="secondary"
      className="basis-0 grow min-w-[var(--card-minWidth)] max-w-[var(--card-maxWidth)]"
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

const PromoTileArray = ({
  data,
  anchor,
}: //className,
{
  data: PromoTileArrayData
  anchor?: string
  className?: string
}) => {
  const isMobile = useMediaQuery(`(max-width: 800px)`)

  if (!data.group) return null

  const renderScroll = data.useHorizontalScroll || isMobile

  const Wrapper = renderScroll
    ? ({ children }: { children: React.ReactNode }) => (
        <HorizontalWrapper>
          <Carousel horizontalPadding>{children}</Carousel>
        </HorizontalWrapper>
      )
    : Container

  return (
    <Wrapper id={anchor}>
      {data.group.map((tile: PromoTileData) => {
        return <TWPromoTile key={tile.id} {...tile} />
      })}
    </Wrapper>
  )
}

export default PromoTileArray
