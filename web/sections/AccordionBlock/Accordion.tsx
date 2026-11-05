import { Details } from '@/core/Details/Details';
import { Image } from '@/core/Image/Image';
import Blocks from '@/portableText/Blocks';
import CallToActions from '@/sections/CallToActions';
import type { AccordionListData } from '@/types';

type AccordionProps = {
  hasSectionTitle?: boolean;
  data: AccordionListData[];
  queryParamName: string;
  id: string;
};

const Accordion = ({ data, id, hasSectionTitle = true }: AccordionProps) => {
  return (
    <div id={id}>
      {data.map((item) => {
        const { id, title: itemTitle, links, content, image } = item;

        return (
          <Details key={id}>
            <Details.Header hasSectionTitle={hasSectionTitle}>
              {itemTitle}
            </Details.Header>
            <Details.Content>
              {image?.asset && (
                <Image
                  grid="xs"
                  aspectRatio="16:9"
                  image={image}
                  className="max-w-72"
                  imageClassName="lg:aspect-video rounded-2xs"
                />
              )}
              {content && <Blocks value={content} variant="body" />}
              {links && (
                <CallToActions
                  callToActions={links}
                  linkVariant="fit"
                  className="pt-0"
                />
              )}
            </Details.Content>
          </Details>
        );
      })}
    </div>
  );
};

export default Accordion;
