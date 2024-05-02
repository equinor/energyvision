/* eslint-disable @typescript-eslint/ban-ts-comment */
import { twMerge } from 'tailwind-merge'
import { getUrlFromAction } from '../../common/helpers'
import { BaseLink } from '@core/Link'
import { getLocaleFromName } from '../../lib/localization'
import { ArrowRight } from '../../icons'
import { LinkData } from '../../types/types'
import { getColorForTheme } from '../../pageComponents/shared/textTeaser/theme'

type GridLinkArrowProps = {
  theme?: number
  action?: LinkData
  className?: string
}

const GridLinkArrow = ({ theme, action, className }: GridLinkArrowProps) => {
  const url = action && getUrlFromAction(action)
  const { backgroundUtility, textUtility } = getColorForTheme(theme ?? 0)

  const variantClassName = () => {
    switch (theme) {
      case 0:
        return 'text-energy-red-100 hover:bg-energy-red-100 hover:text-white-100 focus-visible:bg-energy-red-100 focus-visible:text-white-100'
      case 10:
        return `${theme !== null ? textUtility : ''} hover:bg-white-100 hover:${
          theme !== null ? textUtility : ''
        } focus-visible:bg-white-100 focus-visible:${theme !== null ? textUtility : ''}`
      case 80:
        return `text-white-100 hover:bg-white-100 hover:text-blue-50 focus-visible:bg-white-100 focus-visible:text-blue-50`
      default:
        return 'text-white-100 hover:bg-white-100 hover:text-slate-80 focus-visible:bg-white-100 focus-visible:text-slate-80'
    }
  }

  return (
    <>
      {action && url && (
        <div className={twMerge(`3xl:pt-12 w-full flex justify-end`, className)}>
          <BaseLink
            href={url as string}
            {...(action.link?.lang && { locale: getLocaleFromName(action.link?.lang) })}
            type={action.type}
            className={`group
            py-2
            px-4
             focus:outline-none 
             ${variantClassName()}`}
          >
            <span className="sr-only">{`${action.label} ${
              action.extension ? `(${action.extension.toUpperCase()})` : ''
            }`}</span>
            <ArrowRight className={`w-12 h-12`} />
          </BaseLink>
        </div>
      )}
    </>
  )
}

export default GridLinkArrow
