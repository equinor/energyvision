import { add } from '@equinor/eds-icons'
import { twMerge } from 'tailwind-merge'
import ArrowRight from '@/icons/ArrowRight'
import TransformableIcon from '@/icons/TransformableIcon'
import type { LinkType } from '@/types'

export const iconRotation: Record<string, string> = {
  externalUrl: '-rotate-45',
  downloadableFile: 'rotate-90',
  downloadableImage: 'rotate-90',
  internalUrl: '',
}

export const getArrowAnimation = (type: LinkType) => {
  switch (type) {
    case 'downloadableFile':
    case 'downloadableImage':
      return 'group-hover/link:translate-y-0.5'
    case 'anchorLink':
      return 'translate-y-0.5 group-hover/link:translate-y-2'
    case 'icsLink':
      return 'translate-y-0.5'
    case 'externalUrl':
      return 'translate-y-0.5 group-hover/link:-translate-y-0.5'
    default:
      return 'translate-y-0.5 group-hover/link:translate-x-2'
  }
}

export const getArrowElement = (
  type: LinkType,
  iconClassName?: string,
  marginClassName?: string,
) => {
  const iconClassNames = twMerge(
    `size-arrow-right
    text-energy-red-100
    dark:text-white-100
    justify-self-end
    min-h-arrow-right
    min-w-arrow-right
    ${iconRotation[type]}
    ${getArrowAnimation(type)}
    transition-all
    duration-300
  `,
    iconClassName,
  )
  const marginClassNames = twMerge(`ml-6 xl:ml-8`, marginClassName)

  switch (type) {
    case 'downloadableFile':
    case 'downloadableImage':
      return (
        <div
          className={`flex flex-col px-1 ${marginClassNames} translate-y-px`}
        >
          <ArrowRight className={iconClassNames} />
          <div className='h-0.5 w-full bg-energy-red-100 dark:bg-white-100' />
        </div>
      )
    case 'icsLink':
      return (
        <TransformableIcon
          iconData={add}
          className={`${marginClassName} ${iconClassNames}`}
        />
      )
    default:
      return <ArrowRight className={`${marginClassName} ${iconClassNames}`} />
  }
}
