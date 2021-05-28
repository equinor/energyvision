type SupProps = {
  _type: string
  _key: string
  children: string[]
  mark: string
  markKey: string
}

export const SupRenderer = ({ children }: SupProps) => {
  try {
    return <sup>{children}</sup>
  } catch (e) {
    console.error('Could not render sup', e)
    return null
  }
}
