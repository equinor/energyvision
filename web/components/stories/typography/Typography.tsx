import * as React from 'react'
import styled from 'styled-components'

export type TypographyProps = {
  alternative: number
}

const Article = styled.article`
  font-size: var(--typeScale-1);
  max-width: 45em;
  margin-left: auto;
  margin-right: auto;

  /* font-size */

  .timestamp,
  figcaption {
    font-size: var(--typeScale-0);
  }

  p {
    font-size: var(--typeScale-1);
  }

  .lead,
  blockquote p {
    font-size: var(--typeScale-2);
  }

  h1 {
    font-size: var(--typeScale-5);
  }

  /* line-height */

  h1 {
    line-height: 1.2;
  }

  p {
    line-height: 1.5;
  }

  /* spacing */

  figure {
    margin: 0;
  }

  figcaption {
    margin-top: var(--fluid-small);
  }

  /* misc */

  .timestamp {
    text-transform: uppercase;
  }

  h1,
  h2,
  h3 {
    font-weight: 400;
  }

  img {
    aspect-ratio: 4/2;
    width: 100%;
    object-fit: cover;
    object-position: 50% 30%;
  }

  p {
    svg {
      vertical-align: middle;
    }
    span {
      vertical-align: -11%;
      margin-left: 1em;
    }
  }
`

export const Typography: React.FC<TypographyProps> = () => (
  <Article>
    <h1>Panasonic, Equinor and Hydro to explore potential for European battery business</h1>
    <p className="timestamp">
      <svg width="20" height="20">
        <rect x="2.5" y="2.5" width="15" height="15" rx="3" stroke="black" fill="white" />
      </svg>
      <span>
        <time dateTime="2021-11-18T06:45Z">November 18, 2020 07:45 CET</time>
      </span>
      <span>
        Last modified <time dateTime="2021-11-19T06:53Z">November 19, 2021 07:53 CET</time>
      </span>
    </p>
    <figure>
      {/*  eslint-disable-next-line @next/next/no-img-element */}
      <img src="https://i.imgur.com/2bvab7y.jpeg" alt="" />
      <figcaption>Photo: Panasonic</figcaption>
    </figure>
    <p className="lead">
      The companies will work together towards summer 2021 to assess the market for lithium-ion batteries in Europe and
      mature the business case for a green battery business located in Norway. The companies intend that this initiative
      is based on Panasonic’s leading technology and targets the European market for electric vehicles and other
      applications.
    </p>
    <p>
      The companies will also investigate the potential for an integrated battery value chain and for co-location of
      supply chain partners. The findings from this initial exploratory phase will form the basis for subsequent
      decisions.
    </p>
    <p>
      “This collaboration combines Panasonic’s position as an innovative technology company and leader in lithium-ion
      batteries, with the deep industrial experience of Equinor and Hydro, both strong global players, to potentially
      pave way for a robust and sustainable battery business in Norway. Panasonic has powered the last two revolutions
      in the automotive industry – first by powering hybrids and now, by powering multiple generations of all electric
      vehicles. We are pleased to enter into this initiative to explore implementing sustainable, highly advanced
      technology and supply chains to deliver on the exacting needs of lithium-ion battery customers and support the
      renewable energy sector in the European region.”
    </p>
  </Article>
)
