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
  :root[data-dynamic-typography-version="v1"] {
    --typeScale-base: 1rem;
    --typeScale-multiplier: 1.2;
    --typeScale-small: calc(var(--typeScale-0) / var(--typeScale-multiplier));
    --typeScale-1: var(--typeScale-base);
    --typeScale-2: calc(var(--typeScale-1) * var(--typeScale-multiplier));
    --typeScale-3: calc(var(--typeScale-2) * var(--typeScale-multiplier));
    --typeScale-4: calc(var(--typeScale-3) * var(--typeScale-multiplier));
    --typeScale-5: calc(var(--typeScale-4) * var(--typeScale-multiplier));
    --typeScale-6: calc(var(--typeScale-5) * var(--typeScale-multiplier));
    --typeScale-0: calc(var(--typeScale-1) / var(--typeScale-multiplier));
    ]
  }

  :root[data-dynamic-typography-version="v2"] {
    /* TODO: Add small */
    --typeScale-0: clamp(0.83rem, 0.38vw + 0.74rem, 1.2rem);
    --typeScale-1: clamp(1rem, 0.45vw + 0.89rem, 1.44rem);
    --typeScale-2: clamp(1.2rem, 0.54vw + 1.07rem, 1.72rem);
    --typeScale-3: clamp(1.44rem, 0.65vw + 1.29rem, 2.07rem);
    --typeScale-4: clamp(1.73rem, 0.78vw + 1.54rem, 2.48rem);
    --typeScale-5: clamp(2.07rem, 0.94vw + 1.85rem, 2.98rem);
    --typeScale-6: clamp(2.49rem, 1.13vw + 2.22rem, 3.58rem);
  }

  :root {
    /* Should probably do something more clever here */
    --lineHeight-1: inherit;
    --lineHeight-2: 1.2;
    --lineHeight-3: 1.5;

    /* Font weights */
    --fontWeight-bold: 700;
    --fontWeight-medium: 500;
    --fontWeight-regular: 400;
  }
`

export const spacings = css`
  :root {
    --space-xSmall: calc(1rem / 4); /* 4 */
    --space-small: calc(1rem / 2); /* 8 */
    --space-medium: 1rem; /* 16 */
    --space-large: calc(1rem * 1.5); /* 24 */
    --space-xLarge: calc(1rem * 2); /* 32 */
    --space-xxLarge: calc(1rem * 2.5); /* 40 */
    --space-3xLarge: calc(1rem * 3.5); /* 56 */
    --space-4xLarge: calc(1rem * 6); /* 96 */
  }

  /** space units for borders, border-radius etc. */
  :root {
    --space-1: calc(1rem / 16); /* 1 */
    --space-2: calc(1rem / 8); /* 2 */
    --space-3: calc(1rem / 16 * 3); /* 3 */
    --space-4: calc(1rem / 4); /* 4 */
    --space-5: calc(1rem / 16 * 5); /* 5 */
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
  /** Because Jest hates you when you do an import style in the component */
  :root {
    --reach-accordion: 1;
    --reach-skip-nav: 1;
  }
`
