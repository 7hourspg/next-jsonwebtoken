'use client'
import Link from 'next/link'
import styles from './login.module.scss'
import { useState, useContext } from 'react'
import axios from 'axios'
import { hasCookie, getCookies, deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { CookiesContext } from '../../context/CookiesContext'

const LoginPage = () => {
  const [userData, setUserData] = useState({ email: '', password: '' })
  const router = useRouter()

  const { value, GET_COOKIES, DELETE_COOKIES } = useContext(CookiesContext)

  const handleChange = e => {
    const { name, value } = e.target
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }
  // console.log(userData);

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/login', userData)
      console.log(res.data)
      if (hasCookie('token')) {
        GET_COOKIES(getCookies('token'))
        router.push('/')
      }
      return
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogout = async () => {
    deleteCookie('token')
    console.log('cookie deleted')
  }

  return (
    <div className={styles.login_container}>
      <h1 className={styles.login_header_text}>Login</h1>
      <form className={styles.login_form}>
        <h5>E-mail</h5>
        <input
          onChange={handleChange}
          className={styles.login_form_input}
          type='text'
          name='email'
        />
        <h5>Password</h5>
        <input
          onChange={handleChange}
          className={styles.login_form_input}
          type='password'
          name='password'
        />
        <button
          onClick={handleSubmit}
          type='submit'
          className={styles.login_form_button}
        >
          Sign In
        </button>
        <p className={styles.text}> Don't have an account? </p>
        <Link href='/register'>
          <button className={styles.register_button}>
            Create your account
          </button>
        </Link>
      </form>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default LoginPage
