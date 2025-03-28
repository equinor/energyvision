import { Card, Stack, Box, Button, Flex, Spinner, Grid } from '@sanity/ui'
import { Feedback, useListeningQuery } from 'sanity-plugin-utils'
import { DashboardWidgetContainer, DashboardWidget, LayoutConfig } from '@sanity/dashboard'
import { SanityDocument } from 'sanity'
import styled from 'styled-components'
import { isAfter, isBefore, subDays } from 'date-fns'
import { CheckmarkIcon, WarningOutlineIcon, WarningFilledIcon } from '@sanity/icons'
import { useMemo, useState } from 'react'

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 340px);
  grid-template-rows: repeat(auto-fill, 300px);
  gap: 20px;
`
const InnerGrid = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
`
const StyledImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  object-position: center;
  aspect-ratio: 16/9;
`
const StyledCard = styled.div`
  width: 100%;
  height: 100%;
`
const StyledStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-height: 32px;
`
const ExpirationDateContainer = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`
const FotowareLink = styled.a`
  color: black;
`

function ImportedFotowareAssetsWidget() {
  const { data, loading, error } = useListeningQuery<SanityDocument[]>(
    `*[_type == "sanity.imageAsset" && source.name match "fotoware*"]`,
    {
      params: {},
      initialValue: [],
    },
  )

  const formattedAssets = useMemo(() => {
    return data?.length > 0
      ? data.map((asset: SanityDocument) => {
          const splitDate = asset.source.name.split('_')[1]
          const expDate = splitDate ? new Date(splitDate) : undefined
          const expired = expDate ? isAfter(new Date(), expDate) : undefined
          // expDate is not expired but after the margin of 30 days before expirationDate
          const soonExpiring = expDate ? !expired && isAfter(subDays(new Date(), 30), expDate) : undefined
          //Is valid before the margin of 30 days before expirationDate
          const valid = expDate ? isBefore(subDays(new Date(), 30), expDate) : undefined
          return {
            ...asset,
            expirationDate: expDate,
            expired,
            soonExpiring,
            valid,
          }
        })
      : []
  }, [data])

  const [sortedAssets, setSortedAssets] = useState(formattedAssets)
  const [sortType, setSortType] = useState<'expiration' | 'created'| 'updated'>("expiration")

  return (
    <DashboardWidgetContainer header="Find imported Fotoware assets">
      <Card>
        {error && <div>{error.message}</div>}
        {!error && loading && (
          <Card padding={4}>
            <Flex justify="center">
              <Spinner muted />
            </Flex>
          </Card>
        )}
        <div>

        </div>
        <StyledGrid>
          {sortedAssets?.length > 0 ? (
            sortedAssets.map((image) => {
              const formattedDate = image.expirationDate
                ? image.expirationDate.toLocaleString('no-NB', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                  })
                : undefined
              let iconColor = 'orange'
              if (image.expired) {
                iconColor = 'red'
              }
              return (
                <StyledCard key={image._id}>
                  <InnerGrid>
                    <StyledImage src={image.url} />
                    <StyledStack>
                      <div style={{ color: iconColor, width: '24px', height: '24px' }}>
                        {image.expired && <WarningFilledIcon width={24} height={24} />}
                        {image.soonExpiring && <WarningOutlineIcon width={24} height={24} />}
                      </div>
                      <div>{image.title}</div>
                      {expDate && <ExpirationDateContainer>Expires: {formattedDate}</ExpirationDateContainer>}
                      {image.metadata.expirationDate && <div>metadata exp: {image.metadata.expirationDate}</div>}
                      {image.source.url && <FotowareLink href={image.source.url}>Fotoware url</FotowareLink>}
                    </StyledStack>
                  </InnerGrid>
                </StyledCard>
              )
            })
          ) : (
            <Feedback>No images found</Feedback>
          )}
        </StyledGrid>
      </Card>
    </DashboardWidgetContainer>
  )

  /*   return <DashboardWidgetContainer header="Hello">Widget</DashboardWidgetContainer> */
}

export function fotowareWidget(config: { layout?: LayoutConfig } = {}): DashboardWidget {
  return {
    name: 'fotoware-widget',
    component: ImportedFotowareAssetsWidget,
    layout: config.layout ?? { width: 'medium' },
  }
}
