import { useEffect } from "react"
import useGet from "../../components/hooks/useGet";
import Refeicao from "../../components/Refeicao";
import styles from "./containerCalorias.module.css"

const Calorias = () => {

    const [alimentos, getCall] = useGet({url: `${process.env.NEXT_PUBLIC_URL_CALORIAS}`});

    useEffect(()=>{
        getCall();
    }, [])
    
    return (
        <div className={styles.containerCalorias}>
            <div>
                <h2>Contador de calorias</h2>
            </div>

            <div className={styles.flexSections}>
                <Refeicao alimentosList={alimentos.data} nomeRefeicao="Café da manhã" />
                <Refeicao alimentosList={alimentos.data} nomeRefeicao="Almoço" />
            </div>
            <div className={styles.flexSections}>
                <Refeicao alimentosList={alimentos.data} nomeRefeicao="café da tarde" />
                <Refeicao alimentosList={alimentos.data} nomeRefeicao="Jantar" />
            </div>

        </div>
    )
    
}

export default Calorias;