'use client';
import dynamic from 'next/dynamic';
import NextImage from 'next/image';
import { useTranslations } from 'next-intl';
import type { PortableTextBlock } from 'next-sanity';
import {
  type CSSProperties,
  type HTMLProps,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { CircularProgress } from '@/core/Progress/CircularProgress';
import { Pause } from '@/icons/Pause';
import { Play } from '@/icons/Play';
import { twMerge } from '@/lib/twMerge/twMerge';
import Blocks from '@/portableText/Blocks';
import { resolveImage } from '@/sanity/lib/utils';
import { type Image, mapSanityImageRatio } from '../Image/imageUtilities';
import { useVideoAnalytics } from './useVideoAnalytics';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

export type AspectRatioVariants =
  | '16:9'
  | '9:16'
  | '2:1'
  | '10:3'
  | '4:3'
  | '21:9'
  | '1:1';

export type Variants = 'default' | 'fullwidth';

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
  /** Sets the intrinsic ratio of the player */
  aspectRatio?: AspectRatioVariants | undefined;
  /** Ignores aspect ratio and lets the video cover its container */
  useFillMode?: boolean;
  useBrandTheme?: boolean;
  /** Sets id on return element for anchors */
  id?: string;
  poster?: Image;
  posterLoading?: 'lazy' | 'eager';
  posterSizes?: string;
  posterFetchPriority?: 'high' | 'low' | 'auto';
  /** For the aspect ratios that apply object cover, override to contain */
  containVideo?: boolean;
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
  default: 'w-full',
  fullwidth: 'w-full max-w-fullwidth',
};

const LAZY_MOUNT_ROOT_MARGIN = '200px';

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
  posterFetchPriority,
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [media, setMedia] = useState<HTMLVideoElement | null>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayRequested, setIsPlayRequested] = useState(false);
  const [hasVideoError, setHasVideoError] = useState(false);
  const [posterWidth, setPosterWidth] = useState<number>();
  const [shouldMountPlayer, setShouldMountPlayer] = useState(
    posterLoading === 'eager',
  );
  const resolvedPosterSizes =
    posterSizes ?? (posterWidth ? `${posterWidth}px` : undefined);
  const videoSource = src?.trim() ?? '';
  const isFullwidth = variant === 'fullwidth';
  const useFill =
    !containVideo &&
    (useFillMode || aspectRatio === '10:3' || aspectRatio === '21:9');

  useVideoAnalytics({ media, src: videoSource, title, autoPlay });

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
      { rootMargin: LAZY_MOUNT_ROOT_MARGIN },
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, [posterLoading]);

  const mediaRef = useCallback((node: HTMLVideoElement | null) => {
    setMedia(node);
  }, []);

  const handleReady = () => setIsVideoReady(true);
  const handleError = () => {
    setHasVideoError(true);
    setIsPlayRequested(false);
  };
  const handlePlaying = () => {
    setHasVideoError(false);
    setIsVideoReady(true);
    setHasStarted(true);
    setIsPlaying(true);
    setIsPlayRequested(false);
  };
  const handleLoadStart = () => {
    if (autoPlay) setIsVideoReady(false);
  };

  const togglePlayback = () => {
    if (!media) return;
    if (media.paused) {
      setIsPlayRequested(true);
      media.play().catch(handleError);
    } else {
      media.pause();
    }
  };

  const translate = (key: 'videoPlay' | 'videoPause', fallback: string) =>
    intl.has(key) ? intl(key) : fallback;
  const playLabel = translate('videoPlay', 'Play video');
  const pauseLabel = translate('videoPause', 'Pause video');

  const showPoster =
    !videoSource || hasVideoError || (autoPlay ? !isVideoReady : !hasStarted);
  const showLoading =
    Boolean(videoSource) &&
    !hasVideoError &&
    (autoPlay ? !isVideoReady : isPlayRequested && !hasStarted);
  const showBigPlayButton =
    Boolean(videoSource) &&
    !autoPlay &&
    !hasStarted &&
    !isPlayRequested &&
    !hasVideoError;

  const mediaStyle = {
    '--media-object-fit': useFill ? 'cover' : 'contain',
  } as CSSProperties;

  return (
    <figure
      {...(id && { id })}
      {...(title && { 'aria-label': title })}
      className={twMerge(
        `relative flex flex-col ${variantClassName[variant]}`,
        figureClassName,
      )}
    >
      <div
        ref={containerRef}
        className={twMerge(
          'relative',
          aspectRatioClassName[aspectRatio],
          className,
        )}
      >
        {videoSource && shouldMountPlayer && (
          <ReactPlayer
            ref={mediaRef}
            src={videoSource}
            width="100%"
            height="100%"
            className={twMerge(
              'h-full w-full bg-black-100',
              useFill ? 'object-cover' : 'object-contain',
            )}
            style={mediaStyle}
            autoPlay={autoPlay}
            muted={muted}
            loop={loop}
            playsInline={autoPlay || playsInline}
            preload={autoPlay ? 'auto' : 'none'}
            controls={!isFullwidth}
            onLoadStart={handleLoadStart}
            onLoadedData={handleReady}
            onCanPlay={handleReady}
            onPlaying={handlePlaying}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onError={handleError}
          />
        )}
        {posterUrl && resolvedPosterSizes && showPoster && (
          <NextImage
            src={posterUrl}
            alt=""
            fill
            sizes={resolvedPosterSizes}
            loading={posterLoading}
            fetchPriority={posterFetchPriority}
            className={twMerge(
              'pointer-events-none object-cover',
              containVideo && 'object-contain',
            )}
          />
        )}
        {showLoading && (
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
        {showBigPlayButton && (
          <button
            type="button"
            onClick={togglePlayback}
            aria-label={playLabel}
            className="group/play focus-visible:envis-outline absolute inset-0 z-10 flex cursor-pointer items-center justify-center"
          >
            <span
              className={twMerge(
                'flex size-16 items-center justify-center rounded-full bg-slate-blue-100/60 text-white-100 transition-colors group-hover/play:bg-slate-blue-100 group-focus-visible/play:bg-slate-blue-100',
                useBrandTheme &&
                  'group-hover/play:bg-energy-red-100 group-focus-visible/play:bg-energy-red-100',
              )}
            >
              <Play size={40} aria-hidden="true" aria-label={undefined} />
            </span>
          </button>
        )}
        {isFullwidth && videoSource && !hasVideoError && (
          <button
            type="button"
            onClick={togglePlayback}
            aria-label={isPlaying ? pauseLabel : playLabel}
            className="focus-visible:envis-outline absolute right-4 bottom-4 z-10 flex size-12 cursor-pointer items-center justify-center"
          >
            <span className="flex size-10 items-center justify-center rounded-full bg-black-100/60 text-white-100 transition-colors hover:bg-black-100">
              {isPlaying ? (
                <Pause size={24} aria-hidden="true" aria-label={undefined} />
              ) : (
                <Play size={24} aria-hidden="true" aria-label={undefined} />
              )}
            </span>
          </button>
        )}
      </div>
      {figureCaption && (
        <figcaption
          className={twMerge(
            `w-full text-md ${title ? 'py-2' : ''} `,
            captionClassName,
          )}
        >
          {Array.isArray(figureCaption) ? (
            <Blocks value={figureCaption} variant="body" />
          ) : (
            figureCaption
          )}
        </figcaption>
      )}
    </figure>
  );
};

export default VideoPlayer;
