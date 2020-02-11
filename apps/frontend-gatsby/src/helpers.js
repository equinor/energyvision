import { DateTime } from 'luxon'

export const convertDate = (date, format) => {
  const dt = DateTime.fromISO(date, {
    zone: 'utc',
  }).setZone('Europe/Oslo')

  return dt.toFormat(format)
}
