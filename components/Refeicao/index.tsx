import TabelaMacronutrientes from "../TabelaMacronutrientes";
import { useEffect, useState } from "react";
import { Alimento } from "../../pages/calorias/types";
import styles from  "./calorias.module.css"
import usePost from "../hooks/usePost";

type Props = {
    alimentosList:Array<Alimento>,
    nomeRefeicao: string
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
            alimento: '',
            cal:0,
            p:0,
            c:0,
            g:0,
            f: 0
        }
      }

    const [alimentoForm, setAlimentoForm] = useState(INICIAL_FORM)
    const [alimentosToSelect, setAlimentosToSelect] = useState<Array<Alimento>>([])
    
    const [alimentosTable, setAlimentosTable] = useState<Array<Alimento>>([])
    
    const [alimentoCalculado, httpPost] = usePost({url: `${process.env.NEXT_PUBLIC_URL_CALORIAS_CALCULAR}`, payload:{id_alimento: alimentoForm.selected.id, quantidade: alimentoForm.quantidade}});

    function alimentoHandler(event:any){
        if(event.target.value.length > 2){
            let alimentosFiltered = props.alimentosList.filter((item:Alimento) => {
                return item.alimento.toUpperCase().includes(event.target.value.toUpperCase())
            })

            setAlimentosToSelect(alimentosFiltered)
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
        if(alimentoCalculado && alimentoCalculado.data && alimentoCalculado.data.response){
            setAlimentosTable([...alimentosTable, alimentoCalculado.data.response])
        }
    }, [alimentoCalculado])

    async function adicionarAlimento(){
        httpPost()
        setAlimentoForm(INICIAL_FORM)
    }

    function somaMacronutrientes(macro:string):number{
        
        if(alimentosTable.length >0){
            let soma:number[] = [];
            alimentosTable.map((item:any)=>{
                soma.push( Number(item[macro]))
            })

            return soma.reduce((a,b) => a + b)
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

                        <div className={styles.selectContainer}>
                            {alimentosToSelect.length > 0 && (
                                alimentosToSelect.map((item:Alimento)=>{
                                    return (
                                        <div key={item.id} onClick={()=>alimentoSelected(item)}>{item.alimento}</div>
                                    )
                                })
                            )}
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
                        <h3>{props.nomeRefeicao}</h3>
                        
                        {alimentosTable.length > 0 ? (
                            <div className={styles.totalMacroContainer}>
                                <div>CAL 
                                    <span>
                                        { somaMacronutrientes('cal') }
                                    </span>
                                </div>
                                <div>P <span>{ somaMacronutrientes('p') }</span></div>
                                <div>C <span>{ somaMacronutrientes('c') }</span></div>
                                <div>G <span>{ somaMacronutrientes('g') }</span></div>
                                <div>F <span>{ somaMacronutrientes('f') }</span></div>
                            </div>
                        ) : (null)}
                    </div>
                    <TabelaMacronutrientes  alimentos={alimentosTable} />
                </div>
            </section>

        </div>
    )
}

export default Refeicao;