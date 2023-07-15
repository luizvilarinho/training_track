import { useState } from "react";

function AlertHandler() : [boolean, ()=>void]{

    const [show, setShow] = useState<boolean>(false);
    const duration = 2000;
    const scrollPosition = typeof window !== 'undefined'? window.pageYOffset : undefined;

    function alertShowHide(): void{

      if(typeof window !== 'undefined'){
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
      }

        setShow(true);
        
        setTimeout(()=>{

          if(typeof window !== 'undefined'){
            window.scrollTo({
                top: scrollPosition,
                behavior: 'smooth',
              });
          }

            setShow(false)
        },duration)
    }

    return [show, alertShowHide]
}

export default AlertHandler;