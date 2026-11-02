'use client';

import { toPlainText } from '@portabletext/react';
import { useTranslations } from 'next-intl';
import { type HTMLAttributes, type Ref, useCallback, useId } from 'react';
import { twMerge } from 'tailwind-merge';
import { MediaButton } from '@/core/MediaButton/MediaButton';
import { CarouselContext } from './CarouselContext';
import type { CarouselModeProps, CarouselState } from './types';
import type { useAutoRotation } from './useAutoRotation';

type CarouselLayoutProps = CarouselModeProps & {
  state: CarouselState;
  sliderRef: Ref<HTMLUListElement>;
  listProps?: HTMLAttributes<HTMLUListElement>;
  onPrevious: () => void;
  onNext: () => void;
  rotation?: ReturnType<typeof useAutoRotation>;
};

export function CarouselLayout({
  ref,
  children,
  state,
  sliderRef,
  listProps,
  onPrevious,
  onNext,
  rotation,
  itemCount,
  labelledbyId,
  title,
  sectionTitle,
  autoRotation = false,
  hasSectionTitle = false,
  className,
  containerClassName,
  listClassName,
  controlsClassName,
  onFocusCapture,
  onMouseEnter,
  onMouseLeave,
  ...rest
}: CarouselLayoutProps) {
  const intl = useTranslations();
  const itemsId = useId();
  const Tag = hasSectionTitle ? 'div' : 'section';
  const single = state.displayMode === 'single';
  const labelId = labelledbyId ?? rest['aria-labelledby'];
  const rotationTitle = toPlainText((labelId ? sectionTitle : title) ?? []);
  const rotationLabel = intl(
    rotation?.stopped ? 'carouselPlay' : 'carouselPause',
    { title: rotationTitle },
  );
  const setRef = useCallback(
    (element: HTMLElement | null) => {
      if (typeof ref === 'function') return ref(element);
      if (ref) ref.current = element;
    },
    [ref],
  );

  return (
    <CarouselContext.Provider value={state}>
      <Tag
        {...rest}
        ref={setRef}
        role={rest.role ?? (hasSectionTitle ? 'group' : 'region')}
        aria-labelledby={labelId}
        aria-label={
          rest['aria-label'] ??
          (!labelId && title ? toPlainText(title) : undefined)
        }
        className={twMerge(
          single ? 'relative flex flex-col overflow-hidden' : 'w-full',
          containerClassName,
        )}
        onFocusCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget))
            rotation?.stop();
          onFocusCapture?.(event);
        }}
        onMouseEnter={(event) => {
          rotation?.onMouseEnter();
          onMouseEnter?.(event);
        }}
        onMouseLeave={(event) => {
          rotation?.onMouseLeave();
          onMouseLeave?.(event);
        }}
      >
        <div
          className={twMerge(
            single && 'relative grid grid-flow-row justify-center',
            className,
          )}
        >
          <div
            className={
              single
                ? 'contents'
                : 'carousel-scroll-progress relative isolate min-w-0 pb-[calc(var(--spacing)*2+3.5px)] before:pointer-events-none before:absolute before:inset-x-0 before:bottom-0 before:-z-10 before:h-2 before:rounded-[calc(var(--radius-base)/3.5)] before:border before:border-current before:bg-[image:repeating-linear-gradient(315deg,currentColor_0,currentColor_1px,transparent_0,transparent_50%)] before:bg-size-[4px_4px] before:text-black/15 dark:before:text-white/10'
            }
          >
            <ul
              {...listProps}
              ref={sliderRef}
              id={itemsId}
              tabIndex={0}
              className={twMerge(
                'w-full focus:outline-dashed focus:outline-1 focus:outline-grey-60',
                single
                  ? 'grid [--carousel-slide-stride:calc(var(--spacing-single-carousel-card-w-sm)+var(--spacing)*5)] md:[--carousel-slide-stride:calc(var(--spacing-single-carousel-card-w-md)+var(--spacing)*5)] lg:[--carousel-slide-stride:calc(var(--spacing-single-carousel-card-w-lg)+var(--spacing)*5)]'
                  : 'no-scrollbar grid h-fit snap-x auto-cols-auto grid-flow-col gap-3 overflow-x-auto lg:gap-6',
                listClassName,
                !single && 'pb-0',
              )}
            >
              {children}
            </ul>
          </div>
          <fieldset
            className={twMerge(
              'flex pt-6 pb-2',
              autoRotation ? 'justify-between' : 'justify-end',
              single
                ? 'mx-auto w-single-carousel-card-w-sm md:w-single-carousel-card-w-md lg:w-single-carousel-card-w-lg'
                : 'w-full',
              controlsClassName,
            )}
          >
            <legend className="sr-only">{intl('carousel_controls')}</legend>
            {autoRotation && rotation && (
              <MediaButton
                title={rotationLabel}
                aria-label={rotationLabel}
                mode={rotation.stopped ? 'play' : 'pause'}
                onClick={rotation.toggle}
                onPointerDown={rotation.onPointerDown}
                onPointerCancel={rotation.onPointerCancel}
                paused={!rotation.running}
                useTimer
                timerKey={state.currentIndex}
                className="[grid-area:left]"
              />
            )}
            <div className="flex items-center gap-3">
              <MediaButton
                title={intl('previous')}
                aria-controls={itemsId}
                mode="previous"
                onClick={onPrevious}
                disabled={itemCount < 2}
              />
              <MediaButton
                title={intl('next')}
                aria-controls={itemsId}
                mode="next"
                onClick={onNext}
                disabled={itemCount < 2}
              />
            </div>
          </fieldset>
          {single && (
            <div
              aria-live={rotation?.running ? 'off' : 'polite'}
              aria-atomic={true}
              className="sr-only"
            >
              {itemCount > 0 &&
                intl('carouselLiveAnnoucement', {
                  x: state.currentIndex + 1,
                  carouselLength: itemCount,
                })}
            </div>
          )}
        </div>
      </Tag>
    </CarouselContext.Provider>
  );
}
