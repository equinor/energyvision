import { Table, BackgroundContainer } from '@components'
import { useEffect, useState } from 'react'
import { Remit, Message } from '../../types/types'
import styled from 'styled-components'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const Container = styled.div`
  padding: var(--space-3xLarge) var(--layout-paddingHorizontal-large);
  max-width: var(--maxViewportWidth);
  margin: auto;
`

const RemitTable = () => {
  const [remitData, setRemitData] = useState<Remit>()
  const fetchData = async () => {
    try {
      const url = `${publicRuntimeConfig.archiveStorageURL}/remit.json`
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

  const rowItem = (message: Message) => {
    return (
      <Table.Row key={message.ID}>
        <Table.Cell>{message.ID}</Table.Cell>
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
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.Cell>EVENT ID</Table.Cell>
              <Table.Cell>PUBLISHED</Table.Cell>
              <Table.Cell>EVENT START</Table.Cell>
              <Table.Cell>EXPECTED END</Table.Cell>
              <Table.Cell>EVENT END</Table.Cell>
              <Table.Cell>VOLUME IMPACT</Table.Cell>
              <Table.Cell>COMMENTS</Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {remitData?.Data?.List?.map((it) => (
              <>
                {rowItem(it.CurrentMessage)}
                {it.MessageHistory && <>{it.MessageHistory.map((item) => (item ? rowItem(item) : ''))}</>}
              </>
            ))}
          </Table.Body>
        </Table>
      </Container>
    </BackgroundContainer>
  )
}

export default RemitTable
