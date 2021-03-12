import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {default as Token} from '../components/token'
import { default as Squad } from '../components/squad'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Xwing Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to X-wing Dashboard<br/>
          <Token name={"vt49decimator"}/>
        </h1>
        <Squad/>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
