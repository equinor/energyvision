import { FaUser } from 'react-icons/fa';
import { MdOutlinePeopleAlt } from 'react-icons/md';
import { defaultLanguage } from '../../../../languages';
import { apiVersion } from '../../../../sanity.client';
import { personMetadata } from '../../../../schemas/documents/personMetadata';
import { Flags } from '../../datasetHelpers';

const metadataIcons = Object.fromEntries(
  personMetadata.map(({ value, icon }) => [value, icon]),
);

export const Organization = (S) =>
  Flags.HAS_PEOPLE
    ? S.listItem()
        .title('People')
        .icon(MdOutlinePeopleAlt)
        .schemaType('person')
        .child(
          S.list()
            .id('people')
            .title('People')
            .items(
              [
                {
                  id: 'cec',
                  title: 'CEC',
                  icon: metadataIcons.cec,
                  filter: 'metadata == "cec" || "cec" in metadata',
                },
                {
                  id: 'board-directors',
                  title: 'Board of directors',
                  icon: metadataIcons.boardDirector,
                  filter:
                    'metadata == "boardDirector" || "boardDirector" in metadata',
                },
                {
                  id: 'investor-relations',
                  title: 'Investor relations',
                  icon: metadataIcons.investorRelations,
                  filter:
                    'metadata == "investorRelations" || "investorRelations" in metadata',
                },
                {
                  id: 'media',
                  title: 'Media relations',
                  icon: metadataIcons.media,
                  filter: 'metadata == "media" || "media" in metadata',
                },
                {
                  id: 'autumn-conference',
                  title: 'Autumn conference',
                  icon: metadataIcons.autumnConference,
                  filter:
                    'metadata == "autumnConference" || "autumnConference" in metadata',
                },
                {
                  id: 'others',
                  title: 'Others',
                  icon: FaUser,
                  filter:
                    '!(metadata in ["media", "boardDirector", "cec", "investorRelations", "autumnConference"]) && coalesce(count(metadata[@ in ["media", "boardDirector", "cec", "investorRelations", "autumnConference"]]), 0) == 0',
                },
              ].map(({ id, title, icon, filter }) =>
                S.listItem()
                  .id(id)
                  .title(title)
                  .icon(icon)
                  .child(
                    S.documentTypeList('person')
                      .id(id)
                      .title(title)
                      .apiVersion(apiVersion)
                      .filter(
                        `_type == "person" && (!defined(lang) || lang in $baseLanguages) && (${filter})`,
                      )
                      .params({
                        baseLanguages: [
                          defaultLanguage.name,
                          defaultLanguage.iso,
                        ],
                      }),
                  ),
              ),
            ),
        )
    : S.EmptyItem;
