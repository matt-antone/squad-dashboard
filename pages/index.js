import Head from 'next/head'
import { default as Squad } from '../components/Squad'

export default function Home() {
  return (
    <div className="bg-gray-800">
      <Head>
        <title>Xwing Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto">
        <main>
          <h1>
            Squad Dashboard
          </h1>
          <Squad/>
        </main>
      </div>
      <footer>
      </footer>
    </div>
  )
}