'use client'
import { useEffect, HTMLProps, useRef } from 'react'
import videojs from 'video.js'
import Player from 'video.js/dist/types/player'
import useVideojsAnalytics from './useVideojsAnalytics'

type VideoProps = Omit<HTMLProps<HTMLVideoElement>, 'src'> & {
options?: any
  useBrandTheme?: boolean
  onReady?: (player: Player) => void
} 

export const Video: React.FC<VideoProps> = ({options, onReady}) => {

  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player>(null);


  useVideojsAnalytics(playerRef.current, options.src, options.title, options.autoPlay)


   useEffect(() => {
    if (!playerRef.current) {
      const videoElement = document.createElement('video-js');
      videoElement.classList.add(`vjs-layout-large vjs-envis ${useBrandTheme ? 'vjs-envis-brand' : ''}
        ${playButton ? 'vjs-envis-hasPlayButton' : ''}`);
      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log('player is ready');
        if (onReady) {
          onReady(player);
        }
      }));
    } else {
      const player = playerRef.current;
      player.autoplay(options.autoplay);
      player.src( 
        options.sources
      );
    }
  }, [onReady, options]);

  useEffect(() => {
    const player = playerRef.current;
    // Clean up function to dispose the player after the component unmounts
    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div className='video-player' data-vjs-player>
      <div ref={videoRef} />
    </div>
  )
}
