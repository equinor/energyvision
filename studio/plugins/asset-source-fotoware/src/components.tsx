import React, { forwardRef } from 'react'
import { Dialog } from '@sanity/ui'
import styled from 'styled-components'

export const Content = styled.div`
  margin: 2em;
`

export const StyledIframe = styled.iframe`
  display: block;
  width: 100%;
  height: 100%;
  min-height: 70vh;
  border: none;
`

type ErrorMessageProps = {
  onClose: any
  ref: any
  children?: React.ReactNode
}

export const ErrorMessage = forwardRef<HTMLDivElement, ErrorMessageProps>((props, ref) => {
  const { onClose, children } = props

  return (
    <Dialog id="fotowareAssetSource" header="Error loading Fotoware plugin" onClose={onClose} ref={ref}>
      <Content>{children}</Content>
    </Dialog>
  )
})
