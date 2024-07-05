/* eslint-disable @typescript-eslint/ban-ts-comment */
import { twMerge } from 'tailwind-merge'
import { getUrlFromAction } from '../../common/helpers'
import { BaseLink } from '@core/Link'
import { getLocaleFromName } from '../../lib/localization'
import { ArrowRight } from '../../icons'
import { LinkData } from '../../types/types'

type GridLinkArrowProps = {
  action?: LinkData
  className?: string
  bgColor?: string
}

const GridLinkArrow = ({ action, className = '', bgColor }: GridLinkArrowProps) => {
  const url = action && getUrlFromAction(action)

  const variantClassName = () => {
    switch (bgColor) {
      case 'bg-yellow-50':
      case 'bg-green-50':
      case 'bg-orange-50':
      case 'bg-mist-blue-100':
      case 'bg-moss-green-50':
      case 'bg-spruce-wood-90':
        return `text-slate-80 hover:bg-slate-80 hover:text-white-100 focus-visible:bg-slate-80 focus-visible:text-white-100`
      case 'bg-white-100':
        return `text-slate-80 hover:bg-grey-50 hover:text-white-100 focus-visible:bg-grey-50 focus-visible:text-white-100`
      case 'bg-blue-50':
      case 'bg-slate-80':
      default:
        return `text-white-100 hover:bg-white-100 hover:text-slate-80 focus-visible:bg-white-100 focus-visible:text-slate-80`
    }
  }

  return (
    <>
      {action && url && (
        <div
          className={twMerge(
            `absolute bottom-0 right-0 focus-visible:-translate-y-[5px] focus-visible:-translate-x-[5px] pt-4 3xl:pt-12 w-full flex justify-end`,
            className,
          )}
        >
          <BaseLink
            href={url as string}
            {...(action.link?.lang && { locale: getLocaleFromName(action.link?.lang) })}
            type={action.type}
            className={`group
            py-2
            px-4
            focus:outline-none 
            ${variantClassName()}
            focus-visible:envis-outline
            dark:focus-visible:envis-outline
             `}
          >
            <span className="sr-only">{`${action.label} ${
              action.extension ? `(${action.extension.toUpperCase()})` : ''
            }`}</span>
            <ArrowRight className={`size-10`} />
          </BaseLink>
        </div>
      )}
    </>
  )
}

export default GridLinkArrow
