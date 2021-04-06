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

    --litchen-green-100: hsl(138, 67%, 94%);

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

    /* EDS themes


    /* Background colors */
    --bg-moss-green: #deedee;
    --bg-mist-blue: #d5eaf4;
    --bg-litchen-green: #e6faec;
    --bg-spruce-wood: #ffe7d6;
    --bg-slate-blue: #243746;

    /* UI colors This is just for testing!!!! */
    --ui-background-default: var(--white-100);
    --ui-background-warm: var(--spruce-wood-100);
    --ui-background-cold: var(--moss-green-50);

    --inverted-text: var(--white-100);

    /* POC Theme */
    --theme-background-primary: var(--white-100);
  }

  html.dark {
    --theme-background-primary: var(--bg-slate-blue);
  }
`
export const typography = css`
  :root {
    /**
     * Smallest device width: 375
     * Largest device width from GA 1920
     * Scaling factor: 0.454% of view port will give us 16px on smallest
     * and roughly 23px on largest display
     * 16 - 375 * 0.454% + 1920 * 0.454% = 23.0143
     */

    --scalingFactor: 0.454vw;
    --typeScale-base: clamp(1rem, calc(0.8935rem + var(--scalingFactor)), 1.4375rem);
    --typeScale-multiplier: 1.2;
    --typeScale-1: var(--typeScale-base);
    --typeScale-2: calc(var(--typeScale-1) * var(--typeScale-multiplier));
    --typeScale-3: calc(var(--typeScale-2) * var(--typeScale-multiplier));
    --typeScale-4: calc(var(--typeScale-3) * var(--typeScale-multiplier));
    --typeScale-5: calc(var(--typeScale-4) * var(--typeScale-multiplier));
    --typeScale-6: calc(var(--typeScale-5) * var(--typeScale-multiplier));
    --typeScale-0: calc(var(--typeScale-1) / var(--typeScale-multiplier));

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
  /** Fluid spacers… need better name? */
  :root {
    --fluid-xSmall: calc(var(--typeScale-1) / 4); /* 4 */
    --fluid-small: calc(var(--fluid-xSmall) * 2); /* 8 */
    --fluid-medium: calc(var(--fluid-small) * 2); /* 16 */
    --fluid-large: calc(var(--fluid-small) * 3); /* 24 */
    --fluid-xLarge: calc(var(--fluid-medium) * 2); /* 32 */
  }

  /** Fluid units for borders, border-radius etc. */
  :root {
    --fluid-1: calc(var(--typeScale-1) / 16); /* 1 */
    --fluid-2: calc(var(--unit-1) * 2); /* 2 */
    --fluid-3: calc(var(--unit-1) * 3); /* 3 */
    --fluid-4: calc(var(--unit-1) * 4); /* 4 */
    --fluid-5: calc(var(--unit-1) * 5); /* 5 */
  }

  :root {
    /** Copy'n paste from Tailwind's default.
    It's not clear how we should do this.
    We could do it in several ways, we could even make
    a fluid scale for spacings as well. But what about
    theming and that would limit design 🤷‍♀️
    Just did it with a lot of vars and MQ as a start
     */

    --spacing-0: 0px; /* 0px */
    --spacing-px: 1px; /* 1px */
    --spacing-0p5: 0.125rem; /* 2px */
    --spacing-1: 0.25rem; /* 4px */
    --spacing-1p5: 0.375rem; /* 6px */
    --spacing-2: 0.5rem; /* 8px */
    --spacing-2p5: 0.625rem; /* 10px */
    --spacing-3: 0.75rem; /* 12px */
    --spacing-3p5: 0.875rem; /* 14px */
    --spacing-4: 1rem; /* 16px */
    --spacing-5: 1.25rem; /* 20px */
    --spacing-6: 1.5rem; /* 24px */
    --spacing-7: 1.75rem; /* 28px */
    --spacing-8: 2rem; /* 32px */
    --spacing-9: 2.25rem; /* 36px */
    --spacing-10: 2.5rem; /* 40px */
    --spacing-11: 2.75rem; /* 44px */
    --spacing-12: 3rem; /* 48px */
    --spacing-14: 3.5rem; /* 56px */
    --spacing-16: 4rem; /* 64px */
    --spacing-20: 5rem; /* 80px */
    --spacing-24: 6rem; /* 96px */
    --spacing-28: 7rem; /* 112px */
    --spacing-32: 8rem; /* 128px */
    --spacing-36: 9rem; /* 144px */
    --spacing-40: 10rem; /* 160px */
    --spacing-44: 11rem; /* 176px */
    --spacing-48: 12rem; /* 192px */
    --spacing-52: 13rem; /* 208px */
    --spacing-56: 14rem; /* 224px */
    --spacing-60: 15rem; /* 240px */
    --spacing-64: 16rem; /* 256px */
    --spacing-72: 18rem; /* 288px */
    --spacing-80: 20rem; /* 320px */
    --spacing-96: 24rem; /* 384px */

<<<<<<< HEAD
    --spacing-xxSmall: var(--spacing-px);
    --spacing-xSmall: var(--spacing-1);
    --spacing-small: var(--spacing-2);
    --spacing-medium: var(--spacing-4);
    --spacing-large: var(--spacing-6);
    --spacing-xLarge: var(--spacing-10);
    --spacing-xxLarge: var(--spacing-16);
    --spacing-3xLarge: var(--spacing-24);
=======
    /** Names as in EDS. I don't see why we need both vertical and horizontal 🤷‍♀️
    They have corresponding values in EDS as well...
    But it might be easier with theming if we do this the same way?  */
    --spacer-vertical-xxSmall: var(--spacing-px); /* 1px */
    --spacer-vertical-xSmall: var(--spacing-1); /* 4px */
    --spacer-vertical-small: var(--spacing-2); /* 8x */
    --spacer-vertical-medium: var(--spacing-4); /* 16px */
    --spacer-vertical-large: var(--spacing-6); /* 24px */
    --spacer-vertical-xLarge: var(--spacing-10); /* 40px */
    --spacer-vertical-xxLarge: var(--spacing-16); /* 64px */
    --spacer-vertical-xxxLarge: var(--spacing-24); /* 96px */

    --spacer-horizontal-xxSmall: var(--spacing-px);
    --spacer-horizontal-xSmall: var(--spacing-1);
    --spacer-horizontal-small: var(--spacing-2);
    --spacer-horizontal-medium: var(--spacing-4);
    --spacer-horizontal-large: var(--spacing-6);
    --spacer-horizontal-xLarge: var(--spacing-10);
    --spacer-horizontal-xxLarge: var(--spacing-16);
    --spacer-horizontal-xxxLarge: var(--spacing-24);
>>>>>>> ee3231f... 🚧 Tweak fluid font size + add spacers

    @media (min-width: 750px) {
      --spacing-xxSmall: var(--spacing-px);
      --spacing-xSmall: var(--spacing-2);
      --spacing-small: var(--spacing-4);
      --spacing-medium: var(--spacing-8);
      --spacing-large: var(--spacing-12);
      --spacing-xLarge: var(--spacing-20);
      --spacing-xxLarge: var(--spacing-28);
      --spacing-3xLarge: var(--spacing-48);
    }
  }
`
