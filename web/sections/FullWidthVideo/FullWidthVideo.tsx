import dynamic from 'next/dynamic';
import type { PortableTextBlock } from 'next-sanity';
import type {
  AspectRatioVariants,
  VideoType,
} from '@/core/VideoPlayer/VideoPlayer';
import type { DesignOptions, LinkData } from '../../types/index';

export type FullWidthVideoRatio = 'fullScreen' | 'narrow' | '2:1';

export type FullWidthVideoProps = {
  type: string;
  id: string;
  video: VideoType;
  title?: PortableTextBlock[];
  action?: LinkData;
  designOptions: DesignOptions & {
    containVideo?: boolean;
    aspectRatio: FullWidthVideoRatio;
  };
  anchor?: string;
};

const VideoPlayer = dynamic(() => import('@/core/VideoPlayer/VideoPlayer'));

const FullWidthVideo = ({
  anchor,
  video,
  designOptions,
}: FullWidthVideoProps) => {
  const { aspectRatio = 'fullScreen', containVideo } = designOptions;
  const aspect: Record<string, AspectRatioVariants> = {
    narrow: '10:3',
    fullScreen: '21:9',
    '2:1': '2:1',
  };

  return (
    //@ts-ignore: TODO
    <VideoPlayer
      id={anchor}
      variant="fullwidth"
      containVideo={containVideo}
      aspectRatio={aspect[aspectRatio ?? 'fullScreen']}
      {...video}
      autoPlay
      muted
      loop
      playsInline
    />
  );
};

export default FullWidthVideo;
