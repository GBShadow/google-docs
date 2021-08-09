import Head from 'next/head'
import { Provider as AuthProvider } from 'next-auth/client'
import NextNprogress from 'nextjs-progressbar'

import 'tailwindcss/tailwind.css'
import '@material-tailwind/react/tailwind.css'
import 'styles/global.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Head>

      <AuthProvider session={pageProps.session}>
        <Component {...pageProps} />
        <NextNprogress
          color="#05A9F4"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          options={{ showSpinner: false }}
        />
      </AuthProvider>
    </>
  )
}

export default MyApp
