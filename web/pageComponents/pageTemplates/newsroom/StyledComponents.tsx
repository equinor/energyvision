import styled from 'styled-components'

export const Wrapper = styled.div`
  max-width: var(--maxViewportWidth);
  margin: 0 auto;
  grid-template-areas:
    '. intro'
    '. .'
    'news news';
  grid-template-rows: auto var(--space-large) auto;
  grid-template-columns: var(--space-large) auto;
  display: grid;
  /* Yup, in an ideal world we might have used some clamp based paddings here to avoid MQ, but the smallest
  one is way too big. Might create some fluid spacings later on   */
  @media (min-width: 800px) {
    grid-template-areas:
      '. . .'
      '. intro .'
      '. . .'
      '.  news news';
    grid-template-rows: var(--space-xxLarge) auto var(--space-3xLarge) auto;
    grid-template-columns: var(--layout-paddingHorizontal-small) minmax(auto, var(--layout-maxContent-narrow)) 1fr;
  }
`

export const Intro = styled.div`
  grid-area: intro;
`

export const News = styled.div`
  grid-area: news;
`

export const UnpaddedText = styled.div`
  & p:only-child {
    margin-bottom: 0;
  }
`
