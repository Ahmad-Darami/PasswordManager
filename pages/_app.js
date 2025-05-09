import Head from 'next/head'
import { StateContext } from "@/context/StateContext"
import { createGlobalStyle } from 'styled-components'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export const GlobalStyle = createGlobalStyle`
  * 
  {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'JetBrains Mono', monospace;
  }
`

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const [routeChanging, setRouteChanging] = useState(false)

  useEffect(() => {
    const handleStart = () => setRouteChanging(true)
    const handleComplete = () => setRouteChanging(false)

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [router])

  return (
    <>
    
        <Head>
          <title>BlockPass</title>
          <meta name='description' content='The best decentralized password manager out there.'/>
          <meta name='bepis' content='index'/>
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon_package/apple-touch-icon.png"/>
          {/* <link rel="icon" type="image/png" sizes="32x32" href="/favicon_package/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon_package/favicon-16x16.png"/> */}
          {/* <link rel="manifest" href="/favicon_package/site.webmanifest"/> */}
          <meta name="msapplication-TileColor" content="#da532c"/>
          <meta name="theme-color" content="#ffffff"/>
        </Head>

        <GlobalStyle />

      <StateContext>
      <AnimatePresence mode="wait">
          <motion.div
            key={router.route}
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(8px)' }}
            transition={{ duration: 0.18, ease: 'easeInOut' }}
          >
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </StateContext>
    </>
  )
}
