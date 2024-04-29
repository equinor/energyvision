/* eslint-disable @typescript-eslint/ban-ts-comment */
import { twMerge } from 'tailwind-merge'
import { getUrlFromAction } from '../../common/helpers'
import { BaseLink } from '@core/Link'
import { getLocaleFromName } from '../../lib/localization'
import { ArrowRight } from '../../icons'
import { LinkData } from '../../types/types'
import { getColorForTheme } from '../../pageComponents/shared/textTeaser/theme'
import { colorKeyToUtilityMap } from '../../styles/colorKeyToUtilityMap'

//type Theme = 'redOnWhite' | 'whiteOnDarkBlue' | 'darkBlueOnLightBlue'

type GridLinkArrowProps = {
  theme: string
  action?: LinkData
  className?: string
}

const GridLinkArrow = ({ theme, action, className }: GridLinkArrowProps) => {
  const url = action && getUrlFromAction(action)
  //@ts-ignore
  const { backgroundUtility, textUtility } = getColorForTheme(theme)
  let bgClassName = ''
  let textClassName = ''
  if (theme !== null) {
    //@ts-ignore
    bgClassName = colorKeyToUtilityMap[backgroundUtility]?.background
    //@ts-ignore
    textClassName = colorKeyToUtilityMap[textUtility]?.text
  }

  const variantClassName = () => {
    switch (backgroundUtility) {
      case 'white-100':
        return 'text-energy-red-100 hover:bg-energy-red-100 hover:text-white-100 focus-visible:bg-energy-red-100 focus-visible:text-white-100'
      case 'mist-blue-100':
        return `${textClassName} hover:bg-white-100 hover:${textClassName} focus-visible:bg-white-100 focus-visible:${textClassName}`
      case 'blue-50':
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
