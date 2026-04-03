import { useRouter } from 'next/router'
import { useEffect, useState, useRef } from 'react'
import useGet from '../hooks/useGet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDumbbell, faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'


const HeaderComponent = ({userData}:any) =>{

    const [logoutData, logoutCall] = useGet({url:process.env.NEXT_PUBLIC_LOGOUT})
    const [menuOpen, setMenuOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    const router = useRouter()

    function logoutHandler(){
        console.log("logout")
        logoutCall();
    }

    useEffect(()=>{
        if(logoutData.data[0]?.success){
            router.push({
                pathname:'/login'
            })
        }
    }, [logoutData, router])

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <section id="top-alert">
            <div className="menu">
                <div className="logo">
                    <FontAwesomeIcon icon={faDumbbell} />
                    <Link href={'/'} passHref>
                        Training Track
                    </Link>
                </div>
                <div className="menu-right">
                    <div className="user">{userData?.name}</div>
                    <div className="logout" onClick={logoutHandler}>logout</div>
                    <div className="hamburger-wrapper" ref={menuRef}>
                        <button className="hamburger-btn" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
                            <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
                        </button>
                        {menuOpen && (
                            <nav className="dropdown-menu">
                                <Link href="/calorias" passHref><a onClick={() => setMenuOpen(false)}>Calorias</a></Link>
                                <Link href="/treino/plano" passHref><a onClick={() => setMenuOpen(false)}>Treino</a></Link>
                            </nav>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )


}

  

export default HeaderComponent;
