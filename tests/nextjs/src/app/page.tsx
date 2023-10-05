"use client"
import dynamic from 'next/dynamic'
import styles from './page.module.css'
const Component = dynamic(() => import('./components/Component'), { ssr: false });

export default function Home() {
  console.log('hi home');
  return (
    <main className={styles.main}>
      <p>Hi NextJS</p>
      <Component />
    </main>
  )
}
