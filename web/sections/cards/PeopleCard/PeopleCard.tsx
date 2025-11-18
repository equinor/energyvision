import { Typography } from '@/core/Typography'
import { forwardRef, HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import { BaseLink, ResourceLink } from '@/core/Link'
import { Image } from '../../../core/Image/Image'
import { getLocaleFromName } from '../../../sanity/localization'
import { getUrlFromAction } from '@/lib/helpers/getUrlFromAction'
import { PeopleCardData } from '../../../types/index'
import { SocialProfileJsonLd } from 'next-seo'
import { urlForImage } from '@/sanity/lib/utils'

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
    default: `w-full flex gap-4 lg:gap-8 lg:flex-col `,
    single: `w-full lg:w-fit flex flex-col lg:flex-row gap-8 lg:gap-12`,
  }
  const variantContentClassNames = {
    default: `justify-center items-start lg:items-center`,
    single: `justify-center items-center lg:items-start`,
  }

  return (
    <>
      <div
        ref={ref}
        className={twMerge(
          `grid h-full items-center justify-center ${variantClassNames[variant]} active:shadow-white-100-interact focus-visible:envis-outline dark:focus-visible:envis-outline-invert rounded-xs bg-white-100 px-6 py-8 text-slate-80 shadow-card focus:outline-hidden active:box-shadow-crisp-interact dark:text-white-100`,
          className,
        )}
        {...rest}
      >
        {image && (
          <div className={`${variant === 'single' ? 'size-64' : 'size-40'}`}>
            <Image image={image} grid="xs" aspectRatio="1:1" imageClassName="rounded-full" />
          </div>
        )}
        <div className={`flex flex-col ${variantContentClassNames[variant]}`}>
          <Typography
            as={hasSectionTitle ? 'h3' : 'h2'}
            variant={`${variant === 'single' ? 'md' : 'sm'}`}
            className="mb-4 font-medium"
          >
            {name}
          </Typography>
          {title && <div className="text-sm text-pretty text-slate-80 dark:text-white-100">{title}</div>}
          {department && <div className="mt-2 text-sm text-pretty text-slate-80 dark:text-white-100">{department}</div>}
          {isLink && cv && cvUrl ? (
            <ResourceLink
              href={cvUrl}
              hrefLang={cv?.type === 'internalUrl' ? getLocaleFromName(cv?.link?.lang) : undefined}
              variant="fit"
              className="mt-4"
            >
              {cv?.label}
            </ResourceLink>
          ) : (
            <div className="mt-4 flex flex-col items-center gap-1 text-center">
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
            </div>
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
          image={image ? urlForImage(image) : undefined}
          telephone={phone}
          email={email}
        />
      )}
    </>
  )
})
export default PeopleCard
