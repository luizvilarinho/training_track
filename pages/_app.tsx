import '../styles/globals.css'
import '../styles/loading.css'
import type { AppProps } from 'next/app'
import { Fragment } from 'react'
import HeaderComponent from '../components/HeaderComponent'
import MenuComponent from '../components/MenuComponent'

function MyApp({ Component, pageProps }: AppProps) {

  const user = {
    name: "Luiz Vilarinho"
  }

  return (
    <Fragment>
        <HeaderComponent name={user.name}/>
        <MenuComponent/>
        <div className="main">
          <Component {...pageProps} />
        </div>
    </Fragment>
    

    ) 
    
}

export default MyApp
