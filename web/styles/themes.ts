import { css } from 'styled-components'

/** When a component is wrapped with Background container, these variables get
 * applied to that component, based on the background color. We currently have
 * normal theme which is the default. Inverted theme is applied on dark background
 * colors.
 *
 * If you are creating a new variable here, prefix the variable with the component
 * name. Also make sure the variable is created in both normal and inverted themes.
 */
export const normal = css`
  /**@ Button component */
  --button-border-color: var(--slate-blue-95);
  --button-border-color-hover: var(--slate-blue-95);
  --button-text: var(--default-text);
  --button-background-hover: var(--slate-blue-100);
  --button-background: transparent;
  --button-text-hover: var(--inverted-text);

  /**@ Link component */
  --link-color: var(--slate-blue-95);
  --content-link-color: var(--slate-blue-95);
  --link-arrow-color: var(--energy-red-100);
  --link-arrow-color-hover: var(--energy-red-100);
  --content-link-arrow-color-hover: var(--energy-red-100);

  /**@ Quote component*/
  --quote-icon-color: var(--grey-90);

  /**@ Pagination Component */
  --pagination-btn-text-color: var(--slate-blue-95);
  --pagination-btn-background-active: var(--moss-green-80);
  --pagination-btn-text-color-active: var(--black-100);
  --pagination-btn-disabled: var(--grey-30);

  /**@ Accordion component*/
  --accordion-icon-color: var(--energy-red-100);

  /**@ Breadcrumbs component*/
  --breadcrumbs-inactive-color: var(--slate-blue-90);

  /**@ Title Highlight  */
  --title-highlight-color: var(--energy-red-100);

  --color-inverse: var(--inverted-text);
`

export const inverted = css`
  --button-border-color: var(--white-100);
  --button-border-color-hover: var(--white-100);
  --button-text: var(--inverted-text);
  --button-background-hover: var(--white-100);
  --button-background: transparent;
  --button-text-hover: var(--slate-blue-100);
  --link-color: var(--mist-blue-100);
  --content-link-color: var(--inverted-text);
  --link-arrow-color: var(--white-100);
  --link-arrow-color-hover: var(--white-100);
  --content-link-arrow-color-hover: var(--energy-red-100);
  --quote-icon-color: var(--inverted-text);
  --pagination-btn-text-color: var(--moss-green-80);
  --pagination-btn-background-active: var(--moss-green-70);
  --pagination-btn-text-color-active: var(--default-text);
  --pagination-btn-disabled: var(--slate-blue-90);
  --accordion-icon-color: var(--white-100);
  --breadcrumbs-inactive-color: var(--grey-30);
  --title-highlight-color: var(--spruce-wood-100);
  --color-inverse: var(--default-text);
`
