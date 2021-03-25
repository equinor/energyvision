import Head from 'next/head'
import styled from 'styled-components'
import { Link } from '@components'

const Container = styled.main`
  flex: 1;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Title = styled.h1`
  margin: 0;
  line-height: 1.15;
  font-size: 4rem;
  text-align: center;
`

export default function Home(): JSX.Element {
  return (
    <Container>
      <Head>
        <title>EnergyVision</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Title>
        MVP 1 is all about{' '}
        <Link href="/news" variant="readMore">
          News
        </Link>
      </Title>
    </Container>
  )
}
