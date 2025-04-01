import { Card, Flex, Spinner, Select, Label } from '@sanity/ui'
import { Feedback, useListeningQuery } from 'sanity-plugin-utils'
import { DashboardWidgetContainer, DashboardWidget, LayoutConfig } from '@sanity/dashboard'
import { SanityDocument } from 'sanity'
import styled from 'styled-components'
import { isAfter, isBefore, subDays, format, isDate } from 'date-fns'
import { WarningOutlineIcon, WarningFilledIcon } from '@sanity/icons'
import { useEffect, useMemo, useState } from 'react'

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
const StyledCard = styled(Card)`
  padding: 1.25rem 0.75rem;
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
const SortBar = styled.div`
  display: flex;
  gap: 12px;
  backgroundcolor: grey;
  padding: 1.25rem 0.75rem;
`
const SelectWrapper = styled.div`
  & > div {
    width: fit-content;
  }
`
const StyledLabel = styled(Label)`
  padding: 8px 0px;
  text-transform: none;
`

type SortTypes = 'expiration' | 'created' | 'updated'
type SortDirections = 'asc' | 'desc'

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

  const [sortedAssets, setSortedAssets] = useState([])
  const [sortType, setSortType] = useState<SortTypes>('expiration')
  const [sortDirection, setSortDirection] = useState<SortDirections>('desc')

  const handleSortChange = (type: SortTypes, direction: SortDirections) => {
    const sorted = formattedAssets.sort((a, b) => {
      if (type === 'created') {
        return direction === 'desc'
          ? new Date(b._createdAt) - new Date(a._createdAt)
          : new Date(a._createdAt) - new Date(b._createdAt)
      }
      if (type === 'updated') {
        return direction === 'desc'
          ? new Date(b._updatedAt) - new Date(a._updatedAt)
          : new Date(a._updatedAt) - new Date(b._updatedAt)
      }

      if (!a.expirationDate || !b.expirationDate) {
        return !a.expirationDate - !b.expirationDate
        //return -1
      }
      return direction === 'desc'
        ? new Date(b.expirationDate) - new Date(a.expirationDate)
        : new Date(a.expirationDate) - new Date(b.expirationDate)
    })
    setSortedAssets(sorted)

    if (sortType !== type) {
      setSortType(type)
    }
    if (sortDirection !== direction) {
      setSortDirection(direction)
    }
  }
  useEffect(() => {
    if (formattedAssets?.length > 0) {
      handleSortChange(sortType, sortDirection)
    }
  }, [formattedAssets])

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
        <SortBar>
          <div>
            <StyledLabel id="sort_label" size={5}>
              Sort by:
            </StyledLabel>
            <SelectWrapper>
              <Select
                aria-labelledby="sort_label"
                onChange={(event) => handleSortChange(event.target.value, sortDirection)}
                value={sortType}
                fontSize={[2, 2, 3, 4]}
                padding={[3, 3, 4]}
                space={[3, 3, 4]}
              >
                <option value="expiration">Expiration date</option>
                <option value="created">Created</option>
                <option value="updated">Updated</option>
              </Select>
            </SelectWrapper>
          </div>
          <div>
            <StyledLabel id="sort_direction_label" size={5}>
              Direction:
            </StyledLabel>
            <SelectWrapper>
              <Select
                aria-labelledby="sort_direction_label"
                onChange={(event) => handleSortChange(sortType, event?.target.value)}
                value={sortDirection}
                fontSize={[2, 2, 3, 4]}
                padding={[3, 3, 4]}
                space={[3, 3, 4]}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </Select>
            </SelectWrapper>
          </div>
        </SortBar>
        <StyledGrid>
          {sortedAssets?.length > 0 ? (
            sortedAssets.map((image) => {
              return (
                <StyledCard key={image._id}>
                  <InnerGrid>
                    <StyledImage src={image.url} />
                    <StyledStack>
                      <div style={{ color: image.expired ? 'red' : 'orange', width: '24px', height: '24px' }}>
                        {image.expired && <WarningFilledIcon width={24} height={24} />}
                        {image.soonExpiring && <WarningOutlineIcon width={24} height={24} />}
                      </div>
                      <div>{image.title}</div>
                      {sortType === 'created' && (
                        <ExpirationDateContainer>
                          Created: {format(new Date(image._createdAt), 'd. MMM yyyy mm:HH')}
                        </ExpirationDateContainer>
                      )}
                      {sortType === 'updated' && (
                        <ExpirationDateContainer>
                          Created: {format(new Date(image._updatedAt), 'd. MMM yyyy mm:HH')}
                        </ExpirationDateContainer>
                      )}
                      {image.expirationDate && isDate(image.expirationDate) && (
                        <ExpirationDateContainer>
                          Expires: {format(new Date(image.expirationDate), 'd. MMM yyyy mm:HH')}
                        </ExpirationDateContainer>
                      )}
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
}

export function fotowareWidget(config: { layout?: LayoutConfig } = {}): DashboardWidget {
  return {
    name: 'fotoware-widget',
    component: ImportedFotowareAssetsWidget,
    layout: config.layout ?? { width: 'medium' },
  }
}
