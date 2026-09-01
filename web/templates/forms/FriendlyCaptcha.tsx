'use client';
import type { StartMode, WidgetHandle } from '@friendlycaptcha/sdk';
import { useLocale } from 'next-intl';
import { useEffect, useEffectEvent, useRef } from 'react';
import { globalCaptchaSDK } from '@/contexts/captchaSdk';
import { friendlyCaptcha } from '../../lib/config';

const FriendlyCaptcha = ({
  doneCallback,
  errorCallback,
  startMode = 'focus',
}: {
  doneCallback: (event: any) => void;
  errorCallback: (error: string) => void;
  startMode?: StartMode;
}) => {
  const container = useRef(null);
  const widget = useRef<WidgetHandle>(null);
  const locale = useLocale();
  const onComplete = useEffectEvent(doneCallback);
  const onError = useEffectEvent(errorCallback);

  useEffect(() => {
    if (!widget.current && container.current && globalCaptchaSDK) {
      widget.current = globalCaptchaSDK?.createWidget({
        element: container.current,
        sitekey: friendlyCaptcha.siteKey,
        startMode: startMode,
        language: locale === 'no' ? 'nb' : locale,
        apiEndpoint: 'https://eu.frcapi.com/api/v2/captcha',
      });

      widget.current.addEventListener('frc:widget.complete', onComplete);

      widget.current.addEventListener('frc:widget.error', (event) => {
        const detail = event.detail;
        onError(detail.error.detail);
        console.error(
          'Something went wrong in solving the captcha: ',
          detail.error,
        );
      });

      widget.current.addEventListener('frc:widget.expire', (event) => {
        console.warn(
          'The captcha solution is no longer valid, the user waited too long.',
        );
        onError(event.detail.response);
      });
    }
    return () => {
      widget.current?.destroy();
      widget.current = null;
    };
  }, [locale, startMode]);

  return <div ref={container} />;
};

export default FriendlyCaptcha;
