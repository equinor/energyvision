import { Highlight, Snippet } from 'react-instantsearch-dom'

const Hit = ({ hit }: { hit: any }) => {
  return (
    <div>
      <Highlight attribute="title" hit={hit} tagName="span" />
      <Snippet attribute="ingress" hit={hit} />
    </div>
  )
}

export default Hit
