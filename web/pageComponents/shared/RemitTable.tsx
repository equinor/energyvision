import { Table, BackgroundContainer } from '@components'
import { useEffect, useState } from 'react'
import { Remit, Message } from '../../types/types'
import styled from 'styled-components'
import { Button, Typography } from '@equinor/eds-core-react'

const Container = styled.div`
  padding: var(--space-3xLarge) var(--layout-paddingHorizontal-large);
  max-width: var(--maxViewportWidth);
  margin: auto;
`
const StyledButton = styled(Button)`
  margin: var(--space-medium) 0 var(--space-medium) var(--space-medium);
`

const RemitTable = () => {
  const [remitData, setRemitData] = useState<Remit>()
  const [isPlannedEvent, setPlannedEvent] = useState<boolean>(false)
  const fetchData = async () => {
    try {
      const url = `/services/remit`
      const response = await fetch(url)
      const json: Remit = await response.json()
      setRemitData(json)
    } catch (error) {
      console.log('error', error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  const rowItem = (message: Message, shouldShowPublishStatus: boolean) => {
    return (
      <Table.Row key={message.MessagePublishedTime}>
        <Table.Cell>
          {message.ID} {shouldShowPublishStatus && message.Version > 1 && 'Updated\n'}
          {shouldShowPublishStatus && message.IsPublishedByGassco && 'Published by gassco'}
        </Table.Cell>
        <Table.Cell>
          {message.MessagePublishedDateLocal}
          <br></br>
          {message.MessagePublishedTimeOfDayLocal}
        </Table.Cell>
        <Table.Cell>
          {message.EventStartDateLocal}
          <br></br>
          {message.EventStartTimeOfDayLocal}
        </Table.Cell>
        <Table.Cell>
          {message.ExpectedEventEndDateLocal}
          <br></br>
          {message.ExpectedEventEndTimeOfDayLocal}
        </Table.Cell>
        <Table.Cell>
          {message.ActualEventEndDateLocal}
          <br></br>
          {message.ActualEventEndTimeOfDayLocal}
        </Table.Cell>
        <Table.Cell>{message.Volume}</Table.Cell> <Table.Cell>{message.Comments}</Table.Cell>
      </Table.Row>
    )
  }

  return (
    <BackgroundContainer>
      <Container>
        <>
          {!isPlannedEvent && (
            <>
              <StyledButton
                color="primary"
                onClick={() => {
                  setPlannedEvent(false)
                }}
              >
                Unplanned Events
              </StyledButton>
              <StyledButton
                color="primary"
                variant="outlined"
                onClick={() => {
                  setPlannedEvent(true)
                }}
              >
                Planned Events
              </StyledButton>
            </>
          )}
        </>
        <>
          {isPlannedEvent && (
            <>
              <StyledButton
                color="primary"
                variant="outlined"
                onClick={() => {
                  setPlannedEvent(false)
                }}
              >
                Unplanned Events
              </StyledButton>
              <StyledButton
                color="primary"
                onClick={() => {
                  setPlannedEvent(true)
                }}
              >
                Planned Events
              </StyledButton>
            </>
          )}
        </>
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.Cell>
                EVENT ID <Typography variant="meta">(CET)</Typography>
              </Table.Cell>
              <Table.Cell>
                PUBLISHED <Typography variant="meta">(CET)</Typography>
              </Table.Cell>
              <Table.Cell>
                EVENT START <Typography variant="meta">(CET)</Typography>
              </Table.Cell>
              <Table.Cell>
                EXPECTED END <Typography variant="meta">(CET)</Typography>
              </Table.Cell>
              <Table.Cell>
                EVENT END <Typography variant="meta">(CET)</Typography>
              </Table.Cell>
              <Table.Cell>
                VOLUME IMPACT <Typography variant="meta">(MSm/day)</Typography>
              </Table.Cell>
              <Table.Cell>COMMENTS</Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {remitData?.Data?.List?.filter((it) => it.CurrentMessage.IsPlannedEvent == isPlannedEvent).map((it) => (
              <>
                {rowItem(it.CurrentMessage, true)}
                {it.MessageHistory && it.MessageHistory.map((item) => (item ? rowItem(item, false) : ''))}
              </>
            ))}
          </Table.Body>
        </Table>
      </Container>
    </BackgroundContainer>
  )
}

export default RemitTable
