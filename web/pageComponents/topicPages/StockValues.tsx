import { StockValuesData } from '../../types/types'

const StockValues = ({ data }: { data: StockValuesData }) => {
  console.log({ data })

  return (
    <div>
      <p>stock values</p>
    </div>
  )
}

export default StockValues
