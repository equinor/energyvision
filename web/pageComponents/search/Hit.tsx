import { Highlight, Snippet } from 'react-instantsearch-dom'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Hit = ({ hit }: { hit: any }) => {
  return (
    <div>
      <Highlight attribute="title" hit={hit} tagName="span" />
      <Snippet attribute="ingress" hit={hit} />
    </div>
  )
}

export default Hit
