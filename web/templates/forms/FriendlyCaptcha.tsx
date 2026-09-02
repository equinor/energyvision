/**
 * Because "use client" makes this file a public Server-to-Client boundary. Next.js therefore requires exported component props to be serializable, but doneCallback and errorCallback are functions.

 * All current callers are client components, so the clean fix is removing "use client" from FriendlyCaptcha.tsx. It remains client code through its importing client components.
 */
import type {
  FRCWidgetCompleteEvent,
  FRCWidgetWidgetErrorEvent,
  FRCWidgetWidgetExpireEvent,
  StartMode,
  WidgetHandle,
} from '@friendlycaptcha/sdk';
import { useLocale } from 'next-intl';
import { useEffect, useEffectEvent, useRef } from 'react';
import { globalCaptchaSDK } from '@/contexts/captchaSdk';
import { friendlyCaptcha } from '../../lib/config';

export const getFriendlyCaptchaSolution = (event?: { target: unknown }) => {
  if (!(event?.target instanceof HTMLFormElement)) return null;

  const responseInput = event.target.elements.namedItem('frc-captcha-response');

  return responseInput instanceof HTMLInputElement && responseInput.value
    ? responseInput.value
    : null;
};

export const FriendlyCaptcha = ({
  doneCallback,
  errorCallback,
  startMode = 'focus',
}: {
  doneCallback: (event: FRCWidgetCompleteEvent) => void;
  errorCallback: (error: string) => void;
  startMode?: StartMode;
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetRef = useRef<WidgetHandle | undefined>(undefined);
  const locale = useLocale();
  const onComplete = useEffectEvent(doneCallback);
  const onError = useEffectEvent(errorCallback);

  useEffect(() => {
    if (
      !containerRef.current ||
      widgetRef.current ||
      !globalCaptchaSDK ||
      !friendlyCaptcha.siteKey
    )
      return;

    const widget = globalCaptchaSDK.createWidget({
      element: containerRef.current,
      sitekey: friendlyCaptcha.siteKey,
      startMode: startMode,
      language: locale === 'nb-NO' ? 'nb' : locale,
      apiEndpoint: 'https://eu.frcapi.com/api/v2/captcha',
    });
    widgetRef.current = widget;

    const element = containerRef.current;
    const handleWidgetComplete: EventListener = (event) => {
      onComplete(event as FRCWidgetCompleteEvent);
    };

    const handleWidgetError: EventListener = (event) => {
      const detail = (event as FRCWidgetWidgetErrorEvent).detail;
      onError(detail.error.detail);
    };
    const handleWidgetExpire: EventListener = (event) => {
      onError((event as FRCWidgetWidgetExpireEvent).detail.response);
    };

    element.addEventListener('frc:widget.complete', handleWidgetComplete);
    element.addEventListener('frc:widget.error', handleWidgetError);
    element.addEventListener('frc:widget.expire', handleWidgetExpire);

    // Clean up on component unmount to prevent memory leaks
    return () => {
      element.removeEventListener('frc:widget.complete', handleWidgetComplete);
      element.removeEventListener('frc:widget.error', handleWidgetError);
      element.removeEventListener('frc:widget.expire', handleWidgetExpire);
      widget.destroy();
      if (widgetRef.current === widget) {
        widgetRef.current = undefined;
      }
    };
  }, [locale, startMode]);

  return <div ref={containerRef} />;
};
