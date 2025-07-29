import { FormattedDateTime } from '@core/FormattedDateTime'
import { Icon } from '@equinor/eds-core-react'
import { calendar } from '@equinor/eds-icons'

const MagazineDate = ({ classname, firstPublishedAt }: { classname: string; firstPublishedAt: string | undefined }) => {
  return firstPublishedAt ? (
    <div className={`grid grid-cols-[min-content_1fr] gap-4 pb-6 ${classname}`}>
      <Icon data={calendar} className="text-black-100" />
      <div className="text-black-100 overflow-wrap-break-word text-base leading-planetary">
        <FormattedDateTime datetime={firstPublishedAt} uppercase timezone />
      </div>
    </div>
  ) : null
}

export default MagazineDate
