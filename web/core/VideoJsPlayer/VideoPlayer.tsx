'use client';
import dynamic from 'next/dynamic';
import NextImage from 'next/image';
import { useTranslations } from 'next-intl';
import type { PortableTextBlock } from 'next-sanity';
import { type HTMLProps, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import type Player from 'video.js/dist/types/player';
import { CircularProgress } from '@/core/Progress/CircularProgress';
import Blocks from '@/portableText/Blocks';
import { resolveImage } from '@/sanity/lib/utils';
import { type Image, mapSanityImageRatio } from '../Image/imageUtilities';
import type { AspectRatioVariants, Variants } from './Video';

const Video = dynamic(() => import('./Video'), { ssr: false });

export type VideoType = {
  title: string;
  src: string;
  poster: Image;
};

export type VideoControlsType = {
  loop?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
};

export type VideoPlayerProps = Omit<
  HTMLProps<HTMLVideoElement>,
  'src' | 'poster'
> & {
  variant?: Variants;
  src?: string | null;
  figureCaption?: string | PortableTextBlock[];
  captionClassName?: string;
  figureClassName?: string;
  /* setting this will sett fluid mode to video player */
  aspectRatio?: AspectRatioVariants | undefined;
  /** Ignores aspect ratio to enable fill mode */
  useFillMode?: boolean;
  useBrandTheme?: boolean;
  /** Sets id on return element for anchors */
  id?: string;
  poster?: Image;
  posterLoading?: 'lazy' | 'eager';
  posterSizes?: string;
  /** For the aspect ratios that apply object cover, override to contain */
  containVideo?: boolean;
};
export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  variant = 'default',
  id,
  loop = false,
  figureCaption,
  captionClassName = '',
  figureClassName = '',
  autoPlay = false,
  title,
  src,
  muted = false,
  playsInline,
  aspectRatio = '16:9',
  useBrandTheme = false,
  useFillMode = false,
  poster,
  posterLoading = 'lazy',
  posterSizes,
  className,
  containVideo,
}) => {
  const intl = useTranslations();
  const { url: posterUrl } = resolveImage({
    image: poster,
    grid: 'lg',
    aspectRatio: mapSanityImageRatio(aspectRatio === '9:16' ? '9:16' : '16:9'),
    keepRatioOnMobile: true,
    useContain: true,
    isLargerDisplays: true,
  });
  const playerRef = useRef<Player>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [hasVideoError, setHasVideoError] = useState(false);
  const [posterWidth, setPosterWidth] = useState<number>();
  const [shouldMountPlayer, setShouldMountPlayer] = useState(
    posterLoading === 'eager',
  );
  const resolvedPosterSizes =
    posterSizes ?? (posterWidth ? `${posterWidth}px` : undefined);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateWidth = () =>
      setPosterWidth(Math.ceil(container.getBoundingClientRect().width));
    updateWidth();

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', updateWidth);
      return () => window.removeEventListener('resize', updateWidth);
    }

    const observer = new ResizeObserver(updateWidth);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (
      posterLoading === 'eager' ||
      typeof IntersectionObserver === 'undefined'
    ) {
      setShouldMountPlayer(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldMountPlayer(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' },
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, [posterLoading]);
  const useFill =
    !containVideo &&
    (useFillMode || aspectRatio === '10:3' || aspectRatio === '21:9');
  const videoSource = src?.trim() ?? '';
  const sourceType =
    videoSource &&
    new URL(videoSource, 'https://localhost').pathname
      .toLowerCase()
      .endsWith('.mp4')
      ? 'video/mp4'
      : 'application/x-mpegURL';

  const videoJsOptions = {
    src: [
      {
        src: videoSource,
        type: sourceType,
      },
    ],
    muted: muted ? 'muted' : false,
    playsinline: autoPlay || playsInline,
    loop: loop,
    autoplay: autoPlay,
    preload: autoPlay ? 'auto' : 'none',
    controls: true,
    responsive: true,
    disablePictureInPicture: true,
    ...(useFill
      ? { fill: true }
      : {
          fluid: true,
          aspectRatio,
        }),
    bigPlayButton: !autoPlay,
    controlbar: true,
    audioTrack: false,
    loadingSpinner: true,
    controlBar: {
      pictureInPictureToggle: false,
      pictureInPictureControl: false,
      chaptersButton: false,
      audioTrackButton: false,
      playbackRateMenuButton: false,
      fullscreenToggle: variant !== 'fullwidth',
      ...(variant === 'fullwidth' && {
        progressControl: {
          seekBar: false,
        },
        captionsButton: false,
        subtitlesButton: false,
        remainingTimeDisplay: false,
        volumePanel: false,
      }),
    },
    html5: {
      useDevicePixelRatio: true,
      limitRenditionByPlayerDimensions: false,
      hls: {
        useDevicePixelRatio: true,
        limitRenditionByPlayerDimensions: false,
      },
    },
    ...(poster &&
      posterUrl && {
        poster: posterUrl,
      }),
    ...(title && {
      title: title,
    }),
  };

  const aspectRatioClassName: Record<AspectRatioVariants, string> = {
    '10:3': 'aspect-16/9 md:aspect-10/3',
    '16:9': 'aspect-video',
    '21:9': 'aspect-16/9 md:aspect-21/9',
    '9:16': 'aspect-9/16',
    '2:1': 'aspect-2/1',
    '4:3': 'aspect-4/3',
    '1:1': 'aspect-square',
  };

  const variantClassName: Record<Variants, string> = {
    default: `w-full`,
    fullwidth: `w-full max-w-fullwidth`,
  };

  const handlePlayerReady = (player: Player) => {
    playerRef.current = player;
    const hideLoadingOverlay = () => setIsVideoReady(true);
    const handleError = () => setHasVideoError(true);
    player.on('loadeddata', hideLoadingOverlay);
    player.on('canplay', hideLoadingOverlay);
    player.on('error', handleError);
    player.on('playing', () => {
      setHasVideoError(false);
      hideLoadingOverlay();
    });
    player.on('loadstart', () => {
      if (autoPlay) setIsVideoReady(false);
    });
    if (player.error()) {
      handleError();
    } else if (!autoPlay || player.readyState() >= 2) {
      hideLoadingOverlay();
    }
  };

  return (
    <figure
      {...(id && { id })}
      className={twMerge(
        `relative flex flex-col ${variantClassName[variant]}`,
        figureClassName,
      )}
    >
      <div
        ref={containerRef}
        className={twMerge(aspectRatioClassName[aspectRatio], className)}
        style={{ position: 'relative' }}
      >
        {videoSource && shouldMountPlayer && (
          <Video
            //@ts-ignore: TODO
            options={videoJsOptions}
            onReady={handlePlayerReady}
            useBrandTheme={useBrandTheme}
            containVideo={containVideo}
            variant={variant}
            className="h-full w-full"
          />
        )}
        {posterUrl &&
          (!videoSource || !isVideoReady || hasVideoError) &&
          resolvedPosterSizes && (
            <>
              <NextImage
                src={posterUrl}
                alt=""
                fill
                sizes={resolvedPosterSizes}
                loading={posterLoading}
                className={twMerge(
                  'pointer-events-none object-cover',
                  containVideo && 'object-contain',
                )}
              />
              {videoSource && !hasVideoError && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <CircularProgress
                    variant="indeterminate"
                    type="progress"
                    aria-label={intl('loading')}
                    className="rounded-full bg-slate-blue-95/70 p-2 motion-reduce:animate-none"
                    trackClassName="stroke-white-100/30"
                    progressClassName="stroke-white-100 [stroke-dasharray:80_145]"
                  />
                </div>
              )}
            </>
          )}
      </div>
      {figureCaption && (
        <figcaption
          className={twMerge(
            `w-full text-md ${title ? 'py-2' : ''} `,
            captionClassName,
          )}
        >
          {figureCaption && Array.isArray(figureCaption) && (
            <Blocks value={figureCaption} variant="body" />
          )}
          {figureCaption && !Array.isArray(figureCaption) && figureCaption}
        </figcaption>
      )}
    </figure>
  );
};

export default VideoPlayer;
