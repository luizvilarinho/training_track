import '../styles/globals.css'
import '../styles/loading.css'
import type { AppProps } from 'next/app'
import { Fragment } from 'react'


function MyApp({ Component, pageProps }: AppProps ) {

  return (
    <Fragment>
        <div className="main">
          <Component {...pageProps} />
        </div>
    </Fragment>
  ) 
}


export default MyApp
