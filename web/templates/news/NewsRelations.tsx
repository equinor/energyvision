import { Image } from '@/core/Image/Image';
import { BaseLink } from '@/core/Link/BaseLink';
import { Typography } from '@/core/Typography/Typography';
import { removeWhiteSpace } from '@/lib/helpers/removeWhiteSpace';
import type { NewsPageProps } from './News';

export const NewsRelations = ({
  relations,
}: {
  relations: NewsPageProps['relations'];
}) => {
  if (!relations?.persons?.length) return null;

  return (
    <section className="pb-page-content">
      {relations.title && (
        <Typography variant="h2" className="">
          {relations.title}
        </Typography>
      )}
      <ul className="m-0 flex list-none flex-col gap-8 p-0">
        {relations.persons.map(({ id, title, person }) => (
          <li key={id}>
            {title && (
              <Typography as="h3" variant="h4" className="mt-0 mb-6">
                {title}
              </Typography>
            )}
            <div className="flex items-center gap-4">
              {person.image?.asset && (
                <div className="aspect-square w-20 shrink-0 overflow-hidden rounded-full sm:w-24">
                  <Image
                    image={person.image}
                    aspectRatio="1:1"
                    grid="xs"
                    fill
                    keepRatioOnMobile
                    imageClassName="object-cover"
                  />
                </div>
              )}
              <div className="min-w-0">
                <Typography variant={`md`} className="">
                  {person.name}
                </Typography>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  {person.title && (
                    <Typography variant="simple">{person.title}</Typography>
                  )}
                  {person.mobileNumber && (
                    <BaseLink
                      href={`tel:${removeWhiteSpace(person.mobileNumber)}`}
                      className="whitespace-nowrap"
                    >
                      {person.mobileNumber}
                    </BaseLink>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
