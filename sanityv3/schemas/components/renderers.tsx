import { HeartIcon } from '@sanity/icons'
import { ReactNode } from 'react'
import { BlockAnnotationProps } from 'sanity'

type Props = {
  children: ReactNode
}

export const ExternalLinkRenderer = ({ children }: Props) => <span>{children}</span>

export const SubScriptRenderer = ({ children }: Props) => <sub>{children}</sub>

export const SuperScriptRenderer = ({ children }: Props) => <sup>{children}</sup>

export const StrikeThroughRenderer = ({ children }: Props) => <s>{children}</s>

export const TextHighLightRenderer = (props: BlockAnnotationProps) =>
  props.renderDefault({
    ...props,
    textElement: <span style={{ color: (props.value.color as any).value }}>{props.textElement}</span>,
  })
