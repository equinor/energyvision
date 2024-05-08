import type { Outline } from '@equinor/eds-tokens'

/* Where should this be located */
export const outline: Outline = {
  width: '2px',
  //Shouldn't use color variables directly, but just for testing
  color: 'var(--moss-green-100)',
  style: 'dashed',
  type: 'outline',
  offset: '4px',
}
