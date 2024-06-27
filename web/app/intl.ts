'server-only'
import { createIntl } from '@formatjs/intl'
import getIntlConfig from '../common/helpers/getIntl'

export default async function getIntl(locale: string) {
  return createIntl(await getIntlConfig(locale, false))
}
