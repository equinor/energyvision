import React, { useState, useCallback, useEffect, useRef, forwardRef } from 'react'
import {
  Button,
  Card,
  Dialog,
  Flex,
  Label,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  Popover,
  Stack,
  Text,
  TextInput,
} from '@sanity/ui'
import { createPortal } from 'react-dom'
import { PatchEvent, set, unset } from '@sanity/form-builder/PatchEvent'
import { UploadIcon, ResetIcon, DotIcon, EllipsisVerticalIcon, ComponentIcon } from '@sanity/icons'
import { ChangeIndicatorCompareValueProvider, FormField } from '@sanity/base/components'
import { useId } from '@reach/auto-id'
import { SanityDocument, Marker } from '@sanity/types'
import { Content } from '../../plugins/asset-source-fotoware/src/components'
import BrandmasterIcon from '../../plugins/asset-source-mediabank/src/Icon'

const MEDIABANK_URL = process.env.SANITY_STUDIO_MEDIABANK_URL || ''
const MEDIABANK_SOURCE =
  MEDIABANK_URL +
  '/dam2/archive?p_com_id=12366&p_oty_id=146867&p_ptl_id=16613&p_lae_id=2&p_mode=plugin_object&p_filter=status:1;sort:obt_id%20desc;type:AND;viewers:VIDEO_VIEWER'
const MEDIABANK_IMPORT_TYPE = 'dam:assets-imported'

type VideoPlayer = {
  title: string
  url: string
}

interface Props {
  children?: React.ReactNode
  value?: VideoPlayer
  compareValue?: VideoPlayer
  onChange: (event: PatchEvent) => void
  type: { title: string; description: string }
  level: number
  document: SanityDocument
  markers: Marker[]
  presence: any
}

const VideoPlayer = forwardRef(function VideoPlayer(props: Props, forwardedRef: React.ForwardedRef<HTMLVideoElement>) {
  const { children, value, compareValue, onChange, type, level, markers, presence } = props
  const [container, setContainer] = useState<HTMLDivElement | null>(null)
  const [error, setError] = useState('')
  const inputId = useId()

  const newWindow = useRef<Window | null>(null)

  useEffect(() => {
    setContainer(document.createElement('div'))
  }, [])

  const closeModal = () => {
    newWindow?.current?.close()
  }

  const handleMediaBankEvent = useCallback(
    (event: MessageEvent) => {
      if (!event || !event.data || event.origin !== MEDIABANK_URL) return false

      const message = JSON.parse(event.data)

      if (message?.type === MEDIABANK_IMPORT_TYPE) {
        const file = message.data.assets[0]

        if (file.viewer === 'VIDEO_VIEWER') {
          console.log(message)
          const url = MEDIABANK_URL + message.data.files[0].fileRef
          const video = {
            title: file.title,
            url: url,
          }
          // save to document
          onChange(PatchEvent.from(set(video)))
        } else {
          setError('File type is not supported. Please select a video file.')
        }
        closeModal()
      }
      // link to the origial, non-resized, version of the file
    },
    [onChange],
  )

  const handleReset = () => {
    onChange(PatchEvent.from(unset()))
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(
      PatchEvent.from(
        set({
          ...value,
          title: event?.currentTarget?.value,
        }),
      ),
    )
  }

  const handleOpenModal = () => {
    if (container) {
      newWindow.current = window.open(MEDIABANK_SOURCE, 'Media Bank', 'width=1200,height=800,left=200,top=200')

      if (newWindow.current) {
        newWindow.current.document.body.appendChild(container)
        window.addEventListener('message', handleMediaBankEvent)
      }
    }
  }

  return (
    <ChangeIndicatorCompareValueProvider value={value} compareValue={compareValue}>
      <FormField
        title={type.title}
        description={type.description}
        level={level}
        __unstable_markers={markers}
        __unstable_presence={presence}
        inputId={inputId}
      >
        {container && createPortal(children, container)}
        {value ? (
          <Stack space={4} marginTop={2}>
            <Stack space={3}>
              <Label as="label" htmlFor="text-input" size={1}>
                Title
              </Label>

              <TextInput id="text-input" onChange={handleTitleChange} value={value?.title} />
            </Stack>
            <Stack space={3}>
              <Label as="label" htmlFor="asset" size={1}>
                Asset
              </Label>
              <div id="asset" style={{ position: 'relative' }}>
                <Card border paddingX={6} tone="transparent">
                  {
                    // eslint-disable-next-line jsx-a11y/media-has-caption
                    <video
                      ref={forwardedRef}
                      src={value?.url}
                      controls={true}
                      width="100%"
                      height="350px"
                      style={{ marginBottom: '-5px', background: 'black' }}
                    />
                  }
                </Card>
                <div style={{ position: 'absolute', top: '8px', right: '8px' }}>
                  <MenuButton
                    button={<Button icon={EllipsisVerticalIcon} mode="ghost" />}
                    id="menu-video"
                    menu={
                      <Menu>
                        <MenuItem as="div">
                          <Label size={2}>Replace</Label>
                        </MenuItem>
                        <MenuItem
                          as="button"
                          icon={ComponentIcon}
                          type="button"
                          onClick={handleOpenModal}
                          text="Media Bank"
                        />

                        <MenuDivider />
                        <MenuItem
                          as="button"
                          icon={ResetIcon}
                          text="Clear field"
                          tone="critical"
                          onClick={handleReset}
                        />
                      </Menu>
                    }
                    popover={{ portal: true }}
                  />
                </div>
              </div>
            </Stack>
          </Stack>
        ) : (
          <Stack>
            <Button
              icon={UploadIcon}
              mode="ghost"
              type="button"
              onClick={handleOpenModal}
              text="Import from Media Bank"
            />
          </Stack>
        )}
        {error && (
          <Dialog id="error-dialog" header={'Error'} onClose={() => setError('')}>
            <Content>
              <p>{error}</p>
            </Content>
          </Dialog>
        )}
      </FormField>
    </ChangeIndicatorCompareValueProvider>
  )
})

export default VideoPlayer
