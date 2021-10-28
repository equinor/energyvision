import { Table } from "@equinor/eds-core-react"
import { useEffect, useState } from "react"


const RemitTable = () =>{
  
  const [remitData,setRemitData] = useState("")
  useEffect(() => {
    const url = "https://www.equinor.com/services/remit";

    const fetchData = async () => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            setRemitData(json);
        } catch (error) {
            console.log("error", error);
        }
    };
    fetchData()
  },[]);
  

  return (
<Table>
  <Table.Caption>
      REMIT Table
  </Table.Caption>
  <Table.Head>
    <Table.Row>
      <Table.Cell>
        EVENT ID
      </Table.Cell>
      <Table.Cell>
        PUBLISHED
      </Table.Cell>
      <Table.Cell>
        EVENT START
      </Table.Cell>
      <Table.Cell>
        EXPECTED END
      </Table.Cell>
      <Table.Cell>
        EVENT END
      </Table.Cell>
      <Table.Cell>
        VOLUME IMPACT
      </Table.Cell>
      <Table.Cell>
        COMMENTS
      </Table.Cell>
    </Table.Row>
  </Table.Head>
  <Table.Body>
     {
        remitData?.Data?.List.map(it => 
            <Table.Row key={it.CurrentMessage.ID}>
              <Table.Cell>
                {it.CurrentMessage.ID}
              </Table.Cell>
              <Table.Cell>
                {it.CurrentMessage.MessagePublishedDateLocal}
                <br></br>
                {it.CurrentMessage.MessagePublishedTimeOfDayLocal}
              </Table.Cell>
              <Table.Cell>
              {it.CurrentMessage.EventStartDateLocal}
                <br></br>
                {it.CurrentMessage.EventStartTimeOfDayLocal}
              </Table.Cell> <Table.Cell>
              {it.CurrentMessage.ExpectedEventEndDateLocal}
                <br></br>
                {it.CurrentMessage.ExpectedEventEndTimeOfDayLocal}
              </Table.Cell> <Table.Cell>
              {it.CurrentMessage.ActualEventEndDateLocal}
                <br></br>
                {it.CurrentMessage.ActualEventEndTimeOfDayLocal}
              </Table.Cell> <Table.Cell>
                {it.CurrentMessage.Volume}
              </Table.Cell> <Table.Cell>
                {it.CurrentMessage.Comments}
              </Table.Cell>
            </Table.Row>
        )
     }
  </Table.Body>
</Table>

  )

}

export default RemitTable
