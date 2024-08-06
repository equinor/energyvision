import { createContext, ReactNode, useCallback, useContext, useState } from 'react'

type State = {
  selectedTopics?: any[]
  selectedCountries?: any[]
  selectedYears?: any[]
  //onChange: (selectedTopics: any[], selectedCountries: any[], selectedYears: any[]) => void
}

const initalState: State = {
  selectedTopics: [],
  selectedCountries: [],
  selectedYears: [],
}
type UseFilterProps<T> = T & {
  setSelectedTopics: (selectedTopics: any[]) => void
  setSelectedCountries: (selectedTopics: any[]) => void
  setSelectedYears: (selectedTopics: any[]) => void
  //setOnChange: (onChange: (selectedTopics: any, selectedCountries: any, selectedYears: any) => void) => void
}

const FilterContext = createContext<State>(initalState)

type ProviderProps = {
  children: ReactNode
  onChange: (selectedTopics: any[], selectedCountries: any[], selectedYears: any[]) => void
}

export const FilterProvider = ({ children, onChange }: ProviderProps): JSX.Element => {
  const [state, setState] = useState<State>(initalState)
  const { selectedTopics, selectedCountries, selectedYears } = state

  const setSelectedTopics = useCallback(
    (selectedTopics: any) => {
      console.log('Context: set selectedTopics and call on change')
      setState((prevState) => ({ ...prevState, selectedTopics: selectedTopics }))
      onChange?.(selectedTopics, selectedCountries, selectedYears)
    },
    [onChange, selectedCountries, selectedYears],
  )

  const setSelectedCountries = useCallback(
    (selectedCountries: any) => {
      setState((prevState) => ({ ...prevState, selectedCountries: selectedCountries }))
      onChange?.(selectedTopics, selectedCountries, selectedYears)
    },
    [onChange, selectedTopics, selectedYears],
  )
  const setSelectedYears = useCallback(
    (selectedYears: any) => {
      setState((prevState) => ({ ...prevState, selectedYears: selectedYears }))
      onChange?.(selectedTopics, selectedCountries, selectedYears)
    },
    [onChange, selectedCountries, selectedTopics],
  )

  /*   const setOnChange: UseFilterProps<State>['setOnChange'] = (onChange) => {
    setState((prevState) => ({ ...prevState, onChange }))
  } */

  const value = {
    setSelectedCountries,
    setSelectedTopics,
    setSelectedYears,
    //setOnChange,
    //onChange,
    selectedCountries,
    selectedTopics,
    selectedYears,
  }
  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
}

export const useFilter = (): UseFilterProps<State> => useContext<State>(FilterContext) as UseFilterProps<State>

const FilterConsumer = FilterContext.Consumer

export { FilterContext, FilterConsumer }
