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
  message: string
}

export const ErrorMessage = ({ onClose, ref, message }: ErrorMessageProps) => {
  return (
    <Dialog id="fotowareAssetSource" header="Select image from Fotoware" onClose={onClose} ref={ref}>
      <Content>
        <h3>The Fotoware plugin could not be loaded.</h3>
        <p>{message}</p>
      </Content>
    </Dialog>
  )
}
