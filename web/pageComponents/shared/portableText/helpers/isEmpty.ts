// @TODO Not able to figure out exactly the types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEmpty = (children: any[]) => {
  return children.every((child) => child.length === 0)
}

export default isEmpty
