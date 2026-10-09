/* eslint-disable import/no-named-as-default-member */
/* eslint-disable jsx-a11y/media-has-caption */

import Hls from 'hls.js';
import { type FC, type HTMLProps, useEffect, useRef } from 'react';

type Props = Omit<HTMLProps<HTMLVideoElement>, 'src'> & {
  src: string;
};

const HLSPlayer: FC<Props> = ({ src, ...props }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const isMp4 = new URL(src, 'https://localhost').pathname
      .toLowerCase()
      .endsWith('.mp4');
    if (isMp4 || !Hls.isSupported()) {
      video.src = src;
      return;
    }

    if (Hls.isSupported()) {
      const hls = new Hls();
      hlsRef.current = hls;

      hls.loadSource(src);
      hls.attachMedia(video);

      return () => {
        hls.destroy();
        hlsRef.current = null;
      };
    }
  }, [src]);

  useEffect(() => {
    const hls = hlsRef.current;
    if (hls) {
      hls.on(Hls.Events.ERROR, (_, data) => {
        console.error('Error', data);
      });
    }
  }, []);

  return <video ref={videoRef} {...props} />;
};

export default HLSPlayer;
