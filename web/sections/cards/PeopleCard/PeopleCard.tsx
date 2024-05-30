import { Typography } from '@core/Typography'
import { forwardRef, HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import { BaseLink, ButtonLink } from '@core/Link'
import Image, { Ratios } from '../../../pageComponents/shared/SanityImage'
import { getLocaleFromName } from '../../../lib/localization'
import { getUrlFromAction, urlFor } from '../../../common/helpers'
import { PeopleCardData } from '../../../types/types'
import { SocialProfileJsonLd } from 'next-seo'

export type PeopleCardProps = {
  data: PeopleCardData
  hasSectionTitle: boolean
} & HTMLAttributes<HTMLDivElement>

/**
 * Event Card component.
 * Remember to wrap in ul and li if in a list.
 * */
const PeopleCard = forwardRef<HTMLDivElement, PeopleCardProps>(function PeopleCard(
  { data, className = '', hasSectionTitle = true, ...rest },
  ref,
) {
  const { name, image, title, department, isLink, phone, email, cv, enableStructuredMarkup } = data
  const cvUrl = cv ? getUrlFromAction(cv) : ''
  const linkClassNames = 'text-norwegian-woods-100 no-underline hover:underline text-sm'
  return (
    <>
      <div
        ref={ref}
        className={twMerge(
          `h-full
        w-full
        grid
        grid-cols-1
        grid-rows-[max-content_1fr_auto]
        justify-items-center
        items-center
        gap-6
        shadow-card
        rounded-sm
        max-w-[300px]
        px-6
        py-8
        bg-white-100
        text-slate-80
        active:box-shadow-crisp-interact
        active:shadow-white-100-interact
        focus:outline-none
        focus-visible:envis-outline
        dark:text-white-100
        dark:focus-visible:envis-outline-invert
      `,
          className,
        )}
        {...rest}
      >
        {image && (
          <div className="relative size-[150px] box-content">
            <Image
              image={image}
              maxWidth={400}
              aspectRatio={Ratios.ONE_TO_ONE}
              quality={100}
              className="rounded-full"
            />
          </div>
        )}
        <div className="flex flex-col items-center justify-start">
          <Typography as={hasSectionTitle ? 'h3' : 'h2'} variant="sm" className="font-medium mb-2">
            {name}
          </Typography>
          {title && <div className="text-sm text-center">{title}</div>}
          {department && <div className="text-sm text-center">{department}</div>}
        </div>

        <div className="flex flex-col items-center gap-2">
          {isLink && cv && cvUrl ? (
            <ButtonLink
              href={cvUrl}
              aria-label={cv?.ariaLabel}
              locale={cv?.type === 'internalUrl' ? getLocaleFromName(cv?.link?.lang) : undefined}
            >
              {cv?.label}
            </ButtonLink>
          ) : (
            <>
              {email && (
                <BaseLink href={`mailto:${email}`} className={linkClassNames}>
                  {email}
                </BaseLink>
              )}
              {phone && (
                <BaseLink href={`tel:${phone}`} className={linkClassNames}>
                  {phone}
                </BaseLink>
              )}
            </>
          )}
        </div>
      </div>
      {enableStructuredMarkup && (
        <SocialProfileJsonLd
          type="Person"
          name={name}
          jobTitle={title}
          url=""
          sameAs={['']}
          worksFor={{
            type: 'Organization',
            name: 'Equinor',
            url: 'https://www.equinor.com',
          }}
          image={image ? urlFor(image).url : undefined}
          telephone={phone}
          email={email}
        />
      )}
    </>
  )
})
export default PeopleCard
