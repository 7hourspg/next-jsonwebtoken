'use client'
import { useEffect } from 'react'
import styles from './about.module.scss'
import { hasCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'

const AboutPage = () => {
   const router = useRouter()
  useEffect(() => {
    if (!hasCookie('token')) {
      router.push('/login')
    }
  }, [])
  return (
    <div className={styles.container}>
      <h1>This is a About Page</h1>
    </div>
  )
}
export default AboutPage
