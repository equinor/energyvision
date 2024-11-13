import { ReactNode, forwardRef } from 'react'
import { Dialog, Box, Button } from '@sanity/ui'
import styled from 'styled-components'

const StyledBox = styled(Box)`
  p {
    margin-top: 0;
  }

  pre {
    background: #f3f3f3;
    padding: 1em;
    white-space: break-spaces;
  }
`
export const StyledButton = styled(Button)`
  width: fit-content;
`

export const StyledIframe = styled.iframe`
  display: block;
  width: 100%;
  height: 100%;
  min-height: 80vh;
  border: none;
`

export const LoadingContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  grid-gap: 1rem;
`

export const FullScreenDialog = styled(Dialog)``

type ErrorMessageProps = {
  onClose: any
  ref: any
  children?: ReactNode
}

export const ErrorMessage = forwardRef<HTMLDivElement, ErrorMessageProps>((props, ref) => {
  const { onClose, children, ...rest } = props

  return (
    <Dialog
      id="fotowareAssetSource"
      header="Error loading Fotoware plugin"
      {...rest}
      onClose={onClose}
      ref={ref}
      footer={<Box padding={4}>If this keeps happening, please contact support.</Box>}
    >
      <StyledBox padding={4}>{children}</StyledBox>
    </Dialog>
  )
})

type FotowareWidgetProps = {
  onClose: any
  url: string
  iframeRef: any
}

export const FotowareWidget = forwardRef<HTMLDivElement, FotowareWidgetProps>((props, ref) => {
  const { url, onClose, iframeRef } = props

  return (
    <FullScreenDialog
      width={1000}
      id="fotowareAssetSource"
      header="Select image from Fotoware"
      onClose={onClose}
      ref={ref}
    >
      <Content>
        <StyledIframe src={url} title="Fotoware" ref={iframeRef}></StyledIframe>
      </Content>
    </FullScreenDialog>
  )
})
