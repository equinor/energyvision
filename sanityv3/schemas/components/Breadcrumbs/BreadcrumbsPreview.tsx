import { Text, Card, Heading, Box } from '@sanity/ui'

export const BreadcrumbsPreview = ({ breadcrumbs }: { breadcrumbs: string[] }) => (
  <Box marginTop={2} marginBottom={2}>
    <Heading as="h3" size={0}>
      Preview
    </Heading>
    <Card padding={[3, 3, 4]} radius={2} shadow={1} marginTop={3}>
      <Text size={1}>
        {breadcrumbs.map((item, idx) => (
          <span key={item} style={{ display: 'inline-block', paddingRight: 5 }}>
            {item}
            {idx < breadcrumbs.length - 1 && <span style={{ paddingLeft: 5 }}>{'>'}</span>}
          </span>
        ))}
      </Text>
    </Card>
  </Box>
)
