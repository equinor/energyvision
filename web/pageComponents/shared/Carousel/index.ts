/**
 * This should ideally be in web/components/src/Carousel instead of in web/pageComponents/Carousel
 * However, it would seem that the Swiper.js library and Jest do not get along nicely
 * See: https://github.com/nolimits4web/swiper/discussions/4969
 * I have tried some of the suggestions in that discussion without much success. Due to the structure of our code, using
 * the transformIgnorePatterns causes other issues, since we are exporting all components from web/components/src/index.ts
 * and we can't selectively ignore just the export line for the Carousel there
 */

export * from './Swiper'
