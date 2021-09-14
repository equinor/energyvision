import Head from 'next/head'
import styled from 'styled-components'
import { Link } from '@components'
import NextLink from 'next/link'
import { Menu } from '../shared/menu/Menu'

const Container = styled.main`
  flex: 1;
  padding: var(--space-medium);
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
    <>
      <Menu />
      <Container>
        <Head>
          <title>EnergyVision</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Title>
          MVP 2 is all about{' '}
          <NextLink href="/en/careers" passHref>
            <Link variant="readMore">Careers</Link>
          </NextLink>
        </Title>
        <NextLink href="/en/news" passHref>
          <Link variant="readMore">News</Link>
        </NextLink>
      </Container>
    </>
  )
}
