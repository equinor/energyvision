import Head from 'next/head'
import styled from 'styled-components'
import { Button, Link } from '@components'

const Container = styled.div`
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--theme-background-primary);
`

const Main = styled.main`
  padding: 5rem 0;
  flex: 1;
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
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <Title>
          MVP 1 is all about{' '}
          <Link href="/news" variant="readMore">
            News
          </Link>
        </Title>
        <div>
          You can <Button href="/posts/hello-there">Click me</Button>
        </div>

        <div style={{ width: '100%' }}>
          <Link href="/posts/hello-there" variant="contentLink">
            Content
          </Link>
        </div>

        <div style={{ marginTop: '2em' }}>
          <Link href="/posts/hello-there" variant="readMore">
            Read more
          </Link>
        </div>

        <div style={{ height: '1500px' }}></div>
      </Main>
    </Container>
  )
}
