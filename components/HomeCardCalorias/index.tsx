import type { NextPage } from 'next'
import styles from './homeCardCalorias.module.css'
import Link from "next/link";
import React, { useEffect } from "react";

type Props = {
    calculo:{
        success:boolean,
        cal:number,
        p:number,
        c:number,
        g:number,
        f:number
    },
    healthData?:{
        weight:number,
        height:number
        meta_calorias:number
        meta_macros:{
            p:number
            c:number
            g:number
        }
    }
}
const HomeCardCalorias:  React.FC<Props> = (props: Props) => {

    useEffect(()=>{
        console.log("PROPS", props)
    },[])
    return (
        <div className={`${styles.homeCardCalorias}`}>

            <table hidden={props.calculo.cal? false : true}>
                <thead>
                <tr>
                    <th><span>Cal</span></th>
                    <th className={styles.none}></th>
                    <th><span>Prot.</span></th>
                    <th><span>Carb.</span></th>
                    <th><span>Gord.</span></th>
                    <th><span>Fibr.</span></th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{props.calculo.cal}</td>
                        <td></td>
                        <td>{props.calculo.p}</td>
                        <td>{props.calculo.c}</td>
                        <td>{props.calculo.g}</td>
                        <td>{props.calculo.f}</td>
                       
                    </tr>
                </tbody>
            </table>
           
           {props.healthData && (
            <article className={styles.resumoCalorias}>
                <div>
                    <small>meta diária (cal.)</small>
                    <span>{props.healthData.meta_calorias}</span>
                </div>
                <div>
                    <small>consumidas (cal.)</small>
                    <span>{props.calculo.cal || 0}</span>
                </div>
                <div>
                    <small>restantes (cal.)</small>
                    <span className={`${(props.healthData.meta_calorias - props.calculo.cal) < 0? 'tomato' : 'green'}`}>{props.calculo.cal? props.healthData.meta_calorias - props.calculo.cal : 0}</span>
                    
             </div>
            </article>
           )}

            <div className={styles.containerBtn}>
                <div className={`${styles.btnContainer} align--center`}>
                    <Link href={'/calorias'} passHref>
                        <button>adicionar</button>
                    </Link>
                </div>
                <div className={`${styles.btnContainer} align--center`}>
                    <Link href={'/metas'} passHref>
                        <button className={'secundary-btn'}>definir metas</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default HomeCardCalorias;
