// @TODO Not able to figure out exactly the types
const isEmpty = (children: any[]) => {
  return children.every((child) => child.length === 0)
}

export default isEmpty
