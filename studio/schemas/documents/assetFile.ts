import {
  attach_file,
  calendar_event,
  file,
  library_pdf,
  microsoft_excel,
  microsoft_powerpoint,
  microsoft_word,
} from '@equinor/eds-icons';
import { getExtension, getFileAsset } from '@sanity/asset-utils';
import { Stack } from '@sanity/ui';
import { createElement } from 'react';
import { RiMovieLine } from 'react-icons/ri';
import {
  type File,
  type FileInputProps,
  type Reference,
  type Rule,
  useClient,
} from 'sanity';
import { EdsIcon } from '../../icons';
import { apiVersion } from '../../sanity.client';
import HLSPlayer from '../components/HLSPlayer';

const MAX_MP4_SIZE_BYTES = 25_000_000;
const MAX_MP4_DURATION_SECONDS = 15;
const MP4_METADATA_TIMEOUT_MS = 10_000;

const getMp4Duration = (url: string): Promise<number> =>
  new Promise((resolve, reject) => {
    if (typeof document === 'undefined') {
      reject(new Error('Video metadata requires a browser'));
      return;
    }

    const video = document.createElement('video');
    const cleanup = () => {
      clearTimeout(timeout);
      video.onloadedmetadata = null;
      video.onerror = null;
      video.removeAttribute('src');
      video.load();
    };
    const fail = () => {
      cleanup();
      reject(new Error('Unable to read video metadata'));
    };
    const timeout = setTimeout(fail, MP4_METADATA_TIMEOUT_MS);

    video.preload = 'metadata';
    video.onloadedmetadata = () => {
      const duration = video.duration;
      cleanup();
      if (Number.isFinite(duration) && duration >= 0) {
        resolve(duration);
      } else {
        reject(new Error('Invalid video duration'));
      }
    };
    video.onerror = fail;
    video.src = url;
    video.load();
  });

export const fileIcon = (extension: string) => {
  switch (extension) {
    case 'pdf':
      return EdsIcon(library_pdf);
    case 'xls':
    case 'xlsx':
      return EdsIcon(microsoft_excel);
    case 'doc':
    case 'docx':
      return EdsIcon(microsoft_word);
    case 'pptx':
      return EdsIcon(microsoft_powerpoint);
    case 'ics':
      return EdsIcon(calendar_event);
    case 'mp4':
      return createElement(RiMovieLine);
    default:
      return EdsIcon(file);
  }
};

const acceptedFileTypes = [
  '.pdf',
  '.xls',
  '.xlsx',
  '.csv',
  '.doc',
  '.docx',
  '.pptx',
  '.txt',
  '.zip',
  '.asc',
  '.ics',
  '.mp3',
  '.mp4',
];

const AssetFileInput = (props: FileInputProps) => {
  const client = useClient({ apiVersion });
  const assetReference = props.value?.asset?._ref;
  const { projectId, dataset } = client.config();

  if (
    !assetReference ||
    getExtension(assetReference) !== 'mp4' ||
    !projectId ||
    !dataset
  ) {
    return props.renderDefault(props);
  }

  const { url } = getFileAsset(assetReference, { projectId, dataset });

  return createElement(
    Stack,
    { gap: 3 },
    props.renderDefault(props),
    createElement(HLSPlayer, {
      src: url,
      controls: true,
      width: '100%',
      height: '350px',
      style: { background: 'black' },
    }),
  );
};

export default {
  title: 'File',
  type: 'document',
  name: 'assetFile',
  icon: () => EdsIcon(attach_file),
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      description:
        'The title of the asset file document. This title is used internally and has no impact on the actual file.',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      title: 'File attachment',
      name: 'asset',
      type: 'file',
      description:
        'Add the file attachment here. You can replace this file at a later point and all references to this file document will be updated automatically.',
      options: {
        accept: acceptedFileTypes.join(','),
      },
      components: {
        input: AssetFileInput,
      },
      validation: (Rule: Rule) =>
        Rule.custom(async (value: File | undefined, context) => {
          const assetReference = value?.asset?._ref;
          if (!assetReference || getExtension(assetReference) !== 'mp4') {
            return true;
          }

          try {
            const asset = await context.getClient({ apiVersion }).fetch<{
              size: number;
              url: string;
            } | null>(
              /* groq */ `*[_id == $id && _type == "sanity.fileAsset"][0]{size, url}`,
              { id: assetReference },
            );

            if (
              !asset ||
              !Number.isFinite(asset.size) ||
              asset.size < 0 ||
              !asset.url
            ) {
              return 'Could not verify MP4 file metadata. Please retry or replace the file.';
            }
            if (asset.size > MAX_MP4_SIZE_BYTES) {
              return 'MP4 files must be 25 MB or smaller.';
            }

            const duration = await getMp4Duration(asset.url);
            return duration > MAX_MP4_DURATION_SECONDS
              ? 'MP4 videos must be 15 seconds or shorter.'
              : true;
          } catch {
            return 'Could not verify MP4 size or duration. Please retry in Studio or replace the file.';
          }
        }),
    },
    {
      name: 'thumbnail',
      type: 'imageWithAlt',
      title: 'Thumbnail',
      description:
        'Use the alt text below to describe the video content (for screenreaders).',
      initialValue: {
        isDecorative: true,
      },
      hidden: ({
        document,
      }: {
        document?: { asset?: { asset?: Reference } };
      }) => {
        const assetReference = document?.asset?.asset?._ref;
        return !assetReference || getExtension(assetReference) !== 'mp4';
      },
    },
    {
      title: 'Tags',
      name: 'tagReference',
      type: 'array',
      description:
        'Adds tags to asset file. These tags are used for internal filtering only.',
      of: [
        {
          type: 'reference',
          title: 'File tag',
          to: [{ type: 'assetTag' }],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      extension: 'asset.asset.extension',
      filename: 'asset.asset.originalFilename',
    },
    prepare(selection: { title: string; extension: string; filename: any }) {
      const { title, extension, filename } = selection;
      const subtitle = extension
        ? `${extension} | ${filename}`
        : 'File attachment missing';

      return {
        title: title,
        subtitle: subtitle,
        media: fileIcon(extension),
      };
    },
  },
};
