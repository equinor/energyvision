'use client'
import { createContext, useContext } from 'react'
import { ThemeVariants, Variants } from './Table'

type State = {
  variant: Variants
  themeVariant: ThemeVariants
  section: 'body' | 'head' | 'foot'
}

const initialState: State = {
  variant: 'zebra',
  themeVariant: 'grey',
  section: 'body',
}

export const InnerContext = createContext<State>(initialState)

export function useTable() {
  const context = useContext(InnerContext)
  if (!context) {
    throw new Error('Table compound components must be rendered within the Table component')
  }
  return context
}
