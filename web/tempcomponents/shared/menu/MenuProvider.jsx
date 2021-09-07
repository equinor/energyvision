// @TODO: This is a temporarily fix. Didn't bother with migrating to ts

import { useReducer, useContext, createContext } from 'react'

const MenuContext = createContext()

const menuReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_MENU':
      return {
        ...state,
        isOpen: !state.isOpen,
      }
    case 'SET_ACTIVE_MENU':
      return {
        ...state,
        isOpen: true,
        activeMenuItem: action.menuItem,
      }
    case 'REMOVE_ACTIVE_MENU':
      return {
        ...state,
        activeMenuItem: null,
      }
    case 'OPEN_MENU':
      return {
        ...state,
        isOpen: true,
      }
    case 'CLOSE_MENU':
      return {
        ...state,
        isOpen: false,
        active: null,
      }
    default:
      throw new Error('No such action')
  }
}

const MenuProvider = ({ children }) => {
  const [state, dispatch] = useReducer(menuReducer, {
    isOpen: false,
    activeMenuItem: null,
  })

  const value = {
    isOpen: state.isOpen,
    getActiveMenuItem: state.activeMenuItem,
    toggleMenu: () => dispatch({ type: 'TOGGLE_MENU' }),
    openMenu: () => dispatch({ type: 'OPEN_MENU' }),
    closeMenu: () => dispatch({ type: 'CLOSE_MENU' }),
    setActive: (menuItem) => dispatch({ type: 'SET_ACTIVE_MENU', menuItem }),
    removeActive: () => dispatch({ type: 'REMOVE_ACTIVE_MENU' }),
  }

  return (
    <>
      <MenuContext.Provider value={value}>{children}</MenuContext.Provider>
    </>
  )
}

export const useMenu = () => {
  const context = useContext(MenuContext)
  if (!context) {
    throw new Error(`useMenu must be used within a MenuProvider`)
  }

  return context
}

export default MenuProvider
