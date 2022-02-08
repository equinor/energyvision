type HitProps = {
  hit: any
}
const Hit = ({ hit }: HitProps) => {
  console.log(hit)
  return (
    <article>
      <h2>{hit.title}</h2>
      <p>{hit.ingress}</p>
    </article>
  )
}

export default Hit
