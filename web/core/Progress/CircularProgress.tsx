'use client'
import { forwardRef, SVGProps, useEffect, useState, CSSProperties } from 'react'
import envisTwMerge from '../../twMerge'
import { useTranslations } from 'next-intl'
import { twMerge } from 'tailwind-merge'

export type CircularProgressProps = {
  /**  Use indeterminate when there is no progress value */
  variant?: 'determinate' | 'indeterminate'
  /**  Use as percent progressbar or countdown timer spinner */
  type?: 'progress' | 'timer'
  /**  The value of the progress indicator for determinate variant.
   * Value between 0 and 100 */
  value?: number
  /** duration for countdown. Will count down by seconds. */
  duration?: number
  paused?: boolean
  trackClassName?: string
  progressClassName?: string
} & SVGProps<SVGSVGElement>

const CircularProgress = forwardRef<SVGSVGElement, CircularProgressProps>(function CircularProgress(
  {
    variant = 'indeterminate',
    value = null,
    duration = 5,
    type = 'timer',
    paused,
    className = '',
    trackClassName = '',
    progressClassName = '',
    ...rest
  },
  ref,
) {
  const intl = useTranslations()
  const thickness = 2.5
  const progress = value ? Math.round(value) : 0
  const props = {
    ...rest,
    ref,
  }

  const radius = (48 - thickness) / 2
  const circumference = 2 * Math.PI * radius

  const [internalDuration, setInternalDuration] = useState<number | null>(duration)
  const [srProgress, setSrProgress] = useState(type === 'timer' ? duration : 0)

  if (variant === 'determinate' && type === 'progress') {
    if (type === 'progress') {
      props['aria-valuenow'] = progress

      if (value !== undefined) {
        props['aria-valuenow'] = progress
        props['aria-valuemin'] = 0
        props['aria-valuemax'] = 100
      }
    } else {
      props['aria-valuenow'] = progress
      if (value !== undefined) {
        props['aria-valuenow'] = progress
        props['aria-valuemin'] = 0
        props['aria-valuemax'] = 100
      }
    }
  }

  useEffect(() => {
    if (variant === 'determinate' && type === 'timer' && paused) {
      setInternalDuration(duration)
    }
  }, [duration, paused, type, variant])

  useEffect(() => {
    if (variant === 'determinate' && type === 'timer' && internalDuration && internalDuration > 0 && !paused) {
      const id = setInterval(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        setInternalDuration((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(id)
    }
  }, [internalDuration, paused, type, variant])

  useEffect(() => {
    if (variant === 'indeterminate') return
    if (progress >= 25 && progress < 50) {
      setSrProgress(25)
    } else if (progress >= 50 && progress < 75) {
      setSrProgress(50)
    } else if (progress >= 75 && progress < 100) {
      setSrProgress(75)
    } else if (progress === 100) {
      setSrProgress(100)
    }
  }, [progress, variant])

  const getProgressFormatted = () => {
    return `${intl('loading')} ${srProgress}%`
  }

  const progressStyle: CSSProperties =
    variant === 'determinate'
      ? {
          strokeDasharray: `${circumference}px`,
          strokeDashoffset:
            type === 'progress'
              ? `${(((100 - progress) / 100) * circumference).toFixed(3)}px`
              : internalDuration && duration
                ? (circumference - (((duration - internalDuration) * (100 / duration)) / 100) * circumference).toFixed(
                    3,
                  ) + 'px'
                : '0px',
          transition: 'stroke-dashoffset 0.5s ease-in-out',
        }
      : {}

  const trackStyle: CSSProperties = {
    strokeDasharray: `${circumference}px`,
    strokeDashoffset: '0px',
  }

  return (
    <>
      <svg
        {...props}
        viewBox="24 24 48 48"
        role={type === 'timer' ? 'timer' : 'progressbar'}
        height={48}
        width={48}
        preserveAspectRatio="xMidYMid meet"
        className={twMerge(`${variant === 'indeterminate' ? 'animate-spin-slow' : ''}`, className)}
      >
        <circle
          style={trackStyle}
          cx={48}
          cy={48}
          r={radius}
          fill="none"
          strokeWidth={thickness}
          stroke="currentColor"
          className={twMerge('stroke-grey-30', trackClassName)}
        />
        <circle
          style={progressStyle}
          cx={48}
          cy={48}
          r={radius}
          fill="none"
          strokeLinecap="round"
          strokeWidth={thickness}
          stroke="currentColor"
          className={envisTwMerge('stroke-grey-60', progressClassName)}
          opacity={paused ? 0 : 1}
        />
      </svg>
      {variant === 'determinate' && type === 'progress' && <span className="sr-only">{getProgressFormatted()}</span>}
    </>
  )
})

export { CircularProgress }
