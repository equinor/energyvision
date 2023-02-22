import { Flags } from '../common/helpers/datasetHelpers'
import { css } from 'styled-components'

export const colors = css`
  :root {
    /* Primary colours */
    --moss-green-100: hsl(184, 100%, 17%);
    --moss-green-95: hsl(184, 100%, 24%);
    --moss-green-90: hsl(184, 31%, 58%);
    --moss-green-80: hsl(184, 31%, 74%);
    --moss-green-70: hsl(184, 30%, 84%);
    --moss-green-60: hsl(184, 31%, 89%);
    --moss-green-50: hsl(184, 30%, 96%);

    --energy-red-100: hsl(348, 100%, 54%);
    --energy-red-90: hsl(348, 100%, 67%);
    --energy-red-80: hsl(347, 100%, 77%);
    --energy-red-70: hsl(347, 100%, 86%);
    --energy-red-60: hsl(349, 100%, 91%);
    --energy-red-50: hsl(347, 100%, 96%);

    --black-100: hsl(0, 0%, 0%);
    --black-80: hsl(0, 0%, 20%);

    --white-100: hsl(0, 0%, 100%);

    /* Supporting colours */
    --slate-blue-100: hsl(206, 34%, 14%);
    --slate-blue-95: hsl(206, 32%, 21%);
    --slate-blue-90: hsl(207, 14%, 37%);
    --slate-blue-80: hsl(207, 8%, 53%);
    --slate-blue-70: hsl(206, 9%, 68%);
    --slate-blue-60: hsl(206, 9%, 84%);
    --slate-blue-50: hsl(210, 8%, 90%);

    --mist-blue-100: hsl(199, 58%, 90%);
    --mist-blue-60: hsl(200, 56%, 94%);

    --lichen-green-100: hsl(138, 67%, 94%);

    --spruce-wood-100: hsl(25, 100%, 92%);
    --spruce-wood-90: hsl(25, 100%, 94%);

    --heritage-red-100: hsl(343, 100%, 25%);
    --heritage-red-90: hsl(343, 42%, 43%);
    --heritage-red-80: hsl(344, 32%, 62%);
    --heritage-red-70: hsl(344, 32%, 77%);
    --heritage-red-60: hsl(340, 32%, 91%);

    --clear-red-100: hsl(0, 100%, 46%);
    --clear-red-90: hsl(0, 85%, 68%);
    --clear-red-80: hsl(0, 85%, 78%);
    --clear-red-70: hsl(0, 86%, 86%);
    --clear-red-60: hsl(0, 88%, 94%);

    --green-100: hsl(118, 44%, 35%);
    --green-90: hsl(118, 44%, 50%);

    --orange-100: hsl(34, 100%, 34%);
    --orange-90: hsl(34, 100%, 50%);

    --grey-100: hsl(0, 0%, 9%);
    --grey-90: hsl(0, 0%, 24%);
    --grey-80: hsl(0, 0%, 34%);
    --grey-70: hsl(0, 0%, 40%);
    --grey-60: hsl(0, 0%, 44%);
    --grey-50: hsl(0, 0%, 55%);
    --grey-40: hsl(0, 0%, 75%);
    --grey-30: hsl(0, 0%, 86%);
    --grey-20: hsl(0, 0%, 92%);
    --grey-10: hsl(0, 0%, 97%);

    --transparent-black: hsla(0, 0%, 0%, 20);
    --transparent-white: hsla(0, 0%, 100%, 20);

    /* UI colors This is just for testing!!!! */
    --ui-background-default: var(--white-100);
    --ui-background-warm: var(--spruce-wood-100);
    --ui-background-cold: var(--moss-green-50);

    --inverted-text: var(--white-100);
    --default-text: rgba(61, 61, 61, 1);

    --theme-background-primary: var(--white-100);

    --topbar-height: 100px;
  }
`
export const typography = css`
  // prettier-ignore
  :root {
    /*                         mobile                                     desktop */

    --typeScale-00: clamp(calc(11.11 / 16 * 1rem), 0.19vw + 0.65rem, calc(14.08 / 16 * 1rem));
    --typeScale-0: clamp(calc(13.33 / 16 * 1rem), 0.28vw + 0.77rem, calc(17.60 / 16 * 1rem));
    --typeScale-05: clamp(calc(14.61 / 16 * 1rem), 0.33vw + 0.84rem, calc(19.68 / 16 * 1rem));
    --typeScale-1: clamp(calc(16.00 / 16 * 1rem), 0.39vw + 0.91rem, calc(22.00 / 16 * 1rem));
    --typeScale-2: clamp(calc(19.20 / 16 * 1rem), 0.54vw + 1.07rem, calc(27.50 / 16 * 1rem));
    --typeScale-3: clamp(calc(23.04 / 16 * 1rem), 0.73vw + 1.27rem, calc(34.38 / 16 * 1rem));
    --typeScale-4: clamp(calc(27.65 / 16 * 1rem), 0.99vw + 1.5rem, calc(42.97 / 16 * 1rem));
    --typeScale-5: clamp(calc(39.81 / 16 * 1rem), 1.77vw + 2.07rem, calc(67.14 / 16 * 1rem));

     // search and replace, then remove
    --typeScale-small: var(--typeScale-00);
  }

  :root {
    /* Should probably do something more clever here */
    --lineHeight-1: inherit;
    --lineHeight-2: 1.2;
    --lineHeight-3: 1.5;

    /* Font weights */
    --fontWeight-bolder: 650;
    --fontWeight-bold: 600;
    --fontWeight-medium: 500;
    --fontWeight-regular: 400;
  }
`

