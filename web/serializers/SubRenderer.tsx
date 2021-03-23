// @TODO: Type child
const SubRenderer = (child: { mark: any; children: any }) => {
  try {
    const { mark, children } = child
    const { sub } = mark
    return <sub>{children}</sub>
  } catch (e) {
    console.error('Could not render sub', e)
    return null
  }
}

export default SubRenderer
