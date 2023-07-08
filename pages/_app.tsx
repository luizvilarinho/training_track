import '../styles/globals.css'
import '../styles/loading.css'
import type { AppProps } from 'next/app'
import { Fragment } from 'react'
import HeaderComponent from '../components/HeaderComponent'
import { useRouter } from 'next/router'


function MyApp({ Component, pageProps }: AppProps ) {

  const router = useRouter()

  return (
    <Fragment>
        <div className="main">
          <Component {...pageProps} />
        </div>
    </Fragment>
  ) 
}


export default MyApp
