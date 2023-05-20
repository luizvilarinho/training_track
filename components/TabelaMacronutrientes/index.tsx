import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./tabelaMacronutrientes.module.css"
import { Alimento } from "../../pages/calorias/types";
import { Modal } from "../Modal";
import { useEffect, useState } from "react";
import useDelete from "../hooks/useDelete";


type Props = {
    alimentos: Array<Alimento>,
    fetchAlimentos: () => void
}


const TabelaMacronutrientes = (props:Props) => {
    
    const [modalConfig, setModalConfig] = useState({
       
        closeModal: () => {
            setModalConfig({...modalConfig, open:false})
        },
        open:false,
        title: "Deseja remover o ítem?",
        itemSelectedId:0
    })

    const [deleteDados, deleteCall] = useDelete({url: `${process.env.NEXT_PUBLIC_REFEICAO}/${modalConfig.itemSelectedId}`});
   
    function openModalDelete(id:number){
        setModalConfig({...modalConfig, itemSelectedId:id,open:true, })
    }

    async function execDelete(){
        await deleteCall();
        
        setModalConfig(()=>{
            return {...modalConfig, open:false}
        })
        
    }

    useEffect(()=>{
        
        if(Object.keys(deleteDados.data).length > 0){
            console.log("deleteDados", deleteDados.data)
            props.fetchAlimentos();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deleteDados])

    return (
        <>
        <Modal exec={execDelete} open={modalConfig.open} title={modalConfig.title} closeModal={modalConfig.closeModal}/>

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
                                <tr key={item.id}>
                                    <td>{item.alimento  || item.nome} <span className={styles.quantidadeTabela}>{`(${item.qnt} g)`}</span></td>
                                    <td>{Number(item.cal).toFixed(0)}</td>
                                    <td>{Number(item.p).toFixed(0)}</td>
                                    <td>{Number(item.c).toFixed(0)}</td>
                                    <td>{Number(item.g).toFixed(0)}</td>
                                    <td>{Number(item.f).toFixed(0)}</td> 
                                    <td className="pointer"><FontAwesomeIcon icon={faTrashCan} onClick={() => openModalDelete(item.id) } /></td>
                                </tr>
                            )
                        })}
                        
                        
                    </tbody>
                </table>

            ) : (
                <div className={styles.empty}>nenhum alimento selecionado</div>
            )}
        </div>
        </>
    )
}

export default TabelaMacronutrientes;
function UseState(arg0: { exec: () => void; open: boolean; }): [any, any] {
    throw new Error("Function not implemented.");
}

