import { useState } from 'react'

type FotowareAuthData = {
  access_token: string
  expires_in: string
  state: string
}

export const validateToken = (tokenData: any) => {
  const now = Math.floor(new Date().getTime() / 1000.0)

  if (parseInt(tokenData.expires) <= now) {
    localStorage.removeItem('FotowareToken')
    return false
  }
  return true
}

function useLocalStorage() {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once

  const getToken = () => {
    const fotowareToken = window.localStorage.getItem('FotowareToken')
    if (!fotowareToken) return null
  }

  const [storedToken, setStoredToken] = useState(() => {
    try {
      return getToken()
    } catch (error) {
      console.log('Error when retrieving token from storage')
      console.log(error)
      return null
    }
  })

  const setToken = (data: FotowareAuthData) => {
    try {
      const now = Math.floor(new Date().getTime() / 1000.0)

      const tokenData = {
        access_token: data.access_token,
        expires: now + parseInt(data.expires_in),
      }
      // Save state
      //@ts-ignore:TODO
      setStoredToken(tokenData)
      // Save to local storage
      window.localStorage.setItem('FotowareToken', JSON.stringify(tokenData))
    } catch (error) {
      console.log(error)
    }
  }

  return [storedToken, setToken]
}

export default useLocalStorage
