'use client'
import { useId } from 'react'
import Blocks from '@/portableText/Blocks'
import { getBgAndDarkFromBackground } from '@/styles/colorKeyToUtilityMap'
import { twMerge } from 'tailwind-merge'
import { PortableTextBlock } from 'next-sanity'
import { DesignOptions } from '@/types'

export type SectionData = {
  /**
   * Define data types here and use below or directly in type below.
   * To avoid getting a large types file
   * and coupling relevate type to react component
   */
}

export type SectionBlockTemplateProps = {
  //id and type should always be in groq and passed on to section
  type: string
  id: string
  anchor?: string
  //Used to pass pt-20 if previous section is not of same color
  className?: string
  /** Insert rest props from
   * Sanity query data and component specifics
   * Suggestions under
   * */
  title: PortableTextBlock[]
  ingress: PortableTextBlock[]
  hideTitle?: boolean
  //If background use design options
  designOptions: DesignOptions
}
/**
 * Use this as starting block for a section
 * Remove unrelevant suggetions
 * Rename SectionBlockTemplate to relevant section name
 */
const SectionBlockTemplate = ({
  anchor,
  className,
  title,
  ingress,
  hideTitle,
  designOptions,
}: SectionBlockTemplateProps) => {
  const { bg, dark } = getBgAndDarkFromBackground(designOptions)
  //Send down for those that use hasSectionTitle
  const headingId = useId()

  return (
    <section
      className={twMerge(`${bg} ${dark ? 'dark' : ''} mx-auto max-w-viewport px-layout-lg pb-page-content`, className)}
      id={anchor}
    >
      {/* Heading has more padding bottom than the rest, padding is taken care of with Typography */}
      {title && <Blocks variant="h2" id={headingId} value={title} className={`${hideTitle ? 'sr-only' : ''}`} />}
      {/* Rest of content can have gap-6 between them */}
      <div className="flex flex-col gap-6">
        {ingress && <Blocks variant="ingress" value={ingress} />}
        {/*
            section specific parts
        */}
      </div>
    </section>
  )
}

export default SectionBlockTemplate
