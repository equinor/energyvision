import { forwardRef, SVGProps, Ref, useEffect, useState, CSSProperties, useRef } from 'react'
import envisTwMerge from '../../twMerge'

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
  /* To provide more meaningful translation of what is in progress, percent is added after "...80%" */
  progressTitle?: string
  paused?: boolean
} & SVGProps<SVGSVGElement>

const CircularProgress = forwardRef<SVGSVGElement, CircularProgressProps>(function CircularProgress(
  {
    variant = 'indeterminate',
    value = null,
    duration = 5,
    type = 'timer',
    paused,
    progressTitle = 'Loading',
    className = '',
    ...rest
  },
  ref,
) {
  const thickness = 2.5
  const progress = value ? Math.round(value) : 0
  const props = {
    ...rest,
    ref,
  }
  const [internalDuration, setInternalDuration] = useState<number | null>(duration)
  const [srProgress, setSrProgress] = useState(type === 'timer' ? duration : 0)
  const circumference = 2 * Math.PI * ((48 - thickness) / 2)

  if (variant === 'determinate') {
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
      console.log('reset internal duration becasue pausing')
      setInternalDuration(duration)
    }
  }, [duration, paused, type, variant])

  useEffect(() => {
    console.log('use efffect paused', paused)
    console.log('use efffect internalDuration', internalDuration)
    if (variant === 'determinate' && type === 'timer' && internalDuration && internalDuration > 0 && !paused) {
      const id = setInterval(() => {
        console.log('set interval, and reduce internal duration in 1sec', internalDuration)
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
    return `Loading ${srProgress}%`
  }

  const trackStyle: CSSProperties = {
    ...(variant === 'determinate' && {
      stroke: circumference.toFixed(3),
      strokeDashoffset:
        type === 'progress'
          ? `${(((100 - progress) / 100) * circumference).toFixed(3)}px`
          : `${
              internalDuration && duration
                ? (circumference - (((duration - internalDuration) * (100 / duration)) / 100) * circumference).toFixed(
                    3,
                  )
                : 0
            }px`,
      transition: 'stroke-dashoffset 0.5s ease-in-out',
    }),
  }

  return (
    <>
      <svg
        {...props}
        viewBox="24 24 48 48"
        role="progressbar"
        height={48}
        width={48}
        preserveAspectRatio="xMidYMid meet"
        className={envisTwMerge(`${variant === 'indeterminate' ? 'animate-spin-slow' : ''}`, className)}
      >
        {/* Track */}
        <circle
          style={trackStyle}
          cx={48}
          cy={48}
          r={(48 - thickness) / 2}
          fill="none"
          strokeWidth={thickness}
          stroke="currentColor"
          opacity={0.25}
        />
        {/* Progress */}
        <circle
          style={trackStyle}
          cx={48}
          cy={48}
          r={(48 - thickness) / 2}
          fill="none"
          strokeLinecap="round"
          strokeWidth={thickness}
          strokeDasharray={variant === 'determinate' ? circumference : 48}
          stroke="currentColor"
          opacity={paused ? 0 : 1}
        />
      </svg>
      {variant === 'determinate' && <span className="sr-only">{getProgressFormatted()}</span>}
    </>
  )
})

export { CircularProgress }
