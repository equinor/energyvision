type SubProps = {
  _type: string
  _key: string
  children: string[]
  mark: string
  markKey: string
}

export const SubRenderer = ({ mark, children }: SubProps) => {
  try {
    const { sub } = mark
    return <sub>{children}</sub>
  } catch (e) {
    console.error('Could not render sub', e)
    return null
  }
}
