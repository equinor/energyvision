import { ReactNode } from 'react'
import { useToast, Button, Tooltip, Box, Text } from '@sanity/ui'
import { CopyIcon } from '@sanity/icons'

type Props = {
  src: string
  children: ReactNode
  shareable?: boolean
}

export const PreviewWrapper = ({ src, children, shareable = true }: Props) => {
  const toast = useToast()
  const handleClick = () => {
    navigator.clipboard.writeText(src)
    toast.push({
      status: 'success',
      title: 'Preview link copied to clipboard',
    })
  }

  return (
    <div style={{ height: '100%', width: '100%' }}>
      {shareable && (
        <Tooltip
          content={
            <Box padding={2}>
              <Text muted size={1}>
                Copy shareable link to clipboard
              </Text>
            </Box>
          }
          placement="left"
          portal
        >
          <Button
            tone="primary"
            radius={6}
            icon={CopyIcon}
            onClick={handleClick}
            style={{
              position: 'absolute',
              right: '10px',
              top: '6px',
            }}
          />
        </Tooltip>
      )}
      {children}
    </div>
  )
}
