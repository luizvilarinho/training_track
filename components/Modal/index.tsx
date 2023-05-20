import styles from "./styles.module.css";

type Props = {
    exec: () => void,
    open: boolean,
    title:string,
    closeModal: () =>void
}

export const Modal = (props:Props) =>{

    return (
        <>  
            {props.open && (
                <div className={styles.modalContainer}>
                    <div className={styles.modalContent}>
                        <div>
                            <h1>{props.title}</h1>
                            <div className={styles.btnContaner}>
                                <button className="secundary-btn" onClick={props.exec}>Sim</button>
                                <button onClick={props.closeModal}>Não</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )

}