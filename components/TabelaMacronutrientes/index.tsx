import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./tabelaMacronutrientes.module.css"
import { Alimento } from "../../pages/calorias/types";


type Props = {
    alimentos: Array<Alimento>
}

const TabelaMacronutrientes = (props:Props) => {
    return (
        <div className={styles.macronutrientes}>
            {props.alimentos.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                        <th>Alimento</th>
                        <th>CAL</th>
                        <th>P</th>
                        <th>C</th>
                        <th>G</th>
                        <th>F</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.alimentos && props.alimentos.map((item:Alimento, index:number)=>{
                            return (
                                <tr key={index}>
                                    <td>{item.alimento} <span className={styles.quantidadeTabela}>{`(${item.qnt} g)`}</span></td>
                                    <td>{Number(item.cal).toFixed(0)}</td>
                                    <td>{Number(item.p).toFixed(0)}</td>
                                    <td>{Number(item.c).toFixed(0)}</td>
                                    <td>{Number(item.g).toFixed(0)}</td>
                                    <td>{Number(item.f).toFixed(0)}</td> 
                                    <td><FontAwesomeIcon icon={faTrashCan} /></td>
                                </tr>
                            )
                        })}
                        
                        
                    </tbody>
                </table>

            ) : (
                <div className={styles.empty}>nenhum alimento selecionado</div>
            )}
        </div>
    )
}

export default TabelaMacronutrientes;
