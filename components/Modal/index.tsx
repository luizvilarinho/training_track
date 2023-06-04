import { useEffect } from "react";
import styles from "./styles.module.css";

type Props = {
    exec: () => void,
    open: boolean,
    title:string,
    closeModal: () =>void
}

export const Modal = (props:Props) =>{

    useEffect(()=>{
        console.log("MODAL", props.open)
        if(props.open){
            document.body.style.overflow = 'hidden';
        }else{
            document.body.style.overflow = '';
        }
    }, [props.open])
    return (
        <>  
            {props.open && (
                <div className={styles.modalContainer}>
                    <div className={styles.modalContent}>
                        <div>
                            <h1>{props.title}</h1>
                            <div className={styles.btnContaner}>
                                <button  onClick={props.exec}>Sim</button>
                                <button className="secundary-btn" onClick={props.closeModal}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )

}