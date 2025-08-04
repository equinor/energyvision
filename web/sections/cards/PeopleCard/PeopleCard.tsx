import { Typography } from '@/core/Typography'
import { forwardRef, HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import { BaseLink, ResourceLink } from '@/core/Link'
import Image, { getSmallerThanPxLgSizes } from '../../../core/SanityImage/SanityImage'
import { getLocaleFromName } from '../../../lib/localization'
import { getUrlFromAction, urlFor } from '../../../common/helpers'
import { PeopleCardData } from '../../../types/index'
import { SocialProfileJsonLd } from 'next-seo'

export type PeopleCardProps = {
  data: PeopleCardData
  hasSectionTitle: boolean
  variant?: 'default' | 'single'
} & HTMLAttributes<HTMLDivElement>

/**
 * Event Card component.
 * Remember to wrap in ul and li if in a list.
 * */
const PeopleCard = forwardRef<HTMLDivElement, PeopleCardProps>(function PeopleCard(
  { data, className = '', variant = 'default', hasSectionTitle = true, ...rest },
  ref,
) {
  const { name, image, title, department, isLink, phone, email, cv, enableStructuredMarkup } = data
  const cvUrl = cv ? getUrlFromAction(cv) : ''
  const linkClassNames = 'text-norwegian-woods-100 no-underline hover:underline text-sm'

  const variantClassNames = {
    default: `grid-cols-1 grid-rows-[max-content_1fr] justify-items-center items-start gap-0`,
    single: `grid-cols-[30%_60%] grid-rows-1 gap-4 lg:gap-8 items-start lg:items-center`,
  }

  return (
    <>
      <div
        ref={ref}
        className={twMerge(
          `grid h-full w-full ${variantClassNames[variant]} active:shadow-white-100-interact focus-visible:envis-outline dark:focus-visible:envis-outline-invert rounded-xs bg-white-100 px-6 py-8 text-slate-80 shadow-card focus:outline-hidden active:box-shadow-crisp-interact dark:text-white-100`,
          className,
        )}
        {...rest}
      >
        {image && (
          <div
            className={`relative ${variant === 'single' ? 'lg:p-4' : 'size-[150px]'} box-content ${
              variant === 'single' ? '' : 'mb-10'
            }`}
          >
            <Image
              image={image}
              maxWidth={400}
              sizes={getSmallerThanPxLgSizes()}
              aspectRatio="1:1"
              quality={100}
              className="rounded-full"
            />
          </div>
        )}
        <div className={`grid h-full grid-cols-1 grid-rows-[1fr_auto]`}>
          <div
            className={`flex flex-col ${
              variant === 'single' ? 'items-start justify-center' : 'items-center justify-start text-center'
            } max-w-prose`}
          >
            <Typography
              as={hasSectionTitle ? 'h3' : 'h2'}
              variant={`${variant === 'single' ? 'md' : 'sm'}`}
              className="mb-4 font-medium"
            >
              {name}
            </Typography>
            {title && <div className="text-sm text-pretty text-slate-80 dark:text-white-100">{title}</div>}
            {department && (
              <div className="mt-2 text-sm text-pretty text-slate-80 dark:text-white-100">{department}</div>
            )}
          </div>

          <div
            className={`flex flex-col ${
              variant === 'single' ? 'items-start justify-center' : 'items-center justify-start text-center'
            } gap-2 pt-6`}
          >
            {isLink && cv && cvUrl ? (
              <ResourceLink
                href={cvUrl}
                hrefLang={cv?.type === 'internalUrl' ? getLocaleFromName(cv?.link?.lang) : undefined}
                variant="fit"
              >
                {cv?.label}
              </ResourceLink>
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
