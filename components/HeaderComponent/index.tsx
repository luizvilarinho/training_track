import Image from 'next/image'
import circle_notifications_white_24dp from '../../public/assets/img/circle_notifications_white_24dp.svg'


const HeaderComponent = (props:{name:string}) =>{
    return (
        <section id="top-alert">
            <div className="menu">
                <div className="user">{props.name}</div>
                <div className="logout">logout</div>
            </div>
            <div className="notification-length">1</div>
            <div className="alert-ico">
                <Image src={circle_notifications_white_24dp} width={35} height={35} />
            </div>
        </section>
    )
}

export default HeaderComponent;