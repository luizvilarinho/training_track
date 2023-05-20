import TabelaMacronutrientes from "../TabelaMacronutrientes";
import { useEffect, useState } from "react";
import { Alimento } from "../../components/types";
import styles from  "./calorias.module.css"
import usePost from "../hooks/usePost";
import {tipoRefeicao} from "./types";

type Props = {
    alimentosList:Array<Alimento>,
    alimentosRefeicao:Array<Alimento>,
    nomeRefeicao: tipoRefeicao,
    dia:string,
    idTipoRefeicao: number,
    fetchAlimentos: () => void
    // alimentosRender:Function
}

type FormAdd = {
    alimento:string,
    quantidade:string,
    selected: Alimento
}

const Refeicao = (props: Props) => {

    let INICIAL_FORM: FormAdd = {
        alimento: '',
        quantidade:'',
        selected: {
            id:0,
            alimento: '',
            cal:0,
            p:0,
            c:0,
            g:0,
            f: 0
        }
      }

      const payloadPostAlimentoInit = {
          "tipo": null,
          "nome": "",
          "quantidade": null,
          "cal":null,
          "p": null,
          "c":null,
          "g": null,
          "f": null,
          "data":""
      }

    const [alimentoForm, setAlimentoForm] = useState(INICIAL_FORM)
    const [alimentosToSelect, setAlimentosToSelect] = useState<Array<Alimento>>([])
    
    const [alimentosTable, setAlimentosTable] = useState<Array<Alimento>>([])

    const [payloadAlimento, setPayloadAlimento] = useState(payloadPostAlimentoInit);
    
    const [alimentoSaved, httpPostAlimento] = usePost({url: `${process.env.NEXT_PUBLIC_REFEICAO}`, payload: payloadAlimento});


    function alimentoHandler(event:any){
        if(event.target.value.length > 2){
            let alimentosFiltered = props.alimentosList.filter((item:Alimento) => {
                return item.alimento.toUpperCase().includes(event.target.value.toUpperCase())
            })

            setAlimentosToSelect(alimentosFiltered)
        }else{
            setAlimentosToSelect([])
        }
    }


    function alimentoSelected(al:Alimento){
        setAlimentoForm({...alimentoForm, alimento:al.alimento, selected:al})
        setAlimentosToSelect([])
        
    }   

    function quantidadeHandler(event:any){
        let value = event.nativeEvent.data
        let onlyNumbersRegex = /[0-9]/g
        
        if(onlyNumbersRegex.test(value) || value === null){
            setAlimentoForm({...alimentoForm, quantidade:event.currentTarget.value})
        }
        
    }

    useEffect(()=>{

        if(props.alimentosRefeicao.length > 0){
            let al = props.alimentosRefeicao.map((item)=>{
                item['alimento'] = item.nome || "";
            })
            setAlimentosTable(props.alimentosRefeicao)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.alimentosRefeicao])

    async function adicionarAlimento(){

        let payload:any = {
            "tipo": props.idTipoRefeicao,
            "nome": alimentoForm.alimento,
            "quantidade": Number(alimentoForm.quantidade),
            "cal": Math.round((alimentoForm.selected.cal / 100) * Number(alimentoForm.quantidade)), // (qntcal / 100) * qnt
            "p": Math.round((alimentoForm.selected.p / 100) * Number(alimentoForm.quantidade)),
            "c":Math.round((alimentoForm.selected.c / 100) * Number(alimentoForm.quantidade)),
            "g": Math.round((alimentoForm.selected.g / 100) * Number(alimentoForm.quantidade)),
            "f": Math.round((alimentoForm.selected.f / 100) * Number(alimentoForm.quantidade)),
            "data": props.dia
        }

        setPayloadAlimento(payload)

        
        
    }

    useEffect(()=>{
        
        if(payloadAlimento.nome != ""){
            httpPostAlimento()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [payloadAlimento])
    

    useEffect(()=>{
        if(Object.keys(alimentoSaved.data).length > 0){
            //gravarRenderizarAlimentos()
            setAlimentoForm(INICIAL_FORM);
            props.fetchAlimentos();
        }
    
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [alimentoSaved])


    function somaMacronutrientes(macro:string):number{
        
        if(alimentosTable.length >0){
            let soma:number[] = [];
            alimentosTable.map((item:any)=>{
                soma.push( Number(item[macro]))
            })

            return Number(soma.reduce((a,b) => a + b).toFixed(0))
        }else{
            return 0
        }
    }

    return (
        <div className={styles.calorias}>
            
            <section className={styles.sectionMacros}>
                <div className={styles.sectionInput}>
                    <article className={styles.containerAlimento}>
                        <label htmlFor="alimento">alimento</label>
                        <input type='text' 
                            id="alimento" 
                            onInput={(event)=>alimentoHandler(event.nativeEvent)} 
                            onChange={(event)=> setAlimentoForm({...alimentoForm, alimento:event.currentTarget.value})} 
                            value={alimentoForm.alimento} 
                            placeholder="nome do alimento"
                            autoComplete="off"
                        />

                        <div className={`${styles.selectContainer} ${alimentosToSelect.length > 0 && alimentoForm.alimento.length > 3? styles.open : styles.close}`}>
                            {
                                alimentosToSelect.map((item:Alimento)=>{
                                    return (
                                        <div key={item.id} onClick={()=>alimentoSelected(item)}>{item.alimento}</div>
                                    )
                                })
                            }
                        </div>
                    </article>

                    <article className={styles.containerQuantidade}>
                        <label htmlFor="quantidade">qnt (g)</label>
                        <input type='text' 
                            id="quantidade" 
                            onChange={quantidadeHandler} 
                            value={alimentoForm.quantidade} 
                            placeholder="peso" 
                            min={0} 
                            step={1} 
                            maxLength={4}/>
                    </article>

                    <button onClick={()=>adicionarAlimento()} disabled={alimentoForm.alimento && alimentoForm.quantidade? false : true}>adicionar</button>
                </div>

                <div>
                    <div className={styles.tituloContainer}>
                        <h3>{props.nomeRefeicao} </h3>
                        
                        {alimentosTable.length > 0 ? (
                            <div className={styles.totalMacroContainer}>
                                {/*<div>Total <span>:</span></div>*/}
                                <div>CAL <span>{ somaMacronutrientes('cal') }</span>
                                </div>
                                <div>P <span>{ somaMacronutrientes('p') }</span></div>
                                <div>C <span>{ somaMacronutrientes('c') }</span></div>
                                <div>G <span>{ somaMacronutrientes('g') }</span></div>
                                <div>F <span>{ somaMacronutrientes('f') }</span></div>
                            </div>
                        ) : (null)}
                    </div>
                    <TabelaMacronutrientes  alimentos={alimentosTable} fetchAlimentos={props.fetchAlimentos} />
                </div>
            </section>

        </div>
    )
}

export default Refeicao;
