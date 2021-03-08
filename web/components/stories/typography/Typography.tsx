import * as React from 'react'
import styled from 'styled-components'

export type TypographyProps = {
  alternative: number
}

const Article = styled.article`
  font-size: var(--typeScale-1);

  h1,
  h2,
  h3 {
    font-weight: 400;
  }
`

export const Typography: React.FC<TypographyProps> = () => (
  <Article>
    <p>To mark International Women’s Day, we’re celebrating our pioneering women leaders.</p>
    <h1>
      “Margareth, here’s a job for you. Just fetch the coffee.”
      <br />
      <span>Little did he know she’d be his future boss.</span>
    </h1>
    <p>
      It was 1982, and she did as she was told. But you can only wonder what that hapless male manager must have thought
      as he watched her career unfold. Today, Margareth Øvrum is a living legend in Equinor.
    </p>
    <p>
      To mark International Women’s day, we look back and celebrate Margareth’s career — as well as the brave and
      determined women leaders of today who are picking up her torch, pioneering new ways as role models in traditional
      male bastions.
    </p>
    <p>
      Recently retired, Margareth has held a string of responsible positions in Statoil, now Equinor, including director
      of operations on the Norwegian Continental Shelf, senior vice president for technology and projects, member of the
      corporate executive committee, and finally country manager for Brazil. In 2013 she was awarded the title Norway’s
      most influential woman in technology.
    </p>
    <p>
      But like any pioneer, Margareth’s story is marked by a notable first. In her case, becoming Equinor’s first female
      platform manager in 1989. At the age of 32, she wasn’t just the first woman — she was also the youngest.{' '}
    </p>
    <p>
      ”It was a fairly rough environment at the Gullfaks field. There were some tough struggles with the unions, and
      some doors were slammed from time to time, but I do believe that I developed a good and honest relationship with
      everyone,” Margareth says.
    </p>
  </Article>
)
