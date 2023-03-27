import React, { useState, useCallback, useEffect, useRef, forwardRef } from 'react'
import { Button, Card, Dialog, Label, Menu, MenuButton, MenuDivider, MenuItem, Stack, TextInput } from '@sanity/ui'
import { createPortal } from 'react-dom'
import { PatchEvent, set, unset } from '@sanity/form-builder/PatchEvent'
import { UploadIcon, ResetIcon, EllipsisVerticalIcon, ComponentIcon } from '@sanity/icons'
import { ChangeIndicatorCompareValueProvider, FormField } from '@sanity/base/components'
import { useId } from '@reach/auto-id'
import { SanityDocument, Marker } from '@sanity/types'
import { Content } from '../../plugins/asset-source-fotoware/src/components'
import { baseUrl } from '../../resolveProductionUrl'
import HLSPlayer from './HLSPlayer'

const MEDIABANK_DOMAIN = 'https://communicationtoolbox.equinor.com'
const MEDIABANK_URL =
  MEDIABANK_DOMAIN +
  '/dam2/archive?p_com_id=12366&p_oty_id=146867&p_ptl_id=16613&p_lae_id=2&p_mode=plugin_object&p_filter=status:1;sort:obt_id%20desc;type:AND;viewers:VIDEO_VIEWER;localCategories:822833'
const MEDIABANK_IMPORT_TYPE = 'dam:assets-imported'

const SCREEN9_ACCOUNT_ID = '985917'
const SCREEN9_TOKEN = process.env.SANITY_STUDIO_SCREEN9_TOKEN
const SCREEN9_AUTH = Buffer.from(`${SCREEN9_ACCOUNT_ID}:${SCREEN9_TOKEN}`).toString('base64')

type VideoSelector = {
  title: string
  url: string
}

interface Props {
  children?: React.ReactNode
  value?: VideoSelector
  compareValue?: VideoSelector
  onChange: (event: PatchEvent) => void
  type: { title: string; description: string }
  level: number
  document: SanityDocument
  markers: Marker[]
  presence: any
}

const VideoSelector = forwardRef(function VideoSelector(
  props: Props,
  forwardedRef: React.ForwardedRef<HTMLDivElement>,
) {
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
    async (event: MessageEvent) => {
      if (!event || !event.data || event.origin !== MEDIABANK_DOMAIN) return false

      const message = JSON.parse(event.data)

      if (message?.type === MEDIABANK_IMPORT_TYPE) {
        const file = message.data.assets[0]

        if (file.viewer === 'VIDEO_VIEWER' && file.screen9Connected) {
          const videoId = file.flvVideoRef
          const endpoint = `${baseUrl}/${SCREEN9_ACCOUNT_ID}/videos/${videoId}/streams?ssl=true`

          const data = await fetch(endpoint, {
            headers: {
              Authorization: `Basic ${SCREEN9_AUTH}`,
            },
          }).then((res) =>
            res.status !== 200
              ? setError(`Could not retrieve url from Screen9. Please report the error to the dev team.`)
              : res.json(),
          )

          if (!data.error) {
            const video = {
              title: file.title,
              url: data.streams.hls,
            }
            // save to document
            onChange(PatchEvent.from(set(video)))
          }
        } else {
          setError('File is not supported. Please select a equinor.com video file.')
        }
        closeModal()
      }
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
    const height = 800
    const width = 1200

    const left = window.screen.width / 2 - width / 2
    const top = window.screen.height / 2 - height / 2

    if (container) {
      newWindow.current = window.open(
        MEDIABANK_URL,
        'Media Bank',
        `height=${height},width=${width},left=${left},top=${top}`,
      )

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
              <div ref={forwardedRef} id="asset" style={{ position: 'relative' }}>
                <Card border paddingX={6} tone="transparent">
                  <HLSPlayer
                    // src="https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8"
                    src={value.url}
                    controls={true}
                    width="100%"
                    height="350px"
                    style={{ marginBottom: '-5px', background: 'black' }}
                  />
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

export default VideoSelector
