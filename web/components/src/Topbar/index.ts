import { Topbar as TopbarWrapper } from './Topbar'
import { InnerContainer } from './InnerContainer'

type TopbarCompoundprops = typeof TopbarWrapper & {
  InnerContainer: typeof InnerContainer
}

const Topbar = TopbarWrapper as TopbarCompoundprops

Topbar.InnerContainer = InnerContainer

export { Topbar }
export * from './Logo'
