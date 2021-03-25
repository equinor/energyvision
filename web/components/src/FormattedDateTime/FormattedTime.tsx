import { FormattedTime as ReactIntlTime } from 'react-intl'

export type TimeProps = {
  datetime: string
}

export const FormattedTime = ({ datetime }: TimeProps): JSX.Element => {
  return (
    <time dateTime={datetime}>
      <ReactIntlTime value={new Date(datetime)} />
    </time>
  )
}
