'use client'

import dynamic from 'next/dynamic'
import { useIsPresentationTool } from 'next-sanity/hooks'

const VisualEditing = dynamic(() =>
  import('next-sanity/visual-editing').then(mod => mod.VisualEditing),
)

export function ConditionalVisualEditing() {
  /** The webpage is inside an iframe, meaning its in the studio presentation tool tab and visual editing should be enabled */
  const isInsidePresentationTool = useIsPresentationTool()
  return isInsidePresentationTool ? <VisualEditing /> : null
}
