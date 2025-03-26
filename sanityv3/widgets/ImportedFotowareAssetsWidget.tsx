import { DashboardWidgetContainer } from "@sanity/dashboard"
import {type ReactNode, useEffect, useMemo, useState} from 'react'
import {Card, Stack, Button, Flex, Spinner } from '@sanity/ui'
import { useSchema } from 'sanity'
import { sanityClient } from '../sanity.client'

export interface ImportedFotowareAssetsWidgetConfig {}

const defaultProps = {}
  
  export function importedFotowareAssetsWidget(props: ImportedFotowareAssetsWidgetConfig): ReactNode {
    const {
    } = {
      ...defaultProps,
      ...props,
    }
  
    const [assets, setAssets] = useState<any[] | undefined>()
    const [selectedDataset, setSelectedDataset] = useState<string | undefined>()
    const [selectedAssetId, setSelectedAssetId] = useState<string | undefined>()
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<Error | undefined>()
    const schema = useSchema()

  

  
    return (
      <DashboardWidgetContainer
        header="Find imported Fotoware assets"
      >
        <Card>
          {error && <div>{error.message}</div>}
          {!error && loading && (
            <Card padding={4}>
              <Flex justify="center">
                <Spinner muted />
              </Flex>
            </Card>
          )}
          {!error && !assets && !loading && <div>Could not locate any assets :/</div>}
          <Stack space={2}>
         <Flex>
         <TextInput
            fontSize={[2, 2, 3, 4]}
            onChange={(event) =>
            setSelectedDataset(event.currentTarget.value)
            }
            padding={[3, 3, 4]}
            placeholder="Search in specific dataset"
            value={selectedDataset}
            />
                <Button
      fontSize={[2, 2, 3]}
      icon={PublishIcon}
      padding={[3, 3, 4]}
      text="Search in dataset"
      tone="primary"
    />
            </Flex>
            HEloo
          </Stack>
        </Card>
      </DashboardWidgetContainer>
    )
  }