export const strictLineBreak = Flags.HAS_LINE_BREAK_TYPO
  ? css`
      :root {
        line-break: strict;
        word-break: keep-all;
      }
    `
  : css``

export const spacings = css`
  // prettier-ignore
  :root {
    --space-xSmall : calc( 4 / 16 * var(--typeScale-1));
    --space-small  : calc( 8 / 16 * var(--typeScale-1));
    --space-medium : calc(16 / 16 * var(--typeScale-1));
    --space-large  : calc(24 / 16 * var(--typeScale-1));
    --space-xLarge : calc(32 / 16 * var(--typeScale-1));
    --space-xxLarge: calc(40 / 16 * var(--typeScale-1));
    --space-3xLarge: calc(56 / 16 * var(--typeScale-1));
    --space-4xLarge: calc(96 / 16 * var(--typeScale-1));
  }

  /** space units for borders, border-radius etc. */
  // prettier-ignore
  :root {
    --space-1 : calc( 1 / 16 * var(--typeScale-1)); // 375:  1px, 1440:   1.26px, 1920:   1.26px
    --space-2 : calc( 2 / 16 * var(--typeScale-1)); // 375:  2px, 1440:   2.52px, 1920:   2.52px
    --space-3 : calc( 3 / 16 * var(--typeScale-1)); // 375:  3px, 1440:   3.78px, 1920:   3.78px
    --space-4 : calc( 4 / 16 * var(--typeScale-1)); // 375:  4px, 1440:   5.04px, 1920:   5.04px
    --space-8 : calc( 8 / 16 * var(--typeScale-1)); // 375:  8px, 1440:  10.07px, 1920:  10.07px
    --space-12: calc(12 / 16 * var(--typeScale-1)); // 375: 12px, 1440:  15.10px, 1920:  15.10px
    --space-16: calc(16 / 16 * var(--typeScale-1)); // 375: 16px, 1440:  20.13px, 1920:  20.13px
    --space-24: calc(24 / 16 * var(--typeScale-1)); // 375: 24px, 1440:  30.21px, 1920:  30.21px
    --space-32: calc(32 / 16 * var(--typeScale-1)); // 375: 32px, 1440:  40.27px, 1920:  40.27px
    --space-40: calc(40 / 16 * var(--typeScale-1)); // 375: 40px, 1440:  50.34px, 1920:  50.34px
    --space-48: calc(48 / 16 * var(--typeScale-1)); // 375: 48px, 1440:  60.41px, 1920:  60.41px
    --space-56: calc(56 / 16 * var(--typeScale-1)); // 375: 56px, 1440:  70.47px, 1920:  70.47px
    --space-64: calc(64 / 16 * var(--typeScale-1)); // 375: 64px, 1440:  80.54px, 1920:  80.54px
    --space-80: calc(80 / 16 * var(--typeScale-1)); // 375: 80px, 1440: 100.68px, 1920: 100.68px
    --space-96: calc(96 / 16 * var(--typeScale-1)); // 375: 96px, 1440: 120.81px, 1920: 120.81px
  }

  :root {
    --minViewportWidth: 375px;
    --maxViewportWidth: 1920px;
    --layout-paddingHorizontal-small: clamp(16px, calc(-38.3689px + 14.4984vw), 250px);
    --layout-paddingHorizontal-medium: clamp(16px, calc(-69.4369px + 22.7832vw), 368px);
    --layout-paddingHorizontal-large: clamp(16px, calc(-101.4757px + 31.3269vw), 500px);
    --layout-maxContent-narrow: calc(1920px - 500px * 2); /* 920 */
    --layout-maxContent-medium: calc(1920px - 368px * 2); /* 1184 */
    --layout-maxContent-wide: calc(1920px - 250px * 2); /* 1420 */
  }
`

export const componentSettings = css`
  /* Topbar */
  :root {
    --topBar-box-shadow: 0 0 15px 10px rgba(41, 62, 64, 0.15);
    --topbar-innerMaxWidth: calc(1920px - (var(--layout-paddingHorizontal-small) * 2));
  }

  /* Menu */
  :root {
    --menu-height-lg: 598px;
    --menu-paddingHorizontal: clamp(16px, calc(-69.4369px + 22.7832vw), 368px);
    --menu-paddingVertical: calc(8rem - var(--topbar-height));
  }

  /* Use relative units in EDS Table */
  :root {
    --eds_table__font_size: calc(14 / 16 * 1rem); // TODO: Override
    --eds_table__cell__height: auto;
    --eds_table__cell__padding_y: calc(14 / 14 * 1em);
    --eds_table__cell__vertical_align: top;
  }

  /* Use relative units in EDS Button */
  :root {
    --eds_button__font_size: var(--typeScale-05);
    --eds_button__radius: calc(4 / 14 * 1em);
    --eds_button__height: auto;
    --eds_button__gap: calc(8 / 14 * 1em);
    --eds_button__border_width: 1px;
    --eds_button__padding_y: calc(10 / 14 * 1em - var(--eds_button__border_width));
    --eds_button__padding_x: calc(16 / 14 * 1em);
    --eds_button__icon__size: 24px;
    --eds_button__icon__margin_y: -4px; // icon = 24px, line-height: 16px, (24 - 16) / 2 = 4px
    --eds_button__fullwidth__icon__margin_x: calc(8 / 14 * 1em);
    --eds_button__fullwidth__label__margin_x: calc(32 / 14 * 1em);
  }

  /* Card */
  :root {
    --card-box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.2);
  }
`
