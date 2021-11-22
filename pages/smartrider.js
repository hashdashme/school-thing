import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React from 'react'
import Link from 'next/link'
// import _ from 'lodash'

export default function Home() {
  
  const [inputValue, setInputValue] = React.useState('')
  const [data, setData] = React.useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch(`/api/smartrider?id=${inputValue.replace(/\s+/g, '')}`)
    .then((res) => res.json())
    .then((data) => {
      setData(data)
    })

    // Handle Sounds
    if (data.success || !isNaN(data.error)) {
      if (data.success) {
        return <audio id='a1' src="/coin.wav"/>
      }
    }
  }
  
  // return (
  //   <div className={styles.container}>
  //     <Head>
  //       <title>Fetch Twitter Follower</title>
  //       <link rel="icon" href="/favicon.ico" />
  //     </Head>

  //     <main className={styles.main}>
  //       <h1>Fetch Smart Rider Balance</h1>
  //       <form onSubmit={handleSubmit}>
  //         <label>
  //           Enter a SmartRider number
  //           <input
  //             value={inputValue}
  //             onChange={(e) => setInputValue(e.target.value)}
  //           />
  //         </label>
  //         <button>Submit</button>
  //       </form>
  //       {data.data.balance >= 0 ? (
  //         <p>Balance: ${data.data.balance}</p>
  //       ) : (
  //         <p>{data.error}</p>
  //       )}
  //     </main>
  //   </div>
  // )

  return (
    <div className={styles.container}>
      <Head>
        <title>Transperth Utils | Smartrider</title>
        <meta name="description" content="hello." />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <main className={styles.main}>
        <h2><Link href="/"><a>Home.</a></Link></h2>
        <h1 className={styles.title}>
          <a href="https://www.transperth.wa.gov.au/">Transperth</a> Smartrider Checker.
        </h1>

        <p className={styles.description}>
          Enter your SmartRider number. The numbers next to <b>SR</b>.
          <br></br>
          <i>* Balance updates are delayed.</i>
        </p>
        
        
        <form onSubmit={handleSubmit}>
          <input onChange={(e) => setInputValue(e.target.value)} value={inputValue} placeholder="1234 5678 9"></input>
          <button>Submit</button>
        </form>

        {data.success === true ? (
          <a className={styles.card2}>
            <p>
              {data.error}
              <b>Balance: </b>
              $<a id="balanceBox">{data.data.balance}</a>
            </p>
            <p>
              <b>Type: </b>
              <a id="typeBox">{data.data.type}</a>
            </p>
            <p>
              <b>Expiry Date: </b>
              <a id="expireBox">{data.data.expire}</a>
            </p>
            <p>
              <b>AutoLoad: </b>
              <a id="autoloadBox">{data.data.autoload === true ? 'True':'False'}</a>
            </p>
          </a>
        ) : (data.error)}

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
