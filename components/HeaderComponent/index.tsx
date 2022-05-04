import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import circle_notifications_white_24dp from '../../public/assets/img/circle_notifications_white_24dp.svg'
import useGet from '../hooks/useGet'


const HeaderComponent = (props:{name:string}) =>{

    const [logoutData, logoutCall] = useGet({url:process.env.NEXT_PUBLIC_LOGOUT})
    
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
    }, [logoutData])

    return (
        <section id="top-alert">
            <div className="menu">
                <div className="user">{props.name}</div>
                <div className="logout" onClick={logoutHandler}>logout</div>
            </div>
            <div className="notification-length">1</div>
            <div className="alert-ico">
                <Image src={circle_notifications_white_24dp} width={35} height={35} />
            </div>
        </section>
    )
}

export default HeaderComponent;