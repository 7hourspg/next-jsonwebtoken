'use client'
import { useEffect, useContext } from 'react'
import styles from './page.module.scss'
import { deleteCookie, hasCookie, getCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { CookiesContext } from './context/CookiesContext'

const homePage = () => {
  const router = useRouter()
  const { DELETE_COOKIES, cookies } = useContext(CookiesContext)

  useEffect(() => {
    if (!hasCookie('token')) {
      router.push('/login')
    }
  }, [])

  if (!cookies?.token)
    return (
      <div className={styles.container}>
        <h1>Loading...</h1>
      </div>
    )

  const GET_COOKIESs = () => {
    console.log(getCookie('token'))
  }

  return (
    <div className={styles.container}>
      <h1>This is a Home Page</h1>
      <br />
      <button onClick={DELETE_COOKIES}>Logout</button> <br />
      <button onClick={GET_COOKIESs}>Get Cookie</button>
    </div>
  )
}

export default homePage
