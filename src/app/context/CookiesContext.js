'use client'
import { createContext, useEffect } from 'react'
import { useState } from 'react'
import { hasCookie, getCookies, deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'

export const CookiesContext = createContext(null)

export const CookiesProvider = ({ children }) => {
  const router = useRouter()
  const [cookies, setCookies] = useState(null)
  const GET_COOKIES = val => {
    setCookies(val)
  }
  const DELETE_COOKIES = () => {
    setCookies(null)
    deleteCookie('token')
    console.log('Deleted Cookie')
  }

  useEffect(() => {
    if (cookies === null || hasCookie('token') === false) {
      router.push('/login')
    }
    console.log(cookies, 'Cookies')
  }, [cookies])

  return (
    <CookiesContext.Provider value={{ GET_COOKIES, DELETE_COOKIES, cookies }}>
      {children}
    </CookiesContext.Provider>
  )
}
