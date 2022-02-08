type HitProps = {
  hit: any
}
const Hit = ({ hit }: HitProps) => {
  return (
    <article>
      <h2>{hit.title}</h2>
      <p>{hit.ingress}</p>
    </article>
  )
}

export default Hit
