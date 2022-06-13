import '../styles/globals.css'
import '../styles/loading.css'
import type { AppProps } from 'next/app'
import { Fragment, useEffect } from 'react'
import HeaderComponent from '../components/HeaderComponent'
import MenuComponent from '../components/MenuComponent'
import useGet from '../components/hooks/useGet'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter()

  const [userData, getUserCall] = useGet({url:process.env.NEXT_PUBLIC_GET_USER})

  useEffect(()=>{
      getUserCall();
  }, [])

  useEffect(()=>{
      if(router.pathname != '/login' && userData.data.length === 0){
         getUserCall();
      }
  }, [router.pathname])

  return (
    <Fragment>
      {router.pathname != '/login' && router.pathname != '/novo-usuario' ? (
        <Fragment>
          <HeaderComponent name={userData.data[0]?.name}/>
          <MenuComponent/>
        </Fragment>

      ) : ( <></> )}
        <div className="main">
          <Component {...pageProps} />
        </div>
    </Fragment>
    

    ) 
    
}

export default MyApp
