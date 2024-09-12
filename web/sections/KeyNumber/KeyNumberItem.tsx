import { KeyNumberItemData } from '../../types'
import { Typography } from '@core/Typography'

type KeyNumberItemProps = KeyNumberItemData & { isScrollable?: boolean }
export default function ({ keyNumber, description, unit }: KeyNumberItemProps) {
  return (
    <div>
      <Typography className="text-4xl font-medium inline leading-planetary">{`${keyNumber?.toLocaleString()} `}</Typography>
      {unit && <Typography className="text-xl font-medium inline">{unit}</Typography>}
      {description && <Typography className="text-md pb-md">{description}</Typography>}
    </div>
  )
}
