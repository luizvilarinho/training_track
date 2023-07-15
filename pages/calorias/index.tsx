import React, {Fragment, useCallback, useEffect, useMemo, useState} from "react"
import useGet from "../../components/hooks/useGet";
import Refeicao from "../../components/Refeicao";
import styles from "./containerCalorias.module.css"
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleArrowLeft, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {toBrLocaleDate, toEUALocaleDate} from "../../utils/parseDate";
import {Alimento} from "../../components/types";
import HeaderComponent from "../../components/HeaderComponent";

const Calorias = () => {

    const [dia, setDia] = useState<string>("");
    const [alimentos, getCall] = useGet({url: `${process.env.NEXT_PUBLIC_REFEICAO}?data=${toBrLocaleDate(dia)}`});

    const [alimentosList, getAlimentosListCall] = useGet({url: `${process.env.NEXT_PUBLIC_URL_CALORIAS}`});

    const [tiposRefeicaoList, getTiposRefeicao] = useGet({url: `${process.env.NEXT_PUBLIC_REFEICAO}/tipo`});


    useEffect(()=>{
        setDia(toEUALocaleDate(new Date().toLocaleDateString()))
        getAlimentosListCall();
        getTiposRefeicao();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(()=>{

        if(dia){
            getCall();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dia])

    // const alimentosRender = ()=>{
    //     if(dia){
    //         getCall();
    //     }
    // };

    function obterRefeicoesDia($event:any){
        setDia($event.currentTarget.value);
        //getCall();
    }

    function calcularCaloriasTotais(){
        getCall();
    }

    // @ts-ignore
    return (
        <>
            <div>
                <HeaderComponent userData={""}/>
            </div>
            { alimentos.loading ? (
                <Fragment>
                    <div className="loading">
                        <div className="loading-ico">
                            <FontAwesomeIcon icon={faSpinner} />
                        </div>
                    </div>
                </Fragment>
            ) : (
                <div className={styles.containerCalorias}>

                    <div>
                        <h2>Contador de calorias</h2>
                    </div>
                    <div className={ `${styles.data} md-mar--top`}>
                        <label htmlFor={'dataRef'}>Dia :</label>
                        <input type={'date'} id={'dataRef'} value={dia} onChange={(e)=>obterRefeicoesDia(e)}/>
                    </div>
                    <div className={styles.totalMacroContainer}>
                        <div className={styles.mobilleHidden}>Total <span>:</span></div>
                        <div>CAL <span>{alimentos.data.reduce((a:any,b:any)=>a + b['cal'], 0)}</span>
                        </div>
                        <div>P <span>{alimentos.data.reduce((a: any, b: any) => a + b.p, 0)}</span></div>
                        <div>C <span>{alimentos.data.reduce((a: any, b: any) => a + b.c, 0)}</span></div>
                        <div>G <span>{alimentos.data.reduce((a: any, b: any) => a + b.g, 0)}</span></div>
                        <div>F <span>{alimentos.data.reduce((a: any, b: any) => a + b.f, 0)}</span></div>
                    </div>

                    <div className={styles.flexSections}>

                        {tiposRefeicaoList.loading === false && alimentosList.loading === false? (

                            tiposRefeicaoList.data.map((tipoRefeicao:any)=>{
                                    return (
                                        <Refeicao
                                            key={tipoRefeicao.id}
                                            idTipoRefeicao={tipoRefeicao.id}
                                            alimentosList={alimentosList.data}
                                            alimentosRefeicao={alimentos.data.filter((item:Alimento) => item.tipo && item.tipo.id === tipoRefeicao.id)}
                                            nomeRefeicao={tipoRefeicao.tipo}
                                            dia={toBrLocaleDate(dia)}
                                            fetchAlimentos={calcularCaloriasTotais}
                                            // alimentosRender={alimentosRender}
                                        />
                                    )
                            })
                        ) : ('...')}

                    </div>


                    <div className={'md-mar--top align--center'}>
                        <Link href={'/'} passHref>
                            <button className={'secundary-btn'}>
                         <span style={{marginRight:'5px'}}>
                            <FontAwesomeIcon icon={faCircleArrowLeft} />
                         </span>
                                voltar
                            </button>
                        </Link>
                        <button className={'secundary-btn md-mar--left'}>
                            adicionar alimento
                        </button>
                    </div>
                </div>
            )}

        </>


)

}

export default Calorias;
