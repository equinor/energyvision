import { ReactNode, useState, forwardRef } from 'react'
import { MemberField, set, unset } from 'sanity'
import type { ObjectInputProps } from 'sanity'
import { Buffer } from 'buffer'
import { UploadIcon, ResetIcon, EllipsisVerticalIcon } from '@sanity/icons'
import { Button, Dialog, Text, Label, Menu, MenuButton, MenuItem, Stack, Card, Box, useToast } from '@sanity/ui'
import HLSPlayer from './HLSPlayer'
import { baseUrl } from '../../resolveProductionUrl'
import { getObjectMemberField } from './utils/getObjectMemberField'

type VideoSelector = {
  id: string
  title: string
  url: string
}

type VideoSelectorProps = {
  value?: VideoSelector
  children?: ReactNode
} & ObjectInputProps

const SCREEN9_ACCOUNT_ID = process.env.SANITY_STUDIO_SCREEN9_ACCOUNT_ID
const SCREEN9_TOKEN = process.env.SANITY_STUDIO_SCREEN9_TOKEN
const SCREEN9_AUTH = Buffer.from(`${SCREEN9_ACCOUNT_ID}:${SCREEN9_TOKEN}`).toString('base64')

const VideoSelector = forwardRef(function VideoSelector(
  props: VideoSelectorProps,
  forwardedRef: React.ForwardedRef<HTMLDivElement>,
) {
  const toast = useToast()
  const [open, setIsOpen] = useState(false)
  const [error, setError] = useState('')
  const { value, members, renderField, renderInput, renderItem, renderPreview, onChange } = props

  const handleOpenModal = async () => {
    if (value?.id) {
      setIsOpen(true)
      const videoId = value.id
      const endpoint = `${baseUrl}/api/screen9/${SCREEN9_ACCOUNT_ID}/videos/${videoId}/streams,meta?ssl=true`

      const data = await fetch(endpoint, {
        headers: {
          Authorization: `Basic ${SCREEN9_AUTH}`,
        },
      })
        .then((res) =>
          res.status !== 200
            ? setError(
                res.status == 404
                  ? 'The video corresponding to the given Id is not found. Please check the media Id and try again. '
                  : 'Could not retrieve url from Screen9. Please report the error to the dev team.',
              )
            : res.json(),
        )
        .catch((error) => {
          setError(`Could not retrieve url from Screen9. Please report the error to the dev team. Error: ${error}`)
        })

      if (data && !data.error) {
        const video = {
          id: videoId,
          title: data.meta.title,
          url: data.streams.hls,
        }
        // save to document
        onChange(set(video))
        setIsOpen(false)
      }
    } else {
      toast.push({
        status: 'error',
        title: 'Enter media id of the video',
      })
    }
  }

  const handleReset = () => {
    onChange(unset())
  }

  const title = getObjectMemberField(members, 'title')
  const id = getObjectMemberField(members, 'id')

  return (
    <>
      {error && (
        <Dialog id="error-dialog" header={'Error'} onClose={() => setError('')}>
          <Box padding={4}>
            <Text>{error}</Text>
          </Box>
        </Dialog>
      )}
      {open && error.length != 0 && (
        <Dialog header="Fetch video from Quickchannel" id="fetch-video" onClose={() => setIsOpen(false)} zOffset={1000}>
          <Box padding={4}>
            <Text>Fetching video url... {(id?.field?.value as string) || (open && !error)} </Text>
          </Box>
        </Dialog>
      )}
      {!value?.url ? (
        <Stack space={2}>
          {id && (
            <MemberField
              member={id}
              renderInput={renderInput}
              renderField={renderField}
              renderItem={renderItem}
              renderPreview={renderPreview}
            />
          )}
          <Button
            icon={UploadIcon}
            mode="ghost"
            type="button"
            onClick={handleOpenModal}
            text="Fetch video from QuickChannel"
          />
        </Stack>
      ) : (
        value.url && (
          <Stack space={4} marginTop={2}>
            <Stack space={3}>
              <Label as="label" htmlFor="text-input" size={1}>
                Title
              </Label>
              {title && (
                <MemberField
                  member={title}
                  renderInput={renderInput}
                  renderField={renderField}
                  renderItem={renderItem}
                  renderPreview={renderPreview}
                />
              )}
            </Stack>

            <Stack space={3}>
              <Label as="label" htmlFor="asset" size={1}>
                Asset
              </Label>

              <div ref={forwardedRef} id="asset" style={{ position: 'relative' }}>
                <Card border paddingX={6} tone="transparent">
                  <HLSPlayer
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
        )
      )}
    </>
  )
})

export default VideoSelector
