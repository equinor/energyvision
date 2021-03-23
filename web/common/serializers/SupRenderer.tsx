const SupRenderer = (child: { children: any }) => {
  try {
    const { children } = child
    return <sup>{children}</sup>
  } catch (e) {
    console.error('Could not render sup', e)
    return null
  }
}

export default SupRenderer
