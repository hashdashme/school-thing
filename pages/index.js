import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Transperth Utils</title>
        <meta name="description" content="hello." />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          A bunch of utilities for <a href="https://www.transperth.wa.gov.au/">Transperth!</a>
        </h1>

        {/* <Image src="public/transperth.png"/> */}

        <p className={styles.description}>
          <b>Hello!</b> This site is currently in development.
        </p>

        <div className={styles.grid}>
          <a href="bus" className={styles.card}>
            <h2>Bus Times &rarr;</h2>
            <p>Get Bus Times for specific stop.</p>
          </a>

          <a href="train" className={styles.card}>
            <h2>Train Times &rarr;</h2>
            <p>Get Train Departure times for a line.</p>
          </a>

          <a
            href="ferry"
            className={styles.card}
          >
            <h2>Ferry Times &rarr;</h2>
            <p>Get Ferry departure times for specific Jetty.</p>
          </a>

          <a
            href="smartrider"
            className={styles.card}
          >
            <h2>SmartRider Balance &rarr;</h2>
            <p>
              Get your SmartRider Card balance.
            </p>
          </a>

          <a
            href="docs"
            className={styles.card}
          >
            <h2>API Docs &rarr;</h2>
            <p>
              Build your own application using our API.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a>This site is not affiliated or endorsed by 
          <Image
            src = "/transperth.png"
            width = {75}
            height = {75}
          />
        </a>
      </footer>
    </div>
  )
}
