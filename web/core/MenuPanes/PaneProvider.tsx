import { createContext, Dispatch, SetStateAction, useState } from 'react'

type State = {
  openPaneId?: string
  setOpenPaneId?: Dispatch<SetStateAction<string>>
}

const initialState: State = {
  openPaneId: '',
}

const PaneContext = createContext<State>(initialState)

const PaneProvider = ({ children }: { children: React.ReactNode }) => {
  const [openPaneId, setOpenPaneId] = useState('')

  return <PaneContext.Provider value={{ openPaneId, setOpenPaneId }}>{children}</PaneContext.Provider>
}

export { PaneContext, PaneProvider }
