import { ReadOnlyIcon } from '@sanity/icons'
import { Card, Flex, Text, Box } from '@sanity/ui'

export const ReadOnlyWrapper = ({ children, readOnly }: any) => {
  return readOnly ? (
    <Box display="flex" style={{ position: 'relative' }}>
      {children}
      <Card
        padding={[3, 3, 4, 5]}
        display="flex"
        style={{
          '--card-bg-color': '#efefefcc',
          outline: '1px solid #a3a3a39a',
          position: 'absolute',
          top: '0',
          width: '-webkit-fill-available',
          height: '-webkit-fill-available',
        }}
      >
        <Flex
          paddingBottom={1}
          paddingRight={1}
          justify="center"
          style={{ background: '#efefef', position: 'absolute', bottom: 0, right: 0 }}
        >
          <ReadOnlyIcon fontSize={24} />
          <Text size={2} style={{ color: 'rgb(41,41,41)', paddingLeft: '12px', alignSelf: 'center' }}>
            Read only
          </Text>
        </Flex>
      </Card>
    </Box>
  ) : (
    <>{children}</>
  )
}
