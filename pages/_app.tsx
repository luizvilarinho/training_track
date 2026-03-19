import '../styles/globals.css'
import '../styles/loading.css'
import type { AppProps } from 'next/app'
import { Fragment } from 'react'
import { useRouter } from 'next/router'
import MenuComponent from '../components/MenuComponent'

const NO_NAV_PATHS = ['/login', '/nova-senha', '/novo-usuario', '/recuperar-credenciais'];

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const showNav = !NO_NAV_PATHS.includes(router.pathname);

  return (
    <Fragment>
      <div className="main">
        <Component {...pageProps} />
        {showNav && <MenuComponent />}
      </div>
    </Fragment>
  );
}

export default MyApp;
