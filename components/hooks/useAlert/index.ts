import { useState } from "react";

function AlertHandler() : [boolean, ()=>void]{

    const [show, setShow] = useState<boolean>(false);
    const duration = 2000;
    const scrollPosition = window.pageYOffset;

    function alertShowHide(): void{

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });

        setShow(true);
        
        setTimeout(()=>{
            window.scrollTo({
                top: scrollPosition,
                behavior: 'smooth',
              });

            setShow(false)
        },duration)
    }

    return [show, alertShowHide]
}

export default AlertHandler;